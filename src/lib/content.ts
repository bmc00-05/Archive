import { getCollection, type CollectionEntry } from "astro:content";

const isProd = import.meta.env.PROD;

/* ───── 폴더별 카테고리 메타 (_category.json) ─────
 * 각 카테고리 폴더가 자기 라벨/순서를 갖는다 (Docusaurus _category_ 방식).
 * 빌드 시 Vite glob 으로 모든 _category.json 을 읽어 경로→메타 맵을 만든다.
 * 파일이 없으면 라벨=슬러그, 순서=999(맨 아래) 로 폴백된다.
 */
interface CategoryMeta {
  label?: string;
  order?: number;
}

const categoryMetaModules = import.meta.glob<{ default: CategoryMeta }>(
  "/src/content/blog/**/_category.json",
  { eager: true }
);

const categoryMetaMap = new Map<string, CategoryMeta>();
for (const [file, mod] of Object.entries(categoryMetaModules)) {
  // "/src/content/blog/algorithm/data-structures/_category.json" → "algorithm/data-structures"
  const path = file
    .replace("/src/content/blog/", "")
    .replace(/\/_category\.json$/, "");
  categoryMetaMap.set(path, mod.default);
}

function labelFor(path: string, fallback: string): string {
  return categoryMetaMap.get(path)?.label ?? fallback;
}

function orderFor(path: string): number {
  return categoryMetaMap.get(path)?.order ?? 999;
}

export async function getPublishedPosts() {
  const posts = await getCollection("blog", ({ data }) => {
    return !isProd || data.draft !== true;
  });
  return posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export async function getPublishedProjects() {
  const projects = await getCollection("projects", ({ data }) => {
    return !isProd || data.draft !== true;
  });
  return projects.sort((a, b) => {
    if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
    return a.data.order - b.data.order;
  });
}

export async function getFeaturedProjects() {
  const projects = await getPublishedProjects();
  return projects.filter((p) => p.data.featured);
}

export type ProjectEntry = CollectionEntry<"projects">;
export type BlogEntry = CollectionEntry<"blog">;

/**
 * 글 본문(raw markdown/mdx)에서 처음 삽입된 이미지의 src 를 찾는다.
 * 코드블록 안의 이미지는 무시한다. markdown `![](src)` 와 html `<img src>` 모두 지원.
 * 없으면 undefined.
 */
export function firstImage(body?: string): string | undefined {
  if (!body) return undefined;
  const withoutCode = body.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "");
  const md = withoutCode.match(/!\[[^\]]*\]\(\s*(\S+?)\s*(?:"[^"]*")?\)/);
  const html = withoutCode.match(/<img[^>]+src=["']([^"']+)["']/i);
  const matches = [md, html].filter(Boolean) as RegExpMatchArray[];
  if (matches.length === 0) return undefined;
  matches.sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
  return matches[0][1];
}

/** 목록용 썸네일: frontmatter cover 우선, 없으면 본문 첫 이미지. */
export function getThumbnail(entry: BlogEntry): string | undefined {
  return entry.data.cover ?? firstImage(entry.body);
}

/* ─────────────────────────── 블로그 카테고리 트리 ─────────────────────────── */

export interface TreePost {
  id: string;
  title: string;
  pubDate: Date;
}

export interface SubCategory {
  slug: string;
  path: string;
  label: string;
  posts: TreePost[];
}

export interface Category {
  slug: string;
  path: string;
  label: string;
  order: number;
  /** 대분류 폴더에 직접 들어있는 글 (소분류 없이) */
  directPosts: TreePost[];
  subcategories: SubCategory[];
}

export interface BlogTree {
  /** 카테고리 무관 최신글 */
  recent: TreePost[];
  /** 폴더 구조 기반 대분류 → 소분류 → 글 */
  categories: Category[];
}

const toTreePost = (p: BlogEntry): TreePost => ({
  id: p.id,
  title: p.data.title,
  pubDate: p.data.pubDate,
});

/**
 * 폴더 구조로부터 블로그 카테고리 트리를 만든다.
 * post.id 는 blog/ 기준 상대 경로(확장자 제외). 마지막 세그먼트는 글 슬러그,
 * 앞 세그먼트들이 카테고리 경로가 된다.
 *   "frontend/pnpm-..."                  → 대분류 frontend 직속
 *   "algorithm/data-structures/binary-tree" → 대분류 algorithm > 소분류 data-structures
 *   "single-post"                        → 카테고리 없음(최신글에만 노출)
 */
export async function getBlogTree(recentCount = 5): Promise<BlogTree> {
  const posts = await getPublishedPosts(); // pubDate 내림차순 정렬됨
  const recent = posts.slice(0, recentCount).map(toTreePost);

  const catMap = new Map<string, Category>();

  for (const p of posts) {
    const segments = p.id.split("/");
    const categoryPath = segments.slice(0, -1); // 글 슬러그 제외
    if (categoryPath.length === 0) continue; // 미분류 글은 최신글에만

    const catSlug = categoryPath[0];
    let cat = catMap.get(catSlug);
    if (!cat) {
      cat = {
        slug: catSlug,
        path: catSlug,
        label: labelFor(catSlug, catSlug),
        order: orderFor(catSlug),
        directPosts: [],
        subcategories: [],
      };
      catMap.set(catSlug, cat);
    }

    if (categoryPath.length === 1) {
      cat.directPosts.push(toTreePost(p));
    } else {
      const subSlug = categoryPath[1];
      const subPath = `${catSlug}/${subSlug}`;
      let sub = cat.subcategories.find((s) => s.slug === subSlug);
      if (!sub) {
        sub = { slug: subSlug, path: subPath, label: labelFor(subPath, subSlug), posts: [] };
        cat.subcategories.push(sub);
      }
      sub.posts.push(toTreePost(p));
    }
  }

  const categories = [...catMap.values()].sort(
    (a, b) => a.order - b.order || a.label.localeCompare(b.label)
  );

  return { recent, categories };
}
