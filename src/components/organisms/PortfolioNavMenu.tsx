import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PortfolioNavItem {
  id: string;
  title: string;
  href: string;
}

interface Props {
  /** "/portfolio" 또는 base prefix 포함 경로 */
  rootHref: string;
  /** 전체 포트폴리오 항목 */
  items: PortfolioNavItem[];
  /** 현재 페이지의 슬러그 — 강조용 */
  currentId: string;
}

/**
 * 좌상단 포트폴리오 네비.
 * - 기본: 텍스트만 "← 포트폴리오 목록" (뒤로가기 어포던스)
 * - 호버: 아래로 프로젝트 리스트가 TOC 스타일(dash + 제목)로 펼쳐짐
 * - 카드/배경 없이 텍스트만, 우측 슬라이드 TOC와 톤 통일
 */
export default function PortfolioNavMenu({
  rootHref,
  items,
  currentId,
}: Props) {
  return (
    <nav
      aria-label="Portfolio navigation"
      className="fixed top-[calc(var(--header-h,3.5rem)+1rem)] left-5 z-40 group/portnav"
    >
      {/* 트리거 — 텍스트 기반 뒤로가기 링크 */}
      <a
        href={rootHref}
        className={cn(
          "inline-flex items-center gap-1.5 text-xs font-medium",
          "text-muted-foreground hover:text-foreground transition-colors"
        )}
      >
        <ArrowLeft
          className="size-3.5 transition-transform group-hover/portnav:-translate-x-0.5"
        />
        <span>Portfolio</span>
      </a>

      {/* 호버 시 펼쳐지는 항목 리스트 — TOC 스타일 (카드/배경 없음) */}
      <ol
        className={cn(
          "mt-3 flex flex-col gap-1.5 items-start",
          "opacity-0 -translate-y-1 pointer-events-none",
          "transition-all duration-150",
          "group-hover/portnav:opacity-100 group-hover/portnav:translate-y-0 group-hover/portnav:pointer-events-auto",
          "group-focus-within/portnav:opacity-100 group-focus-within/portnav:translate-y-0 group-focus-within/portnav:pointer-events-auto"
        )}
      >
        {items.map((item) => {
          const isCurrent = item.id === currentId;
          return (
            <li key={item.id}>
              <a
                href={item.href}
                aria-current={isCurrent ? "page" : undefined}
                aria-label={item.title}
                className={cn(
                  "flex items-center gap-2 px-2 py-1 rounded-full text-xs whitespace-nowrap transition-colors",
                  isCurrent
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "block h-0.5 rounded-full transition-all shrink-0",
                    isCurrent
                      ? "w-6 bg-foreground"
                      : "w-3 bg-muted-foreground/40"
                  )}
                />
                <span
                  className={cn(
                    "bg-background/90 backdrop-blur px-2 py-0.5 rounded border max-w-56 truncate",
                    isCurrent && "font-semibold"
                  )}
                >
                  {item.title}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
