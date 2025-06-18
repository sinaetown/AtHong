package com.ecommerce.online_shopping.member.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
public class LoginReqDto {
    @NotEmpty(message = "이메일을 입력하세요.")
    @Email(message = "옳지 않은 형식의 이메일이에요.")
    private String email;

    @NotEmpty(message = "비밀번호를 입력하세요.")
    @Size(min = 4, message = "비밀번호는 최소 4글자 이상이어야해요.")
    private String password;
}
