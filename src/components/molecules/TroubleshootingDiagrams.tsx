import type { IconType } from "react-icons";
import { Key, ShieldCheck, Lock, FileLock2, Bot, FileText, Keyboard, Server, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface NodeProps {
  icon: IconType | React.ComponentType<{ className?: string }>;
  label: string;
  color?: string;
  className?: string;
}

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
            id="ts-arr"
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
            id="ts-arr-em"
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
 * Troubleshooting #01: 개인키 + 서버키 동시 Wrapping
 *  User Key + Vault → Wrapped DEK → 복호화 데이터 ← AI Server
 * ────────────────────────────────────────────── */
export function EncryptionDiagram() {
  return (
    <DiagramContainer>
      {/* User Key → Wrapped DEK (직각: 오른쪽으로 가다 아래로) */}
      <path
        d="M 70 65 H 168 V 100"
        fill="none"
        className="stroke-muted-foreground/60"
        strokeWidth="1.6"
        markerEnd="url(#ts-arr)"
      />
      {/* Vault → Wrapped DEK (직각: 오른쪽으로 가다 위로) */}
      <path
        d="M 70 162 H 168 V 124"
        fill="none"
        className="stroke-emerald-500"
        strokeWidth="1.6"
        markerEnd="url(#ts-arr-em)"
      />
      {/* Wrapped DEK → Data (Unwrap 후 복호화) */}
      <path
        d="M 215 112 H 290"
        fill="none"
        className="stroke-muted-foreground/60"
        strokeWidth="1.6"
        markerEnd="url(#ts-arr)"
      />
      {/* AI Server ─ ─ Data (접근 권한 확보) */}
      <path
        d="M 340 65 V 95"
        fill="none"
        className="stroke-emerald-500"
        strokeWidth="1.4"
        strokeDasharray="3 2"
        markerEnd="url(#ts-arr-em)"
      />

      {/* Wrapped DEK 옆에 "unwrap" 작은 라벨 */}
      <text
        x="252"
        y="105"
        textAnchor="middle"
        className="fill-muted-foreground/80"
        style={{ fontSize: "9px", fontWeight: 600 }}
      >
        unwrap
      </text>

      <foreignObject x="0" y="0" width="100%" height="100%">
        <div className="relative w-full h-full">
          <Node
            icon={Key}
            label="User Key"
            color="#f97316"
            className="left-[12%] top-[28%]"
          />
          <Node
            icon={ShieldCheck}
            label="Vault KEK"
            color="#10b981"
            className="left-[12%] top-[72%]"
          />
          <Node
            icon={FileLock2}
            label="Wrapped DEK"
            color="#6366f1"
            className="left-[47%] top-[50%]"
          />
          <Node
            icon={FileText}
            label="원고 (복호화)"
            className="left-[83%] top-[50%]"
          />
          <Node
            icon={Bot}
            label="AI Server"
            color="#f97316"
            className="left-[83%] top-[22%]"
          />
        </div>
      </foreignObject>
    </DiagramContainer>
  );
}

/* ──────────────────────────────────────────────
 * Troubleshooting #02: 동기화 디바운스/쓰로틀/배치
 *  Before(상단): 키 입력마다 즉시 API 호출 → 빈번한 burst
 *  After (하단): 400ms 디바운스 + 5s 쓰로틀 + 최대 50건 배치
 * ────────────────────────────────────────────── */
export function SyncBatchingDiagram() {
  // 두 개의 막대 그래프 — 좌: 서버 부하 (감소, 이득), 우: 동기화 지연 (증가, 트레이드오프)
  const baseline = 165;
  const maxH = 100;
  const barW = 32;

  // 좌측 차트: Server Load (req/s)
  const loadBeforeH = maxH;             // ~20 → 100%
  const loadAfterH = Math.round(maxH * 0.02); // ~0.3 → 2%
  // 우측 차트: Sync Latency (ms)
  const latBeforeH = Math.round(maxH * 0.05); // ~50ms → 5%
  const latAfterH = maxH;                     // ~5000ms → 100%

  // 좌 차트 영역
  const lChartX = 60;
  const lBeforeX = lChartX + 18;
  const lAfterX = lChartX + 70;
  // 우 차트 영역
  const rChartX = 230;
  const rBeforeX = rChartX + 18;
  const rAfterX = rChartX + 70;

  return (
    <DiagramContainer>
      {/* ── 좌측 차트: 서버 부하 ── */}
      <text x={lChartX + 60} y="28" textAnchor="middle" className="fill-foreground" style={{ fontSize: "10px", fontWeight: 700 }}>
        Server Load
      </text>
      <text x={lChartX + 60} y="40" textAnchor="middle" className="fill-muted-foreground/70" style={{ fontSize: "8px" }}>
        req / sec
      </text>
      <line x1={lChartX} y1={baseline} x2={lChartX + 120} y2={baseline} className="stroke-muted-foreground/40" strokeWidth="1" />
      {/* Before */}
      <rect x={lBeforeX} y={baseline - loadBeforeH} width={barW} height={loadBeforeH} className="fill-rose-500/80" rx="2" />
      <text x={lBeforeX + barW / 2} y={baseline - loadBeforeH - 5} textAnchor="middle" className="fill-rose-500" style={{ fontSize: "9.5px", fontWeight: 700 }}>~20</text>
      <text x={lBeforeX + barW / 2} y={baseline + 12} textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: "8.5px", fontWeight: 600 }}>BEFORE</text>
      {/* After */}
      <rect x={lAfterX} y={baseline - loadAfterH} width={barW} height={loadAfterH} className="fill-emerald-500/85" rx="2" />
      <text x={lAfterX + barW / 2} y={baseline - loadAfterH - 5} textAnchor="middle" className="fill-emerald-500" style={{ fontSize: "9.5px", fontWeight: 700 }}>~0.3</text>
      <text x={lAfterX + barW / 2} y={baseline + 12} textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: "8.5px", fontWeight: 600 }}>AFTER</text>
      {/* 변화율 */}
      <text x={lChartX + 60} y={baseline + 32} textAnchor="middle" className="fill-emerald-500" style={{ fontSize: "12px", fontWeight: 700 }}>−98%</text>
      <text x={lChartX + 60} y={baseline + 44} textAnchor="middle" className="fill-muted-foreground/70" style={{ fontSize: "7.5px" }}>요청량 감소</text>

      {/* 구분선 */}
      <line x1="200" y1="35" x2="200" y2="200" className="stroke-muted-foreground/25" strokeWidth="0.8" strokeDasharray="2 2" />

      {/* ── 우측 차트: 동기화 지연 (트레이드오프) ── */}
      <text x={rChartX + 60} y="28" textAnchor="middle" className="fill-foreground" style={{ fontSize: "10px", fontWeight: 700 }}>
        Sync Latency
      </text>
      <text x={rChartX + 60} y="40" textAnchor="middle" className="fill-muted-foreground/70" style={{ fontSize: "8px" }}>
        ms (서버 반영까지)
      </text>
      <line x1={rChartX} y1={baseline} x2={rChartX + 120} y2={baseline} className="stroke-muted-foreground/40" strokeWidth="1" />
      {/* Before */}
      <rect x={rBeforeX} y={baseline - latBeforeH} width={barW} height={latBeforeH} className="fill-emerald-500/70" rx="2" />
      <text x={rBeforeX + barW / 2} y={baseline - latBeforeH - 5} textAnchor="middle" className="fill-emerald-500" style={{ fontSize: "9.5px", fontWeight: 700 }}>~50</text>
      <text x={rBeforeX + barW / 2} y={baseline + 12} textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: "8.5px", fontWeight: 600 }}>BEFORE</text>
      {/* After */}
      <rect x={rAfterX} y={baseline - latAfterH} width={barW} height={latAfterH} className="fill-amber-500/85" rx="2" />
      <text x={rAfterX + barW / 2} y={baseline - latAfterH - 5} textAnchor="middle" className="fill-amber-500" style={{ fontSize: "9.5px", fontWeight: 700 }}>~5000</text>
      <text x={rAfterX + barW / 2} y={baseline + 12} textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: "8.5px", fontWeight: 600 }}>AFTER</text>
      {/* 변화율 */}
      <text x={rChartX + 60} y={baseline + 32} textAnchor="middle" className="fill-amber-500" style={{ fontSize: "12px", fontWeight: 700 }}>+100×</text>
      <text x={rChartX + 60} y={baseline + 44} textAnchor="middle" className="fill-muted-foreground/70" style={{ fontSize: "7.5px" }}>지연 증가 (트레이드오프)</text>
    </DiagramContainer>
  );
}
