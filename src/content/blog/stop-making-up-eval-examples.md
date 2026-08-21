---
title: "Stop making up eval examples"
description: "Why eval suites built on invented examples teach you almost nothing, and what to do instead."
date: 2026-08-21
tags: ["AI", "LLM"]
---

Let's all repeat together: we 👏 base 👏 our 👏 evals 👏 off 👏 of 👏 our 👏 actual 👏 traces. 👏 We do not make up pretend traces!!! 👏

I know making up examples for our eval suite feels faster. But you learn next to nothing.

What happens when you make up data for evals? You end up testing only the failure modes you have imagined, on data you made up. Both are usually quite different from what is actually happening in your system. So you end up with an eval suite that checks for cases that were never really a problem for your system.

Instead, look at your actual traces, annotate those, and base your evals off of the failures you see (and a couple of successes). This is how you build confidence in your system and avoid regressions, which is the point of evals.

I've helped a bunch of clients set up evals now, and this is the first misunderstanding I run into. The concept is simple, but the annotations do require human judgement (and domain expertise), so that's where the real work lies.
