import { getCollection, type CollectionEntry } from "astro:content";
import { SITE_URL } from "../consts/seo";

export async function GET() {
  const posts: CollectionEntry<"blog">[] = (await getCollection("blog")).filter(
    (post: CollectionEntry<"blog">) => !post.data.draft
  );
  const staticPages = [
    {
      url: `${SITE_URL}/`,
      lastmod: new Date().toISOString(),
    },
    {
      url: `${SITE_URL}/blog/`,
      lastmod: posts[0]
        ? (posts[0].data.modifiedDate ?? posts[0].data.pubDate).toISOString()
        : new Date().toISOString(),
    },
  ];

  const postPages = posts.map((post: CollectionEntry<"blog">) => ({
    url: `${SITE_URL}/blog/${post.id}/`,
    lastmod: (post.data.modifiedDate ?? post.data.pubDate).toISOString(),
  }));

  const urls = [...staticPages, ...postPages];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(
      ({ url, lastmod }) =>
        `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
    )
    .join("\n")}\n</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
