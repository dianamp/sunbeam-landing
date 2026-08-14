---
title: "Two themes from AI Dev"
description: "My takeaways from the AI Dev Conference in San Francisco"
date: 2026-05-28
tags: ["AI"]
---

Day 1 of AI Dev left me feeling inspired. The content quality was super high, I met a few new friends, and I wrote down a bunch of ideas I'm excited to explore.

<img src="/images/blog/2026-ai-dev.jpg" alt="My AI Dev 26 SF attendee badge: Diana Pfeil, Founder, Sunbeam Consulting" style="width: 66%; display: block; margin: 1.5rem auto;" />

Two big themes came through across the talks.

## 1. Harness engineering is everywhere

So many of the tools and libraries people are writing and adopting exist to help us deal with the fact that our new primitives (LLMs) are extremely unreliable.

Our old software primitives, like data structures and functions, were simple. Our new ones are very complex and nondeterministic. They need a lot of orchestration to actually be useful.

A few libraries that stuck with me:

- **Giskard** for red-teaming LLMs
- **Hydro** for correct and performant distributed systems, which helps safeguard the output of coding agents
- **Monocle** for capturing traces from genAI apps

## 2. From writing code to guiding agents

The second theme is the shift in software engineering from writing code to guiding coding agents.

When you have a workforce of agents at your fingertips, the real question becomes: are you the Michael Scott version of a manager of those agents, or the opposite?

Judgment, critical thinking, and executive function skills (prioritizing, operating at the appropriate level, and so on) become more important than ever.
