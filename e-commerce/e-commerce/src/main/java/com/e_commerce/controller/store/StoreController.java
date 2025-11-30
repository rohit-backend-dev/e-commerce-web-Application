package com.e_commerce.controller.store;

import com.e_commerce.model.store.Store;
import com.e_commerce.service.store.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/stores")
@RequiredArgsConstructor
public class StoreController {

    private final StoreService storeService;

    // Get all stores for the current user
    @GetMapping("/my")
    public List<Store> getMyStores(@RequestParam Long userId) {
        return storeService.getStoresByOwner(userId);
    }

    // Create a new store
    @PostMapping
    public Store createStore(@RequestParam Long userId,
                             @RequestParam String name,
                             @RequestParam String email,
                             @RequestParam String phone,
                             @RequestParam String address,
                             @RequestParam(required = false) MultipartFile logo) throws IOException {
        return storeService.createStore(userId, name, email, phone, address, logo);
    }

    // Delete a store by id (with user authorization)
    @DeleteMapping("/{id}")
    public void deleteStore(@PathVariable Long id,
                            @RequestParam Long userId) {
        storeService.deleteStore(userId, id);
    }
}
