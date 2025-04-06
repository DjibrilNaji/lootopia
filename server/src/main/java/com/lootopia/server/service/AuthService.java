package com.lootopia.server.service;


import com.lootopia.server.dto.LoginDto;
import com.lootopia.server.dto.RegisterDto;
import com.lootopia.server.entity.User;
import com.lootopia.server.repository.UserRepository;
import com.lootopia.server.security.CustomUserDetails;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Stream;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserDetailsService userDetailsService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final TwoFactorAuthenticationService twoFactorAuthenticationService;

    public AuthService(PasswordEncoder passwordEncoder, JwtService jwtService, PasswordEncoder passwordEncoder1, TwoFactorAuthenticationService twoFactorAuthenticationService) {
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder1;
        this.twoFactorAuthenticationService = twoFactorAuthenticationService;
    }

    @Transactional()
    public ResponseEntity<Map<String, String>> registerUser(RegisterDto registerDTO) {
        if (registerDTO.getUsername().length() < 5 || registerDTO.getUsername().length() > 20) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("customMessage", "Nom d'utilisateur invalide."));
        }

        if (registerDTO.getEmail().length() < 5 || registerDTO.getEmail().length() > 50) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("customMessage", "Email invalide."));
        }

        if (registerDTO.getPassword().length() < 10) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("customMessage", "Mot de passe invalide."));
        }

        var userOpt = userRepository.findByEmail(registerDTO.getEmail());

        if (userOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("customMessage", "Email déjà utilisé."));
        }

        userOpt = userRepository.findByUsername(registerDTO.getUsername());

        if (userOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("customMessage", "Nom d'utilisateur déjà utilisé."));
        }

        var activationCode = String.valueOf(new Random().nextInt(999999) + 100000);

        var user = new User();
        user.setUsername(registerDTO.getUsername());
        user.setEmail(registerDTO.getEmail());

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String result = encoder.encode(registerDTO.getPassword());

        user.setPasswordHash(result);
        user.setActivationCode(activationCode);

        try {
            userRepository.save(user);
            emailService.registerEmail(registerDTO.getEmail(), activationCode);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("customMessage", "Erreur lors de l'enregistrement de l'utilisateur."));
        }

        return ResponseEntity.ok(Map.of("customMessage", "Un email de confirmation a été envoyé à votre adresse email."));
    }

    public ResponseEntity<Map<String, String>> verifyAccount(String email, String activationCode) {
        Optional<User> userOptEmail = userRepository.findByEmail(email);

        if (userOptEmail.isPresent() && userOptEmail.get().isActive()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("customMessage", "Ce compte est déjà activé."));
        }

        Optional<User> userOptActivationCode = userRepository.findByActivationCode(activationCode);

        if (userOptActivationCode.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("customMessage", "Code d'activation invalide."));
        }

        if (!userOptActivationCode.get().getEmail().equals(email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("customMessage", "Email invalide."));
        }

        User user = userOptActivationCode.get();

        user.setActive(true);
        user.setActivationCode(null);

        userRepository.save(user);
        
        return ResponseEntity.ok(Map.of("customMessage", "Votre compte a été activé avec succès."));
    }

    public UserDetails authenticate(String email, String rawPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));

        if (!passwordEncoder.matches(rawPassword, user.getPasswordHash())) {
            throw new BadCredentialsException("Mot de passe incorrect.");
        }

        return userDetailsService.loadUserByUsername(email);
    }

    public ResponseEntity<?> login(LoginDto request, HttpServletResponse response) {
        try {
            UserDetails userDetails = authenticate(request.getEmail(), request.getPassword());

            if (userDetails instanceof CustomUserDetails customUser &&
                    customUser.getUser().isTwoFactorEnabled()) {
                twoFactorAuthenticationService.sendVerificationCode(request.getEmail());
                return ResponseEntity.ok(Map.of(
                        "message", "2FA requis. Un code a été envoyé à votre email.",
                        "requires2fa", true
                ));
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

            CustomUserDetails customUser = (CustomUserDetails) userDetails;

            return ResponseEntity.ok()
                    .body(Map.of(
                            "token", accessToken,
                            "customMessage", "Connexion réussie !",
                            "user", customUser.getUser().getUsername()
                    ));

        } catch (UsernameNotFoundException | BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Identifiants invalides."));
        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Échec de l'envoi du code 2FA."));
        }
    }

    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
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

}
