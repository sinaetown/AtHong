package com.ecommerce.online_shopping.member;

import com.ecommerce.online_shopping.member.domain.Member;
import com.ecommerce.online_shopping.member.dto.LoginReqDto;
import com.ecommerce.online_shopping.member.dto.MemberCreateReqDto;
import com.ecommerce.online_shopping.member.dto.MemberResponseDto;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<MemberResponseDto> findAll() {
        List<Member> members = memberRepository.findAll();
        return members.stream().map(m -> MemberResponseDto.toMemberResponseDto(m)).collect(Collectors.toList());
    }

    public Member create(MemberCreateReqDto memberCreateReqDto) {
        if (memberRepository.findByEmail(memberCreateReqDto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("같은 이메일의 회원이 존재해요.");
        }
        memberCreateReqDto.setPassword(passwordEncoder.encode(memberCreateReqDto.getPassword()));
        Member member = Member.toEntity(memberCreateReqDto);
        return memberRepository.save(member);
    }

    public Member login(LoginReqDto loginReqDto) throws IllegalArgumentException {
        Member member = memberRepository.findByEmail(loginReqDto.getEmail()).orElseThrow(() -> new IllegalArgumentException("해당 이메일을 가지고 있는 회원은 존재하지 않아요."));
        if (!passwordEncoder.matches(loginReqDto.getPassword(), member.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않아요.");
        }
        return member;
    }

    public MemberResponseDto findMyInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Member member = memberRepository.findByEmail(authentication.getName()).orElseThrow(() -> new EntityNotFoundException("일치하는 이메일의 회원이 없어요."));
        return MemberResponseDto.toMemberResponseDto(member);
    }
}
