---
title: "Getting Started with Astro for My Blog"
description: "Why I chose Astro and how this blog is structured."
pubDate: 2026-02-26
modifiedDate: 2026-05-14
tags: ["thoughts", "blog"]
readTime: 2min
---

This website started as a React portfolio. That was enough for showing projects, but once I wanted to add a blog, the setup started to feel incomplete. At first, I thought I could write blog posts as plain HTML files. That idea fell apart quickly. I wanted to write articles the same way I write notes: quickly with very little friction while still having the option to drop into HTML when I needed something more custom. That is when I found Markdown. It gave me exactly what I needed. I could write in a simple format, stay focused on the content and still embed raw HTML in the few places where Markdown alone was not enough. Later I came across MDX too, but for this blog it felt like more power than I need right now. Plain Markdown already solves the real problem for me and it keeps the writing flow simple.

Once I settled on Markdown, the next problem was rendering it into HTML. I already knew about `remark`, so that was my first instinct. I experimented with setting things up manually, but after a while it became clear that I was building too much infrastructure around a very simple goal.

During that search, I kept running into different tools through Fireship videos, blog posts and ChatGPT: Next.js, Hugo, Jekyll, Gatsby and Astro.
Since my site already used React, Next.js felt like the natural next step. I installed it and started trying to integrate it into the portfolio. For a while, it looked like the obvious choice, but I eventually hit a wall with the configuration. I could not fully wrap my head around how everything fit together at the time. Another thing that pushed me away from Next.js was how tightly it seemed connected to Vercel. A lot of the recommendations I found online pointed in that direction. That is not necessarily a bad thing, but it made the stack feel more coupled than I wanted.

After that, I moved to the next option on my list: Astro.I first remember hearing about Astro in a Fireship video and honestly, I thought it was being overhyped. At the time, I had not yet seen where I would use it, so it felt like just another framework people were excited about. That changed once I actually had a real use case for it. Seeing that Astro uses Vite internally was an immediate plus for me because Vite is a tool I already use often. More importantly, Astro matched what I wanted this blog to be:

- static by default
- simple to reason about
- friendly to Markdown content
- flexible enough when I need custom UI

At that point, I stopped caring too much about whether another framework might be a slightly better on paper. Astro was clearly capable of handling what I needed and it felt easier to understand than the alternatives I had tried.

I initially assumed Astro might just be another overhyped UI framework but after using it, that is not how I see it anymore.What I like most so far is its simplicity and its static site generation workflow. It lets me keep content in Markdown, generate fast pages and still have full control over how the site looks and behaves.

I am sure there is still a lot about Astro that I have not learned yet, but it already feels like the right foundation for this blog.
