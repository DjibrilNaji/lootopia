package com.lootopia.server.controller;

import com.lootopia.server.dto.LoginDto;
import com.lootopia.server.dto.RegisterDto;
import com.lootopia.server.security.CustomUserDetails;
import com.lootopia.server.service.AuthService;
import com.lootopia.server.service.CustomUserDetailsService;
import com.lootopia.server.service.JwtService;
import com.lootopia.server.service.TwoFactorAuthenticationService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/users")
public class AuthController {

    @Autowired
    private AuthService authService;

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;
    private final TwoFactorAuthenticationService twoFactorAuthenticationService;

    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService, CustomUserDetailsService userDetailsService, TwoFactorAuthenticationService twoFactorAuthenticationService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.twoFactorAuthenticationService = twoFactorAuthenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody RegisterDto registerDto) throws MessagingException {
        return authService.registerUser(registerDto);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginDto request,
            HttpServletResponse response
    ) {
        try {
            UserDetails userDetails = authService.authenticate(request.getEmail(), request.getPassword());

            if (userDetails instanceof CustomUserDetails &&
                    ((CustomUserDetails) userDetails).getUser().isTwoFactorEnabled()) {
                try {
                    twoFactorAuthenticationService.sendVerificationCode(request.getEmail());
                    return ResponseEntity.ok(Map.of(
                            "message", "2FA requis. Un code a été envoyé à votre email.",
                            "requires2fa", true
                    ));
                } catch (MessagingException e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body(Map.of("message", "Échec de l'envoi du code 2FA."));
                }
            }

            String accessToken = jwtService.generateToken(userDetails);

            ResponseCookie accessCookie = ResponseCookie.from("accessToken", accessToken)
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .maxAge(7 * 24 * 60 * 60) // 7 jours
                    .sameSite("Strict")
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());

            assert userDetails instanceof CustomUserDetails;
            return ResponseEntity.ok()
                    .body(Map.of(
                            "token", accessToken,
                            "customMessage", "Connexion réussie !",
                            "user", ((CustomUserDetails) userDetails).getUser().getUsername()
                    ));

        } catch (UsernameNotFoundException | BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Identifiants invalides."));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            HttpServletRequest request,
            HttpServletResponse response
    ) {

        Stream.of("accessToken", "JSESSIONID")
                .forEach(cookieName -> {
                    Cookie cookie = new Cookie(cookieName, null);
                    cookie.setPath("/");
                    cookie.setHttpOnly(true);
                    cookie.setSecure(request.isSecure());
                    cookie.setMaxAge(0);
                    response.addCookie(cookie);
                });

        SecurityContextHolder.clearContext();

        return ResponseEntity.ok()
                .header("Cache-Control", "no-store")
                .body(Map.of(
                        "success", true,
                        "message", "Déconnexion effectuée"
                ));
    }

    @PostMapping("/validateToken")
    public ResponseEntity<?> validateToken(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("isValid", false, "message", "Token manquant"));
        }

        try {
            String email = jwtService.extractUsername(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);

            boolean isValid = jwtService.isTokenValid(token, userDetails);
            return ResponseEntity.ok(Map.of("isValid", isValid, "message", isValid ? "Valide" : "Invalide"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("isValid", false, "message", "Erreur de validation"));
        }
    }

    @GetMapping("/verify")
    public ResponseEntity<Map<String, String>> verifyAccount(@RequestParam String email, @RequestParam String activationCode) {
        return authService.verifyAccount(email, activationCode);
    }
}
