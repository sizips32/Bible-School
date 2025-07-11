# Bible School

어린이와 청소년을 위한 성경 교육 플랫폼입니다. 슬라이드, 비디오, 퀴즈 등 다양한 멀티미디어 자료로 흥미로운 성경 학습을 지원합니다.

---

## 주요 기능

- 성경 인물 정보 제공 (연대, 설명, 성경구절 등)
- 슬라이드(PPT/Google Slides) 업로드 및 뷰어
- 비디오(업로드/YouTube) 플레이어
- 퀴즈 게임
- 자료실(리소스) 페이지
- 다크모드 지원
- 반응형 UI

---

## 설치 및 실행 방법

1. **의존성 설치**
  
  ```bash
  pnpm install
  # 또는
  npm install
  ```

2. **개발 서버 실행**
  
  ```bash
  pnpm dev
  # 또는
  npm run dev
  ```

3. **접속**
  
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
└── ...
```

---

## 기술 스택

- React, Vite, JavaScript
- CSS, Tailwind(추정)
- lucide-react (아이콘)

---

## 기여 방법

1. 이슈/기능 제안은 Issue 탭에 등록
2. Fork & PR 환영
3. 커밋 메시지는 명확하게 작성

---

## 라이선스

MIT 
