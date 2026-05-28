import { cn } from "@/lib/utils";

export interface TroubleshootingItem {
  /** 문제 카드 제목 */
  title: string;
  /** "문제" 섹션 본문 */
  problem: string;
  /** "해결" 섹션 본문 */
  solution: string;
  /** 우측 시각 자료 이미지 — astro:assets 의 .src 값. 없으면 placeholder 표시 */
  imageSrc?: string;
  imageAlt?: string;
}

interface Props {
  items: TroubleshootingItem[];
  className?: string;
}

/**
 * 트러블슈팅 리스트.
 * 카드 테두리 없이 단일 컨테이너 안에 요소들이 배열되는 구조.
 * 우측 시각 자료는 aspect-video (16:9) 로 비율 고정.
 */
export default function TroubleshootingList({ items, className }: Props) {
  if (items.length === 0) return null;

  return (
    <div
      className={cn(
        "not-prose flex flex-col gap-8 md:gap-10 w-full",
        className
      )}
    >
      {items.map((item, i) => (
        <article
          key={i}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center"
        >
          {/* 좌측: 번호 + 제목 + 문제 ↓ 해결 */}
          <div className="flex flex-col gap-3">
            <div className="flex items-baseline gap-3">
              <span className="text-xs font-mono text-muted-foreground tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-bold text-base md:text-lg tracking-tight m-0">
                {item.title}
              </h3>
            </div>

            <div className="rounded-lg bg-muted/40 px-4 py-3 flex items-center">
              <p className="text-sm md:text-base font-semibold leading-snug">
                {item.problem}
              </p>
            </div>

            <div className="flex justify-center -my-1" aria-hidden="true">
              <span className="text-sm leading-none text-muted-foreground/70 select-none">
                ↓
              </span>
            </div>

            <div className="rounded-lg bg-muted/40 px-4 py-3 flex items-center">
              <p className="text-sm md:text-base font-semibold leading-snug">
                {item.solution}
              </p>
            </div>
          </div>

          {/* 우측: aspect-video 고정 비율 시각 자료 */}
          {item.imageSrc ? (
            <div className="rounded-lg border overflow-hidden aspect-video bg-card">
              <img
                src={item.imageSrc}
                alt={item.imageAlt ?? item.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/15 aspect-video flex items-center justify-center text-xs text-muted-foreground/60">
              참고 시각 자료
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
