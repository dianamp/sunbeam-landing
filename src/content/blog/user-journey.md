---
title: "Jobs to be done for ML features"
description: "Why the placement of an ML feature in the user journey matters more than model choice, using the Jobs-to-Be-Done framework to define what your model should optimize for."
date: 2025-12-02
tags: ["ML"]
---

I've been working with two clients recently who are building recommender systems. (Think: recommending fitness classes based on people's goals. Not a real client example, but you get the idea.)

The instinct is to jump straight to building: What data do we have? What model should we try?

I love moving fast and getting started prototyping, but there's one step you can't skip. You need to determine the placement:
*Where in the user journey will this recommendation appear?*

Why? Because this completely changes what the user is trying to accomplish, and therefore what kind of recommender is appropriate.

*The placement defines model requirements:*

| | **Browsing/Exploring** | **Deciding/Checking out** |
|---|---|---|
| **User goal** | Discovery, inspiration | Confidence, commitment |
| **Optimize for** | Novelty, diversity, engagement | Relevance, conversion |

I love using the **[Jobs-to-Be-Done (JTBD)](https://www.youtube.com/watch?v=xQV7HVyAJjc)** framework here. The quick primer: A fast-food chain once studied milkshake sales by asking morning commuters: *what job are you hiring this milkshake to do?* They discovered the real "job" wasn't satisfying a sweet tooth, it was making a boring commute more tolerable while being easy to consume in a car. That insight led to completely different product decisions than if they had just focused on making a "tastier" milkshake.

The same question is relevant when building AI features:
> What job is the user trying to get done at that exact moment?

That answer does two critical things:

1. **It gives you the right success metric.**
Are they browsing? Deciding? Comparing? Committing?
Each has a totally different definition of "good."

2. **It tells you what your ML model should optimize for.**
Browsing/Exploring? → optimize for discovery, novelty, engagement
Deciding/Checking out? → optimize for confidence/conversion

The placement in the journey *determines* what you build. **The job comes first, and the model comes second.**
