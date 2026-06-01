import { useState } from "react";
import { TechCard } from "@/components/molecules/TechCard";
import { BrandIcon } from "@/components/atoms/BrandIcon";
import { techStack } from "@/lib/tech-stack";
import { familiarStack } from "@/lib/familiar-stack";
import { cn } from "@/lib/utils";

type Mode = "main" | "familiar";

/**
 * Tech Stack 섹션 — 헤더 우측 토글로 그리드 전환.
 *  - "Stack": 주력 스택 (TechCard, 숙련도 게이지)
 *  - "Familiar": 인지 수준 스택 (icon + name 칩, 카테고리별)
 */
export default function TechStackSection() {
  const [mode, setMode] = useState<Mode>("main");

  return (
    <>
      {/* 헤더 + 우측 토글 — 슬라이드 top padding 상쇄용 음의 마진 */}
      <div className="flex items-center justify-between gap-3 mb-2 -mt-4 md:-mt-6">
        <h2 className="text-lg md:text-xl font-bold tracking-tight">
          Tech Stack
        </h2>

        <div
          role="tablist"
          aria-label="Tech stack view"
          className="inline-flex items-center rounded-full border bg-card p-0.5 text-[11px] font-medium"
        >
          <button
            role="tab"
            aria-selected={mode === "main"}
            onClick={() => setMode("main")}
            className={cn(
              "px-3 py-1 rounded-full transition-colors",
              mode === "main"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Stack
          </button>
          <button
            role="tab"
            aria-selected={mode === "familiar"}
            onClick={() => setMode("familiar")}
            className={cn(
              "px-3 py-1 rounded-full transition-colors",
              mode === "familiar"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Tried
          </button>
        </div>
      </div>

      {/* 그리드 — 모드별 교체 */}
      {mode === "main" ? (
        <div className="space-y-2">
          {techStack.map((group) => (
            <div key={group.title}>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                {group.title}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 not-prose">
                {group.items.map((item) => (
                  <TechCard
                    key={item.name}
                    icon={item.icon}
                    name={item.name}
                    level={item.level}
                    description={item.description}
                    color={item.color}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {familiarStack.map((group) => (
            <div key={group.title}>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                {group.title}
              </p>
              <div className="flex flex-wrap gap-1.5 md:gap-2 not-prose">
                {group.items.map((item) => {
                  const icon = item.icon;
                  const isBrand =
                    icon !== null && typeof icon === "object" && "brand" in icon;
                  const IconFn =
                    icon !== null && typeof icon === "function" ? icon : null;
                  return (
                    <div
                      key={item.name}
                      title={item.name}
                      aria-label={item.name}
                      className="size-12 md:size-14 rounded-xl bg-card shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center"
                    >
                      {isBrand ? (
                        <BrandIcon
                          name={(icon as { brand: string }).brand}
                          className="size-11 md:size-13"
                        />
                      ) : IconFn ? (
                        <IconFn
                          className="size-11 md:size-13"
                          style={item.color ? { color: item.color } : undefined}
                          aria-hidden="true"
                        />
                      ) : (
                        <span
                          className="flex size-11 md:size-13 items-center justify-center rounded-lg text-white text-sm md:text-base font-bold tracking-tight"
                          style={{
                            backgroundColor: item.color ?? "#525252",
                          }}
                          aria-hidden="true"
                        >
                          {item.monogram ?? item.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
