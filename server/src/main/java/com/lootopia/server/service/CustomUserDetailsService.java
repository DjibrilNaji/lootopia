package com.lootopia.server.service;

import com.lootopia.server.repository.UserRepository;
import com.lootopia.server.security.CustomUserDetails;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

  private final UserRepository userRepository;

  public CustomUserDetailsService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    com.lootopia.server.entity.User user =
        userRepository
            .findByEmail(username)
            .orElseThrow(
                () ->
                    new UsernameNotFoundException(
                        "Utilisateur non trouvé avec l'email : " + username));

    return new CustomUserDetails(user);
  }
}
