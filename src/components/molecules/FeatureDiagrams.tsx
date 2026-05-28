import type { IconType } from "react-icons";
import {
  SiElectron,
  SiReact,
  SiGitlab,
  SiDocker,
  SiPostgresql,
  SiFastapi,
} from "react-icons/si";
import {
  Pencil,
  Database,
  Boxes,
  GitBranch,
  ArrowLeftRight,
  Bot,
  ToggleLeft,
  Server,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NodeProps {
  icon: IconType | React.ComponentType<{ className?: string }>;
  label: string;
  color?: string;
  className?: string;
  /** 작은 노드 (label 한 줄) */
  small?: boolean;
}

/**
 * 미니 다이어그램용 노드. 정사각형 아이콘 박스 + 하단 라벨.
 * 부모 컨테이너의 absolute 좌표(top/left percent)로 위치 지정.
 */
function Node({ icon: Icon, label, color, className, small }: NodeProps) {
  return (
    <div
      className={cn(
        "absolute flex flex-col items-center gap-0.5 -translate-x-1/2 -translate-y-1/2",
        className
      )}
    >
      <div
        className={cn(
          "rounded-md border bg-card shadow-sm flex items-center justify-center",
          small ? "size-7 md:size-8" : "size-8 md:size-9"
        )}
      >
        <Icon
          className={cn(small ? "size-3.5 md:size-4" : "size-4 md:size-5")}
          style={color ? { color } : undefined}
        />
      </div>
      <span className="text-[8px] md:text-[9px] font-semibold leading-none whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

interface DiagramContainerProps {
  children: React.ReactNode;
  className?: string;
  /** SVG viewBox (default 400x225 = 16:9) */
  viewBox?: string;
}

function DiagramContainer({
  children,
  className,
  viewBox = "0 0 400 225",
}: DiagramContainerProps) {
  return (
    <div
      className={cn(
        "not-prose relative aspect-video rounded-lg border bg-muted/15 overflow-hidden",
        className
      )}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={viewBox}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <marker
            id="m-arr"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path
              d="M 0 0 L 10 5 L 0 10 z"
              className="fill-muted-foreground/70"
            />
          </marker>
          <marker
            id="m-arr-em"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-emerald-500" />
          </marker>
        </defs>
        {children}
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────
 * Feature 1: Editor UI 구현
 *  Electron shell → React + Tiptap → Zustand → WA-SQLite
 * ────────────────────────────────────────────── */
export function EditorDiagram() {
  return (
    <DiagramContainer>
      {/* 화살표 (직각 우측 흐름) */}
      <path
        d="M 78 112 H 130"
        fill="none"
        className="stroke-muted-foreground/60"
        strokeWidth="1.4"
        markerEnd="url(#m-arr)"
      />
      <path
        d="M 200 112 H 252"
        fill="none"
        className="stroke-muted-foreground/60"
        strokeWidth="1.4"
        markerEnd="url(#m-arr)"
      />
      <path
        d="M 322 112 H 374"
        fill="none"
        className="stroke-muted-foreground/60"
        strokeWidth="1.4"
        markerEnd="url(#m-arr)"
      />
      {/* React와 Tiptap 묶는 점선 박스 */}
      <rect
        x="140"
        y="78"
        width="120"
        height="70"
        rx="6"
        fill="none"
        strokeDasharray="3 2"
        className="stroke-muted-foreground/30"
        strokeWidth="1"
      />

      {/* 노드 — 좌→우 흐름 */}
      <foreignObject x="0" y="0" width="100%" height="100%">
        <div className="relative w-full h-full">
          <Node
            icon={SiElectron}
            label="Electron"
            color="#47848F"
            className="left-[10%] top-[50%]"
          />
          <Node
            icon={SiReact}
            label="React"
            color="#61DAFB"
            className="left-[37%] top-[50%]"
            small
          />
          <Node
            icon={Pencil}
            label="Tiptap"
            color="#0d9488"
            className="left-[52%] top-[50%]"
            small
          />
          <Node
            icon={Boxes}
            label="Zustand"
            className="left-[71%] top-[50%]"
          />
          <Node
            icon={Database}
            label="WA-SQLite"
            color="#003B57"
            className="right-[7%] top-[50%]"
          />
        </div>
      </foreignObject>

      {/* 캡션 (좌상단) */}
      <div className="absolute top-2 left-3 text-[9px] uppercase tracking-[0.15em] text-muted-foreground/70 font-semibold">
        Editor UI Stack
      </div>
    </DiagramContainer>
  );
}

/* ──────────────────────────────────────────────
 * Feature 2: 배포 인프라
 *  Git Push → GitLab Runner → Docker → Blue/Green
 * ────────────────────────────────────────────── */
export function DeployDiagram() {
  return (
    <DiagramContainer>
      {/* 직각 화살표 — 좌→우 흐름 */}
      <path
        d="M 78 112 H 138"
        fill="none"
        className="stroke-muted-foreground/60"
        strokeWidth="1.4"
        markerEnd="url(#m-arr)"
      />
      <path
        d="M 192 112 H 248"
        fill="none"
        className="stroke-muted-foreground/60"
        strokeWidth="1.4"
        markerEnd="url(#m-arr)"
      />
      {/* Docker → Blue 분기 (위) */}
      <path
        d="M 305 100 V 75 H 360"
        fill="none"
        className="stroke-emerald-500"
        strokeWidth="1.4"
        markerEnd="url(#m-arr-em)"
      />
      {/* Docker → Green 분기 (아래) */}
      <path
        d="M 305 124 V 152 H 360"
        fill="none"
        className="stroke-muted-foreground/50"
        strokeWidth="1.4"
        strokeDasharray="3 2"
        markerEnd="url(#m-arr)"
      />

      <foreignObject x="0" y="0" width="100%" height="100%">
        <div className="relative w-full h-full">
          <Node
            icon={GitBranch}
            label="Git Push"
            className="left-[10%] top-[50%]"
          />
          <Node
            icon={SiGitlab}
            label="Runner"
            color="#FC6D26"
            className="left-[40%] top-[50%]"
            small
          />
          <Node
            icon={SiDocker}
            label="Docker Build"
            color="#2496ED"
            className="left-[68%] top-[50%]"
            small
          />
          <Node
            icon={ToggleLeft}
            label="Blue · 활성"
            color="#10b981"
            className="right-[7%] top-[33%]"
            small
          />
          <Node
            icon={ArrowLeftRight}
            label="Green · 대기"
            className="right-[7%] top-[68%]"
            small
          />
        </div>
      </foreignObject>

      <div className="absolute top-2 left-3 text-[9px] uppercase tracking-[0.15em] text-muted-foreground/70 font-semibold">
        CI/CD · Blue-Green
      </div>
    </DiagramContainer>
  );
}

/* ──────────────────────────────────────────────
 * Feature 3: AI 기능 구현
 *  Client → FastAPI → MCP Tools / pgvector → LLM
 * ────────────────────────────────────────────── */
export function AiDiagram() {
  return (
    <DiagramContainer>
      {/* User → FastAPI (직각) */}
      <path
        d="M 78 112 H 130"
        fill="none"
        className="stroke-muted-foreground/60"
        strokeWidth="1.4"
        markerEnd="url(#m-arr)"
      />
      {/* FastAPI → MCP (분기 상) */}
      <path
        d="M 188 100 V 60 H 248"
        fill="none"
        className="stroke-muted-foreground/60"
        strokeWidth="1.4"
        markerEnd="url(#m-arr)"
      />
      {/* FastAPI → pgvector (분기 하) */}
      <path
        d="M 188 124 V 165 H 248"
        fill="none"
        className="stroke-muted-foreground/60"
        strokeWidth="1.4"
        markerEnd="url(#m-arr)"
      />
      {/* MCP → LLM */}
      <path
        d="M 310 60 H 374"
        fill="none"
        className="stroke-muted-foreground/60"
        strokeWidth="1.4"
        markerEnd="url(#m-arr)"
      />
      {/* pgvector → LLM (위로 합류) */}
      <path
        d="M 310 165 H 348 V 60"
        fill="none"
        className="stroke-emerald-500"
        strokeWidth="1.2"
        strokeDasharray="3 2"
      />

      <foreignObject x="0" y="0" width="100%" height="100%">
        <div className="relative w-full h-full">
          <Node
            icon={Server}
            label="Client"
            className="left-[10%] top-[50%]"
          />
          <Node
            icon={SiFastapi}
            label="FastAPI"
            color="#009688"
            className="left-[42%] top-[50%]"
          />
          <Node
            icon={Boxes}
            label="MCP Tools"
            className="left-[70%] top-[26%]"
            small
          />
          <Node
            icon={SiPostgresql}
            label="pgvector"
            color="#4169E1"
            className="left-[70%] top-[73%]"
            small
          />
          <Node
            icon={Bot}
            label="LLM"
            color="#f97316"
            className="right-[7%] top-[26%]"
          />
        </div>
      </foreignObject>

      <div className="absolute top-2 left-3 text-[9px] uppercase tracking-[0.15em] text-muted-foreground/70 font-semibold">
        AI Pipeline · RAG
      </div>
    </DiagramContainer>
  );
}
