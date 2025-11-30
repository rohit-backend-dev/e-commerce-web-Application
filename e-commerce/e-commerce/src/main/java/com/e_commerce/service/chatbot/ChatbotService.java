package com.e_commerce.service.chatbot;

import com.e_commerce.dtos.chatbot.ChatResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.*;

@Service
public class ChatbotService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final WebClient webClient = WebClient.builder().build();

    public ChatResponse getChatResponse(String userMessage) {
        ChatResponse chatResponse = new ChatResponse();
        String lowerMsg = userMessage.toLowerCase();

        try {
            // 1. Predefined Smart Intents
            if (lowerMsg.matches(".*\\b(hi|hello|hey)\\b.*")) {
                chatResponse.setReply("Hi there! 👋 Welcome to Forever, your fashion destination. How can I assist you today?");
                chatResponse.setQuickActions(Arrays.asList("Track Order", "Return Item", "Cancel Order", "Offers"));
                return chatResponse;
            }

            if (lowerMsg.contains("track") && lowerMsg.contains("order")) {
                chatResponse.setReply("I'd be happy to help! Please share your Forever order number so I can check its status.");
                chatResponse.setQuickActions(Arrays.asList("Enter Order Number", "View Orders"));
                return chatResponse;
            }

            if (lowerMsg.contains("return") || lowerMsg.contains("refund")) {
                chatResponse.setReply("Returns are easy at Forever! You can initiate a return within 7 days of delivery. Want me to guide you?");
                chatResponse.setQuickActions(Arrays.asList("Start Return", "Return Policy", "No, Thanks"));
                return chatResponse;
            }

            if (lowerMsg.contains("cancel") && lowerMsg.contains("order")) {
                chatResponse.setReply("To cancel an order, I’ll need your order number. Let’s see if it’s still cancellable.");
                chatResponse.setQuickActions(Arrays.asList("Enter Order Number", "View My Orders"));
                return chatResponse;
            }

            if (lowerMsg.contains("how are you")) {
                chatResponse.setReply("I'm doing great and ready to help you shop smarter at Forever! 😊");
                return chatResponse;
            }

            if (lowerMsg.contains("joke")) {
                chatResponse.setReply("Sure! 😄 Why did the customer bring a ladder to Forever? Because they heard the prices were through the roof!");
                return chatResponse;
            }

            if (lowerMsg.contains("thank")) {
                chatResponse.setReply("You're most welcome! If there's anything else you need, I'm right here. 🛍️");
                return chatResponse;
            }

            // 2. Gemini AI fallback for other queries
            String aiReply = callGeminiAPI(userMessage);
            if (aiReply != null && !aiReply.isBlank()) {
                chatResponse.setReply(aiReply);
                chatResponse.setQuickActions(Arrays.asList("Track Order", "Cancel Order", "Return Item", "Talk to Support"));
            } else {
                chatResponse.setReply("I'm here to help, but I didn’t catch that. Could you please rephrase your message?");
                chatResponse.setQuickActions(Arrays.asList("Help", "Track Order", "Return Item"));
            }

        } catch (Exception e) {
            e.printStackTrace();
            chatResponse.setReply("Oops! Something went wrong on my side. Please try again later.");
        }

        return chatResponse;
    }

    private String callGeminiAPI(String userMessage) {
        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", "You are an AI shopping assistant for a stylish e-commerce brand called Forever. Be polite, helpful, and professional. The user asked: " + userMessage)
                        ))
                )
        );

        try {
            Map response = webClient.post()
                    .uri(apiUrl + "?key=" + apiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .onErrorResume(e -> Mono.empty())
                    .block();

            if (response != null) {
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
                if (candidates != null && !candidates.isEmpty()) {
                    Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
                    List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                    if (parts != null && !parts.isEmpty()) {
                        return parts.get(0).get("text").toString();
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}
