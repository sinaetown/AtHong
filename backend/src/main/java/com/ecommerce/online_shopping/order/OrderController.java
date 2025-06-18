package com.ecommerce.online_shopping.order;

import com.ecommerce.online_shopping.common.CommonResponse;
import com.ecommerce.online_shopping.order.domain.Ordering;
import com.ecommerce.online_shopping.order.dto.OrderReqDto;
import com.ecommerce.online_shopping.order.dto.OrderResDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/order/create")
    public ResponseEntity<CommonResponse> orderCreate(@RequestBody List<OrderReqDto> orderReqDtos) {
        Ordering ordering = orderService.create(orderReqDtos);
        return new ResponseEntity<>(new CommonResponse(HttpStatus.CREATED, "주문이 생성되었어요!", ordering.getId()), HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/orders")
    public List<OrderResDto> orders() {
        return orderService.findAll();
    }

    @DeleteMapping("/order/{id}/canceled")
    public ResponseEntity<CommonResponse> orderCancel(@PathVariable Long id) throws AccessDeniedException {
        Ordering ordering = orderService.cancel(id);
        return new ResponseEntity<>(new CommonResponse(HttpStatus.CREATED, "주문이 취소되었어요!", ordering.getId()), HttpStatus.CREATED);
    }
}
