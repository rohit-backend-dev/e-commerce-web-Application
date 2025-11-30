package com.e_commerce.dtos.auth;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponse {
    private String token;

    @Builder.Default
    private String tokenType = "Bearer";

    private String email;
    private String name;
}
