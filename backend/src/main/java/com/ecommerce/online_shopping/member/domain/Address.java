package com.ecommerce.online_shopping.member.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;

@Embeddable
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Address {
    private String city;
    private String street;
    private String zipcode;
}
