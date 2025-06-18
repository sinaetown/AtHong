package com.ecommerce.online_shopping.item;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String category;
    private int price;
    private int stockQuantity;
    @Setter
    private String imagePath;

    @Builder.Default
    private String delYn = "N";

    @CreationTimestamp
    private LocalDateTime createdTime;

    @UpdateTimestamp
    private LocalDateTime updatedTime;

    public void updateStockQuantity(int newQuantity) {
        this.stockQuantity = newQuantity;
    }

    public void increaseStockQuantity(int newQuantity) {
        this.stockQuantity = newQuantity;
    }

}
