---
title: "Common failure modes of machine learning projects"
description: "Five common failure modes that cause ML projects to fail, from mismatched expectations and lack of progress to inadequate data, overly-complex solutions, and lack of expertise."
date: 2023-03-06
tags: ["reading"]
---

ML projects are inherently riskier than software projects, because we don't know in advance how well, and if, we can solve a given problem. As a result of this risk, ML projects fail more often. Running successful and efficient ML projects (aka avoiding taking 1 year to deploy a model that could have been done in 2 months and that actually solves a problem for the business) requires that common pitfalls for these projects are mitigated.

There are a few very common failure modes that I've seen repeatedly, and this article describes five of them.

### Mismatched expectations

The business/product and ML practitioners often have a mismatched vision of the solution being built, how ML models can be used to solve business problems, and what is feasible with ML models. The result is that a team will spend months exploring a solution to a problem that no one actually has, that does not address a core business need.

One mitigation for this scenario is to start with an early prototype that sets a baseline. This way all stakeholders can agree and see a demo of the exact problem being solved, and "where we are today" with the most simple possible approach. This also forces a discussion around the metrics stakeholders care about. This is a perfect starting point for iteration and improvement.

### Lack of progress

Due to the uncertain nature of ML projects, the huge surface area of approaches to solve a problem (from simple to inspired by a research paper published this morning), and the many ways to leverage available data, projects can seem to languish without noticeable progress over many months.

Establishing a baseline and pursuing quick iterations are the best antidote here, because stakeholders (or other team members) can make frequent decisions about whether to invest more time to try to improve a model (in order to drive business value). If this is done on an (at longest) monthly cadence, it's possible to avoid noticing 3 months later that it's time to pivot. Regular demos help tremendously here.

### Inadequate data

One of the first steps of the ML modeling process is discovery of available data, and exploratory data analysis to understand data quality for the task at hand. If data is found to be of low quality (which is the case more often than not), or the necessary signals to solve a particular problem are not being collected, the data should be improved or aquired *before* continuing with modeling. A very quick prototype is often the best way of demonstrating that the modeling work should be paused until the data situation is improved.

Related is that ML solutions often require quality labeled data in order to train models. Investing in labeling can improve outcomes.

### Overly-complex solutions

To solve a data problem, individual ML engineers have latitude over which approaches to try, and there is a risk that they select the more complex and exciting new approach from a recent research paper. Sometimes this is appropriate for the task at hand (or the only way to solve a problem), but a good rule of thumb is to start simple. The downside of an over-complex solution is both implementation time, and in maintenance time (it's more expensive to serve, maintain, monitor, and troubleshoot a more complex model).

Over-engineering can be avoided by building a process that requires that the first version of any approach is as simple as possible. This may be a heuristic (a simple rule to select outliers, for example), a linear model, or a tree-based model. Only once there is business buy in around feasibility and potential performance, or a solid reason to go beyond something simple, should a team invest in more complex modeling approaches.

### Lack of expertise

Building successful data products and ML models requires involvement of data scientists with a proven track record of deploying models to production that solve real business problems. This is especially critical in framing a model appropriately to solve the problem at hand, and determining when investment and iteration is likely to yield positive results, and when a project is likely to be infeasible or lack the data for success.

Without this collaboration and input, projects are more likely to fail. It is entirely possible that someone inexperienced builds a solution that is (say) 30% accurate in solving a problem, but someone experienced can get to 95% in less time. This extreme difference in outcomes does not happen as much in backend engineering.
