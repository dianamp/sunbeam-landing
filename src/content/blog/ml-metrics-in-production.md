---
title: "ML metrics in production"
description: "Why standard uptime monitoring isn't enough for AI-powered features, and the minimum metrics teams should track to catch model drift and degradation."
date: 2025-09-19
tags: ["ML"]
---

In my consulting work, I keep seeing this:

Teams ship an AI-powered feature... but they're strapped for time, focused on the next release, and only set up basic uptime monitoring.

In traditional software, monitoring is straightforward:
Is the API up? Is errors spiking? Is latency OK?

But when your feature relies on a model that makes predictions, **it's probabilistic** - meaning it can drift, degrade, or subtly fail without throwing a single error. Shipping a predictive feature takes extra effort here.

At minimum, I tell clients to track:

1. **Input drift** — are the types of data you're getting the same as you trained on?
2. **Output distribution** — are predictions still within expected ranges?
3. **Performance over time** — if you have ground truth later, check how accuracy changes.

The risk with skipping this step is finding out months later that your model has been confidently wrong for an entire user segment. Your users lose trust, your team scrambles to patch it, and your roadmap takes a hit.

**The fix: set up lightweight monitoring from day one.**
