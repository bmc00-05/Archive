import { useMemo, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PostItem {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  thumb: string | null;
  tags: string[];
}

interface Props {
  base: string;
  posts: PostItem[];
  pageSize?: number;
}

export default function PostListInteractive({ base, posts, pageSize = 5 }: Props) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query, posts]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, totalPages);
  const paged = filtered.slice((current - 1) * pageSize, current * pageSize);

  function onSearch(v: string) {
    setQuery(v);
    setPage(1);
  }

  return (
    <div>
      {/* 검색 */}
      <div className="relative mb-6">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="글 검색 (제목 · 요약 · 태그)"
          className="w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm outline-none transition-colors focus:border-foreground/30"
        />
      </div>

      {/* 목록 */}
      {paged.length === 0 ? (
        <div className="rounded-lg border p-10 text-center">
          <p className="text-sm text-muted-foreground">
            {query ? `"${query}" 검색 결과가 없습니다.` : "아직 글이 없습니다."}
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {paged.map((post) => (
            <li key={post.id}>
              <a
                href={`${base}/blog/${post.id}`}
                className="group flex h-32 items-stretch overflow-hidden rounded-xl border bg-card transition-colors hover:border-foreground/20 hover:bg-accent/40 md:h-40"
              >
                <div className="flex min-w-0 flex-1 flex-col overflow-hidden p-5">
                  <h2 className="line-clamp-1 text-lg font-semibold tracking-tight underline-offset-4 group-hover:underline">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
                    {post.description}
                  </p>
                  <time className="mt-3 block text-xs text-muted-foreground">
                    {post.date}
                  </time>
                </div>
                {post.thumb && (
                  <img
                    src={post.thumb}
                    alt=""
                    loading="lazy"
                    className="h-full w-48 shrink-0 border-l bg-muted object-cover md:w-60"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <nav className="mt-8 flex items-center justify-center gap-1">
          <button
            type="button"
            aria-label="이전 페이지"
            disabled={current === 1}
            onClick={() => setPage(current - 1)}
            className="inline-flex size-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft className="size-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              aria-current={n === current ? "page" : undefined}
              className={cn(
                "inline-flex size-8 items-center justify-center rounded-md border text-sm transition-colors",
                n === current
                  ? "border-foreground bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {n}
            </button>
          ))}

          <button
            type="button"
            aria-label="다음 페이지"
            disabled={current === totalPages}
            onClick={() => setPage(current + 1)}
            className="inline-flex size-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight className="size-4" />
          </button>
        </nav>
      )}
    </div>
  );
}
