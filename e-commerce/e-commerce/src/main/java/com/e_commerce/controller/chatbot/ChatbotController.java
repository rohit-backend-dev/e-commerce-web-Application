package com.e_commerce.controller.chatbot;

import com.e_commerce.dtos.chatbot.ChatRequest;
import com.e_commerce.dtos.chatbot.ChatResponse;
import com.e_commerce.service.chatbot.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ChatbotController {

    private final ChatbotService chatbotService;

    @Autowired
    public ChatbotController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest request) {
        String message = request.getMessage();
        if (message == null || message.isEmpty()) {
            throw new IllegalArgumentException("Message cannot be empty");
        }
        return chatbotService.getChatResponse(message);
    }
}
