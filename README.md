# OZ Coding School Externship Project

### 커뮤니티 플랫폼 – 질의응답(Q&A) 도메인 (Frontend)

본 프로젝트는 **OZ Coding School Externship 과정에서 진행한 통합 커뮤니티 웹 서비스**입니다.  
여러 팀이 하나의 서비스 내에서 각 도메인을 분담하여 개발했으며,  
**본 레포지토리는 그중 ‘질의응답(Q&A)’ 기능을 담당한 프론트엔드 구현 내용**을 담고 있습니다.

🔗 **통합 서비스 URL**  
https://my.ozcodingschool.site/

---

## 🧩 프로젝트 내 역할

- 전체 서비스: 커뮤니티 기반 학습 플랫폼
- 우리 팀 담당 영역:
  - **질의응답(Q&A) 도메인**
  - 질문 목록 / 상세 / 작성
  - 검색 · 필터 · 정렬
  - AI 챗봇 연동 (SSE 기반)

> 다른 도메인(커뮤니티, 인증 등)은 별도 팀에서 구현되었습니다.

---

## 🛠 Tech Stack (Q&A Domain)

### Core

- **React 19**
- **TypeScript**
- **Vite**

### State & Data

- **TanStack Query** – 서버 상태 관리 및 캐싱
- **Zustand** – 전역 상태 관리
- **Axios** – HTTP 통신

### Routing

- **React Router**

### UI / UX

- **TailwindCSS**
- **Lucide React**
- **shadcn/ui 기반 커스텀 컴포넌트**

### Validation & Editor

- **Zod** – 입력 데이터 검증
- **Tiptap** – 질문 작성용 리치 텍스트 에디터

### Realtime / AI

- **SSE (Server-Sent Events)** – AI 챗봇 스트리밍 응답 처리

### Tooling

- **ESLint / Prettier**
- **MSW** – API Mocking (개발 단계)

---

## 📌 담당 기능 상세

### 1. 질문 목록 (Q&A List)

- 질문 목록 조회
- 답변 상태별 탭 필터
  - 전체
  - 답변 완료
  - 답변 대기
- 키워드 검색
- 카테고리 필터 (대/중/소 분류)
- 최신순 / 오래된 순 정렬
- 페이지네이션

### 2. 질문 작성

- Tiptap 기반 리치 텍스트 에디터
- 카테고리 선택 UI
- Zod를 활용한 입력값 검증

### 3. 질문 상세

- 질문 및 답변 정보 표시
- 답변 개수 / 상태 표현

### 4. AI 챗봇 (Q&A 보조 기능)

- 플로팅 버튼 기반 챗봇 UI
- 질문 맥락 기반 챗봇 접근
- **SSE 기반 스트리밍 응답 처리**
- 실시간 메시지 렌더링

---

## 🔄 AI 챗봇 – SSE 적용 이유

- AI 응답은 **단방향 스트리밍**이 적합
- WebSocket 대비:
  - 구현 복잡도 ↓
  - 서버 부하 ↓
  - 실시간 UX 확보

### 처리 흐름

1. 사용자 질문 입력
2. 서버와 SSE 연결
3. 응답을 chunk 단위로 수신
4. 메시지를 실시간으로 누적 렌더링
5. 스트림 종료 후 세션 유지

---

## 🧱 프로젝트 구조 (Q&A 기준)

src/
┣ components/
┃ ┣ questions/
┃ ┣ chatbot/
┃ ┣ filter/
┃ ┗ common/
┣ pages/
┃ ┣ MainPage
┃ ┣ DetailPage
┃ ┗ CreatePage
┣ hooks/
┣ lib/
┣ store/
┣ types/
┣ utils/
┗ mocks/

---

## 🧪 개발 환경 및 API 연동

- 초기 개발 단계:
  - **MSW(Mock Service Worker)**로 API 모킹
- 이후:
  - 실제 백엔드 API(Swagger 제공)와 연동
  - 점진적 전환을 통해 안정적으로 통합

---

## ⚙️ 실행 방법

```bash
npm install
npm run dev

---

👥 협업 방식

도메인별 팀 분리 구조

공통:

UI 컴포넌트 규칙

Git 브랜치 / PR 컨벤션

Q&A 팀 내부:

역할 분담 (목록 / 상세 / 챗봇)

API 스펙 기반 협업

✍️ 회고

단일 페이지 구현이 아닌, 실제 서비스 단위의 도메인 개발 경험

React Query 기반 서버 상태 관리 패턴에 대한 이해도 향상

SSE를 직접 구현하며 실시간 데이터 처리 흐름 학습

협업 환경에서의 코드 구조, 컨벤션, 커뮤니케이션 중요성 체감
```
