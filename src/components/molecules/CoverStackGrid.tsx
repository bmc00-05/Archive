import { useState } from "react";
import { StackIcon } from "@/components/atoms/StackIcon";

interface Props {
  stack: readonly string[];
}

/**
 * 커버 슬라이드 Stack 섹션 — 헤더("Stack")가 호버 중인 기술명으로 부드럽게 전환.
 * stack은 문자열 배열만 받아 props 직렬화 문제 회피 (아이콘은 StackIcon이 name으로 lookup).
 */
export default function CoverStackGrid({ stack }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const label = hovered ?? "Stack";

  return (
    <div className="max-w-3xl mx-auto w-full">
      <p
        key={label}
        className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-2 text-center"
        style={{ animation: "cover-stack-fade 220ms ease-out" }}
      >
        {label}
      </p>

      <style>{`
        @keyframes cover-stack-fade {
          from { opacity: 0; transform: translateY(-2px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="flex flex-wrap justify-center gap-2.5 md:gap-3">
        {stack.map((s) => (
          <div
            key={s}
            title={s}
            onMouseEnter={() => setHovered(s)}
            onMouseLeave={() =>
              setHovered((cur) => (cur === s ? null : cur))
            }
            onFocus={() => setHovered(s)}
            onBlur={() =>
              setHovered((cur) => (cur === s ? null : cur))
            }
            className="size-14 md:size-16 rounded-xl bg-card border border-border/40 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center"
          >
            <StackIcon name={s} className="size-12 md:size-14" />
          </div>
        ))}
      </div>
    </div>
  );
}
