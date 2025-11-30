package com.e_commerce.controller.store;

import com.e_commerce.model.store.Product;
import com.e_commerce.service.store.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping("/store/{storeId}")
    public List<Product> getProducts(@PathVariable Long storeId,
                                     @RequestParam int page,
                                     @RequestParam int size) {
        return productService.listProducts(storeId, page, size).getContent();
    }

    @PostMapping("/store/{storeId}")
    public Product createProduct(@PathVariable Long storeId,
                                 @RequestParam Long userId,
                                 @RequestParam String title,
                                 @RequestParam String description,
                                 @RequestParam Double price,
                                 @RequestParam Integer stock,
                                 @RequestParam String sku,
                                 @RequestParam Boolean published,
                                 @RequestParam(required = false) List<MultipartFile> images) throws IOException {
        return productService.createProduct(userId, storeId, title, description, price, stock, sku, published, images);
    }

    @DeleteMapping("/store/{storeId}/{productId}")
    public void deleteProduct(@PathVariable Long storeId,
                              @PathVariable Long productId,
                              @RequestParam Long userId) {
        productService.deleteProduct(userId, storeId, productId);
    }
}
