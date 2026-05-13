import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";

export const GET: APIRoute = async () => {
  const posts: CollectionEntry<"blog">[] = (await getCollection("blog")).filter(
    (post: CollectionEntry<"blog">) => !post.data.draft
  );

  const searchDocuments = posts.map((post) => ({
    title: post.data.title,
    description: post.data.description || "",
    slug: post.id,
  }));

  return new Response(JSON.stringify(searchDocuments), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
