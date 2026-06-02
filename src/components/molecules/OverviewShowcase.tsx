import { useState } from "react";
import { cn } from "@/lib/utils";

export interface OverviewFeature {
  /** 우측 카드에 표시되는 짧은 제목 */
  title: string;
  /** 메인 타이틀 아래에 표시되는 활성 카드의 서브 텍스트 */
  subText: string;
  /** astro:assets 로 import한 이미지의 .src (desktop 레이아웃용) */
  imageSrc?: string;
  /** 모바일 페어 레이아웃에서 사용할 2장의 이미지 .src */
  imageSrcs?: [string, string];
  imageAlt?: string;
}

interface Props {
  /** 메인 서비스 한 줄 문구 (항상 상단에 고정 표시) */
  mainTitle: string;
  features: OverviewFeature[];
  /** 좌측 이미지 레이아웃. desktop: 16:10 단일, mobile-pair: 모바일 규격 2장 나란히 */
  layout?: "desktop" | "mobile-pair";
  className?: string;
}

/**
 * 프로젝트 Overview 전시 컴포넌트.
 * 상단: 고정 메인 타이틀 + 활성 카드의 서브 텍스트
 * 하단: 좌측 이미지(16:9) + 우측 클릭 가능한 카드 3장
 */
export default function OverviewShowcase({
  mainTitle,
  features,
  layout = "desktop",
  className,
}: Props) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (features.length === 0) return null;
  const active = features[activeIdx];

  return (
    <div className={cn("flex flex-col gap-4 md:gap-6", className)}>
      {/* 상단: 메인 + 서브 타이틀 (서브는 활성 카드 따라 변경) */}
      <div className="text-center">
        <p className="text-2xl md:text-3xl font-bold tracking-tight">
          {mainTitle}
        </p>
        <p
          key={activeIdx}
          className="text-base md:text-lg text-muted-foreground mt-3 animate-in fade-in duration-200"
        >
          {active.subText}
        </p>
      </div>

      {/* 이미지 + 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 md:gap-10 items-stretch">
        {/* 좌측 이미지 — desktop: 16:10 단일 / mobile-pair: 9:19.5 프레임 2장 */}
        {layout === "mobile-pair" ? (
          <div className="flex items-center justify-center gap-4 md:gap-6 bg-card rounded-xl border p-4 md:p-6">
            {(active.imageSrcs ?? [active.imageSrc, active.imageSrc]).map(
              (src, i) => (
                <div
                  key={`${activeIdx}-${i}`}
                  className="rounded-[1.75rem] border-2 border-foreground/10 overflow-hidden bg-background shadow-md"
                  style={{ aspectRatio: "9 / 19.5", maxHeight: "100%", width: "min(45%, 220px)" }}
                >
                  {src ? (
                    <img
                      src={src}
                      alt={active.imageAlt ?? active.title}
                      loading="lazy"
                      className="w-full h-full object-cover animate-in fade-in duration-200"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground/60">
                      Mobile {i + 1}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        ) : (
          <div className="rounded-xl border overflow-hidden bg-card aspect-16/10">
            <img
              key={activeIdx}
              src={active.imageSrc}
              alt={active.imageAlt ?? active.title}
              loading="lazy"
              className="w-full h-full object-cover animate-in fade-in duration-200"
            />
          </div>
        )}

        {/* 우측 카드 — Key 라벨 제거, 타이틀만, 갭 확대 */}
        <div className="flex flex-col gap-4 md:gap-5">
          {features.map((f, i) => {
            const isActive = i === activeIdx;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIdx(i)}
                aria-pressed={isActive}
                aria-label={f.title}
                className={cn(
                  "flex-1 rounded-xl px-4 py-5 md:px-5 md:py-6 bg-card",
                  "flex items-center justify-center text-center cursor-pointer",
                  "transition-all duration-200",
                  isActive
                    ? "shadow-lg -translate-y-0.5 ring-1 ring-foreground/10"
                    : "shadow-sm hover:shadow-md hover:-translate-y-0.5"
                )}
              >
                <p className="font-bold text-base md:text-lg tracking-tight">
                  {f.title}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
