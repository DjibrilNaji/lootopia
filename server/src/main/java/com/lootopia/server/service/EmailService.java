package com.lootopia.server.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
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

    public void sendMailOtp(String to, String otp) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        try {
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Votre code de vérification OTP");

            String htmlContent = """
                    <div style="max-width: 400px; margin: 20px auto; padding: 20px; border-radius: 8px; text-align: center;">
                     <img src="cid:lootopiaLogo" alt="Lootopia" style="width: 200px; height: auto;" />
                     <h2 style="color: #333;">Votre code de vérification</h2>
                     <p style="color: #666; font-size: 16px;">Bonjour\s""" + to + """
                    <p style="color: #666; font-size: 16px;">
                      Voici votre code de vérification OTP :
                    </p>
                    <div style="font-size: 24px; font-weight: bold; color: #007bff; margin: 20px 0;">
                        """ + otp + """
                    </div>
                    <p style="color: #666; font-size: 16px;">
                      Ce code est valable pendant 5 minutes. Ne le partagez avec personne.
                    </p>
                    <p style="margin-top: 20px; font-size: 12px; color: #888;">© 2025 Lootopia. Tous droits réservés.</p>
                    </div>
                    """;

            helper.setText(htmlContent, true);
            helper.addInline("lootopiaLogo", new ClassPathResource("static/chest.png"));
            mailSender.send(message);
        } catch (MailException | MessagingException e) {
            LoggerFactory.getLogger(EmailService.class).error("Error for sending email: {}", e.getMessage());
            throw e;
        }
    }

    public void registerEmail(String to, String activationCode) throws MessagingException {
        String verificationUrl = "http://localhost:3000/verify?email=" + to + "&activationCode=" + activationCode;

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        try {
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Activate your account");

            String htmlContent = """
                    <div style="max-width: 400px; margin: 20px auto; padding: 20px; border-radius: 8px; text-align: center;">
                     <img src="cid:lootopiaLogo" alt="Lootopia" style="width: 200px; height: auto;" />
                     <h2 style="color: #333;">Bienvenue sur Lootopia !</h2>
                     <p style="color: #666; font-size: 16px;">Bonjour\s""" + to + """
                    <p style="color: #666; font-size: 16px;">
                      Merci de vous être inscrit. Pour activer votre compte, veuillez
                      confirmer votre adresse e-mail en cliquant sur le bouton ci-dessous :
                    </p>
                    <a href=""" + verificationUrl + """
                         target="_blank" style="display: inline-block; padding: 12px 24px; margin: 20px 0; font-size: 16px; color: #FFFFFF; background-color: #007bff; text-decoration: none; border-radius: 5px;">
                             Vérifier mon adresse
                     </a>
                     <p style="color: #666; font-size: 16px;">Si vous n'avez pas demandé cet e-mail, ignorez-le simplement.</p>
                     <p style="margin-top: 20px; font-size: 12px; color: #888;">© 2025 Lootopia. Tous droits réservés.</p>
                    </div>
                    """;

            helper.setText(htmlContent, true);
            helper.addInline("lootopiaLogo", new ClassPathResource("static/chest.png"));
            mailSender.send(message);
        } catch (MailException | MessagingException e) {
            LoggerFactory.getLogger(EmailService.class).error("Error while sending email: {}", e.getMessage());
            throw e;
        }
    }
}