package com.e_commerce.model.store;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "products")
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private Double price;
    private Integer stock;
    private String sku;
    private Boolean published = false;

    @ElementCollection
    private List<String> images = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;
}
