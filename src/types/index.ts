import type { CollectionEntry } from 'astro:content'

export type BlogPostEntry = CollectionEntry<'blog'>

export type SearchDoc = {
  id: string
  title: string
  description: string
  slug: string
  pubDate: string
}
