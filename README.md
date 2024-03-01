# 아이사랑

**기획동기**

- 저출산 시대 줄어가는 신생아 수에 의해 빠르게 줄어가는 소아과를 언제 어디서나 바로 찾고 예약할 수 있는 서비스를 제공하자는 취지로 기획 하였습니다.

**서비스 이용대상**

- 자녀를 가진 부모님들
- 자녀가 없더라도 소아과 진료를 원하시는 분들

**서비스 목표**

- 위치 기준, 이름 기준, 언제 어디서든 가까운 소아과를 찾아줍니다.
- 자주 가는 소아과를 즐겨찾기를 할 수 있고, 다른 소아과라도 언제 방문했는지 예약내역을 확인할 수 있습니다.

**향후 기술 목표**

- 스마트폰 앱으로 서비스를 확대할 수 있게 스마트폰을 기준으로 프레임을 작성하였습니다.
- 알림창, 예방접종 등 더 다양한 서비스를 기획하고 있습니다.

**프로젝트 기간**

- 23.05.29 ~ 23.06.16

---

## 전국에 등록된 모든 소아과를 찾아주고 이용할 수 있는 공공 이용 목적 웹 프로젝트

## 1. 서비스 소개

코로나 시대, 그리고 수 많은 전염병들에 걱정이 많은 시대.
우리 자녀가 혹시나 열이 나지는 않는지
두통이나 복통을 호소하지는 않는지

언제 어떻게 아플지 모를 아이를 위해서
전국의 모든 소아과를 여기에 담았습니다.

갑자기 우리 아이가 기침을 하며 고열을 호소할 때
가슴이 철렁 내려앉으실 부모님들께

조금이나마 저희가 빠르게 병원에 다다를 수 있게
해드리고픈 마음 하나로 아이사랑을 제작하였습니다.

## 2. 서비스 기능 요약

**서비스**

- 가까운 위치별, 시군구 기준 키워드별 소아과를 진료하는 병원을 찾을 수 있습니다.
- 예약 및 달력을 이용해 언제 이용했고 예약했는지 내역을 확인할 수 있습니다.

**기능 소개**

- 여러가지 병원 검색 기능
- 예약 및 예약 내역 확인 기능
- 병원 관계자와 연동하여 등록된 병원 기준 병원 정보 최신화 기능

## 3. 서비스 구성

- 사용 기술 스택

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/74a58f5b-8cc0-40f8-a915-65fc68a43e77/Untitled.png)

- 와이어 프레임 : [와이어 프레임](https://www.figma.com/file/7l9vvHRjn6VYUsUlHOvmlC/%EC%95%84%EC%9D%B4%EC%82%AC%EB%9E%91-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8?type=design&node-id=0-1&t=iQRbEkIpYiR0FXWO-0)
- API 명세서 : [API 명세서 SWAGGER](http://34.64.69.226:5000/docs) / ID: qhdtjq0427 / PW: 0427
- DB 모델링 : [관계도 및 스키마 명세서](https://www.notion.so/640f9353a9bf4a9c85f7d0ed1417bb66?pvs=21)

## 4. 프로젝트 구성원 및 역할

| 이름 | 담당 업무 | 이름 | 담당 업무 |
| --- | --- | --- | --- |
| 정민규(팀장) | FE / 병원등록, 관리, 관리자 | 김봉섭(파트장) | BE / 병원, 예약 |
| 김문진 | FE / 병원 상세 페이지·예약 페이지 | 노은탁 | BE / 유저, 리뷰 |
| 박준형 | FE / 마이 페이지, 자녀 페이지 | 이유진 | FE / 예약 관련 페이지 |
| 이준미 | FE / 메인홈, 로그인, 회원가입 | 이채연(1반) | FE / 병원 검색, 지도 페이지 |

**구성원별 활동 내역**

- 정민규 : 팀장/프론트엔드 리더
    - 기획 단계 : 최초 서비스 기획 구상 및 설계 후 프로젝트 초안 작성
    - 개발 단계 : 관리자 페이지, 병원 정보 수정, 신규 병원 등록 페이지 작성
    - 담당 업무 : 관리자, 병원 정보 수정, 신규 병원 등록 페이지, 스크럼 진행 및 전체 일정 관리
- 김봉섭 : 백엔드 리더
    - 기획 단계 : 백엔드 초기 개발 환경 구성, Auth API 및 데코레이터 구현
    - 개발 단계 : Hospital / Reservation / Favorite / image API 구현 및 Prisma, MySQL 환경 구성
    - 담당 업무 : 병원, 병원 검색, 예약, 즐겨찾기 관리와 관련 된 모든 API 동작 구현 및 연동 확인 후 추가 API 최적화 테스트 및 발표 자료 준비
- 김문진 : 프론트엔드 담당
    - 기획 단계 : 인포메이션 아키텍처, 브랜드 디자인, 병원상세페이지·예약페이지·내정보 페이지 와이어 프레임 설계
    - 개발 단계 : 병원상세페이지·예약페이지 작성, 리뷰·예약 정보 post 작성
    - 담당 업무 : 병원상세페이지·예약페이지 담당
- 노은탁 : 백엔드 담당
    - 기획 단계 : 초기 DB 스키마, 및 API 명세서 구상
    - 개발 단계 : User / Admin / Kid / Reviews API 구현
    - 담당 업무 : 유저, 리뷰와 관계된 모든 API 동작 구현 및 연동 확인 후 전체 파트 API별 부하 테스트 및 README.md 작성
- 박준형 : 프론트엔드 담당
    - 기획 단계 : 마이페이지 및 차일드페이지 구상 및 아이정보를 담을 차일드박스 컴포넌트 구상
    - 개발 단계 : 마이페이지, 차일드페이지, 차일드박스 컴포넌트 제작 및 api연동
    - 담당 업무 : 마이페이지, 유저정보와 그 유저의 아이정보 수정 기능 구현
- 이유진 : 프론트엔드 담당
    - 기획 단계 : 예약 현황 페이지 와이어 프레임 기획
    - 개발 단계 : 예약 현황 달력, 예약 상세 확인 페이지, 메모 모달 페이지 작성
    - 담당 업무 : 예약 현황 페이지, 예약 상세 확인 페이지, 공통 컴포넌트 header 담당
- 이준미 : 프론트엔드 담당
    - 기획 단계 : 기획 단계 초기 와이어프레임 제작 및 공유 후 메인화면, 로그인 회원가입 와이어 프레임 제작
    - 개발 단계 : 공통 컴포넌트 제작 로그인, 회원가입 기능 구현 후 반응형 디자인 제작 및 감독
    - 담당 업무 : 메인홈, 로그인, 회원가입 페이지 및 공통 컴포넌트 button, container, navigationBar 담당
- 이채연(1반) : 프론트엔드 담당
    - 기획 단계 : 병원 검색 페이지, 지도 페이지 와이어 프레임 구성 후 지도 관련 외부 API 활용 방안 구상
    - 개발 단계 : 병원 검색, 지도 페이지 컴퍼넌트 구성 후 병원 검색, 지도 매핑 기능 구현
    - 담당 업무 : 병원 검색, 지도 페이지 컴포넌트 및 페이지 담당

## 5. 실행 방법

### 프론트엔드 : 실행 방법

```
0. cd ./front-end
1. npm install
2. npm build
```

### 백엔드 : 실행 방법

```
0. cd ./back-end
1. npm install
2. npm build
```

## 6. 환경변수(env) 설정 파일

### 프론트엔드 : .env 구성

```
none
```

### 백엔드 : .env 구성

```
PORT=5000
JWT_SECRET='sercretkey'
DATABASE_URL='{MySQL DB 경로}'
```

## 7. 버전

- beta (0.9.0)

## 8. 발표 ppt 파일

[발표ppt.pdf](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/58c6fec0-29f6-42bf-89a8-99cfb7579fff/%E1%84%87%E1%85%A1%E1%86%AF%E1%84%91%E1%85%ADppt.pdf)

## 9. 깃허브 주소

https://github.com/ddun-Ttu/childLove_5Team
