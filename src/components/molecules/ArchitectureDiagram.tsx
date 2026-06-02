import type { IconType } from "react-icons";
import {
  SiElectron,
  SiSpringboot,
  SiFastapi,
  SiPostgresql,
  SiRedis,
  SiSqlite,
} from "react-icons/si";
import { Lock, RefreshCw, Globe, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface NodeProps {
  icon: IconType | React.ComponentType<{ className?: string }>;
  label: string;
  color?: string;
  className?: string;
}

/**
 * 정사각형 아이콘 박스 + 하단 라벨.
 * 부모의 absolute 좌표(top/left)로 위치 지정.
 */
function Node({ icon: Icon, label, color, className }: NodeProps) {
  return (
    <div
      className={cn(
        "absolute flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2",
        className
      )}
    >
      <div className="size-9 md:size-11 rounded-lg border bg-card shadow-sm flex items-center justify-center">
        <Icon
          className="size-5 md:size-6"
          style={color ? { color } : undefined}
        />
      </div>
      <span className="text-[9px] md:text-[10px] font-semibold leading-none whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

interface Props {
  className?: string;
}

/**
 * Folio 시스템 아키텍처 다이어그램.
 * - 정사각형 아이콘 + 하단 라벨 (통일)
 * - 직각 화살표 (right-angle paths) — 가독성 우선
 * - 표시 관계: 핵심 6개만 (혼잡 방지)
 */
export default function ArchitectureDiagram({ className }: Props) {
  return (
    <div
      className={cn(
        "not-prose relative aspect-4/3 rounded-xl border bg-muted/20 overflow-hidden",
        className
      )}
    >
      {/* 영역 라벨 */}
      <div className="absolute top-2 left-3 text-[9px] uppercase tracking-[0.15em] text-muted-foreground/70 font-semibold">
        Client
      </div>
      <div className="absolute top-[48%] left-3 text-[9px] uppercase tracking-[0.15em] text-muted-foreground/70 font-semibold">
        Server
      </div>
      <div className="absolute top-[74%] left-3 text-[9px] uppercase tracking-[0.15em] text-muted-foreground/70 font-semibold">
        Data
      </div>

      {/* 영역 구분선 (수평) */}
      <div className="absolute left-0 right-0 top-[44%] border-t border-dashed border-border/40" />
      <div className="absolute left-0 right-0 top-[71%] border-t border-dashed border-border/40" />

      {/* SVG 직각 화살표 */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <marker
            id="arr"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path
              d="M 0 0 L 10 5 L 0 10 z"
              className="fill-muted-foreground/60"
            />
          </marker>
          <marker
            id="arr-end"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-emerald-500" />
          </marker>
          <marker
            id="arr-start"
            viewBox="0 0 10 10"
            refX="1"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 10 0 L 0 5 L 10 10 z" className="fill-emerald-500" />
          </marker>
          <marker
            id="arr-ext"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-orange-500/80" />
          </marker>
        </defs>

        {/* 1. Electron → Spring Boot : 직각 (down → right → down) */}
        <path
          d="M 130 78 V 130 H 200 V 158"
          fill="none"
          className="stroke-muted-foreground/60"
          strokeWidth="1.4"
          markerEnd="url(#arr)"
        />

        {/* 2. Web → Spring Boot : 직각 (down → left → down) */}
        <path
          d="M 270 78 V 130 H 200 V 158"
          fill="none"
          className="stroke-muted-foreground/60"
          strokeWidth="1.4"
          markerEnd="url(#arr)"
        />

        {/* 3. Spring Boot → FastAPI : 수평 (내부 호출, dashed) */}
        <path
          d="M 222 180 H 318"
          fill="none"
          className="stroke-muted-foreground/60"
          strokeWidth="1.4"
          strokeDasharray="3 2"
          markerEnd="url(#arr)"
        />

        {/* 4. WA-SQLite ↔ PowerSync : 수직 양방향 (sync) */}
        <path
          d="M 50 138 V 158"
          fill="none"
          className="stroke-emerald-500"
          strokeWidth="1.6"
          markerEnd="url(#arr-end)"
          markerStart="url(#arr-start)"
        />

        {/* 5. PowerSync → PostgreSQL : 직각 sync (down → right → down) */}
        <path
          d="M 50 202 V 235 H 130 V 232"
          fill="none"
          className="stroke-emerald-500"
          strokeWidth="1.6"
          markerEnd="url(#arr-end)"
          markerStart="url(#arr-start)"
        />

        {/* 6. FastAPI → LLM : 직각 외부 호출 (dashed) */}
        <path
          d="M 340 202 V 235 H 370 V 232"
          fill="none"
          className="stroke-orange-500/80"
          strokeWidth="1.4"
          strokeDasharray="3 2"
          markerEnd="url(#arr-ext)"
        />
      </svg>

      {/* === Client === */}
      <Node
        icon={SiElectron}
        label="Electron"
        color="#47848F"
        className="top-[18%] left-[32%]"
      />
      <Node
        icon={Globe}
        label="Web"
        className="top-[18%] left-[67%]"
      />

      {/* === Sync (Local store) === */}
      <Node
        icon={SiSqlite}
        label="WA-SQLite"
        color="#003B57"
        className="top-[37%] left-[12%]"
      />

      {/* === Server === */}
      <Node
        icon={RefreshCw}
        label="PowerSync"
        color="#10b981"
        className="top-[60%] left-[12%]"
      />
      <Node
        icon={SiSpringboot}
        label="Spring Boot"
        color="#6DB33F"
        className="top-[60%] left-[50%]"
      />
      <Node
        icon={SiFastapi}
        label="FastAPI"
        color="#009688"
        className="top-[60%] left-[85%]"
      />

      {/* === Data === */}
      <Node
        icon={SiPostgresql}
        label="PostgreSQL"
        color="#4169E1"
        className="top-[83%] left-[32%]"
      />
      <Node
        icon={SiRedis}
        label="Redis"
        color="#FF4438"
        className="top-[83%] left-[55%]"
      />
      <Node
        icon={Lock}
        label="Vault"
        className="top-[83%] left-[75%]"
      />
      <Node
        icon={Bot}
        label="LLM API"
        color="#f97316"
        className="top-[83%] left-[93%]"
      />

      {/* 범례 (우상단) */}
      <div className="absolute bottom-2 right-3 flex items-center gap-3 text-[8.5px] text-muted-foreground/70">
        <span className="inline-flex items-center gap-1">
          <span className="inline-block w-3 h-px bg-emerald-500" />
          Sync
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block w-3 h-px bg-muted-foreground/60" />
          REST
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block w-3 border-t border-dashed border-orange-500/80" />
          External
        </span>
      </div>
    </div>
  );
}
