package com.lootopia.server.service;

import com.lootopia.server.entity.Contact;
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
        }
    }

    public void validateContactEmail(String to, Contact contact) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        try {
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Confirmation de réception - Lootopia");

            String htmlContent = """
                    <div style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0">
                              <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                                <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #f0f0f0;">
                                  <h1>Confirmation de réception</h1>
                                </div>
                                <div style="padding: 20px 0;">
                                  <p>Bonjour\s""" + contact.getName() + """
                    ,</p>
                    <p>
                      Nous avons bien reçu votre message. Notre équipe vous répondra dans les plus brefs délais.
                    </p>
                    
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin: 15px 0;">
                      <h3>Détails de votre message :</h3>
                      <p><strong>Sujet :</strong>\s""" + contact.getSubject() + """
                    </p>
                    <p><strong>Message :</strong></p>
                    <p>""" + contact.getMessage() + """
                                  </p>
                                  </div>
                    
                                  <p>Merci de nous avoir contacté !</p>
                                </div>
                                <div style="text-align: center; padding-top: 20px; color: #666; font-size: 12px;">
                                  <p>Cet email est une confirmation automatique, merci de ne pas y répondre.</p>
                                  <p>&copy; 2024 Lootopia. Tous droits réservés.</p>
                                </div>
                              </div>
                            </div>
                    """;

            helper.setText(htmlContent, true);
            mailSender.send(message);
        } catch (MailException | MessagingException e) {
            LoggerFactory.getLogger(EmailService.class).error("Error while sending email: {}", e.getMessage());
        }
    }
}