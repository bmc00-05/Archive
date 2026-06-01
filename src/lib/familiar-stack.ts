import type { IconType } from "react-icons";
import {
  // Frontend
  SiNextdotjs,
  SiAstro,
  SiVite,
  SiRedux,
  SiFramer,
  SiRadixui,
  SiSass,
  SiStorybook,
  SiJest,
  SiCypress,
  SiElectron,
  SiWebpack,
  SiHtml5,
  SiJavascript,
  // Backend
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiSpringboot,
  SiMongodb,
  SiRedis,
  SiGraphql,
  SiPrisma,
  SiSocketdotio,
  SiRabbitmq,
  SiApachekafka,
  // Infra
  SiLinux,
  SiNginx,
  SiKubernetes,
  SiTerraform,
  SiPrometheus,
  SiGrafana,
  SiGitlab,
  SiSentry,
  SiCloudflare,
  // Tools
  SiFigma,
  SiNotion,
  SiSlack,
  SiPostman,
  SiSwagger,
} from "react-icons/si";

/**
 * 아이콘 소스:
 *  - react-icons IconType: 정상 SVG 렌더
 *  - { brand: string }: 로컬 SVG (svgl 등) — BrandIcon 레지스트리 키
 *  - null: 이니셜 모노그램 폴백
 */
export type FamiliarIcon = IconType | { brand: string } | null;

export interface FamiliarItem {
  icon: FamiliarIcon;
  name: string;
  /** react-icons 컬러 또는 모노그램 배경색 */
  color?: string;
  /** 모노그램 폴백 시 표시할 1~2자 (미지정 시 name 첫 글자) */
  monogram?: string;
}

export interface FamiliarGroup {
  title: string;
  items: FamiliarItem[];
}

/**
 * 인지 수준의 기술 스택 — 한 번이라도 사용/관찰했거나 대략적인 용도를 아는 라이브러리·도구.
 * react-icons에 없는 신규 라이브러리(TanStack, Zustand 등)는 Iconify(`logos:*`) 사용.
 */
export const familiarStack: FamiliarGroup[] = [
  {
    title: "Frontend",
    items: [
      { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
      { icon: SiHtml5, name: "HTML5", color: "#E34F26" },
      { icon: SiNextdotjs, name: "Next.js" },
      { icon: SiAstro, name: "Astro", color: "#FF5D01" },
      { icon: SiVite, name: "Vite", color: "#646CFF" },
      { icon: SiWebpack, name: "Webpack", color: "#8DD6F9" },
      { icon: SiElectron, name: "Electron", color: "#47848F" },
      { icon: SiRedux, name: "Redux", color: "#764ABC" },
      { icon: { brand: "tanstack" }, name: "TanStack Query" },
      { icon: null, name: "Zustand", monogram: "Z", color: "#443E38" },
      { icon: SiRadixui, name: "Radix UI" },
      { icon: { brand: "shadcn" }, name: "shadcn/ui" },
      { icon: SiFramer, name: "Framer Motion", color: "#0055FF" },
      { icon: SiSass, name: "Sass", color: "#CC6699" },
      { icon: SiStorybook, name: "Storybook", color: "#FF4785" },
      { icon: SiJest, name: "Jest", color: "#C21325" },
      { icon: SiCypress, name: "Cypress", color: "#17202C" },
    ],
  },
  {
    title: "Backend",
    items: [
      { icon: SiNodedotjs, name: "Node.js", color: "#5FA04E" },
      { icon: SiExpress, name: "Express" },
      { icon: SiNestjs, name: "NestJS", color: "#E0234E" },
      { icon: SiSpringboot, name: "Spring Boot", color: "#6DB33F" },
      { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
      { icon: SiRedis, name: "Redis", color: "#FF4438" },
      { icon: SiGraphql, name: "GraphQL", color: "#E10098" },
      { icon: SiPrisma, name: "Prisma", color: "#2D3748" },
      { icon: SiSocketdotio, name: "Socket.IO" },
      { icon: SiRabbitmq, name: "RabbitMQ", color: "#FF6600" },
      { icon: SiApachekafka, name: "Kafka" },
    ],
  },
  {
    title: "Infra & DevOps",
    items: [
      { icon: SiLinux, name: "Linux" },
      { icon: SiNginx, name: "Nginx", color: "#009639" },
      { icon: SiKubernetes, name: "Kubernetes", color: "#326CE5" },
      { icon: SiTerraform, name: "Terraform", color: "#7B42BC" },
      { icon: SiPrometheus, name: "Prometheus", color: "#E6522C" },
      { icon: SiGrafana, name: "Grafana", color: "#F46800" },
      { icon: SiGitlab, name: "GitLab", color: "#FC6D26" },
      { icon: SiSentry, name: "Sentry", color: "#362D59" },
      { icon: SiCloudflare, name: "Cloudflare", color: "#F38020" },
    ],
  },
  {
    title: "Collaboration",
    items: [
      { icon: SiFigma, name: "Figma", color: "#F24E1E" },
      { icon: SiNotion, name: "Notion" },
      { icon: SiSlack, name: "Slack", color: "#4A154B" },
      { icon: SiPostman, name: "Postman", color: "#FF6C37" },
      { icon: SiSwagger, name: "Swagger", color: "#85EA2D" },
    ],
  },
];
