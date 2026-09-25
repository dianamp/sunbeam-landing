---
title: "My take on Jev"
description: "Jev is the first in a new class of models that allow us to build LLM applications more efficiently and at lower cost. Typed questions in, typed answers with probabilities out."
date: 2026-09-24
tags: ["AI", "LLM"]
---

My take on Jev? Love it as the first in a new class of models that allow us to build LLM applications more efficiently and at lower cost. I see this as a first step, and I expect other new model types that we can use programmatically.

If you need a quick overview, this one is nice:

<div class="my-6">
  <a href="https://www.youtube.com/watch?v=4u6-uiDpJ6o" target="_blank" rel="noopener" class="group inline-flex items-center gap-3 !no-underline" aria-label="Watch Jev Explained for Beginners with Demo by KodeKloud on YouTube (opens in a new tab)">
    <span class="relative block w-40 shrink-0">
      <img src="/images/blog/2026-jev-video.jpg" alt="Thumbnail for the video Jev Explained for Beginners with Demo" width="320" height="180" loading="lazy" class="!my-0 w-full rounded-md border border-slate-200">
      <span class="absolute inset-0 flex items-center justify-center">
        <span class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/70 transition-colors group-hover:bg-sunbeam-500">
          <svg viewBox="0 0 24 24" class="ml-0.5 h-4 w-4 fill-white" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
        </span>
      </span>
    </span>
    <span class="text-sm text-slate-500 group-hover:text-sunbeam-700">Jev Explained for Beginners with Demo (KodeKloud, YouTube)</span>
  </a>
</div>

And here's the quick background: Jev is the first model from TypeSafe AI, released on September 15, 2026. They call it a "System One" model, which is a model designed to make quick decisions, based on the concept of System One ("fast") thinking described in Daniel Kahneman's book *Thinking, Fast and Slow* (great book btw, but a little too long). 

The model does not generate text. Instead, you send it some state plus typed questions, and you get typed answers with probabilities. 

For example, here's a query:

```json
{
  "model": "jev-latest",
  "state": "Hi, I signed up last week and I want to cancel before my card gets charged.",
  "questions": {
    "query_type": {
      "type": "choice",
      "instructions": "Which category is an appropriate match for the user query",
      "criteria": {
        "status_check": "Customer is asking about the state of an order, ticket, or account",
        "cancellation": "Customer wants to cancel a subscription, order, or service",
        "complaint": "Customer is unhappy with a product or experience and wants it addressed"
      }
    }
  }
}
```

and a response:

```json
{
  ...
  "query_type": {
    "type": "choice",
    "choice": "cancellation",
    "confidence": 0.9,
    "probabilities": {
      "status_check": 0.05,
      "cancellation": 0.92,
      "complaint": 0.03
    }
  }
}
```

Currently, the AI applications we build use LLMs as a primitive because they provide something that our old programming primitives (data structures, control flow, functions) can't: they can work with natural language inputs, and they make it pretty easy to put together an agent that "figures things out" with some instructions and access to a set of tools. The workflows that an app supports don't need to be programmed one at a time. All this is pretty cool.

But, LLMs (the ones we're all familiar with, with an autoregressive loop that does next-token prediction) are also kind of insane to use as primitives for applications:

1. **They are very inefficient:** unstructured text ends up being the communication protocol between machines. Take a prompt to power an agentic router, which may look something like:
   ```
   You are an assistant that routes user queries to the appropriate category.
   Here are your options: 
   - Status check
   - Cancellation
   - Complaint
   Here is the user query: {query}
   Respond in json with the following format: {"query_type": ...} and nothing else.
   ```
   You get a response from your LLM that you now need to parse and map to expected format and types, you need to handle type errors, you need to retry when you don't get the expected format. That's a lot of overhead!
2. **They don't give a sense of certainty:** you have no trustworthy information about whether it was a close call between "Cancellation" and any of the other options. You can pull logprobs from most APIs, but those numbers aren't calibrated, so they're not very meaningful. You end up doing a bunch of calibration and testing to see how reliable this routing prompt is. Or just hope it sort of works.
3. Not to mention, **they are nondeterministic!** We are trying to build reliable software on top of a primitive that gives us different results every time, and we don't have any guarantees around consistency.

So, LLMs are a stopgap for many decision tasks, and there are many aspects that can be improved!

I love that Jev introduces a new class of models that can be used as (better) programmatic primitives. 

To go back to the routing example above, we send a `choice` query as input to Jev. There is no need to parse structured outputs, and we get guarantees around our response format and types, no need to manage that! The model can't return anything outside the options that have been defined. In addition, the probabilities are (intended to be) calibrated and consistent, so although they can drift slightly between calls, the idea is that when the probabilities are high, they are more reliable for control flow. It's also fast and cheap because output is not generated autoregressively and is very short.

It's a step towards what I expect to be other new classes of models that will behave more favorably as primitives in our applications.
