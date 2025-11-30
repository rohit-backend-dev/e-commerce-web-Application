package com.e_commerce.dtos.store;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;
import jakarta.validation.constraints.*;

public class StoreDTOs {

    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class CreateStoreRequest {
        @NotBlank
        private String name;

        @Email
        private String email;

        private String phone;
        private String address;
        private MultipartFile logo;
    }

    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class StoreResponse {
        private Long id;
        private String name;
        private String email;
        private String phone;
        private String address;
        private String logoUrl;
        private String status;
    }
}