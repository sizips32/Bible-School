# Bible School PRD (Product Requirements Document)

## 1. 서비스 개요

- **목적:**
  - 어린이 및 청소년을 위한 성경 교육 플랫폼 제공
  - 슬라이드, 비디오, 퀴즈 등 다양한 멀티미디어 자료로 흥미로운 성경 학습 지원

- **주요 타겟:**
  - 교회 안식일 학교, 성경학교, 가정/소그룹 성경공부 리더 및 학생

---

## 2. 주요 기능

1. **성경 인물 정보 제공**
   - 주요 인물(아담, 노아, 아브라함 등) 연대, 설명, 관련 성경구절, 난이도 표시

2. **슬라이드 업로드 및 뷰어**
   - PPT 파일 업로드 및 슬라이드 뷰어 제공
   - Google Slides URL 입력 시 임베드 뷰 지원

3. **비디오 플레이어**
   - 비디오 파일 업로드 및 재생
   - YouTube URL 입력 시 임베드 재생 지원

4. **퀴즈 게임**
   - 성경 관련 퀴즈 게임 제공(문제, 정답, 점수 등)

5. **자료실(리소스 페이지)**
   - 다양한 교육 자료(문서, 이미지, 링크 등) 제공

6. **다크모드 지원**
   - 라이트/다크 테마 전환

7. **반응형 UI**
   - 모바일, 태블릿, 데스크탑 환경 지원

---

## 3. 사용자 시나리오

- **교사/리더:**
  - 수업 전 슬라이드/비디오 자료 업로드
  - 수업 중 슬라이드/비디오/퀴즈 활용
  - 자료실에서 추가 자료 탐색 및 다운로드

- **학생:**
  - 슬라이드/비디오 시청
  - 퀴즈 게임 참여
  - 자료실에서 학습 자료 확인

---

## 4. 요구사항

### 4.1 기능 요구사항
- 슬라이드, 비디오, 퀴즈, 자료실 각 기능 정상 동작
- 업로드/URL 입력 시 예외 처리(잘못된 파일/URL 등)
- 다크모드, 반응형 UI 지원

### 4.2 비기능 요구사항
- 빠른 로딩, 직관적 UI/UX
- 코드 일관성, 유지보수성
- 확장성(새로운 자료/기능 추가 용이)

---

## 5. 기술 스택
- **프론트엔드:** React, Vite, JavaScript
- **스타일:** CSS, Tailwind(추정), 아이콘(lucide-react)
- **상태 관리:** React useState, 커스텀 훅
- **기타:** 파일 업로드, 외부 임베드(Youtube, Google Slides)

---

## 6. 향후 개선/확장 방향
- 사용자 인증/권한 관리
- 자료실 카테고리/검색/필터
- 퀴즈 문제/정답 데이터 외부화 및 관리 UI
- 백엔드 연동(자료 저장, 사용자 관리 등) 
