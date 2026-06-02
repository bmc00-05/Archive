# Analytics & 방문자 통계 — 도입 계획

## 현재 상태 (2026-05)

**도입하지 않음.** GitHub Pages는 백엔드 없는 정적 호스팅이므로 자체호스팅 분석 도구를 즉시 적용할 수 없고, 부트캠프 마감 우선순위에서 제외했다.

## 트리거 조건 (언제 도입할 것인가)

다음 중 하나가 만족되는 시점:

1. 별도 백엔드 배포 서버 확보 (예: 자체 VPS / Oracle Cloud Free / Fly.io)
2. 월 방문자가 안정적으로 50명 이상 도달 — 데이터 가치가 도입 비용을 정당화하는 시점
3. 글 발행 빈도가 주 1회 이상 정착되어 콘텐츠 성과 측정이 의미를 갖는 시점

## 후보 옵션 비교

| 옵션 | 비용 | 자체호스팅 | 프라이버시 | 도입 난이도 | 추천도 |
|---|---|---|---|---|---|
| **Plausible (셀프호스팅)** | 서버비만 | ✅ | 쿠키 없음, GDPR 친화 | 중 (Docker + Postgres) | ⭐⭐⭐⭐⭐ |
| **Umami (셀프호스팅)** | 서버비만 | ✅ | 쿠키 없음 | 중 (Postgres 필요) | ⭐⭐⭐⭐ |
| **Plausible Cloud** | $9/월~ | ❌ | 동일 | 하 (스크립트 1줄) | ⭐⭐⭐ |
| **Vercel Analytics** | 무료 (호스팅 시) | ❌ | 양호 | 하 | ⭐⭐⭐ (Vercel 이전 시) |
| **GA4** | 무료 | ❌ | 쿠키, 처리방침 필요 | 하 | ⭐ (개인 블로그엔 과함) |

**1순위**: 자체 백엔드 확보 시 Plausible 셀프호스팅
**2순위**: 호스팅을 Vercel로 옮길 경우 Vercel Analytics

## 통합 시 필요 작업

### 1. 스크립트 삽입
`src/layouts/BaseLayout.astro`의 `<head>`에 추가:

```astro
{import.meta.env.PROD && (
  <script
    defer
    data-domain="bmc00-05.github.io"
    src="https://analytics.example.com/script.js"
  ></script>
)}
```

`import.meta.env.PROD` 가드로 개발 환경 추적 방지.

### 2. partytown 도입 검토
서드파티 스크립트가 메인 스레드를 차지하지 않도록 `@astrojs/partytown` 통합 검토. 단 Plausible은 워낙 가벼워서 partytown까지 필요한지 측정 후 결정.

### 3. 개인정보 처리방침
설치 도구와 무관하게 `/privacy` 페이지 작성 권장. Plausible/Umami는 쿠키가 없어 처리방침 의무가 약하지만 투명성 차원에서 명시.

### 4. 환경변수 분리
```env
PUBLIC_ANALYTICS_DOMAIN=analytics.example.com
PUBLIC_ANALYTICS_SITE_ID=archive
```
하드코딩하지 말 것.

## 측정할 핵심 지표

- 페이지뷰: 어떤 글이 읽히는가
- 유입 출처: GitHub, 검색, 직접
- 머무는 시간: 글 품질 신호 (보조 지표)
- 기기 비율: 모바일 vs 데스크탑 (사이드바 사용성 점검)

추적하지 않을 것:
- 개인 식별 정보
- 사용자별 행동 시퀀스
- 광고 리타게팅용 데이터

## 참고

- [Plausible Self-hosting](https://plausible.io/docs/self-hosting)
- [Umami](https://umami.is/)
- [Astro + Partytown](https://docs.astro.build/en/guides/integrations-guide/partytown/)
