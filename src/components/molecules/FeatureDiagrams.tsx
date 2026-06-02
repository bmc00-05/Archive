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
}

/**
 * 미니 다이어그램용 노드. 큰 정사각형 아이콘 박스 + 하단 라벨.
 * 컴팩트하게 꽉찬 시각을 위해 사이즈 통일 + 키움.
 */
function Node({ icon: Icon, label, color, className }: NodeProps) {
  return (
    <div
      className={cn(
        "absolute flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2",
        className
      )}
    >
      <div className="size-11 md:size-12 rounded-md border bg-card shadow-sm flex items-center justify-center">
        <Icon
          className="size-6 md:size-7"
          style={color ? { color } : undefined}
        />
      </div>
      <span className="text-[10px] md:text-[11px] font-semibold leading-none whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

interface DiagramContainerProps {
  children: React.ReactNode;
  className?: string;
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
            markerWidth="6"
            markerHeight="6"
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
            markerWidth="6"
            markerHeight="6"
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
 *  Electron → Tiptap (React 기반) → Zustand → WA-SQLite
 * ────────────────────────────────────────────── */
export function EditorDiagram() {
  return (
    <DiagramContainer>
      {/* 짧은 직각 화살표 (좌→우) */}
      <path
        d="M 70 112 H 90"
        fill="none"
        className="stroke-muted-foreground/60"
        strokeWidth="1.6"
        markerEnd="url(#m-arr)"
      />
      <path
        d="M 170 112 H 190"
        fill="none"
        className="stroke-muted-foreground/60"
        strokeWidth="1.6"
        markerEnd="url(#m-arr)"
      />
      <path
        d="M 270 112 H 290"
        fill="none"
        className="stroke-muted-foreground/60"
        strokeWidth="1.6"
        markerEnd="url(#m-arr)"
      />

      <foreignObject x="0" y="0" width="100%" height="100%">
        <div className="relative w-full h-full">
          <Node
            icon={SiElectron}
            label="Electron"
            color="#47848F"
            className="left-[12%] top-[50%]"
          />
          <Node
            icon={Pencil}
            label="Tiptap"
            color="#0d9488"
            className="left-[37%] top-[50%]"
          />
          <Node
            icon={Boxes}
            label="Zustand"
            className="left-[62%] top-[50%]"
          />
          <Node
            icon={Database}
            label="WA-SQLite"
            color="#003B57"
            className="left-[87%] top-[50%]"
          />
        </div>
      </foreignObject>
    </DiagramContainer>
  );
}

/* ──────────────────────────────────────────────
 * Feature 2: 배포 인프라
 *  Git → Runner → Docker → Blue/Green
 * ────────────────────────────────────────────── */
export function DeployDiagram() {
  return (
    <DiagramContainer>
      {/* 짧은 화살표 */}
      <path
        d="M 70 112 H 90"
        fill="none"
        className="stroke-muted-foreground/60"
        strokeWidth="1.6"
        markerEnd="url(#m-arr)"
      />
      <path
        d="M 170 112 H 190"
        fill="none"
        className="stroke-muted-foreground/60"
        strokeWidth="1.6"
        markerEnd="url(#m-arr)"
      />
      {/* Docker → Blue (위쪽 분기) */}
      <path
        d="M 248 90 V 70 H 280"
        fill="none"
        className="stroke-emerald-500"
        strokeWidth="1.6"
        markerEnd="url(#m-arr-em)"
      />
      {/* Docker → Green (아래쪽 분기) */}
      <path
        d="M 248 134 V 155 H 280"
        fill="none"
        className="stroke-muted-foreground/50"
        strokeWidth="1.6"
        strokeDasharray="3 2"
        markerEnd="url(#m-arr)"
      />

      <foreignObject x="0" y="0" width="100%" height="100%">
        <div className="relative w-full h-full">
          <Node
            icon={GitBranch}
            label="Git Push"
            className="left-[12%] top-[50%]"
          />
          <Node
            icon={SiGitlab}
            label="Runner"
            color="#FC6D26"
            className="left-[37%] top-[50%]"
          />
          <Node
            icon={SiDocker}
            label="Docker"
            color="#2496ED"
            className="left-[62%] top-[50%]"
          />
          <Node
            icon={ToggleLeft}
            label="Blue · 활성"
            color="#10b981"
            className="left-[87%] top-[28%]"
          />
          <Node
            icon={ArrowLeftRight}
            label="Green · 대기"
            className="left-[87%] top-[72%]"
          />
        </div>
      </foreignObject>
    </DiagramContainer>
  );
}

/* ──────────────────────────────────────────────
 * Feature 3: AI 기능 구현
 *  Client → FastAPI → MCP + pgvector → LLM
 * ────────────────────────────────────────────── */
export function AiDiagram() {
  return (
    <DiagramContainer>
      {/* Client → FastAPI */}
      <path
        d="M 70 112 H 90"
        fill="none"
        className="stroke-muted-foreground/60"
        strokeWidth="1.6"
        markerEnd="url(#m-arr)"
      />
      {/* FastAPI → MCP (위 분기) */}
      <path
        d="M 168 90 V 70 H 200"
        fill="none"
        className="stroke-muted-foreground/60"
        strokeWidth="1.6"
        markerEnd="url(#m-arr)"
      />
      {/* FastAPI → pgvector (아래 분기) */}
      <path
        d="M 168 134 V 155 H 200"
        fill="none"
        className="stroke-muted-foreground/60"
        strokeWidth="1.6"
        markerEnd="url(#m-arr)"
      />
      {/* MCP → LLM */}
      <path
        d="M 268 65 H 295"
        fill="none"
        className="stroke-muted-foreground/60"
        strokeWidth="1.6"
        markerEnd="url(#m-arr)"
      />
      {/* pgvector ⇢ LLM (context 흐름) */}
      <path
        d="M 268 155 H 290 V 70"
        fill="none"
        className="stroke-emerald-500"
        strokeWidth="1.4"
        strokeDasharray="3 2"
      />

      <foreignObject x="0" y="0" width="100%" height="100%">
        <div className="relative w-full h-full">
          <Node
            icon={Server}
            label="Client"
            className="left-[12%] top-[50%]"
          />
          <Node
            icon={SiFastapi}
            label="FastAPI"
            color="#009688"
            className="left-[37%] top-[50%]"
          />
          <Node
            icon={Boxes}
            label="MCP Tools"
            className="left-[62%] top-[28%]"
          />
          <Node
            icon={SiPostgresql}
            label="pgvector"
            color="#4169E1"
            className="left-[62%] top-[72%]"
          />
          <Node
            icon={Bot}
            label="LLM"
            color="#f97316"
            className="left-[87%] top-[28%]"
          />
        </div>
      </foreignObject>
    </DiagramContainer>
  );
}
