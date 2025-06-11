package com.lootopia.server.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;

@Entity
@Data
public class Hunt {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true, length = 100)
  private String name;

  @Column(nullable = false, unique = true, length = 100)
  private String slug;

  @Column private String description;

  @Column(name = "start_date")
  private LocalDateTime startDate;

  @Column(name = "end_date")
  private LocalDateTime endDate;

  @Column(nullable = false)
  private String status = "ACTIVE";

  @Column(name = "is_private", nullable = false)
  private boolean privateHunt = false;

  @Column(name = "is_draft", nullable = false)
  private boolean draft = false;

  @Column private double latitude;

  @Column private double longitude;

  @Column(name = "created_by", nullable = false, updatable = false)
  private Long createdBy;

  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt = LocalDateTime.now();
}
