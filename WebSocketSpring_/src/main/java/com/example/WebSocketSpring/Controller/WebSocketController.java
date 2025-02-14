package com.example.WebSocketSpring.Controller;

import com.example.WebSocketSpring.model.ChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate template;

    @MessageMapping("/chat.sendMessage") // Maps messages sent to "app/chat"
    @SendTo("/topic/public")// Broadcasts messages to /topic/public
    public ChatMessage sendMessage(ChatMessage message){
// You can add logic to process the incoming message if needed
        System.out.println("Received message: " + message);
        return message;

    }

    @Scheduled(fixedRate = 5000)
    public void sendMessage(){
        System.out.println("Sending test message...");
        template.convertAndSend("/topic/public", "Hello from Server");
    }


}
