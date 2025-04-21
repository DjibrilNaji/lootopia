package com.lootopia.server.service;

import com.lootopia.server.security.CustomUserDetails;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class TwoFactorAuthenticationService {

  @Autowired private EmailService emailService;

  private final JwtService jwtService;
  private final UserDetailsService userDetailsService;

  private final Map<String, String> otpCache = new HashMap<>();

  public TwoFactorAuthenticationService(
      EmailService emailService, JwtService jwtService, UserDetailsService userDetailsService) {
    this.emailService = emailService;
    this.jwtService = jwtService;
    this.userDetailsService = userDetailsService;
  }

  public String generateVerificationCode() {
    return String.format("%06d", new Random().nextInt(999999));
  }

  public String sendVerificationCode(String email) throws MessagingException {
    String code = generateVerificationCode();
    otpCache.put(email, code);
    emailService.sendMailOtp(email, code);
    return code;
  }

  public boolean verifyCode(String inputCode, String email) {
    String actualCode = otpCache.get(email);
    return actualCode != null && actualCode.equals(inputCode);
  }

  public ResponseEntity<String> handleSendCode(Map<String, String> request) {
    String email = request.get("email");
    if (email == null) {
      return ResponseEntity.badRequest().body("Le paramètre 'email' est requis.");
    }

    try {
      sendVerificationCode(email);
      return ResponseEntity.ok("Code de vérification envoyé à " + email);
    } catch (MessagingException e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("Échec de l'envoi du code : " + e.getMessage());
    }
  }

  public ResponseEntity<String> handleVerifyCode(
      Map<String, String> request, HttpServletResponse response) {
    String email = request.get("email");
    String inputCode = request.get("inputCode");

    if (email == null || inputCode == null) {
      return ResponseEntity.badRequest()
          .body(Map.of("message", "Les paramètres 'email' et 'inputCode' sont requis.").toString());
    }

    boolean isValid = verifyCode(inputCode, email);

    if (isValid) {
      UserDetails userDetails = userDetailsService.loadUserByUsername(email);
      String jwtToken = jwtService.generateToken(userDetails);

      ResponseCookie accessCookie =
          ResponseCookie.from("accessToken", jwtToken)
              .httpOnly(true)
              .secure(true)
              .path("/")
              .maxAge(7 * 24 * 60 * 60)
              .sameSite("Strict")
              .build();

      response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());

      return ResponseEntity.ok(
          Map.of(
                  "customMessage",
                  "Vérification réussie !",
                  "user",
                  ((CustomUserDetails) userDetails).getUser().getUsername())
              .toString());
    } else {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .body(Map.of("message", "Code 2FA invalide.").toString());
    }
  }
}
