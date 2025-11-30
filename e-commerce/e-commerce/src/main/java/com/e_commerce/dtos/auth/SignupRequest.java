package com.e_commerce.dtos.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignupRequest {
    @NotBlank private String firstName;
    @NotBlank private String lastName;
    @NotBlank private String username;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 10, max = 15)
    private String mobileNumber;

    @NotBlank
    @Size(min = 6, max = 100)
    private String password;
}
