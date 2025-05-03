package com.lootopia.server.controller;

import com.lootopia.server.dto.HuntDto;
import com.lootopia.server.mapper.HuntMapper;
import com.lootopia.server.service.HuntService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/hunts")
public class HuntController {

  @Autowired private HuntService huntService;

  @Autowired private HuntMapper huntMapper;

  @PostMapping("/create")
  public ResponseEntity<Map<String, String>> create(
      @RequestBody HuntDto huntDto, @RequestParam(value = "email") String userEmail) {
    var hunt = huntMapper.toEntity(huntDto);
    return huntService.createHunt(hunt, userEmail);
  }

  @GetMapping
  public ResponseEntity<Map<String, Object>> all() {
    return huntService.findAll();
  }

  @GetMapping("/{slug}")
  public ResponseEntity<Map<String, Object>> getBySlug(@PathVariable String slug) {
    return huntService.findBySlug(slug);
  }

  @PostMapping("/update")
  public ResponseEntity<Map<String, String>> updateHunt(
      @RequestBody HuntDto huntDto, @RequestParam(value = "email") String userEmail) {
    var hunt = huntMapper.toEntity(huntDto);
    return huntService.updateHunt(hunt, userEmail);
  }
}
