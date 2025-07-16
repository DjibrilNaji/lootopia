package com.lootopia.server.controller;

import com.lootopia.server.dto.ContactDto;
import com.lootopia.server.service.ContactService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

  @Autowired private ContactService contactService;

  @PostMapping
  public ResponseEntity<Map<String, String>> contact(@RequestBody ContactDto contactDto) {
    return contactService.saveContact(contactDto);
  }

  @GetMapping
  public ResponseEntity<Map<String, Object>> all() {
    return contactService.findAll();
  }
}
