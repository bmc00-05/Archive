import { cn } from "@/lib/utils";

export interface FeatureItem {
  /** 기능 이름 */
  title: string;
  /** 구현 방식 / 설명 본문 */
  description: string;
  /** 우측 시각 자료 이미지 — astro:assets 의 .src */
  imageSrc?: string;
  imageAlt?: string;
  /** 이미지 대신 표시할 다이어그램 컴포넌트 (image 우선, diagram 차선, 둘 다 없으면 placeholder) */
  diagram?: React.ComponentType;
  /** 사용한 기술 태그 (선택) */
  tags?: string[];
  /** 구현 디테일 (markdown-style 불릿 리스트). 제공 시 3-column 레이아웃으로 변환 */
  details?: string[];
}

interface Props {
  items: FeatureItem[];
  className?: string;
}

/**
 * "구현한 기능" 리스트.
 * 카드 테두리 없이 단일 컨테이너 안에 요소들이 배열되는 구조.
 * 우측 이미지는 aspect-video (16:9) 로 비율 고정.
 */
export default function FeatureList({ items, className }: Props) {
  if (items.length === 0) return null;

  return (
    <div
      className={cn(
        "not-prose flex flex-col gap-3 md:gap-4 w-full",
        className
      )}
    >
      {items.map((item, i) => {
        const hasDetails = item.details && item.details.length > 0;
        return (
        <article
          key={i}
          className={cn(
            "grid grid-cols-1 gap-3 md:gap-5 items-center",
            hasDetails
              ? "md:grid-cols-[4fr_4fr_3fr]"
              : "md:grid-cols-[7fr_3fr]"
          )}
        >
          {/* 좌측: 번호 + 제목 + 설명 + 태그 */}
          <div
            className={cn(
              "flex flex-col",
              hasDetails && "md:pr-5 md:border-r md:border-border/40"
            )}
          >
            <div className="flex items-baseline gap-2.5">
              <span
                className="text-[11px] font-black text-muted-foreground tabular-nums tracking-tight"
                style={{ textShadow: "0 0 0.4px currentColor" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-bold text-sm md:text-base tracking-tight m-0">
                {item.title}
              </h3>
            </div>

            <p className="text-xs md:text-sm font-medium leading-relaxed">
              {item.description}
            </p>

            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-md bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium text-foreground/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 중앙: 구현 디테일 리스트 (details 있을 때만) — 동그라미 불릿 */}
          {hasDetails && (
            <ul className="list-disc pl-5 flex flex-col gap-1.5 text-xs md:text-sm leading-relaxed marker:text-muted-foreground/60">
              {item.details!.map((d, di) => (
                <li key={di} className="text-foreground/85">
                  {d}
                </li>
              ))}
            </ul>
          )}

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
          ) : item.diagram ? (
            <item.diagram />
          ) : (
            <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/15 aspect-video flex items-center justify-center text-xs text-muted-foreground/60">
              기능 화면 / 다이어그램
            </div>
          )}
        </article>
        );
      })}
    </div>
  );
}
