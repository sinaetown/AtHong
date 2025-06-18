package com.ecommerce.online_shopping.common;

import com.ecommerce.online_shopping.member.MemberRepository;
import com.ecommerce.online_shopping.member.domain.Member;
import com.ecommerce.online_shopping.member.domain.Role;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class InitialDataLoader implements CommandLineRunner {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public InitialDataLoader(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (memberRepository.findByEmail("admin@test.com").isEmpty()) {
            Member admin = Member.builder()
                    .name("admin")
                    .email("admin@test.com")
                    .password(passwordEncoder.encode("1234"))
                    .role(Role.ADMIN)
                    .build();
            memberRepository.save(admin);
        }
    }
}