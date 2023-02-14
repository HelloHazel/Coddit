![coddit](https://user-images.githubusercontent.com/94662639/218488892-75a327cf-311a-4979-bab6-05c653968e04.png)


## 프로젝트 소개

---

- 개발기간 : 2022/12/05 ~ 2023/02/10 (약 2달)
- 인원 : 2명(FE 1명, BE 1명)
- 리액트를 이용한 소셜뉴스 커뮤니티 Reddit 웹사이트 클론 프로젝트

## 사용 기술

---

**프론트엔드**

- JavaScript
- React
- Redux-Toolkit
- Tailwind

**백엔드**

- Node.js
- Express
- Postgresql

## 협업 툴

---

- Notion
- Github
- Git
- erdcloud

## 담당 구현 사항

---

- Redux-Toolkit을 활용한 전역 상태 관리
- Tailwind를 활용한 레이아웃 및 스타일링

### 메인 페이지

- 토픽 별 포스트 리스트 데이터 렌더링
- 찾고자 하는 키워드 검색시 해당 키워드를 포함하는 포스트 데이터 렌더링
- react-pro-sidebar를 활용한 사이드 메뉴 구현
- 업로드 시간 순으로 포스트 데이터 정렬
- time-ago-react를 활용한 타임스탬프 기능
- 좋아요, 싫어요 투표 기능(중복 투표 방지)

### 포스트 작성 페이지

- 로그인 유저에게만 포스트 작성 권한 부여
- 글/이미지/링크 분리 작성 기능
- react-dropzone을 활용한 이미지 drag n drop 기능

### 로그인/회원가입 모달

- react-cookie를 활용해 새로고침시 데이터 유실 방지

### 상세 포스트 모달

- CRUD 기능
- 댓글 작성 기능
- 댓글 좋아요, 싫어요 투표 기능(중복 투표 방지)
- 포스트/댓글 작성자에게만 수정/삭제 권한 부여

## 담당 구현 사항

---

### 메인 페이지

![메인페이지_1](https://user-images.githubusercontent.com/94662639/218489049-dac4ceed-35ee-47ea-9adb-942719820533.gif)


- 최초 접속 시 등록되어있는 모든 포스트를 출력하는 페이지가 보여진다.

![메인페이지_2](https://user-images.githubusercontent.com/94662639/218489068-50c8e6ab-5fc8-4290-b70a-364ca33bccfa.gif)


- react-pro-sidebar를 활용해 사이드 메뉴를 구현하였으며, 토픽을 클릭 시 해당 토픽의 포스트들만 출력한다.

![메인페이지_3](https://user-images.githubusercontent.com/94662639/218489081-c97e0b39-fa67-4d6f-9bbd-7e38c12695c8.gif)


- 검색 기능을 통해 사용자가 검색한 키워드에 해당하는 포스트들만 출력한다.

### 포스트 작성 페이지

![포스트 작성_4](https://user-images.githubusercontent.com/94662639/218489245-a571c1bc-1115-41fb-993d-6eaecb0a5160.gif)


- 로그인한 유저에게만 포스트 작성 폼이 보여진다.

![포스트 작성_5](https://user-images.githubusercontent.com/94662639/218489255-27545295-8430-4789-af72-4ea509f84f70.gif)


- Creat Post 폼 클릭 시 포스트 작성 페이지로 라우팅 된다.
- 포스트 제목과 내용/이미지/링크를 입력할 수 있다.
- 커뮤니티 설정 누락 시 알람창이 발생하며 포스트 등록에 실패한다.

### 포스트 상세 페이지

![포스트 작성_6](https://user-images.githubusercontent.com/94662639/218489269-cf10d58f-0498-48f0-a797-4eeffcbd0ce5.gif)


- 메인 페이지에서 포스트를 클릭할 시 포스트 상세 페이지로 넘어가며 본인이 작성한 게시글일 경우 Edit 버튼과 Delete 버튼이 보여진다.
- Edit 버튼을 클릭하면 본인이 작성한 포스트의 제목과 내용을 수정할 수 있으며  Delete 버튼을 클릭 시 해당 포스트는 영구 삭제된다.

![포스트 작성_7](https://user-images.githubusercontent.com/94662639/218489286-9bce6316-081e-4b74-bbf0-97e102754014.gif)

- 댓글 작성과 포스트와 마찬가지로 작성한 유저의 경우 본인이 작성한 댓글을 수정/삭제 할 수 있다.

### 투표 기능

![투표_8](https://user-images.githubusercontent.com/94662639/218489300-719ff7c8-933d-451f-85db-50af9fb1ecfb.gif)

- 포스트와 댓글에 좋아요 혹은 싫어요를 통해 투표할 수 있다.
- 중복 투표 방지를 위해 한 유저당 하나의 투표만 선택할 수 있다.
- 선택한 반응에 따라 총 투표 수를 +와 -로 볼 수 있다.






