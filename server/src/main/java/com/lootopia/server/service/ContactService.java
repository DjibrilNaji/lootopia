package com.lootopia.server.service;

import com.lootopia.server.dto.ContactDto;
import com.lootopia.server.entity.Contact;
import com.lootopia.server.repository.ContactRepository;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

  @Autowired private ContactRepository contactRepository;

  @Autowired private EmailService emailService;

  public ResponseEntity<Map<String, String>> saveContact(ContactDto contactDto) {

    Contact contact = new Contact();
    contact.setName(contactDto.getName());
    contact.setEmail(contactDto.getEmail());
    contact.setSubject(contactDto.getSubject());
    contact.setMessage(contactDto.getMessage());

    try {
      contactRepository.save(contact);
      emailService.validateContactEmail(contact.getEmail(), contact);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(Map.of("customMessage", "Erreur lors de l'enregistrement de l'utilisateur."));
    }

    return ResponseEntity.status(HttpStatus.OK)
        .body(Map.of("customMessage", "Message envoyé avec succès."));
  }
}
