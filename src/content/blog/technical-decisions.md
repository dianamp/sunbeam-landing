---
title: "Your architecture decision is probably wrong, and that's okay"
description: "Why there's rarely a single 'best' technical decision, and how decision records, speed, and iterative review help engineering organizations get better over time."
date: 2024-03-06
tags: ["cto", "startups"]
---

One of the areas that is top of mind for me as a CTO is whether the engineering organization is making great decisions.
Great decisions will help rather than hinder the business and the team, and are aligned with the company strategy and needs.

![decision-point-dalle3](/images/blog/decision-point-dalle3.jpg)

Making the wrong decisions can be make-or-break for a startup because it can truly slow down execution (if it's necessary
to claw back from a decision or do a major re-write) or degrade culture (if factions form on each side of a decision, or there is a stream of unproductive negativity following one).

In the past, the types of decisions I (or my team) have had to make are things like:
* How should we deploy our product (Should we self-host our kubernetes cluster, use a managed service, other)? (this broadly is a big one - using a vendor vs self-hosting comes up a lot)
* What level of separation should we have between parts of the product (shoot for monorepo or lots of separate repos?)
* When is it right to introduce a new language or toolset?
* How should we architect our data pipelines?
* Which technical debt should we prioritize addressing, if any?
* When is a model "good enough" for release?

If you talk to engineers they will usually have a strong opinion for each of the above, and believe they are "right".

What I have come to learn is that there is not a single "best" decision in the majority of cases.
The decision you make is often "wrong" in the sense that you may want to change the decision later, or that folks will feel the pain of the decision and sometimes wish it had gone another way[^1].

For technical decisions, especially for design or architecture decisions, there are always multiple types of trade-offs:
* trade-offs in the moment: legitimate pros and cons for each option. Two reasonable and experienced engineers will come out with different conclusions. Pain will be felt regardless of whether Option A or Option B is selected.
* trade-offs over time: a team will lean towards a different direction if making the same decision with the same team 1 year later, after having lived with decision A.
Eating only salad sounds amazing after eating cookies for a week, but after a week of salad the cookies are looking pretty good again. In a similar way, adopting microservices can feel great because it decouples systems from each other and allows folks to move independently and quickly. But it also slows down work at the interface and can lead to duplication, waste, and lack of communication between folks that ultimately are building towards the same goal. Having a million repos can also result in cumbersome dependancy management. This can make monorepos sound quite nice after a period of dealing with annoyances.
* trade-offs over time with new context: Another form of trade-offs over time is that the team and company evolves, often in surprising or hard-to-predict ways, so a different decision would be made 6 months later (due to evolving preferences, evolutions in tooling, team and company size and stage).

So if you are making a decision to avoid a streaming data architecture today (say), you will most likely dislike that decision next year after you experience the drawbacks and become increasingly annoyed with them.

For this reason, the most important aspects of making technical decisions include heavy consideration towards fast execution and culture.
- Each decision should have an owner who is reasonably prepared/experienced to make it. Sometimes this is the CTO, and sometimes this is an engineer who is "on the ground" and will most strongly experience the consequences of the decision.
- That owner needs to think through and create a record of
    - what the decision is, along with the goal
    - options (shoot for more than 2 options[^2]) and description of pros/cons
    - final decision and why
- This should be done quickly. For one-way decisions, a brief write-up is great.

This creates a decision record, so that a few months down the line when people start wondering why the hell the architecture is the way it is, it's easy to see that it was thought through, and everyone agreed to disagree and commit.

It allows the team to make better decisions over time, because the team can learn from past snafus or how the best decisions were created.

It also limits fallout because options are considered, and decisions aren't random. Folks can feel heard.

Decision records, decision speed, and iteratively reviewing decisions will help the organization get better over time.
And not fall into the trap of thinking there is a single "right" way to go.

[^1]: Part of decision making is recognizing how reversible a decision is. If a decision will have a huge long-lasting impact on the company and is a one-way door decision, more care should be taken to carefully consider. Otherwise it's good to optimize for speed. Try something and go with it, change it later if needed.

[^2]: As reccommended in the excellent book [Decisive](https://www.amazon.com/Decisive-Chip-Heath-Dan-Heath-audiobook/dp/B00B3Z5QFK)
