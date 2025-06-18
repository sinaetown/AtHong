package com.ecommerce.online_shopping.member;

import com.ecommerce.online_shopping.common.CommonResponse;
import com.ecommerce.online_shopping.member.domain.Member;
import com.ecommerce.online_shopping.member.dto.LoginReqDto;
import com.ecommerce.online_shopping.member.dto.MemberCreateReqDto;
import com.ecommerce.online_shopping.member.dto.MemberResponseDto;
import com.ecommerce.online_shopping.order.OrderService;
import com.ecommerce.online_shopping.order.dto.OrderResDto;
import com.ecommerce.online_shopping.securities.JwtTokenProvider;
import com.ecommerce.online_shopping.securities.RefreshTokenService;
import io.jsonwebtoken.Claims;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.validation.Valid;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class MemberController {
    private final MemberService memberService;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenService refreshTokenService;
    private final OrderService orderService;

    public MemberController(MemberService memberService, JwtTokenProvider jwtTokenProvider,
                            OrderService orderService, RefreshTokenService refreshTokenService) {
        this.memberService = memberService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.refreshTokenService = refreshTokenService;
        this.orderService = orderService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/members")
    public List<MemberResponseDto> members() {
        return memberService.findAll();
    }

    @PostMapping("/member/create")
    public ResponseEntity<CommonResponse> memberCreate(@Valid @RequestBody MemberCreateReqDto memberCreateReqDto) {
        Member member = memberService.create(memberCreateReqDto);
        return new ResponseEntity<>(new CommonResponse(HttpStatus.CREATED, "회원가입 완료!", member), HttpStatus.CREATED);
    }

    @PostMapping("/doLogin")
    public ResponseEntity<CommonResponse> login(@Valid @RequestBody LoginReqDto loginReqDto) {
        Member member = memberService.login(loginReqDto);
        String accessToken = jwtTokenProvider.createAccessToken(member.getEmail(), member.getRole().toString());
        String refreshToken = jwtTokenProvider.createRefreshToken(member.getEmail());
        refreshTokenService.saveRefreshToken(member.getEmail(), refreshToken);
        Map<String, Object> member_info = new HashMap<>();
        member_info.put("id", member.getId());
        member_info.put("role", member.getRole().toString());
        member_info.put("token", accessToken);
        member_info.put("refreshToken", refreshToken);
        return new ResponseEntity<>(new CommonResponse(HttpStatus.OK, "로그인에 성공했어요!", member_info), HttpStatus.OK);
    }

    @PostMapping("/doLogout")
    public ResponseEntity<?> logout(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");

        Claims claims = jwtTokenProvider.getClaims(refreshToken);
        String email = claims.getSubject();
        refreshTokenService.deleteRefreshToken(email);

        return ResponseEntity.ok("✅ 로그아웃 완료!");
    }


    @GetMapping("/member/myInfo")
    public MemberResponseDto findMyInfo() {
        return memberService.findMyInfo();
    }

    @GetMapping("/member/myOrders")
    public List<OrderResDto> findMyOrders() {
        return orderService.findMyOrders();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/member/{id}/orders")
    public ResponseEntity<CommonResponse> orderByMember(@PathVariable Long id) {
        List<OrderResDto> orderResDtos = orderService.findByMember(id);
        return new ResponseEntity<>(new CommonResponse(HttpStatus.OK, "해당 회원의 주문목록을 불러오는 데 성공했어요!", orderResDtos), HttpStatus.OK);
    }
}
