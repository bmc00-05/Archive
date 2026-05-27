import { cn } from "@/lib/utils";

type Gap = "sm" | "md" | "lg" | "xl";
const gapClass: Record<Gap, string> = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-10",
};

/** N단 그리드. 모바일(<md)에선 자동으로 1단으로 collapse. */
export function Cols({
  n = 2,
  gap = "lg",
  className,
  children,
}: {
  n?: 2 | 3 | 4;
  gap?: Gap;
  className?: string;
  children: React.ReactNode;
}) {
  const colClass =
    n === 4
      ? "md:grid-cols-4"
      : n === 3
        ? "md:grid-cols-3"
        : "md:grid-cols-2";
  return (
    <div className={cn("not-prose grid grid-cols-1", colClass, gapClass[gap], "my-6", className)}>
      {children}
    </div>
  );
}

/** 가로 flex. 너비가 좁아지면 자동 줄바꿈. */
export function Row({
  gap = "md",
  align = "start",
  className,
  children,
}: {
  gap?: Gap;
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  className?: string;
  children: React.ReactNode;
}) {
  const alignMap = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
    baseline: "items-baseline",
  } as const;
  return (
    <div
      className={cn(
        "not-prose flex flex-wrap",
        alignMap[align],
        gapClass[gap],
        "my-6",
        className
      )}
    >
      {children}
    </div>
  );
}

/** 세로 flex (간격 일정한 수직 정렬). */
export function Stack({
  gap = "md",
  className,
  children,
}: {
  gap?: Gap;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("not-prose flex flex-col", gapClass[gap], "my-6", className)}>
      {children}
    </div>
  );
}

/** 슬라이드 정중앙 정렬 (deck 모드의 결론 슬라이드 등에 적합). */
export function Center({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "not-prose flex min-h-[50vh] flex-col items-center justify-center text-center my-6",
        className
      )}
    >
      {children}
    </div>
  );
}

/** 큰 메시지/임팩트 슬라이드용. */
export function Hero({
  eyebrow,
  className,
  children,
}: {
  eyebrow?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("not-prose py-10 text-center", className)}>
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
          {eyebrow}
        </p>
      )}
      <div className="text-2xl md:text-4xl font-semibold tracking-tight leading-tight max-w-3xl mx-auto">
        {children}
      </div>
    </div>
  );
}

/** KPI 표시. value 큰 숫자 + label 작은 설명. */
export function Stat({
  label,
  value,
  subtext,
  className,
}: {
  label: string;
  value: string;
  subtext?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "not-prose flex-1 min-w-[8rem] rounded-lg border bg-card p-5",
        className
      )}
    >
      <p className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-3xl md:text-4xl font-semibold tracking-tight tabular-nums">
        {value}
      </p>
      {subtext && (
        <p className="mt-1 text-xs text-muted-foreground">{subtext}</p>
      )}
    </div>
  );
}

/** 컨테이너의 max-width를 무시하고 전체 폭으로 펼침. */
export function FullBleed({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("not-prose -mx-4 md:-mx-16 my-6", className)}>
      {children}
    </div>
  );
}

/** 카드 박스 (그냥 콘텐츠를 카드로 감싸고 싶을 때). */
export function Box({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "not-prose rounded-lg border bg-card p-5 my-6",
        className
      )}
    >
      {children}
    </div>
  );
}
