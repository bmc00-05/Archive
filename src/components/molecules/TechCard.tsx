import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface TechCardProps {
  icon: IconType;
  name: string;
  /** 1~5 숙련도 단계 */
  level: SkillLevel;
  /** 한 줄 설명 (마우스 호버 시 카드 전체에 노출) */
  description?: string;
  /** 아이콘 컬러 (브랜드 색상) — 미지정 시 currentColor */
  color?: string;
  className?: string;
}

export function TechCard({
  icon: Icon,
  name,
  level,
  description,
  color,
  className,
}: TechCardProps) {
  const hasDesc = Boolean(description);
  return (
    <div
      className={cn(
        "group relative rounded-lg border bg-card overflow-hidden",
        "h-24 p-2.5",
        "transition-shadow hover:shadow-sm",
        className
      )}
      role="group"
      aria-label={`${name} 숙련도 ${level} / 5${
        description ? ". " + description : ""
      }`}
    >
      {/* ── Layer 1: 기본 콘텐츠 ──────────────── */}
      <div
        className={cn(
          "flex h-full flex-col gap-2",
          hasDesc &&
            "transition-all duration-200 group-hover:opacity-25 group-hover:blur-[2px]"
        )}
      >
        <div className="flex items-center gap-2.5 flex-1 min-h-0">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted/60"
            style={color ? { color } : undefined}
            aria-hidden="true"
          >
            <Icon className="size-5" />
          </div>
          <p className="font-semibold text-sm leading-tight truncate">
            {name}
          </p>
        </div>

        {/* 5칸 게이지: 카드 폭 균등 분할, 초록색 */}
        <div
          className="flex items-center gap-1"
          aria-hidden="true"
        >
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className={cn(
                "flex-1 h-2.5 rounded-sm transition-colors",
                i < level
                  ? "bg-emerald-500 dark:bg-emerald-400"
                  : "bg-muted-foreground/15"
              )}
            />
          ))}
        </div>
      </div>

      {/* ── Layer 2: 호버 설명 (카드 전체 덮음) ──────────── */}
      {hasDesc && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 flex items-center justify-center p-2.5",
            "opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          )}
        >
          <p className="text-xs text-center leading-snug text-foreground line-clamp-5">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}
