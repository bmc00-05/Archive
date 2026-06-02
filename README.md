# Archive

bmc00-05의 개인 블로그 & 포트폴리오. Astro 5 + Tailwind v4 + shadcn/ui 기반 정적 사이트.

**Live**: <https://bmc00-05.github.io/Archive/>
**Portfolio 직링크**: <https://bmc00-05.github.io/Archive/portfolio>

## 구조

블로그와 포트폴리오를 한 사이트의 두 독립 공간으로 운영한다.

- `/` — 블로그 홈 (좌측 사이드바, 포트폴리오 바로가기 포함)
- `/portfolio` — 포트폴리오 랜딩 (Hero / Stack / Projects / About / Contact)
- `/portfolio/[slug]` — 프로젝트 상세
- `/blog/[slug]` — 블로그 글 상세
- `/about` — 이력/스킬 페이지

## 개발

```bash
pnpm install
pnpm dev          # http://localhost:4321
pnpm build        # dist/ 생성
pnpm preview      # 빌드 결과 미리보기
pnpm check        # 타입 + 스키마 검증
```

## 글/프로젝트 작성

```
src/content/blog/<slug>.mdx       # 블로그 글
src/content/projects/<slug>.mdx   # 포트폴리오 항목
```

frontmatter는 `src/content/config.ts`의 zod 스키마로 검증된다.

## 기술 스택

- Astro 6 (static, Islands Architecture, Content Layer API)
- React 18 (인터랙티브 위젯만)
- Tailwind CSS v4 + `@tailwindcss/vite`
- shadcn/ui (new-york)
- MDX + Astro Content Collections
- `astro-expressive-code` (코드 블록)
- Pretendard (한글 본문)
- GitHub Actions → GitHub Pages

## 문서

- [docs/analytics-plan.md](docs/analytics-plan.md) — 방문자 통계 도입 계획
- [docs/backlog.md](docs/backlog.md) — 마감 이후 작업 목록
