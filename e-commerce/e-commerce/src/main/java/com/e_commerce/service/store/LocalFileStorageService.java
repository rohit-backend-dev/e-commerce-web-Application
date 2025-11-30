package com.e_commerce.service.store;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
public class LocalFileStorageService implements FileStorageService {

    @Value("${app.upload.dir}")
    private String uploadDir;

    @Value("${app.base-url}")
    private String baseUrl;

    @Override
    public String store(String subFolder, MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) return null;

        Path folder = Paths.get(uploadDir, subFolder).toAbsolutePath().normalize();
        Files.createDirectories(folder);

        String ext = "";
        String original = file.getOriginalFilename();
        if (original != null && original.contains(".")) {
            ext = original.substring(original.lastIndexOf('.'));
        }
        String filename = UUID.randomUUID() + ext;
        Path target = folder.resolve(filename);
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        return baseUrl + "/files/" + subFolder + "/" + filename;
    }
}
