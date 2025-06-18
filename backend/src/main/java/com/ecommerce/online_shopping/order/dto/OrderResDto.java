package com.ecommerce.online_shopping.order.dto;

import com.ecommerce.online_shopping.order.domain.Ordering;
import com.ecommerce.online_shopping.order_item.OrderItem;
import lombok.Builder;
import lombok.Data;
import org.aspectj.weaver.ast.Or;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class OrderResDto {
    private Long id;
    private String email;
    private String orderStatus;
    private LocalDateTime createdTime;
    private List<OrderResItemDto> orderItems;
    private int totalPrice;

    @Data
    public static class OrderResItemDto {
        private Long id;
        private String itemName;
        private int count;
    }

    public static OrderResDto toDto(Ordering ordering) {
        OrderResDto orderResDto = new OrderResDto();
        orderResDto.setId(ordering.getId());
        orderResDto.setEmail(ordering.getMember().getEmail());
        orderResDto.setOrderStatus(ordering.getOrderStatus().toString());
        orderResDto.setCreatedTime(ordering.getCreatedTime());
        int total = 0;
        List<OrderResItemDto> orderResItemDtos = new ArrayList<>();
        for (OrderItem orderItem : ordering.getOrderItems()) {
            OrderResDto.OrderResItemDto dto = new OrderResItemDto();
            dto.setId(orderItem.getId());
            dto.setItemName(orderItem.getItem().getName());
            dto.setCount(orderItem.getQuantity());
            orderResItemDtos.add(dto);
            total+=orderItem.getItem().getPrice() * orderItem.getQuantity();
        }
        orderResDto.setTotalPrice(total);
        orderResDto.setOrderItems(orderResItemDtos);
        return orderResDto;
    }
}