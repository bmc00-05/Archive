import { getCollection, type CollectionEntry } from "astro:content";

const isProd = import.meta.env.PROD;

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
