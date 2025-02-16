package com.example.WebSocketSpring.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.
                addEndpoint("/ws").
        setAllowedOrigins("http://localhost")
        .addInterceptors(new HttpSessionHandshakeInterceptor())
//                .withSockJS()
        ;// Enables fallback options for browsers that doesn't websockets

    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic"); // Message broker for  sending ,messages
        registry.setApplicationDestinationPrefixes("/app"); // Prefix for client requests
    }
}
