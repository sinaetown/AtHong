package com.ecommerce.online_shopping.member.dto;

import com.ecommerce.online_shopping.member.domain.Address;
import com.ecommerce.online_shopping.member.domain.Member;
import lombok.Getter;
import lombok.Builder;

@Getter
@Builder
public class MemberResponseDto {
    private Long id;
    private String name;
    private String email;
    private String city;
    private String street;
    private String zipcode;

    public static MemberResponseDto toMemberResponseDto(Member member) {
        MemberResponseDtoBuilder memberResponseDtoBuilder = MemberResponseDto.builder();
        memberResponseDtoBuilder.id(member.getId());
        memberResponseDtoBuilder.name(member.getName());
        memberResponseDtoBuilder.email(member.getEmail());

        Address address = member.getAddress();
        if (address != null) {
            memberResponseDtoBuilder.city(member.getAddress().getCity());
            memberResponseDtoBuilder.street(member.getAddress().getStreet());
            memberResponseDtoBuilder.zipcode(member.getAddress().getZipcode());
        }
        return memberResponseDtoBuilder.build();
    }
}
