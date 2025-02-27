package com.lootopia.server.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendSimpleMessage(String to, String subject) throws MailException, MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom(fromEmail);
        helper.setTo(to);
        helper.setSubject(subject);

        String htmlContent = "<html><body style='font-family: Arial, sans-serif;'>" +
                "<h1 style='color: #4CAF50;'>Bienvenue !</h1>" +
                "<p style='font-size: 16px;'>Voici un <strong>email stylisé</strong> envoyé avec Spring Mail.</p>" +
                "</body></html>";

        helper.setText(htmlContent, true);
        mailSender.send(message);
    }
}