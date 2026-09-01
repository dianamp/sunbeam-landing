---
title: "QA isn't coming back, it's splitting"
description: "AI can handle the QA a separate team used to do. What it can't handle is domain judgement, and that belongs closer to the product."
date: 2026-09-01
tags: ["AI", "leadership"]
---

I had an interesting discussion last week about where QA is heading, and whether AI-written code means we'll be bringing back separate QA teams.[^1]

I don't see it happening. AI can do a pretty good job of the kind of QA that a separate QA team performed in the past. Claude will think through the happy path, and all the edge cases, and automate all of that.

The gap, though, is domain judgement. An AI agent doing QA can answer "does this work", but it isn't as good with "is this output right for this domain, and for this customer?" That takes a true domain expert with a deep understanding of the customer. This is the product side of QA, which should be owned by the product-forward engineer, or by the PM.

To take an example from a job candidate fraud detection system I'm working on right now (Attesto): we have agents performing the candidate background research that hiring managers are often tasked with. AI can catch the obvious bugs, and check that the expected results are found, and it does. But whether the various agents are producing output that a hiring manager will actually find relevant and compelling, that is definitely not something a separate QA team can tell us. That needs to be evaluated by someone immersed in the customer and the domain. And then that human judgement can be cataloged and re-run using evals, as the product gets updated.

So I don't think QA is coming back as a team. I think it's splitting, and the half that survives is the half that needs domain judgement, which sits much closer to the product.

[^1]: For the record, I never liked separate QA teams, and preferred for engineers who wrote the code to QA it. But they did exist.
