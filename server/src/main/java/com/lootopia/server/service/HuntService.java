package com.lootopia.server.service;

import com.lootopia.server.entity.Hunt;
import com.lootopia.server.mapper.HuntMapper;
import com.lootopia.server.repository.HuntRepository;
import com.lootopia.server.repository.UserRepository;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class HuntService {

  @Autowired private HuntRepository huntRepository;

  @Autowired private UserRepository userRepository;

  @Autowired private HuntMapper huntMapper;

  @Autowired private EmailService emailService;

  public ResponseEntity<Map<String, String>> createHunt(Hunt hunt, String email) {
    var user = userRepository.findByEmail(email);

    if (user.isEmpty()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(Map.of("customMessage", "Utilisateur non trouvé."));
    }

    try {
      var huntOpt = huntRepository.findByName(hunt.getName());

      if (huntOpt.isPresent()) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(Map.of("customMessage", "Nom de chasse déjà utilisé."));
      }
      hunt.setCreatedBy(user.get().getId());
      hunt.setStatus("ACTIVE");

      huntRepository.save(hunt);

      //            emailService.validateHuntCreationEmail(user.get().getEmail(),
      // user.get().getUsername(), hunt);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(Map.of("customMessage", "Erreur lors de l'enregistrement de la chasse."));
    }

    if ("DRAFT".equals(hunt.getStatus())) {
      return ResponseEntity.ok(Map.of("customMessage", "Brouillon enregistré avec succès."));
    }
    return ResponseEntity.ok(
        Map.of(
            "customMessage", "La chasse a été créée avec succès et un email vous a été envoyé."));
  }

  public ResponseEntity<Map<String, Object>> findAll() {
    try {
      var hunts = huntRepository.findAll();
      return ResponseEntity.ok(Map.of("count", hunts.size(), "data", hunts));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(Map.of("customMessage", "Erreur lors de la récupération des chasses."));
    }
  }

  public ResponseEntity<Map<String, Object>> findBySlug(String slug) {
    try {
      var hunts = huntRepository.findBySlug(slug);
      return ResponseEntity.ok(Map.of("data", hunts));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(Map.of("customMessage", "Erreur lors de la récupération de la chasse."));
    }
  }
}
