package com.lootopia.server.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class HuntDto {
  private Long id;
  private String name;
  private String slug;
  private String description;
  private LocalDateTime startDate;
  private LocalDateTime endDate;
  private String status;
  private Boolean privateHunt;
  private Boolean draft;
  private double latitude;
  private double longitude;
  private Long createdBy;
}
