# Backlog — 마감 이후 진행할 항목

부트캠프 마감 이후 점진적으로 추가/개선할 항목 목록. 우선순위 높은 순.

## 사용 가능한 MDX 컴포넌트 (현재)

### Figure — 이미지 액자 (6종 frame)
```mdx
<Figure src="./hero.png" caption="메인 화면" frame="default" />
<Figure src="./demo.gif" caption="검색 동작" frame="browser" />
<Figure src="./term.png" caption="배포 로그" frame="terminal" />
<Figure src="./shot.png" caption="회의록" frame="polaroid" />
<Figure src="./mobile.png" frame="phone" />
<Figure src="./diagram.png" frame="bordered" />
```
frame: `default` | `bordered` | `polaroid` | `browser` | `terminal` | `phone`

### 레이아웃 프리미티브
모두 import 없이 MDX 본문에서 직접 사용 가능. 노션의 컬럼/박스 자유도 재현.

```mdx
<Hero eyebrow="결과">
  3초 빌드, 50% 번들 감소
</Hero>

<Cols n={2}>
  <Stack>
    좌측 텍스트와 리스트
    - 항목 1
    - 항목 2
  </Stack>
  <Figure src="./arch.png" frame="bordered" />
</Cols>

<Row gap="md">
  <Stat label="응답 속도" value="120ms" subtext="60% 단축" />
  <Stat label="동시 사용자" value="500+" />
  <Stat label="Lighthouse" value="98" />
</Row>

<Center>
  <p>슬라이드 정중앙에 결론 한 줄</p>
</Center>

<FullBleed>
  <Figure src="./big.png" />   {/* 슬라이드 폭 100% */}
</FullBleed>

<Box>아무 콘텐츠나 카드로 감싸기</Box>
```

| 컴포넌트 | 용도 |
|---|---|
| `<Cols n={2,3,4}>` | N단 그리드 (모바일 1단 자동) |
| `<Row gap>` | 가로 flex (Stat 나열 등) |
| `<Stack gap>` | 세로 flex (간격 일정) |
| `<Hero eyebrow>` | 슬라이드 중앙 임팩트 |
| `<Stat label value subtext>` | KPI 카드 |
| `<Center>` | 슬라이드 정중앙 정렬 |
| `<FullBleed>` | 슬라이드 폭 100% 펼침 |
| `<Box>` | 콘텐츠 카드 박스 |

### DocViewer 모드 (포트폴리오 상세)
우측 상단/하단 토글로 전환:
- **Doc 모드** (기본): 우측 TOC + 세로 스크롤, 클릭 점프, 스크롤스파이
- **Slide 모드**: 가로 슬라이드 (←→ 키보드/버튼), H2 = 슬라이드 타이틀
- 슬라이드 안에서 위 레이아웃 컴포넌트로 자유 배치
- localStorage 영속

## 컨텐츠

- [ ] **첫 블로그 글 작성** — Astro 마이그레이션 회고 또는 SSAFY 프로젝트 기술 정리
- [ ] **프로젝트 상세 본문 채우기** — `src/content/projects/*.mdx`의 플레이스홀더 9-섹션을 실제 내용으로
- [ ] **프로젝트 스크린샷/GIF 추가** — `src/content/projects/<slug>/cover.png` 형태로 colocate
- [ ] **About 페이지 보강** — 경력 타임라인, 수상/활동 이력 추가

## 기능

- [ ] **`reading-time` 통합** (`lib/content.ts`) — 첫 글 작성 직전. 약 5분 작업
- [ ] **블로그 페이지네이션** — 글 10개 이상일 때
- [ ] **태그 페이지** (`/blog/tags/[tag]`) — 태그가 5개 이상 누적되면
- [ ] **Pagefind 검색** — 글 5개 이상. shadcn `Command` + Pagefind UI 결합
- [ ] **MDX 커스텀 컴포넌트** — `Callout`, `Highlight`, `Figure` (`src/components/mdx/`)
- [ ] **TOC (목차)** — 긴 글 작성 시. IntersectionObserver로 스크롤스파이
- [ ] **prev/next 글 네비** — 블로그 글 상세 페이지 하단
- [ ] **RSS 피드** — `src/pages/rss.xml.ts`
- [ ] **404 페이지** — `src/pages/404.astro`
- [ ] **Lightbox** — 이미지 클릭 확대 (shadcn `Dialog`)

## 운영

- [ ] **Analytics 도입** — `docs/analytics-plan.md` 참조. 백엔드 서버 확보 후
- [ ] **동적 OG 이미지** — 글 제목으로 카드 이미지 자동 생성 (`@vercel/og` 또는 satori)
- [ ] **Lighthouse CI** — PR마다 성능 회귀 방지
- [ ] **Prettier 플러그인** — `prettier-plugin-astro` + `prettier-plugin-tailwindcss`
- [ ] **`astro-icon`** — 아이콘 사용처가 많아져 lucide-react의 트리쉐이크가 부족할 때

## 기술 부채

- [x] ~~**Astro 5 → 6 마이그레이션**~~ — 완료 (2026-05-27). Content Layer API + render(entry) + entry.id 전환.
- [ ] **`Github` 아이콘 deprecation** — lucide-react가 권장하는 새 아이콘으로 교체
- [ ] **MobileSidebar 데이터 중복** — `Sidebar.astro`와 `MobileSidebar.tsx`가 같은 데이터를 다른 방식으로 받음. 공통화 검토
- [ ] **ThemeToggle을 light/dark/system 3-way로 복원** — 현재 light↔dark 2-way로 단순화. shadcn `DropdownMenu` 인터랙션 안정화 후 system 옵션 복원
- [ ] **다크모드 토글 FOUC 재검증** — 초기 inline script가 모든 브라우저에서 동작하는지 확인

## 검토 후 결정

- [ ] **Playwright** — 다중 디바이스 mock 스크린샷 필요 시
- [ ] **카테고리(대분류) 분리** — 글이 30개 넘어가면 태그만으로 부족할 수 있음
- [ ] **댓글 시스템** — Giscus (GitHub Discussions 기반) 검토. 부담스러우면 영구 보류

## 디자인 다듬기

- [ ] **포트폴리오 Hero에 accent 색 도입** — 너무 무채색이면 1포인트 추가
- [ ] **사이드바 너비 미세 조정** — 콘텐츠 폭 vs 사이드바 폭 균형
- [ ] **모바일 헤더 햄버거 위치 검토** — UX 테스트 후
