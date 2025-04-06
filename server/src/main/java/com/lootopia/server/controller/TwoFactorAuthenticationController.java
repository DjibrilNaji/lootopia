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

    public TwoFactorAuthenticationController(TwoFactorAuthenticationService twoFactorAuthenticationService) {
        this.twoFactorAuthenticationService = twoFactorAuthenticationService;
    }

    @PostMapping("/send-code")
    public ResponseEntity<String> sendVerifyCode(@RequestBody Map<String, String> request) {
        return twoFactorAuthenticationService.handleSendCode(request);
    }

    @PostMapping("/verify-code")
    public ResponseEntity<?> verifyCode(@RequestBody Map<String, String> request, HttpServletResponse response) {
        return twoFactorAuthenticationService.handleVerifyCode(request, response);
    }
}