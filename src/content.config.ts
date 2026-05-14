import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    modifiedDate: z.coerce.date().optional(),
    readTime: z.string().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([])
  })
});

export const collections = { blog };
