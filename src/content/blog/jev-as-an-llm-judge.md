---
title: "Evaluating Jev as an LLM judge"
description: "On one judge I was tuning, Jev roughly tied gpt-5-mini at 1/50th the cost. But it still needs a threshold and labeled data to make good decisions."
date: 2026-09-29
tags: ["AI", "LLM", "evals"]
draft: true
---

Since I do a lot of work with AI evals, I've been testing Jev as an LLM judge, and I'm now considering where to swap it in across various projects.

Overall, I'm quite impressed and excited: on one judge I was tuning, Jev roughly tied gpt-5-mini at 1/50th the cost.

The biggest point the experiment validated is that Jev is not just magically able to make decisions well. It needs the right context and instructions, and it most likely needs to be tuned.

For a quick note on what Jev is, see my [previous post](/blog/jev-new-class-of-models).

## The experiment

I took a judge I was working on last week that judges for verbose replies in a chatbot app. From looking at traces, verbose replies show up as:

- **Unsolicited follow ups:** "Would you like me to escalate this?" or "I can also check your other orders" when the user asked for neither.
- **Overcomplicated responses that involve repetition:** the same fact stated two or three ways, or a closing summary that restates the answer.
- **Policy mechanics nobody asked about:** caveats and background related to policies that don't apply to the user.

The original judge was a single prompt for gpt-4o-mini. I hand-labeled about 100 conversations, used a small training split to pick the prompt examples.

I swapped Jev in as the LLM judge, which involved re-formatting the prompt into the Jev format. I broke down a single prompt that describes these three aspects of verbose replies, with some examples, etc, into the Jev format that asks for an overall score (Does `final_reply` contain content the user did not need to answer `user_request`?) with individual scores for those three types of verbosity. Here's one of them:

```json
"repetition": {
  "type": "noul",
  "instructions": "Does `final_reply` state the same fact or instruction more than once?",
  "criteria": {
    "true": "The same fact, date, status, or instruction appears twice or more in `final_reply`, for example a closing summary that restates what was already said ...",
    "false": "Each fact and instruction in `final_reply` appears once. Listing the order number, amount, status, and timing once each is not repetition."
  }
}
```

The conversation goes in as the state, split into named fields (`earlier_conversation`, `user_request`, `final_reply`) so each question can point at exactly the part it's about. One call answers all four questions. My code then turns the probabilities into a verdict in one of two ways: "any rule" fails the reply when any of the three type-specific questions is above a cutoff, and "overall" uses only the single overall question.

Then I compared that to the tiny judge model I was already using (gpt-4o-mini), and to gpt-5-mini running the same prompt with no changes.

## Results

All numbers are on the same 40 held-out test conversations. Here, a "positive" is a pass.

- **Accuracy:** share of all verdicts that match my label.
- **TPR:** share of good replies the judge passed.
- **TNR:** share of verbose replies the judge caught.

| Judge | Accuracy | TPR | TNR | Cost per 1,000 traces (USD) |
| --- | ---: | ---: | ---: | ---: |
| gpt-4o-mini | 0.53 | 0.19 | 0.89 | $0.28 |
| gpt-5-mini | 0.72 | 0.76 | 0.68 | $2.54 |
| Jev, any rule, 0.6 | 0.78 | 0.71 | 0.84 | $0.05 |
| Jev, any rule, 0.7 | 0.70 | 0.71 | 0.68 | $0.05 |
| Jev, overall, 0.7 | 0.55 | 0.67 | 0.42 | $0.05 |

Jev outperformed gpt-4o-mini with this very simple format transformation, at ~1/6 of the cost. My gpt-4o-mini judge had a strong bias toward calling good replies verbose, and Jev mostly didn't. gpt-5-mini landed in the same range as Jev on accuracy, at 1/50th the cost.

Two more things stood out:

- **Breaking the decision down is effective.** The three specific sub-questions beat the single overall question at every cutoff I tried (0.3 to 0.7). This matches TypeSafe's own advice to ask one atomic question per decision and combine the answers in code.
- **You give up the reasoning.** Jev returns a probability and no explanation. When I was refining the gpt-4o-mini judge, reading its critiques was helpful in improving the prompt because it gave a clue about why the decision is made (even if the reasoning is made up to some extent). With Jev, you see which of the three sub-questions fired, but not why.

And finally, the biggest point about Jev, that the experiment validated:

## Jev is not just magically able to make decisions well

A decision-maker needs context to make a decision well. With decisions driven by the next-token-prediction LLMs we're used to, this comes through in the prompt and the few-shot examples.

And even with this context, it's quite difficult to make a "correct" decision/prediction for plenty of tasks (for example, that LLM judge I was tuning above has quite poor performance even after several iterations of prompt and few-shot changes). These decisions still need to be tuned if you need the decision to be optimal, and need to be calibrated if you need it to be reliable. Calibrated means that when Jev says yes with probability 0.7, the answer really is yes about 70% of the time, which you can only check against ground truth (labeled) data.

My experiment showed exactly this. Across the cutoffs I tried, the same Jev calls caught anywhere from 42% to 95% of verbose replies, and the best cutoff changed between my development and test sets.

I think this kind of work, deciding what threshold a decision model should operate at (AKA, only use the decision if probability is above 0.8, say) and calibrating its probabilities, is going to be a big area of activity.

So: I'd use Jev for scored decisions at scale, as long as I have labeled data to pick and check the threshold. And as long as I trust a "product" that is 2 weeks old to be reliable :)

---

*This is one experiment on one example, so who knows how generalizable this is. But an interesting data point!*
