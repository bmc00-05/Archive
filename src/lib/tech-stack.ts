import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiPython,
  SiReact,
  SiVuedotjs,
  SiTailwindcss,
  SiPostgresql,
  SiMysql,
  SiFastapi,
  SiDjango,
  SiDocker,
  SiGithubactions,
  SiGit,
  SiJira,
} from "react-icons/si";
import type { SkillLevel } from "@/components/molecules/TechCard";

export interface TechItem {
  icon: IconType;
  name: string;
  level: SkillLevel;
  description?: string;
  color?: string;
}

export interface TechGroup {
  title: string;
  items: TechItem[];
}

/**
 * 숙련도 가이드 (1~5)
 *  5: 주력 — 면접에서 깊이 있게 답할 수 있음
 *  4: 활용 — 여러 프로젝트에서 무리 없이 사용
 *  3: 경험 — 프로젝트 1개에서 사용해봄
 *  2: 학습 — 튜토리얼/문서 학습 단계
 *  1: 인지 — 개념만 익힘
 */
export const techStack: TechGroup[] = [
  {
    title: "Languages",
    items: [
      {
        icon: SiTypescript,
        name: "TypeScript",
        level: 4,
        description: "주력 언어. 제네릭/유틸리티 타입 활용 능숙.",
        color: "#3178C6",
      },
      {
        icon: SiPython,
        name: "Python",
        level: 3,
        description: "스크립트/백엔드/AI 글루 코드 작성 경험.",
        color: "#3776AB",
      },
    ],
  },
  {
    title: "Frontend",
    items: [
      {
        icon: SiReact,
        name: "React",
        level: 4,
        description: "Hook 패턴, 컴포넌트 설계, 성능 최적화 경험.",
        color: "#61DAFB",
      },
      {
        icon: SiVuedotjs,
        name: "Vue.js",
        level: 3,
        description: "Composition API · SFC 기반 컴포넌트 작성.",
        color: "#4FC08D",
      },
      {
        icon: SiTailwindcss,
        name: "Tailwind CSS",
        level: 4,
        description: "유틸리티 기반 스타일링. 디자인 토큰 관리.",
        color: "#06B6D4",
      },
    ],
  },
  {
    title: "Backend",
    items: [
      {
        icon: SiFastapi,
        name: "FastAPI",
        level: 3,
        description: "Python 비동기 REST API · Pydantic 모델 활용.",
        color: "#009688",
      },
      {
        icon: SiDjango,
        name: "Django",
        level: 3,
        description: "ORM · 인증 · 관리 페이지 활용한 빠른 풀스택 구축.",
        color: "#092E20",
      },
      {
        icon: SiPostgresql,
        name: "PostgreSQL",
        level: 3,
        description: "관계형 DB · 인덱스/트랜잭션 활용.",
        color: "#4169E1",
      },
      {
        icon: SiMysql,
        name: "MySQL",
        level: 4,
        description: "스키마 설계 · 쿼리 최적화 · 인덱싱.",
        color: "#4479A1",
      },
    ],
  },
  {
    title: "Infra & Tools",
    items: [
      {
        icon: SiDocker,
        name: "Docker",
        level: 3,
        description: "컨테이너 빌드 · Compose 기반 로컬 환경.",
        color: "#2496ED",
      },
      {
        icon: SiGithubactions,
        name: "GitHub Actions",
        level: 4,
        description: "CI/CD 파이프라인 작성 · 자동 배포.",
        color: "#2088FF",
      },
      {
        icon: SiGit,
        name: "Git",
        level: 4,
        description: "브랜치 전략 · 코드 리뷰 워크플로.",
        color: "#F05032",
      },
      {
        icon: SiJira,
        name: "Jira",
        level: 4,
        description: "스프린트 · 이슈 트래킹 · 팀 협업.",
        color: "#0052CC",
      },
    ],
  },
];
