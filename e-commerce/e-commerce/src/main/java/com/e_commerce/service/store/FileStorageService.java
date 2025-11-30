package com.e_commerce.service.store;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

public interface FileStorageService {
    String store(String subFolder, MultipartFile file) throws IOException;
}
