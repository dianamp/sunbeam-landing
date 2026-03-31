---
title: "Data shapes design"
description: "One of the biggest mindset shifts when building AI features: moving from design-first to data-first, where your data determines what's feasible, stable, and valuable."
date: 2025-10-21
tags: ["ML"]
---

I've seen many teams go through the shift of shipping their first predictive or AI-powered feature.

One of the biggest mindset shifts required?
Moving from **"design shapes data"** to **"data shapes design."**

![Design shapes data vs data shapes design](/images/blog/2025_data_shapes_design.jpeg)

In traditional software, design shapes data. You design the UI and APIs you want to build, then create a schema to support them. Data conforms to the design.

It's like building a house: you start with the blueprint, then pick materials to match the design. You might choose wood siding, a metal roof, and a concrete foundation. *The design comes first, materials second.*

**In AI, it flips.**
Data becomes your raw material *and* your design constraint.

You're still building a house, but whether you're working with straw, wood, or steel completely changes what you can build. You can't build a glass pavilion if you only have bricks.

**Your data determines what's feasible, stable, and valuable.**

That's why the first step in building any AI feature should always be a POC with your actual data:

1. **Define the problem** you're solving
2. **Check what data** you actually have
3. **Validate** if your data can support the experience you want

Once you validate it's shippable, *then* design the surrounding system.
Otherwise, you're designing based on (very likely) false assumptions.
