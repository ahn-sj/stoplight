# StopLight 개발 환경 문서

## 1. 프론트엔드 환경

* **프레임워크:** React Native
* **언어:** TypeScript
* **상태 관리:** Zustand

---

## 2. 백엔드 환경

* **언어:** Java
* **프레임워크:** Spring Boot
* **DBMS:** PostgreSQL
* **ORM:** JPA (Hibernate)

---

## 3. 인프라 환경

* **호스팅:** AWS Lightsail (비용 효율 중심 선택)

### 구성 방안

#### 1) 앱 서버 및 API 서버

* React Native 백엔드 및 Spring Boot API 서버를 Lightsail 인스턴스에 배포

#### 2) 데이터베이스 구성

* **옵션 A: Lightsail Managed PostgreSQL**

  * AWS에서 관리하는 DB 인스턴스 사용 (추천)
  * 자동 백업, 보안 설정, 모니터링 제공
  * PostgreSQL 12\~16 버전 지원
  * 인스턴스 간 내부 네트워크로 연결 가능

* **옵션 B: Self‑managed PostgreSQL**

  * 백엔드 앱 서버와 같은 인스턴스에 직접 설치
  * 비용 절감 가능
  * 백업, 보안, 모니터링 등 직접 구성 필요

### 권장 선택

* 운영/상용 환경: Managed PostgreSQL 인스턴스 사용
* 개발/테스트 환경: Self‑managed PostgreSQL 방식 고려

---

## 4. 기타 기술 스택 고려

* **STT (음성 인식):** Google Speech-to-Text 또는 Whisper API 등
* **LLM 분석:** OpenAI API 또는 커스텀 파인튜닝 모델 활용
* **보안:** HTTPS 통신, 사용자 토큰 기반 인증 (JWT 등)
* **배포 자동화:** GitHub Actions 또는 CodePipeline

---

이 문서는 StopLight 앱의 개발 초기 환경을 명확히 정의하여, 개발자 간 일관된 구현과 안정적인 운영 환경 구성을 목표로 합니다.
