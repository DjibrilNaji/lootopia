package com.lootopia.server.service;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class TwoFactorAuthenticationService {

    @Autowired
    private EmailService emailService;

    private final Map<String, String> otpCache = new HashMap<>();

    public String generateVerificationCode() {
        String code = String.format("%06d", new Random().nextInt(999999));
        return code;
    }

    public String sendVerificationCode(String email) throws MessagingException {
        String code = generateVerificationCode();

        otpCache.put(email, code);

        emailService.sendMailOtp(email, code);
        return code;
    }

    public boolean verifyCode(String inputCode, String email) {
        String actualCode = otpCache.get(email);

        if (actualCode == null) {

            return false;
        }

        boolean isValid = actualCode.equals(inputCode);
        return isValid;
    }
}
