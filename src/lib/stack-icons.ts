import type { IconType } from "react-icons";
import {
  SiAstro,
  SiDjango,
  SiDocker,
  SiElectron,
  SiFastapi,
  SiFigma,
  SiGit,
  SiGithubactions,
  SiJira,
  SiMysql,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSpring,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVuedotjs,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

export interface StackIconDef {
  icon: IconType;
  label: string;
  color?: string;
}

/**
 * 기술 스택 문자열 → react-icons 컴포넌트 매핑.
 * key 는 정규화(소문자, 공백/구분자 제거) 후 비교한다.
 */
const ICONS: StackIconDef[] = [
  { icon: SiElectron, label: "Electron", color: "#47848F" },
  { icon: SiReact, label: "React", color: "#61DAFB" },
  { icon: SiVuedotjs, label: "Vue.js", color: "#4FC08D" },
  { icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { icon: SiPython, label: "Python", color: "#3776AB" },
  { icon: SiSpring, label: "Spring", color: "#6DB33F" },
  { icon: SiSpringboot, label: "Spring Boot", color: "#6DB33F" },
  { icon: SiFastapi, label: "FastAPI", color: "#009688" },
  { icon: SiDjango, label: "Django", color: "#092E20" },
  { icon: SiPostgresql, label: "PostgreSQL", color: "#4169E1" },
  { icon: SiAstro, label: "Astro", color: "#BC52EE" },
  { icon: SiVite, label: "Vite", color: "#646CFF" },
  { icon: SiTailwindcss, label: "Tailwind CSS", color: "#06B6D4" },
  { icon: SiNodedotjs, label: "Node.js", color: "#5FA04E" },
  { icon: SiMysql, label: "MySQL", color: "#4479A1" },
  { icon: SiRedis, label: "Redis", color: "#FF4438" },
  { icon: SiDocker, label: "Docker", color: "#2496ED" },
  { icon: SiGithubactions, label: "GitHub Actions", color: "#2088FF" },
  { icon: SiGit, label: "Git", color: "#F05032" },
  { icon: SiFigma, label: "Figma", color: "#F24E1E" },
  { icon: SiJira, label: "Jira", color: "#0052CC" },
  { icon: FaJava, label: "Java", color: "#E76F00" },
];

function normalize(s: string) {
  return s.toLowerCase().replace(/[\s\-_./]+/g, "");
}

const lookup = new Map<string, StackIconDef>(
  ICONS.map((i) => [normalize(i.label), i])
);

export function getStackIcon(name: string): StackIconDef | null {
  return lookup.get(normalize(name)) ?? null;
}
