import { useEffect, useState } from "react"
import { Document } from "flexsearch"
import { FiSearch } from "react-icons/fi"
import type { SearchDoc } from "../types"
import {
  BLOG_SEARCH_MIN_QUERY_LENGTH,
  BLOG_SEARCH_QUERY_OPTIONS,
  getBlogSearchIndexUrl,
  blogSearchDocumentOptions
} from "../configs/search-config"
import "./Search.css"

type SearchProps = {
  posts: SearchDoc[]
}

type SearchIndexDocument = Pick<SearchDoc, "title" | "description" | "slug">

type SearchResultGroup = {
  result: Array<{
    id: string
  }>
}

export default function Search({ posts }: SearchProps) {
  const [query, setQuery] = useState("")
  const [index, setIndex] = useState<Document<any> | undefined>()
  const [resultSlugs, setResultSlugs] = useState<Set<string>>(new Set())

  async function loadIndex() {
    try {
      const indexUrl = getBlogSearchIndexUrl(window.location.origin, import.meta.env.BASE_URL)
      const res = await fetch(indexUrl)
      if (!res.ok) {
        throw new Error(`Search index request failed: ${res.status} ${res.statusText}`)
      }

      const searchDocuments = await res.json() as SearchIndexDocument[]
      const idx = new Document(blogSearchDocumentOptions)
      searchDocuments.forEach((doc) => {
        idx.add(doc)
      })

      setIndex(idx)
    } catch (error) {
      console.error("Failed to load blog search index:", error)
      setIndex(undefined)
    }
  }

  useEffect(() => {
    loadIndex()
  }, [])

  useEffect(() => {
    if (!index || query.length < BLOG_SEARCH_MIN_QUERY_LENGTH) {
      setResultSlugs(new Set())
      return
    }

    const searchResults = index.search(query, BLOG_SEARCH_QUERY_OPTIONS) as SearchResultGroup[]
    const slugs = new Set<string>()
    searchResults.forEach((resultGroup) => {
      resultGroup.result.forEach((result) => {
        slugs.add(result.id)
      })
    })

    setResultSlugs(slugs)
  }, [query, index])

  const visiblePosts = query.length < BLOG_SEARCH_MIN_QUERY_LENGTH
    ? posts
    : posts.filter((post) => resultSlugs.has(post.slug))

  return (<>
    <section className="blog-search" aria-label="Search blog posts">
      <div className="search-input-wrap">
        <input
          id="search"
          type="text"
          placeholder="Search posts..."
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="search-icon" aria-hidden="true">
          <FiSearch size={15} />
        </span>
      </div>
    </section>
    <section>
      <ul className="blog-list">
        {visiblePosts.map((post) => (
          <li key={post.id}>
            <article>
              <h2>
                <a href={`/blog/${post.slug}/`}>{post.title}</a>
              </h2>
              <p>{post.description}</p>
              <small>{post.pubDate}</small>
            </article>
          </li>
        ))}
        {query.length >= BLOG_SEARCH_MIN_QUERY_LENGTH && visiblePosts.length === 0 && (
          <li>
            <article>
              <p>No posts matched "{query}".</p>
            </article>
          </li>
        )}
      </ul>
    </section>
  </>
  )
}
