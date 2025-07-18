# Bible School

어린이와 청소년을 위한 성경 교육 플랫폼입니다. 슬라이드, 비디오, 퀴즈 등 다양한 멀티미디어 자료로 흥미로운 성경 학습을 지원합니다.

---

## 주요 기능

- 성경 인물 정보 제공 (연대, 설명, 성경구절 등)
- 슬라이드(PPT/Google Slides) 업로드 및 뷰어
- 비디오(업로드/YouTube) 플레이어
- 퀴즈 게임 (AI 기반 문제 생성)
- 자료실(리소스) 페이지
- 다크모드 지원
- 반응형 UI
- YouTube 영상 제목 및 썸네일 자동 표시
- 십계명 학습 섹션

---

## 설치 및 실행 방법

1. **의존성 설치**
  
  ```bash
  pnpm install
  # 또는
  npm install
  ```

2. **환경변수 설정 (선택사항)**
  
  YouTube 영상 제목과 썸네일을 자동으로 가져오려면 YouTube Data API v3 키가 필요합니다.
  
  ```bash
  # .env 파일 생성
  cp env.example .env
  ```
  
  `.env` 파일에서 API 키를 설정하세요:
  ```
  VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
  VITE_GEMINI_API_KEY=your_gemini_api_key_here
  ```
  
  **YouTube API 키 발급 방법:**
  1. [Google Cloud Console](https://console.cloud.google.com/) 접속
  2. 새 프로젝트 생성 또는 기존 프로젝트 선택
  3. YouTube Data API v3 활성화
  4. API 키 생성
  5. 생성된 키를 `.env` 파일에 입력

3. **개발 서버 실행**
  
  ```bash
  pnpm dev
  # 또는
  npm run dev
  ```

4. **접속**
  
  브라우저에서 `http://localhost:5173` 접속

---

## 폴더 구조

```
Bible-School/
├── public/                # 정적 파일
├── src/
│   ├── assets/            # 이미지, 로고 등
│   ├── components/        # 주요 기능별 컴포넌트
│   │   └── ui/            # 버튼, 카드 등 UI 컴포넌트
│   ├── hooks/             # 커스텀 훅
│   ├── lib/               # 유틸 함수
│   ├── App.jsx            # 메인 앱 컴포넌트
│   ├── main.jsx           # 엔트리 포인트
│   └── ...
├── App.css, index.css     # 스타일
├── package.json           # 프로젝트 메타/스크립트
├── env.example            # 환경변수 예시
└── ...
```

---

## 기술 스택

- React, Vite, JavaScript
- CSS, Tailwind CSS
- lucide-react (아이콘)
- YouTube Data API v3
- Google Gemini API (퀴즈 생성)

---

## 주요 업데이트

### 최신 기능
- **YouTube 영상 제목 자동 표시**: YouTube URL 입력 시 실제 영상 제목과 썸네일이 자동으로 표시됩니다
- **AI 기반 퀴즈 생성**: Google Gemini API를 활용한 지능형 퀴즈 생성
- **십계명 학습 섹션**: 홈화면에 아름다운 디자인의 십계명 학습 섹션 추가
- **로컬 스토리지 지원**: 업로드한 파일들이 새로고침 후에도 유지됩니다

### 사용법
1. **영상 업로드**: 자료실에서 파일 업로드 또는 YouTube URL 입력
2. **슬라이드 업로드**: PPT 파일 또는 Google Slides URL 입력
3. **퀴즈 생성**: 텍스트 입력 또는 AI 자동 생성
4. **학습**: 홈화면에서 최신 자료 확인 및 학습

---

## 기여 방법

1. 이슈/기능 제안은 Issue 탭에 등록
2. Fork & PR 환영
3. 커밋 메시지는 명확하게 작성

---

## 라이선스

MIT 
