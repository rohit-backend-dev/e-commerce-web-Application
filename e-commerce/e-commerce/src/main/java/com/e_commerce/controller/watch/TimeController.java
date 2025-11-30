package com.e_commerce.controller.watch;

import org.springframework.web.bind.annotation.*;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api/time")
@CrossOrigin(origins = {"http://localhost:5173", "https://your-production-domain.com"})
public class TimeController {

    @GetMapping
    public Map<String, String> getCurrentTime() {
        LocalTime now = LocalTime.now();

        Map<String, String> response = new HashMap<>();
        response.put("hours", String.format("%02d", now.getHour()));
        response.put("minutes", String.format("%02d", now.getMinute()));
        response.put("seconds", String.format("%02d", now.getSecond()));

        return response;
    }
}
