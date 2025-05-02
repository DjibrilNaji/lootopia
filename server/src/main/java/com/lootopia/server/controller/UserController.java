package com.lootopia.server.controller;

import com.lootopia.server.dto.UserDto;
import com.lootopia.server.service.UserService;
import jakarta.mail.MessagingException;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

  @Autowired private UserService userService;

  @PutMapping("/{id}")
  public ResponseEntity<Map<String, String>> update(
      @PathVariable Long id, @RequestBody UserDto userDto) throws MessagingException {
    return userService.update(id, userDto);
  }

  @GetMapping("/{email}")
  public ResponseEntity<Map<String, Object>> getOne(@PathVariable String email)
      throws MessagingException {
    return userService.findByEmail(email);
  }
}
