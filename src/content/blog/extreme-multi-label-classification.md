---
title: "Notes on Extreme Multi-label Classification"
description: "What I took away from the PRIME paper on classifying into enormous label spaces, and why its momentum-updated label centroids are the interesting part."
date: 2026-03-26
tags: ["ML", "reading"]
---

I've been reading about **Extreme Multi-label Classification (XMC)** for one of my projects lately: problems where you're classifying into an enormous label space, like mapping patient summaries to thousands of diagnosis codes, or matching product descriptions to a large set of categories.

One paper I really loved was the [PRIME paper](https://arxiv.org/abs/2410.20401). Their approach uses contrastive learning, but with a twist. Instead of using static text embeddings for labels, they introduced a **Label Prototype Network** that builds richer label representations by fusing three things:

1. the label text
2. a learnable vector
3. a momentum-updated centroid (a running average of training examples seen for that label)

That centroid piece is what stuck with me. It gives the model a continuously updated memory of what each label looks like *in practice*, which really helps with the missing labels and label ambiguity these problems always have in the real world.

If you're working in long-tail classification, it's worth a read.
