---
slug: popular-nodejs-pattern-and-tools-to-reconsider
date: 2022-08-02T10:00
hide_table_of_contents: true
title: Popular Node.js patterns and tools to re-consider
authors: [goldbergyoni]
tags:
  [
    node.js,
    express,
    nestjs,
    fastify,
    passport,
    dotenv,
    supertest,
    practica,
    testing,
  ]
---

# Intro - Why discuss yet another ORM?

Node.js is maturing. Many patterns and frameworks were embraced - it's my belief that developers' productivity 

## TOC

1. Soon
2. Soon

## What is the same?

Sometimes the easiest way to understand differences between options, is to understand first what is similar

Performance, core features, migration, seeding, 

<!--truncate-->
## 1. Type safety across the board

**🌈 Ideas:** Show query with relations that is not typed in Sequelize/TypeORM, should query with group and counts not typed in Sequelize/TypeORM, show the weird TS interface that seq/to have - but also the non-standard workflow that Prisma client brings, other ideas here?

**💁‍♂️ What is it about:** 


```javascript
// Problem with Sequelize, include is string, count is string
// Weird syntax
```

**📊 How important:** Image of bar

**🤔 How Prisma is different:** Foo

```javascript
// Example of include and count
// Raw with types
```


**🏆 Is Prisma doing better?:** I think so

## 2. Different level of progress and maintenance

**🌈 Ideas:** Show how higher is Prisma commits frequency (graphs and numbers), show maintenance problems in existing ORMs like issues with people wondering whether it is still maintained, 

**💁‍♂️ What is it about:** 


```javascript
// Problem with Sequelize, include is string, count is string
// Weird syntax
```

**📊 How important:** Image of bar

**🤔 How Prisma is different:** Foo

```javascript
// Example of include and count
// Raw with types
```


**🏆 Is Prisma doing better?:** I think so

## 3. No active records here!

**🌈 Ideas:** In every reputable architecture DB narratives are encapsulated in a layer (the mapper and repository patterns), the active record tramples this principle (bring some quotes), Prisma returns POJOs and POJOs only. You still to wrap it in a layer

**💁‍♂️ What is it about:** 


```javascript
// Problem with Sequelize, include is string, count is string
// Weird syntax
```

**📊 How important:** Image of bar

**🤔 How Prisma is different:** Foo

```javascript
// Example of include and count
// Raw with types
```

## 4. A different level of documentation

**🌈 Ideas:** Analysis of the number of documentation pages, the number of lines per topic, topics that are not even discussed in Sequelize/TypeORM, maybe even documentation commits?

**💁‍♂️ What is it about:** 


```javascript
// Problem with Sequelize, include is string, count is string
// Weird syntax
```

**📊 How important:** Image of bar

**🤔 How Prisma is different:** Foo

```javascript
// Example of include and count
// Raw with types
```


**🏆 Is Prisma doing better?:** I think so

## 5. Metric and tracing

**🌈 Ideas:** Example of Prometheus and OpenTracing, show that some is achievable with Sequelize/TypeORM but not as mature and easy to use

**💁‍♂️ What is it about:** 


```javascript
// Problem with Sequelize, include is string, count is string
// Weird syntax
```

**📊 How important:** Image of bar

**🤔 How Prisma is different:** Foo

```javascript
// Example of include and count
// Raw with types
```


**🏆 Is Prisma doing better?:** I think so

## Closing

I hope that these thoughts, at least one of them, made you re-consider adding a new technique to your toolbox. In any case, let's keep our community vibrant, disruptive and kind. Respectful discussions are almost as important as the event loop. Almost.

## Some of my other articles

- [Book: Node.js testing best practices](https://github.com/testjavascript/nodejs-integration-tests-best-practices)
- [Book: JavaScript testing best practices](https://github.com/testjavascript/nodejs-integration-tests-best-practices)
- [How to be a better Node.js developer in 2020](https://yonigoldberg.medium.com/20-ways-to-become-a-better-node-js-developer-in-2020-d6bd73fcf424). The 2023 version is coming soon
- [Practica.js - A Node.js starter](https://github.com/practicajs/practica)
- [Node.js best practices](https://github.com/goldbergyoni/nodebestpractices)
