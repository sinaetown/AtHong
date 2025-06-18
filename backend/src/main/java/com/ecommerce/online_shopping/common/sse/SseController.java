package com.ecommerce.online_shopping.common.sse;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/sse")
@RequiredArgsConstructor
public class SseController {

    private final SseEmitters emitters;

    @GetMapping(value = "/connect", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter connect() {
        System.out.println("🔥 SSE 연결됨!");

        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        String id = String.valueOf(System.currentTimeMillis()); // 유니크한 ID
        emitters.add(id, emitter);

        emitter.onCompletion(() -> emitters.remove(id));
        emitter.onTimeout(() -> emitters.remove(id));

        return emitter;
    }

    // 주문 발생 시 호출하는 알림 전송용
    @PostMapping("/send")
    public void send(@RequestBody String message) {
        emitters.sendToAll(message);
    }
}
