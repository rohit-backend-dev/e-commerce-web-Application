package com.e_commerce.service.store;

import com.e_commerce.model.auth.User;
import com.e_commerce.model.store.Store;
import com.e_commerce.repository.auth.UserRepository;
import com.e_commerce.repository.store.StoreRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.transaction.annotation.Transactional;
import java.io.IOException;
import java.util.List;

@Service
public class StoreService {

    private final StoreRepository storeRepository;
    private final FileStorageService fileStorageService;
    private final UserRepository userRepository;

    public StoreService(StoreRepository storeRepository,
                        FileStorageService fileStorageService,
                        UserRepository userRepository) {
        this.storeRepository = storeRepository;
        this.fileStorageService = fileStorageService;
        this.userRepository = userRepository;
    }

    // Create store
    @Transactional
    public Store createStore(Long ownerId, String name, String email, String phone, String address, MultipartFile logo) throws IOException {
        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new IllegalArgumentException("Owner not found"));

        Store store = Store.builder()
                .name(name)
                .email(email)
                .phone(phone)
                .address(address)
                .owner(owner)
                .build();

        if (logo != null && !logo.isEmpty()) {
            String url = fileStorageService.store("stores/" + ownerId, logo);
            store.setLogoUrl(url);
        }

        return storeRepository.save(store);
    }

    // Get all stores for a user
    public List<Store> getStoresByOwner(Long ownerId) {
        return storeRepository.findByOwnerId(ownerId);
    }

    // Delete store
    @Transactional
    public void deleteStore(Long ownerId, Long storeId) {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new IllegalArgumentException("Store not found"));

        if (store.getOwner() == null || !store.getOwner().getId().equals(ownerId)) {
            throw new SecurityException("Not authorized to delete this store");
        }

        storeRepository.delete(store);
    }
}
