# 🛒 At Hong

React & Spring Boot 기반의 1인 개발 **온라인 쇼핑몰 플랫폼**입니다.

_JWT 인증, Redis 토큰 저장, SSE 실시간 알림, AOP 로깅_ 등 **보안성과 실시간성**을 고려한 백엔드 구조로 설계했습니다.

**AWS 인프라**를 활용해 프론트엔드와 백엔드 모두 HTTPS 기반 실서비스 수준의 배포를 구현했습니다.

---

## 🎯 Project Goal

- 인증/인가, 실시간 알림, 트랜잭션 기반 주문 처리, 사용자와 관리자의 권한 분리 기반 서비스 흐름 등  
  **실무형 백엔드 기술 스택을 프로젝트에 직접 적용**해보고자 기획
- **AWS 기반 인프라를 활용한 HTTPS 배포**를 통해 실제 상용 서비스와 유사한 배포 및 운영 구조를 구현하기 위함

## 🎒 User Journey

- **관리자**: 관리자 로그인 → 회원/주문 조회 → 상품 관리 → 실시간 주문 알림 수신
- **일반 사용자**: 회원가입 → 로그인 → 상품 조회 → 장바구니 담기 → 주문  

## ✌️ Demo Screens


### 💁 관리자

<details>
<summary>🛒 상품 등록</summary>

![관리자 상품 등록](https://github.com/sinaetown/AtHong/raw/main/%EB%8D%B0%EB%AA%A8%20%EC%98%81%EC%83%81/%EA%B4%80%EB%A6%AC%EC%9E%90%20%EC%83%81%ED%92%88%20%EB%93%B1%EB%A1%9D.gif)

</details>

<details>
<summary>🧑‍💼 전체 회원 조회</summary>

![전체 회원 조회](https://github.com/sinaetown/AtHong/raw/main/%EB%8D%B0%EB%AA%A8%20%EC%98%81%EC%83%81/%EA%B4%80%EB%A6%AC%EC%9E%90%20%ED%9A%8C%EC%9B%90%20%EC%A1%B0%ED%9A%8C.gif)

</details>

<details>
<summary>📦 전체 회원의 주문 조회</summary>

![전체 회원의 주문 조회](https://github.com/sinaetown/AtHong/raw/main/%EB%8D%B0%EB%AA%A8%20%EC%98%81%EC%83%81/%EA%B4%80%EB%A6%AC%EC%9E%90%20%EC%A3%BC%EB%AC%B8%20%EC%A1%B0%ED%9A%8C.gif)

</details>

<details>
<summary>📢 주문 시 관리자 SSE 알림</summary>

![SSE 알람](https://github.com/sinaetown/AtHong/raw/main/%EB%8D%B0%EB%AA%A8%20%EC%98%81%EC%83%81/%EC%83%81%ED%92%88%20%EC%A3%BC%EB%AC%B8%20SSE%20%EC%95%8C%EB%9E%8C.gif)

</details>

### 💁 일반 사용자

<details>
<summary>📝 회원가입</summary>

![회원가입](https://github.com/sinaetown/AtHong/raw/main/%EB%8D%B0%EB%AA%A8%20%EC%98%81%EC%83%81/%EC%9D%BC%EB%B0%98%20%EC%82%AC%EC%9A%A9%EC%9E%90%20%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85.gif)

</details>

<details>
<summary>🔐 로그인</summary>

![로그인](https://github.com/sinaetown/AtHong/raw/main/%EB%8D%B0%EB%AA%A8%20%EC%98%81%EC%83%81/%EC%9D%BC%EB%B0%98%20%EC%82%AC%EC%9A%A9%EC%9E%90%20%EB%A1%9C%EA%B7%B8%EC%9D%B8.gif)

</details>

<details>
<summary>🛒 상품 주문</summary>

![상품 주문](https://github.com/sinaetown/AtHong/raw/main/%EB%8D%B0%EB%AA%A8%20%EC%98%81%EC%83%81/%EC%9D%BC%EB%B0%98%20%EC%82%AC%EC%9A%A9%EC%9E%90%20%EC%83%81%ED%92%88%20%EC%A3%BC%EB%AC%B8.gif)

</details>

<details>
<summary>🔍 상품 검색</summary>

![상품 검색](https://github.com/sinaetown/AtHong/raw/main/%EB%8D%B0%EB%AA%A8%20%EC%98%81%EC%83%81/%EC%9D%BC%EB%B0%98%20%EC%82%AC%EC%9A%A9%EC%9E%90%20%EC%83%81%ED%92%88%20%EA%B2%80%EC%83%89.gif)

</details>

<details>
<summary>📦 내 주문 조회 및 취소</summary>

![내 주문 조회 및 취소](https://github.com/sinaetown/AtHong/raw/main/%EB%8D%B0%EB%AA%A8%20%EC%98%81%EC%83%81/%EC%9D%BC%EB%B0%98%20%EC%82%AC%EC%9A%A9%EC%9E%90%20%EC%A3%BC%EB%AC%B8%20%EC%A1%B0%ED%9A%8C%20%EB%B0%8F%20%EC%B7%A8%EC%86%8C.gif)

</details>


## 🛠 Tech Stack

### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

### Backend
![Java 11](https://img.shields.io/badge/java%2011-%2300665E.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Java Spring](https://img.shields.io/badge/Java%20Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white)
![Gradle](https://img.shields.io/badge/Gradle-02303A.svg?style=for-the-badge&logo=Gradle&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![JSON Web Tokens](https://img.shields.io/badge/JSON%20Web%20Tokens-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### Deploy
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![S3](https://img.shields.io/badge/Amazon%20S3-CC6699?style=for-the-badge&logo=amazons3&logoColor=white)
![CloudFront](https://img.shields.io/badge/Amazon%20CloudFront-CC6699?style=for-the-badge&logo=amazons3&logoColor=white)
![EC2](https://img.shields.io/badge/Amazon%20EC2-663399?style=for-the-badge&logo=amazons3&logoColor=white)
![ALB](https://img.shields.io/badge/Amazon%20ALB-663399?style=for-the-badge&logo=amazons3&logoColor=white)
![Route53](https://img.shields.io/badge/Amazon%20Route%2053-663399?style=for-the-badge&logo=amazons3&logoColor=white)
![RDS](https://img.shields.io/badge/Amazon%20RDS-4479A1?style=for-the-badge&logo=amazons3&logoColor=white)
![Elasticache](https://img.shields.io/badge/Amazon%20Elasticache-4479A1?style=for-the-badge&logo=amazons3&logoColor=white)
---

## 🚀 Features

### Frontend

<details> <summary> UI 구성 및 권한 기반 렌더링</summary>
  
- 권한에 따른 헤더 동적 표시
- 관리자 메뉴: 상품 / 회원 / 주문 조회
- 고객 메뉴: 상품 / 장바구니 조회, 마이페이지
  
</details>

<details> <summary> 장바구니 기능 </summary>
  
- `useState` 기반 클라이언트 상태로 장바구니 관리
- 헤더에 `Badge`로 총 수량 표시 → 상태 변경 시 자동 반영  
  
</details>

### Backend

<details> <summary> JWT + Redis 기반 보안 로그인 시스템</summary>
  
  - **Access Token & Refresh Token** 분리 저장
  - Redis에 Refresh Token 저장 -> 만료 시간 기반으로 자동 삭제
  - Spring Security + JWT 필터 체인으로 인증 처리  
  
</details>

<details> <summary> 관리자 & 일반 사용자 권한 분리</summary>

  - `@PreAuthorize`를 활용해 컨트롤러 메서드 단위로 접근 제어 
  - **관리자**: 상품 등록/수정/삭제, 회원 조회, 전체 주문 관리
  - **일반 사용자**: 상품 조회, 장바구니, 주문 생성
  
</details>

<details> <summary> 실시간 SSE 알림 기능 </summary>
  
  - 주문 발생 시, 관리자에게 **즉시 알림 전송**
  - `SseEmitter`를 활용한 **Server-Sent Events (SSE)** 구현
  - JWT 인증 기반으로 **오직 관리자만 구독 가능**   
  - SSE 기반 구현으로 지속 연결 유지
  
</details>

<details> <summary> AOP 로깅 시스템 적용 </summary>
  
  - `@Aspect` 기반 공통 로직 분리
  - `@Around` 활용하여 메서드 실행 전/후 감지
  - 예외 발생 시 에러 로그 출력으로 **디버깅 용이**  
  
</details>

<details> <summary>복합 조건 검색 & 성능 최적화</summary>

  - Spring Data JPA의 `Specification`과 `Pageable`을 활용해  **동적 조건 검색 + 페이징 처리** 구현  
  - 상품명과 카테고리에 따라 유연하게 필터링되는 검색 기능 구현

</details>

## 🏛️ Design Architecture

- 프론트는 S3 + CloudFront + Route 53으로 HTTPS 정적 배포
- 백엔드는 EC2 + ALB + ACM으로 HTTPS 보안 API 서버 운영
- 도메인은 at-hong.shop(프론트), server.at-hong.shop(백엔드)로 분리
- ElastiCache(Redis)와 RDS(MariaDB)로 성능과 가용성 강화
