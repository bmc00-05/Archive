import { cn } from "@/lib/utils";

export interface ArchitectureItem {
  /** 한글 컨셉 (예: "로컬 퍼스트") — 의사결정/철학 한 줄 */
  concept: string;
  /** 사용 기술 스택 (예: "Electron + WA-SQLite") */
  stack: string;
  /** 구체적 근거/효과 불릿 리스트 */
  bullets: string[];
}

interface Props {
  items: ArchitectureItem[];
  className?: string;
}

/**
 * 아키텍처 의사결정 리스트.
 * 각 항목: 한글 컨셉 (bold) + 기술 스택 (인라인 muted) + 불릿 리스트
 * Architecture 슬라이드 우측 패널 / 다른 프로젝트(CatLog 등)에서도 재사용.
 */
export default function ArchitectureDecisions({ items, className }: Props) {
  if (items.length === 0) return null;
  return (
    <div
      className={cn(
        "not-prose flex flex-col gap-3 text-[13px] leading-relaxed",
        className
      )}
    >
      {items.map((item, i) => (
        <div key={i}>
          <div className="flex items-baseline gap-2 flex-wrap">
            <p className="font-bold text-foreground text-sm">{item.concept}</p>
            <p className="text-muted-foreground/80 text-[11px]">{item.stack}</p>
          </div>
          <ul className="list-disc pl-4 mt-1.5 space-y-0.5 text-muted-foreground text-[12px] marker:text-muted-foreground/50">
            {item.bullets.map((b, bi) => (
              <li key={bi}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
