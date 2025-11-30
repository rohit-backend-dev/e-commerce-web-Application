package com.e_commerce.dtos.chatbot;

import lombok.Data;
import java.util.List;

@Data
public class ChatResponse {
    private String reply;
    private List<String> quickActions; // Optional
}
