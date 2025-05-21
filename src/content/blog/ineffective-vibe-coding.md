---
author: JP
pubDatetime: 2025-05-21T17:00:00+08:00
modDatetime: 2025-05-21T17:00:00+08:00
title: (In)effective Vibe-Coding a 0 to 1 app
slug: ineffective-vibe-coding
featured: true
draft: false
tags:
  - machine learning
  - software engineering
  - vibe coding
description:
  Key insights gained from building an end-to-end machine learning system from scratch with the help of an agentic LLM tool. In this post, I share some lessons of what worked well or not for me.
---

I was recently tasked to build a machine learning system prototype for a take home assessment in < 2 days, and having heard much about the recent trend where one relies heavily on agentic LLM tools to code (aka "vibe coding"), I thought that this would be a great opportunity to test the limits of this new approach while getting the project done with the limited time I had on hand. I would like to share some lessons that I've learnt here, hopefully you might identify with some!

## Requirements

This project required me to deliver a data + modeling pipeline (pulling data from an API), as well as an API serving queries and predictions via a natural language interface. This meant actually pulling data, training a model, setting up an API, and stitching the whole thing together.

## What didn't work

Being lazy, and wanting to see what the least amount of work I could get away with was, I initially pasted the full page of requirements into claude code, asking it to build me a system described as such. Surprisingly, it was able to get the whole prototype done after some time, and I liked that it documented the system architecture, used docker, had good folder organization, and even did some basic feature engineering by categorizing floors into 'low', 'mid', or 'high'! However, here are some parts that I wasn't satisfied with:

### Data Engineering Edge Case

One of the datasets required stitching together data from multiple resource id's and claude only pulled one. Adding more data to a table is not hard, but adding another table and modifying the data model would be more involved.

### Inappropriate Train-Test Split

Not performing time-series cross-validation. The system had to predict price data over time, and just a random train-test split would leak data from every year into the training set, resulting in an overfitted model. In real life, we would never have any data from the future to train on; this is a common modeling mistake when dealing with time-series, autoregressive data.

### Choice of DB

Using SQLite for the backend DB. This was fine for a toy application, but the lack of a native DATE/DATETIME type ([docs](https://sqlite.org/lang_datefunc.html)) especially when handling a lot of date range queries might mean error-prone SQL generation especially when more tricky requests like "month-on-month change" would require a lot of hacky workarounds, which current models don't default naturally to.

After reviewing these errors, I was sort of torn between fixing them to carry on, and starting anew. After a quick perusal, I felt that the code was hard to "fix", as a lot of implicit design decisions had been made by the LLM, and changing the design would be as good as rewriting it from scratch. For example, if I changed the DB, I would have to change the data import script, the reads from the API (though that was somewhat helped by the model's use of sqlalchemy), introduce a new container, add new environment variables at various places etc. And so, I rewrote it, but this time, with a slightly different approach. (I hope that) Having sufficiently motivated why 1-shot vibe-coding might not work for complex tasks (yet?), I'll skip the boring retelling of the process, and just give the good bits and share my takeaways.

## What worked

### Start Right

Vibe-coding effectively requires understanding that all components are not created equal. Components that have more dependents are more critical to get right _first_, because having to change those components means more work changing all of its dependents downstream. Practically, this means that it's easier to start with parts with no dependencies, get them right first, before building up the dependency tree one component at the time. In a ML system, that might mean data models (DM) -> offline data pipeline (depends on DM) -> modeling script (depends on data pipeline) -> API service (depends on DM and models) -> frontend UI (depends on API service). As such, it is imperative to have a clear mental model of what the key components of the system and their relationships look like, any foundational decisions that need to be made upfront given the context (e.g. preferring a DB with a native date type, what containers would be present etc), documenting those clearly for the agent first, before rushing to codegen immediately.

### Rules

On a smaller note, updating the guide for the agents (`.cursor/rules/*.mdc` files for cursor) iteratively was imperative to not having to repeat myself for things like reminding the model how to test after making changes, saving large files like csv's and model files to git lfs, sorting imports etc.

### Reviewing

I realised that the usual style of reviewing changes where one pores over each line in a PR, thinks deeply about edge cases is neither a scalable nor effective way to keep up with the huge swathe of changes when vibe-coding a 0 to 1 app. Since code can be easily discarded and rewritten as one "fixes" each component until they are "right", I found it more helpful to just look at the new "snapshot" rather than the "diff", verifying it for adherence to design principles, and passing of tests. This means frontloading on getting unit tests where possible to ensure that code changes do not regress the system functionally. That said, if you are working on a large and well-established codebase with a large team, these lessons are going to be less relevant, since small and thoughtful changes are important in those contexts.

## Conclusion

I used to be quite skeptical about vibe-coding, until I had to resort to it due to a time crunch. I've learnt that like all tools, there are ways to use it effectively, or abuse/misuse it.

And so with that, I hope you've found this set of lessons useful and perhaps apply them in your own projects!


p.s. An alternative I considered was forking and modifying [introspect](https://github.com/defog-ai/introspect), a project that I had helped build at defog, but eventually ruled it out as it would be unfair to just fork and adapt, since it might not fairly reflect my abilities to the assessors.