export const BLOG_SEARCH_INDEX_PATH = "blog/search-index.json";
export const BLOG_SEARCH_MIN_QUERY_LENGTH = 1;
export const BLOG_SEARCH_QUERY_OPTIONS = {
  enrich: true,
  suggest: true,
} as const;

export function getBlogSearchIndexUrl(origin: string, baseUrl: string): string {
  const base = new URL(baseUrl, origin);
  return new URL(BLOG_SEARCH_INDEX_PATH, base).toString();
}

export const blogSearchDocumentOptions = {
  tokenize: "full" as const,
  encoder: "LatinAdvanced" as const,
  document: {
    id: "slug",
    index: ["title", "description"],
    store: ["title", "slug"],
  },
};
