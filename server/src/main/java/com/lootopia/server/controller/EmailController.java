package com.lootopia.server.controller;

import com.lootopia.server.service.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class EmailController {

  @Autowired private EmailService emailService;

  @GetMapping("/send-email")
  public String sendEmail(@RequestParam String to) throws MessagingException {
    return "Email sent successfully!";
  }
}
