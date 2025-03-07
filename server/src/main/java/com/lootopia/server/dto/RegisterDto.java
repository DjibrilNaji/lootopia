package com.lootopia.server.dto;

import lombok.Data;

@Data
public class RegisterDto {
    private String email;
    private String username;
    private String password;
}
