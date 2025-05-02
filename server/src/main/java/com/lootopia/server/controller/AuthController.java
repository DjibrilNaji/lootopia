package com.lootopia.server.controller;

import com.lootopia.server.dto.LoginDto;
import com.lootopia.server.dto.RegisterDto;
import com.lootopia.server.dto.UpdatePasswordDto;
import com.lootopia.server.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired private AuthService authService;

  @PostMapping("/register")
  public ResponseEntity<Map<String, String>> register(@RequestBody RegisterDto registerDto) {
    return authService.registerUser(registerDto);
  }

  @GetMapping("/verify")
  public ResponseEntity<Map<String, String>> verifyAccount(
      @RequestParam String email, @RequestParam String activationCode) {
    return authService.verifyAccount(email, activationCode);
  }

  @PostMapping("/login")
  public ResponseEntity<Map<String, String>> login(
      @RequestBody LoginDto request, HttpServletResponse response) {
    return authService.login(request, response);
  }

  @PostMapping("/logout")
  public ResponseEntity<Map<String, String>> logout(
      HttpServletRequest request, HttpServletResponse response) {
    return authService.logout(request, response);
  }

  @PostMapping("/update-password")
  public ResponseEntity<Map<String, String>> updatePassword(
      @RequestBody UpdatePasswordDto updatePasswordDto) {
    return authService.updatePassword(updatePasswordDto);
  }
}
