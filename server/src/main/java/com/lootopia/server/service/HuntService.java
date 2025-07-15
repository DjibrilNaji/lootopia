package com.lootopia.server.service;

import com.lootopia.server.entity.Hunt;
import com.lootopia.server.mapper.HuntMapper;
import com.lootopia.server.repository.HuntRepository;
import com.lootopia.server.repository.UserRepository;
import java.util.List;
import java.util.Map;
import java.util.Optional;
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

      emailService.validateHuntCreationEmail(user.get().getEmail(), user.get().getUsername(), hunt);
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

  public ResponseEntity<Map<String, Object>> findHunts(String email) {
    try {
      Optional<List<Hunt>> hunts;

      if (email != null && !email.trim().isEmpty()) {
        var userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
          return ResponseEntity.status(HttpStatus.BAD_REQUEST)
              .body(Map.of("customMessage", "Utilisateur non trouvé."));
        }
        hunts = huntRepository.findByCreatedBy(userOpt.get().getId());
      } else {
        hunts = Optional.of(huntRepository.findAll());
      }

      return ResponseEntity.ok(Map.of("data", hunts));
    } catch (Exception e) {
        e.printStackTrace();
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

  public ResponseEntity<Map<String, String>> updateHunt(Hunt updatedHunt, String email) {
    var user = userRepository.findByEmail(email);

    if (user.isEmpty()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(Map.of("customMessage", "Utilisateur non trouvé."));
    }

    var existingHuntOpt = huntRepository.findById(updatedHunt.getId());

    if (existingHuntOpt.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body(Map.of("customMessage", "Chasse non trouvée."));
    }

    try {
      var existingHunt = existingHuntOpt.get();

      existingHunt.setName(updatedHunt.getName());
      existingHunt.setSlug(updatedHunt.getSlug());
      existingHunt.setDescription(updatedHunt.getDescription());
      existingHunt.setStartDate(updatedHunt.getStartDate());
      existingHunt.setEndDate(updatedHunt.getEndDate());
      existingHunt.setLatitude(updatedHunt.getLatitude());
      existingHunt.setLongitude(updatedHunt.getLongitude());
      existingHunt.setPrivateHunt(updatedHunt.isPrivateHunt());
      //      existingHunt.setStatus(updatedHunt.getStatus());

      huntRepository.save(existingHunt);

      return ResponseEntity.ok(Map.of("customMessage", "La chasse a été mise à jour avec succès."));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(Map.of("customMessage", "Erreur lors de la mise à jour de la chasse."));
    }
  }
}
