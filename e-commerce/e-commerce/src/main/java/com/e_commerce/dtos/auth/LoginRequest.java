package com.e_commerce.dtos.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    // OTP will be provided separately (or in same request)
    private String otp;
}
