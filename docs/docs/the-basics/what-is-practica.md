---
sidebar_position: 1
---

# What is practica.js

## A One Paragraph Overview

Although Node.js has great frameworks 💚, they were never meant to be production ready immediately. Practica.js aims to bridge the gap. Based on your preferred framework, we generate some example code that demonstrates a full workflow, from API to DB, that is packed with good practices. For example, we include a hardened dockerfile, N-Tier folder structure, great testing templates, and more. This saves a great deal of time and can prevent painful mistakes. All decisions made are [neatly and thoughtfully documented](./decisions/index). We strive to keep things as simple and standard as possible and base our work off the popular guide: [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

**1 min video 👇**


<iframe width="100%" height="768" src="https://www.youtube.com/embed/F6kAs2VEcKw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Our Philosophies and Unique Values

### 1. Best Practices _on top of_ known Node.js frameworks

We don't re-invent the wheel. Rather, we use your favorite framework and empower it with structure and real examples. With a single command you can get an Express/Fastify-based codebase with ~100 examples of best practices inside.

![Built on top of known frameworks](/img/on-top-of-frameworks.png)

### 2. Simplicity, how Node.js was intended

Keeping it simple, flat and based on native Node/JS capabilities is part of this project DNA. We believe that too many abstractions, high-complexity or fancy language features can quickly become a stumbling block for the team. 

To name a few examples, our code flow is flat with almost no level of indirection, although using TypeScript - almost no features are being used besides types, for modularization we simply use Node.js modules

![Built on top of known frameworks](/img/abstractions-vs-simplicity.png)

### 3. Supports many technologies and frameworks

Good Practices and Simplicity is the name of the game with Practica. There is no need to narrow our code to a specific framework or database. We aim to support a majority of popular Node.js frameworks and databases.

![Built on top of known frameworks](/img/tech-stack.png)

<br />

# Practices and Features

We apply more than 100 practices and optimizations. You can opt in or out for most of these features using option flags on our CLI. The follow table is just a few examples of features we provide. To see the full list of features, please visit our website [here](https://practicajs.dev/features).

| **Feature** | **Explanation** | **Flag** | **Docs** |
| ----------- | --------------- | -------- | -------- |
| Monorepo setup | Generates two components (e.g., Microservices) in a single repository with interactions between the two | --mr, --monorepo | Docs coming soon |
| Output escaping and sanitizing | Clean-out outgoing responses from potential HTML security risks like XSS | --oe, --output-escape | Docs coming soon |
| Integration (component) testing | Generates full-blown component/integration tests setup including DB | --t, --tests | Docs coming soon |
| Unique request ID (Correlation ID) | Generates module that creates a unique correlation/request ID for every incoming request. This is available for any other object during the request life-span. Internally it uses Node's built-in [AsyncLocalStorage](https://nodejs.org/api/async_hooks.html#class-asynclocalstorage) | --coi, --correlation-id | Docs coming soon |
| Dockerfile | Generates dockerfile that embodies 20> best practices | --df, --docker-file | Docs coming soon |
| Strong-schema configuration | A configuration module that dynamically load run-time configuration keys and includes a strong schema so it can fail fast | Built-in with basic app | [Docs here](https://github.com/bestpractices/practica/blob/main/docs/decisions/configuration-library.MD) |

📗 **See our full list of features [here](https:/dev/features/index)**
