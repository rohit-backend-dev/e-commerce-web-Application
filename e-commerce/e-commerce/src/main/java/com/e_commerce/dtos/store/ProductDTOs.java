package com.e_commerce.dtos.store;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.util.List;

public class ProductDTOs {

    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class CreateProductRequest {
        @NotBlank
        private String title;
        private String description;
        @NotNull @DecimalMin("0.0")
        private BigDecimal price;
        private Integer stock;
        private String sku;
        private boolean published;
        private List<MultipartFile> images;
    }

    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class UpdateProductRequest {
        private String title;
        private String description;
        private BigDecimal price;
        private Integer stock;
        private String sku;
        private Boolean published;
        private List<MultipartFile> images;
    }

    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class ProductResponse {
        private Long id;
        private String title;
        private String description;
        private BigDecimal price;
        private Integer stock;
        private String sku;
        private boolean published;
        private List<String> images;
    }
}