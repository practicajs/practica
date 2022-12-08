---
slug: practica-v0.0.6-is-alive
date: 2022-12-10T10:00
hide_table_of_contents: true
title: Practica v0.0.6 is alive
authors: [goldbergyoni]
tags:
  [
    node.js,
    express,
    practica,
    prisma,
  ]
---

## Where is our focus now?

We work in two parallel paths: enriching the supported best practices to make the code more production ready and at the same time enhance the existing code based off the community feedback

## What's new?

### Request-level store

Every request now has its own store of variables, you may assign information on the request-level so every code which was called from this specific request has access to these variables. For example, for storing the user permissions. One special variable that is stored is 'request-id' which is a unique UUID per request (also called correlation-id). The logger automatically will emit this to every log entry. We use the built-in [AsyncLocal](https://nodejs.org/api/async_context.html) for this task

Courtesy of Raz Luvaton

### Hardened .dockerfile

Although a Dockerfile may contain 10 lines, it easy and common to include 20 mistakes in these short artifact. For example, commonly npmrc secrets are leaked, usage of vulnerable base image and other typical mistakes. Our .Dockerfile follows the best practices from [this article](https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/) and already apply 90% of the guidelines

Courtesy of Daniel Gluskin

### Additional ORM option: Prisma

Prisma is an emerging ORM with great type safe support and awesome DX. We will keep Sequelize as our default ORM while Prisma will be an optional choice using the flag: --orm=prisma

Why did we add it to our tools basket and why Sequelize is still the default? We summarized all of our thoughts and data in this [blog post](https://practica.dev/blog/is-prisma-better-than-your-traditional-orm/)

Courtesy of Yoni Goldberg
### Many small enhancements

More than 10 PR were merged with CLI experience improvements, bug fixes, code patterns enhancements and more

## Where do I start?

Definitely follow the [getting started guide first](https://practica.dev/the-basics/getting-started-quickly) and then read the guide [coding with practica](https://practica.dev/the-basics/coding-with-practica) to realize its full power and genuine value. We will be thankful to receive your feedback