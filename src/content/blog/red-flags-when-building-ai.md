---
title: "Red flags when building AI"
description: "Common red flags that lead to AI builds dragging on indefinitely or features falling flat on launch, and how to distinguish them from the expected discomfort of building probabilistic systems."
date: 2026-02-11
tags: ["AI", "ML"]
---

Some of my clients are highly competent product and engineering organizations. They have a proven rhythm for building and shipping software. But when they start building AI or ML features for the first time, that rhythm necessarily gets disrupted.

![animals-confused](/images/blog/2026-animals-confused.png)

Their new process can feel chaotic, less predictable, and very uncomfortable.

There's the expected uncertainty that teams feel: The tech is new. The tooling is evolving. You're figuring out guardrails and evals for the first time.

But engineering teams are used to figuring out new tech and tooling.

What makes this process most challenging is figuring out how to deal with a probabilistic system:

- There will always be errors in the system
- Improvements in one set of use cases may degrade another.
- You often don't know whether the solution will be "good enough" until you're deep into it.
- For open-ended chat features especially, the surface area is massive. A user can ask almost anything, and every input needs to be handled gracefully.

That ambiguity is uncomfortable, and can make the process of building feel chaotic. I tell teams that this discomfort and perceived chaos is expected.

However, there are actual red flags to look out for, ones that lead to builds that drag on indefinitely or features that fall flat on launch. Here are just a few:

- No working demo after weeks of effort, and no regular demos
- Planning architecture and how to productionize before the working demo is good enough
- No measurable progress against eval metrics (and waiting too long to setup evals)
- Endless model debates with no user-facing tests
- Decisions are being driven by excitement about the technology rather than a clear customer problem

If you're building something new with AI and the uncertainty feels overwhelming, keep moving forward and keep your eye on the actual red flags.
