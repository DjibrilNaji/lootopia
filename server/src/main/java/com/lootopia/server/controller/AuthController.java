package com.lootopia.server.controller;

import com.lootopia.server.dto.RegisterDto;
import com.lootopia.server.repository.UserRepository;
import com.lootopia.server.service.AuthService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody RegisterDto registerDto) throws MessagingException {
        return authService.registerUser(registerDto);
    }

    @GetMapping("/verify")
    public ResponseEntity<Map<String, String>> verifyAccount(@RequestParam String email, @RequestParam String activationCode) {
        return authService.verifyAccount(email, activationCode);
    }

}
