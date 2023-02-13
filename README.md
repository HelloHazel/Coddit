![coddit.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b760057a-3c3b-4ffc-8669-e7eda32a1671/coddit.png)

## 관련 링크

Github

[GitHub - HelloHazel/Reddit-Clone](https://github.com/HelloHazel/Reddit-Clone)

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

![메인페이지_1.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bd981df0-200b-4819-9002-6b52bbb536be/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%80_1.gif)

- 최초 접속 시 등록되어있는 모든 포스트를 출력하는 페이지가 보여진다.

![메인페이지_2.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dac445d9-316a-4bd4-8af4-f053a56fcf9a/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%80_2.gif)

- react-pro-sidebar를 활용해 사이드 메뉴를 구현하였으며, 토픽을 클릭 시 해당 토픽의 포스트들만 출력한다.

![메인페이지_3.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b12b1842-a8b0-409c-9220-8a908b7aa223/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%80_3.gif)

- 검색 기능을 통해 사용자가 검색한 키워드에 해당하는 포스트들만 출력한다.

### 포스트 작성 페이지

![포스트 작성_4.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/09bbd738-fe67-4b21-a80b-89ab11492fee/%ED%8F%AC%EC%8A%A4%ED%8A%B8_%EC%9E%91%EC%84%B1_4.gif)

- 로그인한 유저에게만 포스트 작성 폼이 보여진다.

![포스트 작성_5.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2973a1ef-d1d2-48e5-bbb9-816db4dcb19a/%ED%8F%AC%EC%8A%A4%ED%8A%B8_%EC%9E%91%EC%84%B1_5.gif)

- Creat Post 폼 클릭 시 포스트 작성 페이지로 라우팅 된다.
- 포스트 제목과 내용/이미지/링크를 입력할 수 있다.
- 커뮤니티 설정 누락 시 알람창이 발생하며 포스트 등록에 실패한다.

### 포스트 상세 페이지

![포스트 작성_6.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cec94578-de12-429e-ac0b-13c0bb0ce40e/%ED%8F%AC%EC%8A%A4%ED%8A%B8_%EC%9E%91%EC%84%B1_6.gif)

- 메인 페이지에서 포스트를 클릭할 시 포스트 상세 페이지로 넘어가며 본인이 작성한 게시글일 경우 Edit 버튼과 Delete 버튼이 보여진다.
- Edit 버튼을 클릭하면 본인이 작성한 포스트의 제목과 내용을 수정할 수 있으며  Delete 버튼을 클릭 시 해당 포스트는 영구 삭제된다.

![포스트 작성_7.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f1e96a3d-38ab-438e-823f-8289acf724b9/%ED%8F%AC%EC%8A%A4%ED%8A%B8_%EC%9E%91%EC%84%B1_7.gif)

- 댓글 작성과 포스트와 마찬가지로 작성한 유저의 경우 본인이 작성한 댓글을 수정/삭제 할 수 있다.

### 투표 기능

![투표_8.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a80cb108-1aa4-4a8e-aa82-0468d08447c0/%ED%88%AC%ED%91%9C_8.gif)

- 포스트와 댓글에 좋아요 혹은 싫어요를 통해 투표할 수 있다.
- 중복 투표 방지를 위해 한 유저당 하나의 투표만 선택할 수 있다.
- 선택한 반응에 따라 총 투표 수를 +와 -로 볼 수 있다.

### 프로젝트를 통해 배운 것

- JavaScript, React.js, React hooks, Redux Toolkit 등의 기술을 활용하여 개발을 진행하였으며 해당 기술에 대한 이해도를 높일 수 있었습니다.
- react-pro-sidebar, react-cookie 등의 라이브러리를 활용하여 좀 더 간편하고 효율적인 개발을 진행할 수 있었습니다.
- 서버 개발자와 원할한 협업을 통해 Git에 대한 이해와 숙련도가 높아졌습니다.
- Database와 Node.js Express에 대한 기본적인 이해도를 가진 상태에서 백엔드 개발자와 협업을 진행하였습니다.
- Redux Toolkit 라이브러리를 활용하여 동기적, 비동기적 상태 관리를 할 수 있었습니다.
- Tailwind를 사용하며 신속하고 효율적인 UI 디자인을 완성할 수 있었습니다.
