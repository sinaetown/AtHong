package com.ecommerce.online_shopping.order.dto;

import lombok.Data;

@Data
public class OrderReqDto {
    private Long itemId;
    private int count;
}
