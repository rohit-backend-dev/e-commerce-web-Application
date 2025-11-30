package com.e_commerce.service.store;

import com.e_commerce.model.store.Product;
import com.e_commerce.model.store.Store;
import com.e_commerce.repository.store.ProductRepository;
import com.e_commerce.repository.store.StoreRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final StoreRepository storeRepository;
    private final FileStorageService fileStorageService;

    public ProductService(ProductRepository productRepository,
                          StoreRepository storeRepository,
                          FileStorageService fileStorageService) {
        this.productRepository = productRepository;
        this.storeRepository = storeRepository;
        this.fileStorageService = fileStorageService;
    }

    @Transactional
    public Product createProduct(Long userId, Long storeId, String title, String description, Double price,
                                 Integer stock, String sku, Boolean published, List<MultipartFile> images) throws IOException {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new IllegalArgumentException("Store not found"));

        if (!store.getOwner().getId().equals(userId))
            throw new SecurityException("Not authorized");

        Product product = Product.builder()
                .title(title)
                .description(description)
                .price(price)
                .stock(stock)
                .sku(sku)
                .published(published)
                .store(store)
                .build();

        if (images != null) {
            for (MultipartFile img : images) {
                String url = fileStorageService.store("products/" + storeId, img);
                product.getImages().add(url);
            }
        }

        return productRepository.save(product);
    }

    public Page<Product> listProducts(Long storeId, int page, int size) {
        return productRepository.findByStoreId(storeId, PageRequest.of(page, size));
    }

    @Transactional
    public void deleteProduct(Long userId, Long storeId, Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        if (!product.getStore().getOwner().getId().equals(userId))
            throw new SecurityException("Not authorized");

        productRepository.delete(product);
    }
}
