import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import FlexSearch from "flexsearch";
import { blogSearchDocumentOptions } from "../../configs/search-config";

export const GET: APIRoute = async () => {
  const posts: CollectionEntry<"blog">[] = (await getCollection("blog")).filter(
    (post: CollectionEntry<"blog">) => !post.data.draft
  );

  const index = new FlexSearch.Document(blogSearchDocumentOptions);

  posts.forEach((post, i) => {
    index.add({
      id: i,
      title: post.data.title,
      description: post.data.description || "",
      slug: post.slug,
    });
  });

  const serialIndex: Record<string, string> = {};
  await Promise.resolve(
    index.export((key: string, data: string) => {
      serialIndex[key] = data;
    })
  );

  return new Response(JSON.stringify(serialIndex), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
