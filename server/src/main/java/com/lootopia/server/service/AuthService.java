package com.lootopia.server.service;


import com.lootopia.server.dto.RegisterDto;
import com.lootopia.server.entity.User;
import com.lootopia.server.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Transactional()
    public ResponseEntity<Map<String, String>> registerUser(RegisterDto registerDTO) {
        if (registerDTO.getUsername().length() < 5 || registerDTO.getUsername().length() > 20) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("customMessage", "Nom d'utilisateur invalide."));
        }

        if (registerDTO.getEmail().length() < 5 || registerDTO.getEmail().length() > 50) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("customMessage", "Email invalide."));
        }

        if (registerDTO.getPassword().length() < 10) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("customMessage", "Mot de passe invalide."));
        }

        var userOpt = userRepository.findByEmail(registerDTO.getEmail());

        if (userOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("customMessage", "Email déjà utilisé."));
        }

        userOpt = userRepository.findByUsername(registerDTO.getUsername());

        if (userOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("customMessage", "Nom d'utilisateur déjà utilisé."));
        }

        var activationCode = String.valueOf(new Random().nextInt(999999) + 100000);

        var user = new User();
        user.setUsername(registerDTO.getUsername());
        user.setEmail(registerDTO.getEmail());

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String result = encoder.encode(registerDTO.getPassword());

        user.setPasswordHash(result);
        user.setActivationCode(activationCode);

        try {
            userRepository.save(user);
            emailService.registerEmail(registerDTO.getEmail(), activationCode);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("customMessage", "Erreur lors de l'enregistrement de l'utilisateur."));
        }

        return ResponseEntity.ok(Map.of("customMessage", "Un email de confirmation a été envoyé à votre adresse email."));
    }

    public ResponseEntity<Map<String, String>> verifyAccount(String email, String activationCode) {
        Optional<User> userOptEmail = userRepository.findByEmail(email);

        if (userOptEmail.isPresent() && userOptEmail.get().isActive()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("customMessage", "Ce compte est déjà activé."));
        }

        Optional<User> userOptActivationCode = userRepository.findByActivationCode(activationCode);

        if (userOptActivationCode.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("customMessage", "Code d'activation invalide."));
        }

        if (!userOptActivationCode.get().getEmail().equals(email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("customMessage", "Email invalide."));
        }

        User user = userOptActivationCode.get();

        user.setActive(true);
        user.setActivationCode(null);

        userRepository.save(user);
        
        return ResponseEntity.ok(Map.of("customMessage", "Votre compte a été activé avec succès."));
    }
}
