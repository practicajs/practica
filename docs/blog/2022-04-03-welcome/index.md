---
slug: monorepo-backend
title: Which Monorepo is right for a Node.js BACKEND now?
authors: [goldbergyoni, michaelsalomon]
tags: [monorepo, decisions]
---

# Which Monorepo is right for a Node.js BACKEND now?

Making our decisions transparent and collaborative is at the heart of Practica. In this post, we'd like to share our considerations in choosing our monorepo tooling

![Monorepos](/img/monorepo-theme-1.png)

## What are we looking at

The Monorepo market is hot like fire. Weirdly, now when the demand for Monoreps is exploding, one of the leading libraries - Lerna- has just retired. When looking closely, it might not be just a coincidence - With so many disruptive and shiny features brought on by new vendors, Lerna failed to keep up with the pace and stay relevant. This bloom of new tooling gets many confused - What is the right choice for my next project? What should I look at when choosing a Monorepo tool? This post is all about curating this information overload, covering the new tooling, emphasizing what is important, and finally share some recommendations. If you are here for tools and features, you're in the right place, although you might find yourself on a soul-searching journey to what is your desired development workflow.

This post is concerned with backend-only and Node.js. It also scoped to typical business solutions. If you're Google/FB developer who is faced with 8,000 packages - sorry, you need special gear. Consequently, monster Monorepo tooling like Bazel is left-out. We will cover here some of the most popular Monorepo tools including Turborepo, Nx, PNPM, Yarn/npm workspace, and Lerna (although it's not actually maintained anymore - it's a good baseline for comparison).

Let's start? When human beings use the term Monorepo, they typically refer to one or more of the following 4 layers below. Each one of them can bring value to your project, each has different consequences, tooling, and features:

