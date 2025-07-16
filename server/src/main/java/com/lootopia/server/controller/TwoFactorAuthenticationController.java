package com.lootopia.server.controller;

import com.lootopia.server.service.TwoFactorAuthenticationService;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/2fa")
public class TwoFactorAuthenticationController {

  private final TwoFactorAuthenticationService twoFactorAuthenticationService;

  public TwoFactorAuthenticationController(
      TwoFactorAuthenticationService twoFactorAuthenticationService) {
    this.twoFactorAuthenticationService = twoFactorAuthenticationService;
  }

  @PostMapping("/send-code")
  public ResponseEntity<String> sendVerifyCode(@RequestBody Map<String, String> request) {
    return twoFactorAuthenticationService.handleSendCode(request);
  }

    @PostMapping("/verify-code")
    public ResponseEntity<Map<String, Object>> verifyCode(
            @RequestBody Map<String, String> request,
            HttpServletResponse response
    ) {
        return twoFactorAuthenticationService.handleVerifyCode(request, response);
    }
}
