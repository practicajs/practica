![Best practices starter](/static/images/practica-logo.png)

<br/>

### Generate a Node.js app that is packed with best practices AND simplicity in mind. Based off our repo [Node.js best practices](https://github.com/goldbergyoni/nodebestpractices) (78,000 stars)

<br />


❣️ **Alpha stage:** Practica.js is a work-in-progress. We've only recently kicked off. Please revisit by July 2022 🗓

![Discord](/static/images/discord-logo.png) [Discord discussions](https://discord.gg/9EnfwfHk) | ![Twitter](/static/images/twitter-icon.png) [Twitter](https://twitter.com/nodepractices) | ![Site](/docs/static/img/site-icon.png) [Documentation site](https://practica.dev/)


<br/>

# A One Paragraph Overview

Although Node.js has great frameworks 💚, they were never meant to be production ready immediately. Practica.js aims to bridge the gap. Based on your preferred framework, we generate example code that demonstrates a full Microservice flow, from API to DB, that is packed with good practices. For example, we include a battle-tested error handler, sanitize API response, hardened dockerfile, thoughtful 3-tier folder structure, great testing templates with DB, and more. This saves a great deal of time and can prevent painful mistakes. All decisions made are [neatly and thoughtfully documented](https://practica.dev/decisions). We strive to keep things as simple and standard as possible and base our work on the popular guide: [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

**1 min video 👇, ensure audio is activated**



https://user-images.githubusercontent.com/8571500/170464232-43355e43-98cf-4069-b9fc-6bc303a39efc.mp4


<br/>

# `Table of Contents`

- [`Super-Quick Setup`](#super-quick-setup)
- [`Our Philosophies and Unique Values`](#our-philosophies-and-unique-values)
- [`Practices and Features`](#practices-and-features)
- [`The People Behind Practica.js`](#the-people-behind-practicajs)
- [`Our best practices guide, 78,000 stars ✨`](https://github.com/goldbergyoni/nodebestpractices)
- [`Contribution guide`](https://github.com/practicajs/practica/blob/main/CONTRIBUTING.md)
- [`Documentation site`](https://practica.dev/)
- [`YouTube`](https://www.youtube.com/channel/UCKrSJ0-jm7YVTM_hO7Me9eA)
- Coming Soon:
	- Example Applications
		- [Express, PostgreSQL, with common best practices](https://github.com/practicajs/practica/blob/main/docs/not-ready-yet.md)
		- [Express, mongo-db, with common best practices](https://github.com/practicajs/practica/blob/main/docs/not-ready-yet.md)
		- [Express, PostgreSQL, with all best practices (advanced)](https://github.com/practicajs/practica/blob/main/docs/not-ready-yet.md)
		- [Minimal with project setup configuration only](https://github.com/practicajs/practica/blob/main/docs/not-ready-yet.md)
		<details><summary>More Flavours</summary>
		- Fastify, PostgreSQL
		- Fastify, mongo-db
		- Generate Your Own Interactively
		- More coming soon
		</details>

<br />

# Super-Quick Setup

**Note:** Practica.js is a work-in-progress. To have a more complete experience, please check back after June 2022.

<br />

### Run Practica.js from the Command Line

To run Practica in Interactive Mode (with UI):

```bash
npx @practica/create-node-app interactive
```

Note that for now, it can generate an app that is based on Express and PostgreSQL only. Other options will get added soon

Or if you'd prefer a typical terminal experience (without UI):

```bash
npx @practica/create-node-app immediate
```

✨ And you're done! That's it. The code's all been generated.

<br />

### Start the Project

```bash
npm start
```

or

```bash
npm test
```

Pretty straight forward, right?

<br />

### Next Steps

- ✅ Start coding. The code we generate is minimal by design, and should help you get up to speed quickly.
- ✅ (Optional) Read through the code. Best Practices are tagged throughout.
- ✅ Master it by reading our [docs](https://practica.dev).



<br />

# Our Philosophies and Unique Values

### 1. Best Practices _on top of_ known Node.js frameworks

We don't re-invent the wheel. Rather, we use your favorite framework and empower it with structure and real examples. With a single command you can get an Express/Fastify-based codebase with ~100 examples of best practices inside.

![Built on top of known frameworks](/static/images/on-top-of-frameworks.png)

### 2. Simplicity, how Node.js was intended

Keeping it simple, flat, and based on native Node/JS capabilities is part of this project's DNA. We believe that too many abstractions, high-complexity or fancy language features can quickly become a stumbling block for the team. 

To name a few examples, our code flow is flat with almost no level of indirection, although using TypeScript - almost no features are being used besides types, for modularization we simply use Node.js modules.

![Built on top of known frameworks](/static/images/abstractions-vs-simplicity.png)

### 3. Supports many technologies and frameworks

Good Practices and Simplicity is the name of the game with Practica. There is no need to narrow our code to a specific framework or database. We aim to support a majority of popular Node.js frameworks and databases.

![Built on top of known frameworks](/static/images/tech-stack.png)

<br />

# Practices and Features

We apply more than 100 practices and optimizations. You can opt in or out for most of these features using option flags on our CLI. The following table lists just a few examples out of the [full list of features we provide](https://practicajs.org/features).

| **Feature** | **Explanation** | **Flag** | **Docs** |
| ----------- | --------------- | -------- | -------- |
| Monorepo setup | Generates two components (e.g., Microservices) in a single repository with interactions between the two | --mr, --monorepo | [Docs here]() |
| Output escaping and sanitizing | Clean-out outgoing responses from potential HTML security risks like XSS | --oe, --output-escape | [Docs here]() |
| Integration (component) testing | Generates full-blown component/integration tests setup including DB | --t, --tests | [Docs here]() |
| Unique request ID (Correlation ID) | Generates module that creates a unique correlation/request ID for every incoming request. This is available for any other object during the request life-span. Internally it uses Node's built-in [AsyncLocalStorage](https://nodejs.org/api/async_hooks.html#class-asynclocalstorage) | --coi, --correlation-id | [Docs here]() |
| Dockerfile | Generates dockerfile that embodies >20 best practices | --df, --docker-file | [Docs here]() |
| Strong-schema configuration | A configuration module that dynamically load run-time configuration keys and includes a strong schema so it can fail fast | Built-in with basic app | [Docs here](https://github.com/bestpractices/practica/blob/main/docs/decisions/configuration-library.MD) |

📗 **See our full list of features [here](https://practica.dev/features)**

<br />

# The People Behind Practica.js

## Steering Committee

Practica is a community-driven open-source project. It's being led voluntarily by engineers from many different companies. These companies are just a few who encourage their engineers to contribute and keep this project moving. 💚

![Autodesk](/static/images/autodesk.png)

A Nasdaq 100 company, a world leader in design software

![Cox2m](/static/images/cox2m.png)

Leader IoT provider, part of 'Cox Communication', the 3rd largest cable company in the US

## Core Team

<table width="700px">
  <tr>
	<td align="center"><img src="./static/images/yoni.jpeg" width="300px" alt=""/><br /><h3>Yoni Goldberg</h3><br/>Independent Node.js consultant<br/><a href="https://twitter.com/goldbergyoni"><img src="./static/images/twitter-symbol.png" width="16" height="16"></img></a>
<a href="https://goldbergyoni.com"><img src="./static/images/site-symbol.png" width="16" height="16"></img></a>
</td>
<td align="center"><img src="./static/images/michael1.jpg" width="300px" alt=""/><br /><h3>Michael Solomon</h3><br/>Node.js lead<br/><a href="https://twitter.com/JMichaelShlomo"><img src="./static/images/twitter-symbol.png" width="16" height="16"></img></a>
</td>
</tr>
<tr>
	<td align="center"><img src="./static/images/raz.jpeg" width="300px" alt=""/><br /><h3>Raz Luvaton</h3><br/>Node.js developer<br/><a href="https://twitter.com/goldbergyoni"><img src="./static/images/twitter-symbol.png" width="16" height="16"></img></a>
<a href="https://goldbergyoni.com"><img src="./static/images/site-symbol.png" width="16" height="16"></img></a>
</td>
<td align="center"><img src="./static/images/daniel.jpeg" width="300px" alt=""/><br /><h3>Daniel Gluskin</h3><br/>Node.js lead<br/><a href="https://twitter.com/goldbergyoni"><img src="./static/images/twitter-symbol.png" width="16" height="16"></img></a>
<a href="https://goldbergyoni.com"><img src="./static/images/site-symbol.png" width="16" height="16"></img></a>
</td>
</tr>
</table>

<br />

# Partners

These companies are keen for continous improvement and their engineers to have been known to contribute during work hours.

![Minta](/static/images/minta.png)


## Our Amazing Contributors 💚

A million thanks to these great people who have contributed code to our project:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.clarkio.com"><img src="https://avatars.githubusercontent.com/u/6265396?v=4?s=200" width="200px;" alt=""/><br /><sub><b>Brian Clark</b></sub></a><br /><a href="https://github.com/practicajs/practica/commits?author=clarkio" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/rluvaton"><img src="https://avatars.githubusercontent.com/u/16746759?v=4?s=200" width="200px;" alt=""/><br /><sub><b>Raz Luvaton</b></sub></a><br /><a href="#content-rluvaton" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/mikicho"><img src="https://avatars.githubusercontent.com/u/11459632?v=4?s=200" width="200px;" alt=""/><br /><sub><b>Michael Solomon</b></sub></a><br /><a href="https://github.com/practicajs/practica/commits?author=mikicho" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/itainoam"><img src="https://avatars.githubusercontent.com/u/12605830?v=4?s=200" width="200px;" alt=""/><br /><sub><b>itainoam</b></sub></a><br /><a href="https://github.com/practicajs/practica/commits?author=itainoam" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/shanizlo"><img src="https://avatars.githubusercontent.com/u/39856071?v=4?s=200" width="200px;" alt=""/><br /><sub><b>shanizlo</b></sub></a><br /><a href="https://github.com/practicajs/practica/commits?author=shanizlo" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/RonDaha"><img src="https://avatars.githubusercontent.com/u/30000700?v=4?s=200" width="200px;" alt=""/><br /><sub><b>Ron Dahan</b></sub></a><br /><a href="https://github.com/practicajs/practica/commits?author=RonDaha" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/alonkishoni"><img src="https://avatars.githubusercontent.com/u/49868301?v=4?s=200" width="200px;" alt=""/><br /><sub><b>AlonK</b></sub></a><br /><a href="https://github.com/practicajs/practica/commits?author=alonkishoni" title="Code">💻</a></td>
    <td align="center"><a href="https://twitter.com/joseluah53"><img src="https://avatars.githubusercontent.com/u/11966345?v=4?s=200" width="200px;" alt=""/><br /><sub><b>Jose Luis Alvarez Herrera</b></sub></a><br /><a href="#content-jalvar53" title="Content">🖋</a> <a href="https://github.com/practicajs/practica/commits?author=jalvar53" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/reinaldo-calderon-team"><img src="https://avatars.githubusercontent.com/u/60945397?v=4?s=200" width="200px;" alt=""/><br /><sub><b>reinaldo-calderon-team</b></sub></a><br /><a href="https://github.com/practicajs/practica/commits?author=reinaldo-calderon-team" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/KarelVerschraegen"><img src="https://avatars.githubusercontent.com/u/11301291?v=4?s=200" width="200px;" alt=""/><br /><sub><b>KarelVerschraegen</b></sub></a><br /><a href="https://github.com/practicajs/practica/commits?author=KarelVerschraegen" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/danm"><img src="https://avatars.githubusercontent.com/u/6394846?v=4?s=200" width="200px;" alt=""/><br /><sub><b>Daniel Morrison</b></sub></a><br /><a href="#content-danm" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/seanlowe"><img src="https://avatars.githubusercontent.com/u/35589586?v=4?s=200" width="200px;" alt=""/><br /><sub><b>Sean Lowe</b></sub></a><br /><a href="#example-seanlowe" title="Examples">💡</a> <a href="#content-seanlowe" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/idobetesh"><img src="https://avatars.githubusercontent.com/u/58806763?v=4?s=200" width="200px;" alt=""/><br /><sub><b>idobetesh</b></sub></a><br /><a href="https://github.com/practicajs/practica/commits?author=idobetesh" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/alejaacosta17"><img src="https://avatars.githubusercontent.com/u/89855093?v=4?s=200" width="200px;" alt=""/><br /><sub><b>Alejandra Acosta</b></sub></a><br /><a href="https://github.com/practicajs/practica/commits?author=alejaacosta17" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/adandanielteamint"><img src="https://avatars.githubusercontent.com/u/104020188?v=4?s=200" width="200px;" alt=""/><br /><sub><b>adandanielteamint</b></sub></a><br /><a href="#content-adandanielteamint" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/rashad612"><img src="https://avatars.githubusercontent.com/u/251991?v=4?s=200" width="200px;" alt=""/><br /><sub><b>Rashad Majali</b></sub></a><br /><a href="https://github.com/practicajs/practica/commits?author=rashad612" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/yohai-zv"><img src="https://avatars.githubusercontent.com/u/57675671?v=4?s=200" width="200px;" alt=""/><br /><sub><b>yohai zvuloon</b></sub></a><br /><a href="#content-yohai-zv" title="Content">🖋</a></td>
    <td align="center"><a href="https://yonatankra.com"><img src="https://avatars.githubusercontent.com/u/6459899?v=4?s=200" width="200px;" alt=""/><br /><sub><b>Yonatan Kra</b></sub></a><br /><a href="#content-YonatanKra" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/yoni-rapoport"><img src="https://avatars.githubusercontent.com/u/16318253?v=4?s=200" width="200px;" alt=""/><br /><sub><b>Yoni Rapoport</b></sub></a><br /><a href="#content-yoni-rapoport" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/perilevy"><img src="https://avatars.githubusercontent.com/u/29686391?v=4?s=200" width="200px;" alt=""/><br /><sub><b>perilevy</b></sub></a><br /><a href="https://github.com/practicajs/practica/commits?author=perilevy" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

