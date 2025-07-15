package com.lootopia.server.service;

import com.lootopia.server.dto.UserDto;
import com.lootopia.server.entity.User;
import com.lootopia.server.repository.ContactRepository;
import com.lootopia.server.repository.HuntRepository;
import com.lootopia.server.repository.UserRepository;
import jakarta.mail.MessagingException;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired private UserRepository userRepository;

  @Autowired private ContactRepository contactRepository;

  @Autowired private HuntRepository huntRepository;

  @Autowired private EmailService emailService;

  public ResponseEntity<Map<String, String>> update(Long userId, UserDto userDto)
      throws MessagingException {
    Optional<User> optionalUser = userRepository.findById(userId);

    if (optionalUser.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body(Map.of("customMessage", "Utilisateur non trouvé."));
    }

    User user = optionalUser.get();

    user.setUsername(userDto.getUsername());

    if (!user.getEmail().equals(userDto.getEmail())) {
      var emailCode = String.valueOf(new Random().nextInt(999999) + 100000);
      user.setEmail(userDto.getEmail());
      user.setActive(false);
      user.setActivationCode(emailCode);
      emailService.updateEmail(userDto.getEmail(), emailCode);

      userRepository.save(user);

      return ResponseEntity.status(HttpStatus.OK)
          .body(
              Map.of(
                  "customMessage",
                  "Un email de confirmation a été envoyé à la nouvelle adresse. Elle sera mise à jour une fois confirmée."));
    }

    userRepository.save(user);
    return ResponseEntity.status(HttpStatus.OK)
        .body(Map.of("customMessage", "Utilisateur mis à jour avec succès."));
  }

  public ResponseEntity<Map<String, Object>> findByEmail(String email) {
    try {
      var user = userRepository.findByEmail(email);
      return ResponseEntity.ok(Map.of("data", user));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(Map.of("customMessage", "Erreur lors de la récupération de l'utilisateur."));
    }
  }

  public ResponseEntity<Map<String, Object>> findAll() {
    try {
      var users = userRepository.findAll();
      return ResponseEntity.ok(Map.of("data", users));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(Map.of("customMessage", "Erreur lors de la récupération des utilisateurs."));
    }
  }

  public ResponseEntity<Map<String, Object>> getAllDataLength() {
    try {
      var usersLength = userRepository.findAll().size();
      var huntsLength = userRepository.findAll().size();
      var contactsLength = userRepository.findAll().size();
      return ResponseEntity.ok(
          Map.of("users", usersLength, "hunts", huntsLength, "contacts", contactsLength));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(Map.of("customMessage", "Erreur lors de la récupération des utilisateurs."));
    }
  }

  @Transactional
  public ResponseEntity<Map<String, String>> delete(Long userId) {
    try {
      Optional<User> optionalUser = userRepository.findById(userId);
      if (optionalUser.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(Map.of("customMessage", "Utilisateur non trouvé."));
      }

      User user = optionalUser.get();
      contactRepository.deleteByUserId(userId);
      huntRepository.deleteByCreatedBy(userId);
      userRepository.delete(user);
      return ResponseEntity.ok(Map.of("customMessage", "Utilisateur supprimé avec succès."));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(Map.of("customMessage", "Erreur lors de la suppression de l'utilisateur."));
    }
  }
}
