package com.e_commerce.repository.store;

import com.e_commerce.model.store.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByStoreId(Long storeId, Pageable pageable);
}
