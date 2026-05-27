import { cn } from "@/lib/utils";

type Layout = "default" | "center" | "hero";
type Bg = "default" | "muted" | "dark";

interface SlideProps {
  /** 슬라이드 식별자 (URL 해시 / TOC 네비게이션 키) */
  id: string;
  /** 슬라이드 제목 (자동으로 h2로 렌더, 생략 시 children만 표시) */
  title?: string;
  /** 레이아웃 모드 — default: 좌상단 정렬, center: 정중앙, hero: 큰 임팩트 */
  layout?: Layout;
  /** 배경 톤 */
  bg?: Bg;
  /** 추가 클래스 */
  className?: string;
  /** 슬라이드 안의 콘텐츠 */
  children: React.ReactNode;
}

const bgMap: Record<Bg, string> = {
  default: "",
  muted: "bg-muted/40",
  dark: "bg-neutral-950 text-neutral-100",
};

const layoutMap: Record<Layout, string> = {
  default: "items-start justify-start text-left",
  center: "items-center justify-center text-center",
  hero: "items-center justify-center text-center",
};

export function Slide({
  id,
  title,
  layout = "default",
  bg = "default",
  className,
  children,
}: SlideProps) {
  return (
    <section
      data-slide
      data-slug={id}
      data-layout={layout}
      className={cn(
        "slide-canvas flex flex-col gap-6",
        layoutMap[layout],
        bgMap[bg],
        className
      )}
    >
      {title && (
        <h2 id={id} className={cn(layout === "hero" && "text-4xl md:text-5xl")}>
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
