package com.lootopia.server.controller;

import com.lootopia.server.security.CustomUserDetails;
import com.lootopia.server.service.JwtService;
import com.lootopia.server.service.TwoFactorAuthenticationService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/2fa")
public class TwoFactorAuthenticationController {

    private final TwoFactorAuthenticationService twoFactorAuthenticationService;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public TwoFactorAuthenticationController(TwoFactorAuthenticationService twoFactorAuthenticationService, JwtService jwtService, UserDetailsService userDetailsService) {
        this.twoFactorAuthenticationService = twoFactorAuthenticationService;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/send-code")
    public ResponseEntity<String> sendVerifyCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        if (email == null) {
            return ResponseEntity.badRequest().body("Le paramètre 'email' est requis.");
        }
        try {
            String code = twoFactorAuthenticationService.sendVerificationCode(email);
            return ResponseEntity.ok("Code de vérification envoyé à " + email);
        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Échec de l'envoi du code : " + e.getMessage());
        }
    }

    @PostMapping("/verify-code")
    public ResponseEntity<?> verifyCode(
            @RequestBody Map<String, String> request,
            HttpServletResponse response
    ) {
        String email = request.get("email");
        String inputCode = request.get("inputCode");

        if (email == null || inputCode == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Les paramètres 'email' et 'inputCode' sont requis."));
        }

        boolean isValid = twoFactorAuthenticationService.verifyCode(inputCode, email);

        if (isValid) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            String jwtToken = jwtService.generateToken(userDetails);

            ResponseCookie accessCookie = ResponseCookie.from("accessToken", jwtToken)
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .maxAge(7 * 24 * 60 * 60) // 7 jours
                    .sameSite("Strict")
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());

            return ResponseEntity.ok(Map.of(
                    "customMessage", "Vérification réussie !",
                    "user", ((CustomUserDetails) userDetails).getUser().getUsername()
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Code 2FA invalide."));
        }
    }




}