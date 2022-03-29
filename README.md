![Best practices starter](/docs/images/practica-logo.png)

<br/>

### Generate a Node.js app that is packed with best practices AND simplicty in mind. Based on our repo [Node.js best practices](https://github.com/goldbergyoni/nodebestpractices) (77,000 stars)

❣️ **Alpha stage:** It's a very premature work-in-progress, we're only kicking-off now, please revisit by June 2022🗓

![Discord](/docs/images/discord-logo.png) [Discord discussions](https://discord.gg/9Nrarr7p) | ![Twitter](/docs/images/twitter-icon.png) [Twitter](https://twitter.com/nodepractices)

# What in here for you in one paragraph

Node.js has great frameworks, they never meant to be production ready - Practica.js bridges this gap. We generate application code that demonstrates a full flow, from API to DB, that is packed with good practices like hardened dockerfile, N-Tier folder structure, testing templates, sanitized API response and more. This can save a great deal of time and painful mistakes. All our decisions are transparent, [thoughtful and neatly documented](/docs/decisions), we strive to keep things as simple and small as possible and base our work on the popular guide ['Node.js best practices'](https://github.com/goldbergyoni/nodebestpractices)

<br/>

# `Table of contents`

- [`A very quick start`](https://github.com/testjavascript/nodejs-integration-tests-best-practices#section-1-infrastructure-and-database-setup)
- [`Our philosophy and unique value`](https://github.com/testjavascript/nodejs-integration-tests-best-practices#section-1-infrastructure-and-database-setup)
- [`Example applications`](https://github.com/testjavascript/nodejs-integration-tests-best-practices#section-2-web-server-setup)
  - [Express, Postgresql, with common best practices]()
  - [Express, Mongodb, with common best practices]()
  - [Express, Postgresql, with all best practices (advanced)]()
  - [Minimal with project setup configuration only]()
  <details><summary>More flavours</summary>
  
  - [soon] fastify, postgresql
  
  - [soon] fastify, mongo
  
  - [Generate your own interactively]()
  
  - More coming soon
  </details>

- [`Practices and features`](https://github.com/testjavascript/nodejs-integration-tests-best-practices#section-2-web-server-setup)
- [`Documentation site`](https://github.com/testjavascript/nodejs-integration-tests-best-practices#section-3-test-test-anatomy-basics)
- [`YouTube channel`](https://github.com/testjavascript/nodejs-integration-tests-best-practices#section-4-isolating-from-the-external-world)
- [`The people behind this project`](https://github.com/testjavascript/nodejs-integration-tests-best-practices#section-4-isolating-from-the-external-world)
- [`Contribution guide`](https://github.com/testjavascript/nodejs-integration-tests-best-practices#section-5-dealing-with-data)

# A very quick start

🗓 **Alpha project:** This project is very premature WIP, please revisit by June 2022

### Run this command from terminal

`npx practica`

### Answer few questions to customize for your own needs

### Start the project

`npm start`

or

`npm test`

Standard, ah?

### Make yourself acquainted with it

- ✅ Run the routes with Postman
- ✅ Understand the project structure by watch [this 5 min YouTube 📹](https://youtube.com)
- ✅ Optional: Skim through the code, all the best practices are tagged inside the code
- ✅ Master it by visiting our [documentation website](https://practica.org)

https://user-images.githubusercontent.com/8571500/156916532-c73fd814-8815-486b-8117-04add11a5907.mp4

# Our philosophy and unique value

### 1. Best practices _on top of_ known Node.js frameworks

We don't invent new wheels rather use your favorite framework and empower it with more structure and practices. For example, with a single command you get express/fastify based code base with ~100 additional best practices inside

![Built on top of known frameworks](/docs/images/on-top-of-frameworks.png)

### 2. SIMPLE like Node.js was meant to be

Keeping it simple, flat and based on native Node/JS capabilities is part of this project DNA. We believe that too many abstractions, high-complexity and fancy language features become soon a strategic slowdown for the team. To name a few example, our code flow is flat with almost no level of indirection, although using TypeScript - almost no features are being used besides types, for modularization we simply use... Node.js modules

![Built on top of known frameworks](/docs/images/abstractions-vs-simplicity.png)

### 3. Supports many technologies and frameworks

Since it's about good practices and simplicity, there is no need to narrow this code to specific framework or DB. We aim to support the major Node.js frameworks and databases

![Built on top of known frameworks](/docs/images/tech-stack.png)

# Practices and features

We apply more than 100 practices and optimizations, you can opt-in or out for most of these features using our CLI flags. Following is few examples of features, to learn about the full list of features, [please visit here](https://practicajs.org/features)

| **Feature**                        | **Explanation**                                                                                                                                                                                                                                                                        | **Flag**                | **Documentation link**                                                                                   |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------- |
| Monorepo setup                     | Generates two components (e.g., Microservices) in a single repository with interactions between the two                                                                                                                                                                                | --monorepo, --mr        | [Docs here]()                                                                                            |
| Output escaping and sanitizing     | Clean-out outgoing responses from potential HTML security risks like XSS                                                                                                                                                                                                               | --output-escape, --oe   | [Docs here]()                                                                                            |
| Integration (component) testing    | Generates full-blown component/integration tests setup including DB                                                                                                                                                                                                                    | --tests, --t            | [Docs here]()                                                                                            |
| Unique request ID (Correlation ID) | Generates module that creates a unique correlation/request ID for every incoming request. This is available for any other object during the request life-span. Internally it uses Node's built-in [AsyncLocalStorage](https://nodejs.org/api/async_hooks.html#class-asynclocalstorage) | --correlation-id, --coi | [Docs here]()                                                                                            |
| Dockerfile                         | Generates dockerfile that embodies 20> best practices                                                                                                                                                                                                                                  | --docker-file, --df     | [Docs here]()                                                                                            |
| Strong-schema configuration        | A configuration module that dynamically load run-time configuration keys and includes a strong schema so it can fail fast                                                                                                                                                              | Built-in with basic app | [Docs here](https://github.com/bestpractices/practica/blob/main/docs/decisions/configuration-library.MD) |

📗 **[Full features list - 100+ more](https://practica.io/features)**

# Steering committee

Practica is a community-driven open-source project. It's being led voluntarily by engineers from many companies. On top of this, these companies below which are keen to great engineeting practices chose to let their engineers contribute massively and push this project firmly 💚

![Autodesk](/docs/images/autodesk.png)

![Cox2m](/docs/images/cox2m.png)

# The people behind this

## Core team

Images of core team soon

# Partners

These companies are obliged to implement these best practices and daily routine and they also fund this project generously

![Minta](/docs/images/minta.png)


## Amazing contributors 💚

Million thanks to these great people who contributed code:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.clarkio.com"><img src="https://avatars.githubusercontent.com/u/6265396?v=4?s=200" width="200px;" alt=""/><br /><sub><b>Brian Clark</b></sub></a><br /><a href="https://github.com/practicajs/practica/commits?author=clarkio" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/rluvaton"><img src="https://avatars.githubusercontent.com/u/16746759?v=4?s=200" width="200px;" alt=""/><br /><sub><b>Raz Luvaton</b></sub></a><br /><a href="#content-rluvaton" title="Content">🖋</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

