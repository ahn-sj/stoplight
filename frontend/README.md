# StopLight Frontend

영어 말하기 연습을 위한 신호등 피드백 시스템의 프론트엔드 애플리케이션입니다.

## 🚀 기술 스택

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Theme**: next-themes (라이트 모드 고정)
- **Code Quality**: ESLint + Prettier (Toss Frontend Standards)
- **Type Safety**: TypeScript (strict mode)

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── ui/
│   ├── TrafficLight.tsx
│   ├── FeedbackModal.tsx
│   └── theme-provider.tsx
├── pages/
│   ├── LoginPage.tsx
│   ├── CategoryPage.tsx
│   └── PracticePage.tsx
├── store/
│   └── useAppStore.ts
├── types/
│   └── index.ts
├── lib/
│   └── utils.ts
└── assets/
```

## 🛠️ 개발 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# 코드 품질 검사
npm run lint

# 코드 품질 검사 및 자동 수정
npm run lint:fix

# 코드 포맷팅
npm run format

# 코드 포맷팅 검사
npm run format:check

# TypeScript 타입 검사
npm run type-check
```

## 📋 코딩 규칙 (Toss Frontend Standards)

### 네이밍 컨벤션
- **Interface**: `I` 접두사 (예: `IUser`, `ICategory`, `IAppStore`)
- **Type Alias**: `T` 접두사 (예: `TFeedbackResult`)
- **Enum**: `E` 접두사 (예: `EStatus`)
- **변수/함수**: camelCase
- **컴포넌트**: PascalCase
- **상수**: UPPER_CASE

### TypeScript 규칙
- 엄격한 타입 검사 활성화
- `any` 타입 사용 금지
- 명시적 타입 import 사용 (`type FC`, `type ReactNode`)
- Optional chaining 및 nullish coalescing 활용
- 모든 Promise는 적절히 처리 (await, catch, void)
- setTimeout 등 비동기 함수 타입 명시

### React 규칙
- 함수형 컴포넌트 사용
- `memo`를 활용한 성능 최적화
- `useCallback`, `useMemo` 적절한 사용
- 접근성(a11y) 속성 추가
- 의미있는 HTML 시맨틱 태그 사용
- `displayName` 설정 (개발 도구 지원)

### 코드 품질
- ESLint 규칙 준수 (0 errors, 0 warnings)
- Prettier 포맷팅 적용
- 일관된 import 순서
- 객체 단축 속성 사용
- 화살표 함수 선호
- 상수 데이터 컴포넌트 외부 분리

## 🎨 UI 컴포넌트

shadcn/ui 기반의 일관된 디자인 시스템을 사용합니다:

- **Button**: 다양한 variant (traffic-light 테마 포함)
- **Card**: 콘텐츠 컨테이너 (안전한 배경색 적용)
- **Dialog/Modal**: 모달 인터페이스
- **Input/Label**: 폼 요소
- **Toast**: 알림 시스템
- **Theme Provider**: 라이트 모드 고정

### 커스텀 스타일링
- **그라디언트 텍스트**: `.gradient-text-safe` 클래스로 모바일 호환성 보장
- **카드 배경**: `.card-safe-bg` 클래스로 강제 색상 적용
- **버튼 스타일**: `.btn-outline-safe`, `.btn-primary-safe` 클래스로 모바일 호환성

## 📱 모바일 최적화

### 반응형 디자인
- **카테고리 페이지**: 모바일에서 2열 그리드로 표시
- **연습 페이지**: 스크롤 없이 한 화면에 모든 콘텐츠 표시
- **신호등**: 모바일에서 크기 자동 조정 (`w-12 h-12` → `sm:w-16 sm:h-16`)
- **간격 최적화**: 모바일에서 패딩과 마진 최소화

### 색상 호환성
- 모든 텍스트 요소에 명시적 색상 지정
- CSS 변수 의존성 제거로 다양한 모바일 브라우저 지원
- 다크 모드 자동 전환 방지 (라이트 모드 고정)

## 🚦 신호등 피드백 시스템

- **빨간불**: 개선 필요 (다시 시도) - `bg-red-500`
- **노란불**: 보통 수준 (조금 더 연습) - `bg-yellow-500`
- **초록불**: 우수함 (완벽한 발음) - `bg-green-500`

각 신호등은 모바일에서도 명확한 색상과 애니메이션을 제공합니다.

## ♿ 접근성 (A11y)

### 구현된 접근성 기능
- **키보드 네비게이션**: 모든 인터랙티브 요소 지원
- **스크린 리더**: `aria-label`, `aria-hidden`, `role` 속성 적용
- **의미있는 HTML**: `header`, `main`, `section` 등 시맨틱 태그 사용
- **포커스 관리**: `tabIndex` 적절히 설정
- **상태 알림**: `aria-live`, `role="status"` 사용

## 📝 개발 가이드라인

### 새 컴포넌트 추가 시
1. TypeScript 인터페이스 정의 (`types/index.ts`)
2. 컴포넌트 구현 (적절한 타입 사용)
3. 접근성 속성 추가 (`aria-*`, `role` 등)
4. 성능 최적화 고려 (`memo`, `useCallback` 등)
5. 모바일 반응형 디자인 적용
6. ESLint 규칙 준수 확인

### 상태 관리
- Zustand를 사용한 전역 상태 관리
- 타입 안전한 스토어 정의 (`IAppStore`)
- 액션과 상태 분리
- Mock 데이터 함수 분리

### 스타일링
- Tailwind CSS 유틸리티 클래스 사용
- shadcn/ui 컴포넌트 활용
- 반응형 디자인 고려 (`sm:`, `md:` 등)
- 명시적 색상 지정으로 모바일 호환성 보장
- 안전한 CSS 클래스 사용 (`.card-safe-bg`, `.gradient-text-safe`)

## 🚀 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과는 dist/ 폴더에 생성됩니다
# 빌드 크기: CSS 42KB, JS 301KB (gzipped: 7.7KB, 96.6KB)
```

### 배포 최적화
- Vite의 코드 분할 및 번들 최적화
- Tailwind CSS의 사용하지 않는 스타일 제거
- 이미지 및 에셋 최적화

## 🔍 품질 보증

### 코드 품질 지표
- ✅ ESLint: 0 errors, 0 warnings
- ✅ TypeScript: 엄격한 타입 검사 통과
- ✅ Prettier: 일관된 코드 포맷팅
- ✅ 빌드: 성공적인 프로덕션 빌드

### 브라우저 호환성
- ✅ 최신 Chrome, Firefox, Safari, Edge
- ✅ 모바일 브라우저 (iOS Safari, Chrome Mobile)
- ✅ 다양한 화면 크기 지원

## 📚 참고 자료

- [React 공식 문서](https://react.dev/)
- [TypeScript 공식 문서](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Toss Frontend Standards](https://toss.tech/article/frontend-standards)
