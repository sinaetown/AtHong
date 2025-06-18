package com.ecommerce.online_shopping.member.domain;

import com.ecommerce.online_shopping.member.dto.MemberCreateReqDto;
import com.ecommerce.online_shopping.order.domain.Ordering;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Embedded
    private Address address;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @OneToMany(mappedBy = "member")
    @Setter
    private List<Ordering> orderings;

    @CreationTimestamp
    private LocalDateTime createdTime;

    @UpdateTimestamp
    private LocalDateTime updatedTime;

    public static Member toEntity(MemberCreateReqDto memberCreateReqDto) {
        Address address = new Address(memberCreateReqDto.getCity(), memberCreateReqDto.getStreet(), memberCreateReqDto.getZipcode());
        MemberBuilder memberBuilder = Member.builder();
        memberBuilder.name(memberCreateReqDto.getName())
                .email(memberCreateReqDto.getEmail())
                .password(memberCreateReqDto.getPassword())
                .address(address)
                .role(Role.USER);
        return memberBuilder.build();
    }
}
