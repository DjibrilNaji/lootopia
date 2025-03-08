package com.lootopia.server.dto;

import lombok.Data;

@Data
public class ContactDto {
    private String name;
    private String email;
    private String subject;
    private String message;
}
