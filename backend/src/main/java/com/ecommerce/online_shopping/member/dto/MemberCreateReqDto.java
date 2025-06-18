package com.ecommerce.online_shopping.member.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
public class MemberCreateReqDto {
    @NotEmpty(message = "이름을 설정하세요.")
    private String name;

    @NotEmpty(message = "이메일을 설정하세요.")
    @Email(message = "옳지 않은 이메일 형식이에요.")
    private String email;

    @NotEmpty(message = "비밀번호를 설정하세요.")
    @Size(min = 4, message = "비밀번호는 최소 4글자 이상이어야헤요.")
    private String password;

    private String city;
    private String street;
    private String zipcode;
}
