package com.ecommerce.online_shopping.common.sse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SseEmitters {

    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    public void add(String id, SseEmitter emitter) {
        emitters.put(id, emitter);
    }

    public void remove(String id) {
        emitters.remove(id);
    }

    public void sendToAll(String message) {
        for (Map.Entry<String, SseEmitter> entry : emitters.entrySet()) {
            try {
                entry.getValue().send(SseEmitter.event().name("message").data(message));
            } catch (IOException e) {
                emitters.remove(entry.getKey());
            }
        }
    }
}
