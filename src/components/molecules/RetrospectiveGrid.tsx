import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

export interface RetrospectiveItem {
  /** 카테고리 제목 (예: "좋았던 점") */
  title: string;
  /** 좌상단 아이콘 — lucide-react 등 */
  icon: ComponentType<{ className?: string }>;
  /** 상세 내용 — 각 항목이 점 리스트의 한 줄 */
  bullets: string[];
  /**
   * 박스 농도 — 무채색 그룹핑 시그널.
   *  - "soft" (기본): 옅은 muted, 긍정군에 적합
   *  - "strong": 한 단계 진한 muted, 개선군에 적합
   */
  tone?: "soft" | "strong";
}

interface Props {
  items: RetrospectiveItem[];
  className?: string;
}

/**
 * 회고(Retrospective) 2×n 그리드.
 * 무채색 농도 차 + 아이콘만으로 카테고리 구분 — 컬러 인플레이션 회피.
 * 다른 프로젝트에서도 동일 모듈로 재사용.
 */
export default function RetrospectiveGrid({ items, className }: Props) {
  if (items.length === 0) return null;
  return (
    <div
      className={cn(
        "not-prose grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 w-full",
        className
      )}
    >
      {items.map((item, i) => {
        const Icon = item.icon;
        const isStrong = item.tone === "strong";
        return (
          <div key={i} className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <Icon className="size-3.5 text-muted-foreground/70" />
              <p className="text-sm font-semibold text-muted-foreground/90 tracking-tight">
                {item.title}
              </p>
            </div>
            <div
              className={cn(
                "rounded-lg px-4 py-3",
                isStrong
                  ? "border border-border bg-muted/55 dark:bg-muted/35"
                  : "border border-border/60 bg-muted/30 dark:bg-muted/20"
              )}
            >
              <ul className="list-disc pl-4 space-y-1 text-sm md:text-[15px] text-muted-foreground leading-relaxed marker:text-muted-foreground/50">
                {item.bullets.map((b, bi) => (
                  <li key={bi}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
