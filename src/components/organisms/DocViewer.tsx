import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  /** 슬라이드들이 담긴 article 의 id */
  articleId: string;
}

interface SlideMeta {
  slug: string;
  title: string;
}

/**
 * 슬라이드 데크 통합 컨트롤러.
 * - TOC: 우측 floating, 클릭 시 해당 슬라이드로 점프
 * - Pagination: 하단 중앙 floating, ← N/M → + 현재 슬라이드 제목
 * - Keyboard: ↑↓ ←→ PageUp/Down 으로 prev/next 슬라이드
 * - Scrollspy: IntersectionObserver 로 현재 슬라이드 추적
 */
export default function DocViewer({ articleId }: Props) {
  const [slides, setSlides] = useState<SlideMeta[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [bottomVisible, setBottomVisible] = useState(false);
  const isProgrammaticScroll = useRef(false);
  const programmaticTimer = useRef<number | null>(null);
  const hideTimer = useRef<number | null>(null);

  // 하단 컨트롤 가시성: 트리거 후 2.5초 자동 숨김
  const flashBottom = useCallback(() => {
    setBottomVisible(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      setBottomVisible(false);
    }, 2500);
  }, []);

  const showBottom = useCallback(() => {
    setBottomVisible(true);
    if (hideTimer.current) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  const hideBottomSoon = useCallback(() => {
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      setBottomVisible(false);
    }, 400);
  }, []);

  // === 슬라이드 메타 수집 ===
  useEffect(() => {
    const article = document.getElementById(articleId);
    if (!article) return;
    const nodes = Array.from(
      article.querySelectorAll<HTMLElement>("[data-slide]")
    );
    setSlides(
      nodes.map((el) => {
        const slug = el.dataset.slug ?? "";
        const heading = el.querySelector("h1, h2");
        const title = heading?.textContent?.trim() || slug;
        return { slug, title };
      })
    );
  }, [articleId]);

  // === 스크롤스파이 ===
  useEffect(() => {
    if (slides.length === 0) return;
    const article = document.getElementById(articleId);
    if (!article) return;
    const els = Array.from(
      article.querySelectorAll<HTMLElement>("[data-slide]")
    );

    const slugs = slides.map((s) => s.slug);
    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const slug = (visible[0].target as HTMLElement).dataset.slug ?? "";
          const idx = slugs.indexOf(slug);
          if (idx >= 0) setActiveIdx(idx);
        }
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [articleId, slides]);

  // === 슬라이드로 점프 ===
  const jumpTo = useCallback(
    (idx: number) => {
      if (slides.length === 0) return;
      const next = Math.max(0, Math.min(slides.length - 1, idx));
      const article = document.getElementById(articleId);
      if (!article) return;
      const target = article.querySelector<HTMLElement>(
        `[data-slide][data-slug="${CSS.escape(slides[next].slug)}"]`
      );
      if (!target) return;

      setActiveIdx(next);
      isProgrammaticScroll.current = true;
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      if (programmaticTimer.current) {
        window.clearTimeout(programmaticTimer.current);
      }
      programmaticTimer.current = window.setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 600);
    },
    [slides, articleId]
  );

  const navigate = useCallback(
    (delta: number) => jumpTo(activeIdx + delta),
    [jumpTo, activeIdx]
  );

  // === 키보드 네비 ===
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement) {
        const tag = e.target.tagName;
        if (
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          tag === "SELECT" ||
          e.target.isContentEditable
        )
          return;
      }
      // 다음
      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowRight" ||
        e.key === "PageDown" ||
        (e.key === " " && !e.shiftKey)
      ) {
        if (activeIdx < slides.length - 1) {
          e.preventDefault();
          navigate(1);
          flashBottom();
        }
      }
      // 이전
      else if (
        e.key === "ArrowUp" ||
        e.key === "ArrowLeft" ||
        e.key === "PageUp" ||
        (e.key === " " && e.shiftKey)
      ) {
        if (activeIdx > 0) {
          e.preventDefault();
          navigate(-1);
          flashBottom();
        }
      }
      // Home/End
      else if (e.key === "Home") {
        e.preventDefault();
        jumpTo(0);
        flashBottom();
      } else if (e.key === "End") {
        e.preventDefault();
        jumpTo(slides.length - 1);
        flashBottom();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, jumpTo, activeIdx, slides.length, flashBottom]);

  if (slides.length === 0) return null;

  const total = slides.length;
  const activeSlide = slides[activeIdx];

  return (
    <>
      {/* TOC — 우측 floating, 평소엔 dash 만, 호버시 제목 펼침 */}
      <nav
        aria-label="Slide navigation"
        className="hidden md:flex fixed top-1/2 right-3 -translate-y-1/2 z-40 group"
      >
        <ol className="flex flex-col gap-1.5 items-end">
          {slides.map((s, i) => (
            <li key={s.slug} className="flex items-center justify-end">
              <button
                onClick={() => jumpTo(i)}
                aria-current={i === activeIdx ? "true" : undefined}
                aria-label={s.title}
                className={cn(
                  "flex items-center gap-2 px-2 py-1 rounded-full transition-all text-xs whitespace-nowrap",
                  i === activeIdx
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "max-w-[14rem] truncate bg-background/90 backdrop-blur px-2 py-0.5 rounded border",
                    "opacity-0 -translate-x-1 transition-all duration-150",
                    "group-hover:opacity-100 group-hover:translate-x-0"
                  )}
                >
                  {s.title}
                </span>
                <span
                  className={cn(
                    "block h-[2px] rounded-full transition-all shrink-0",
                    i === activeIdx
                      ? "w-6 bg-foreground"
                      : "w-3 bg-muted-foreground/40 group-hover:w-5 group-hover:bg-muted-foreground"
                  )}
                />
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {/* 하단 호버 감지 strip — 평소엔 투명, 마우스 진입 시 컨트롤 노출 */}
      <div
        className="fixed bottom-0 left-0 right-0 h-6 z-40"
        onMouseEnter={showBottom}
        aria-hidden="true"
      />

      {/* Pagination — 하단 중앙, 호버/키 트리거로 나타남 */}
      <div
        className={cn(
          "fixed bottom-5 left-1/2 -translate-x-1/2 z-50",
          "flex items-center gap-2 rounded-full border bg-background/90 backdrop-blur px-2 py-1.5 shadow-sm",
          "transition-all duration-200",
          bottomVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3 pointer-events-none"
        )}
        onMouseEnter={showBottom}
        onMouseLeave={hideBottomSoon}
      >
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={() => navigate(-1)}
          disabled={activeIdx <= 0}
          aria-label="Previous slide"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <span className="text-xs tabular-nums text-muted-foreground min-w-[3.5rem] text-center px-1">
          {activeIdx + 1} / {total}
        </span>
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={() => navigate(1)}
          disabled={activeIdx >= total - 1}
          aria-label="Next slide"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      {/* 현재 슬라이드 제목 — 좌하단, 같은 트리거에 반응 */}
      {activeSlide && (
        <div
          className={cn(
            "hidden md:block fixed bottom-5 left-5 z-40 text-xs text-muted-foreground bg-background/70 backdrop-blur px-3 py-1.5 rounded-full border max-w-[14rem] truncate",
            "transition-all duration-200",
            bottomVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3 pointer-events-none"
          )}
        >
          {activeSlide.title}
        </div>
      )}
    </>
  );
}
