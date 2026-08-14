---
title: "Use LLMs to build features, classical ML to predict"
description: "A pattern that works well for predictive models: let LLMs extract signal from messy unstructured data, then let a model like XGBoost make the actual prediction."
date: 2026-07-09
tags: ["LLM", "ML"]
---

One powerful pattern for predictive models that I've seen work well across several teams: **use LLMs to build the features, then layer classical ML on top to make the prediction.**

The LLMs do what they're great at. They pull signal out of messy, unstructured input and make subjective calls. An LLM or agent can build features a traditional pipeline never could:

- the sense of urgency in a message (very subjective)
- the consistency between two documents
- the trendiness of a product

Plus, it's very quick and easy to build a prompt to extract this.

Then a classical model like XGBoost learns to predict from those messy, noisy signals. And because the model on top is well understood, the prediction stays consistent and reliable, so that you can actually trust your accuracy metrics.

I've found that adding LLM-generated features lets you lift accuracy well beyond what traditional tabular features alone can reach. I've seen this work for forecasting, conversion, fraud, and other risk scores.

Anyone else building this way?
