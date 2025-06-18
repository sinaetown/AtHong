package com.ecommerce.online_shopping.item.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ItemResDto {
    private Long id;
    private String name;
    private String category;
    private int price;
    private int stockQuantity;
}
