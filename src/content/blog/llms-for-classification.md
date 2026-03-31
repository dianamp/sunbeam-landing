---
title: "How to use LLMs for Classification"
description: "A practical approach to using LLMs as classifiers by combining multi-criteria LLM judgments with a lightweight model like XGBoost for better accuracy and calibration."
date: 2025-07-28
tags: ["LLM", "ML"]
---

Many companies are using LLMs as zero-shot classifiers. And it's tempting!

In the past, predicting things like fraud or the risk of a return required a big investment in data exploration, feature engineering, and model training. Now? You can feed a big prompt packed with unstructured data and get one label back in a single LLM call. No need to train! No need to finetune anything!

But... there's a middle ground between rolling your own model and trusting a lone LLM output.

I've seen success by incorporating LLM-as-a-judge best practices into a still-simple classification pipeline.
Here's the approach:

### Instead of asking for one label, ask for multiple independent judgments across criteria relevant to your final classification:
- For return risk: evaluate user history, price sensitivity, return frequency, etc.
- For fraud: separate transaction amount risk, geolocation consistency, account trust score, etc.

### Set your prompts up for success:
- Ask for scores on a fixed scale (e.g. 1-5, not 1-100) to get both nuance and reliability
- Define grading criteria with examples for higher quality and consistency (1+ shot prompting)
- Ask for justification: "Why did you give this score?". This triggers the model to reason, improving the quality of the judgment

### Train a lightweight model:
- Combine those LLM scores into a feature table. Feed them into a classifier like XGBoost.
- You'll get actual accuracy metrics (precision/recall) and better calibration, instead of relying on a black box.

I've found these steps dramatically improve performance over a single LLM prompt, and you get clarity on error rates as a valuable by-product!
