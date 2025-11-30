package com.e_commerce.repository.store;

import com.e_commerce.model.store.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoreRepository extends JpaRepository<Store, Long> {
    List<Store> findByOwnerId(Long ownerId);
}
