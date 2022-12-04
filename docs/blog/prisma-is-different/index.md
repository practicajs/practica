---
slug: how-prisma-is-different-than-your-casual-orm
date: 2022-08-02T10:00
hide_table_of_contents: true
title: Is Prisma different than traditional ORMs?
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

## Intro - Why discuss yet another ORM (or the man who had staints on his suite)?

Betteridge's law of headlines suggests that a 'headline that ends in a question mark can be answered by the word NO'. Will this article follow this rule? Is Prisma ORM the 'Ferrari' ORM we've all been waiting for?

Node.js is like an elegant businessman (or woman), wearing a fancy tuxedo, a luxury watch wrapped around his palm while people are watching admirably. Although highly popular socially, one can't ignore that his white shirt has a dark stain. Node is so capable and popular, and yet, in certain areas, its offering basket is stained with inferior offerings. One of these areas is the ORM space, "I wish we had something like (Java) hibernate or (.NET) Entity Framework" are common words being heard by Node developers. What about existing mature ORMs like TypeORM and Sequelize? We owe so much to these maintainers, and yet, the produced developer experience, the level of maintenance - just don't feel delightful, some may say even mediocre

From time to time, a shiny new ORM is launched, and there is hope. Then soon it's realized that these new emerging projects are more of the same, if they survive. Until one day, Prisma ORM arrived surrounded with glamour: It's gaining tons of attention all over, producing fantastic content, being used by respectful frameworks and... raised 40,000,000$ (40 million) to build the next generation ORM - Is it the 'Ferrari' ORM we've been waiting for? Is it a game changer? If you're are the 'no ORM for me' type, will this one make you convert your religion?

In [Practica.js](https://github.com/practicajs/practica) (the free starter based off [Node.js best practices](https://github.com/goldbergyoni/nodebestpractices)) we aim to make the best decisions for our users, the Prisma hype made us stop by for a second, evaluate its unique offering and conclude whether we should upgrade our toolbox?

This article is certainly not an 'ORM 101' but rather a spotlight on specific dimensions in which Prisma aims to shine or struggle. It's compared against the two most popular Node.js ORM - TypeORM and Sequelize. Why not others? Why other promising contenders like MikroORM weren't covered? Just because they are not as popular yet ana maturity is a critical trait of ORMs

Ready to explore how good Prisma is and whether you should throw away your current tools?

<!--truncate-->

## TOC

1. Things that are mostly the same
2. Differentiation
3. Closing

## What is the same?

When comparing options, before outlining differences, it's useful to state what is actually similar among these products. Here is a partial list of features that both TypeORM, Sequelize and Prisma support

- Casual queries with sorting, filtering, distinct, group by, 'upsert' (update or create),etc
- Raw queries
- Full text search
- Association/relations of any type (e.g., many to many, self-relation, etc)
- Aggregation queries
- Pagination
- CLI
- Transactions
- Migration & seeding
- Hooks/events (called middleware in Prisma)
- Connection pool
- Based on various community benchmarks, no dramatic performance differences
- All have huge amount of stars and downloads

With that, shall we focus on what set them apart and make a difference

## What is fundamentally different?

### 1. Type safety across the board

**💁‍♂️ What is it about:** ORM's life is not easier since the TypeScript rise, to say the least. The need to support typed models/queries/etc yields a lot of developers sweat. Sequelize, for example, struggle to stabilize a TypeScript interface and by now offers 3 different syntaxes + one external library (sequelize-typescript) that offers yet another style. Look at the syntax below, this feels like an afterthought - a library that was not built for TypeScript and now tries to squeeze it in somehow. Despite the struggle, both Sequelize and TypeORM offer only partial type safety. Simple queries do return typed objects, but other common corner cases like attributes/projections leave you with brittle strings. Here are few examples:


```javascript
// Sequelize pesky TypeScript interface
type OrderAttributes = {
  id: number,
  price: number,
  // other attributes...
};

type OrderCreationAttributes = Optional<OrderAttributes, 'id'>;

class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  declare id: CreationOptional<number>;
  declare price: number;
}
```

```javascript
// Sequelize loose query types
await getOrderModel().findAll({
    where: { noneExistingField: 'noneExistingValue' }
    attributes: ['none-existing-field', 'another-imaginary-column'],
    include: 'no-such-table',
  });
  await getCountryModel().findByPk('price');
```

```javascript
const ordersOnSales: Post[] = await orderRepository.find({
  where: { onSale: true },
  select: ['id', 'price'],
})
console.log(ordersOnSales[0].userId);
```



Isn't it ironic...

**📊 How important:** ![Medium importance](./medium-importance-slider.png)

**🤔 How Prisma is different:** It takes a totally different approach by generating per-project client code that is fully typed. This client embodies types for everything: every query, relations and others. While other ORMs struggle to infer all the types from discrete models (including associations that are declared in other files), Prisma's offline code generation is easier: It can look through the entire DB relations, use custom generation code and build an almost perfect TypeScript experience. Why 'almost' perfect? for some reason, for migrations Prisma advocates using plain SQL which might result in a discrepancy between the code models and the DB schema. Other than that, this is how Prisma's client brings end to end type safety:


```javascript
await prisma.order.findMany({
    where: {
      noneExistingField: 1,
    },
    select: {
      noneExistingRelation: {
        select: { id: true }, 
      },
      noneExistingField: true,
    },
  });

  await prisma.order.findUnique({
    where: { price: 50 },
  });
```

**🏆 Is Prisma doing better?:** Definitely

## 2. Progress and maintenance


**💁‍♂️ What is it about:** OSS shines with small to medium libraries, history shows that larger project that demands massive maintenance work - the team is likely to struggle and even fade away. ORM is a maintenance beast - making it follow all the trends (e.g., ESM, TypeScript, new DB) with a volunteering team is almost not fair. Few years ago the future of TypeORM seemed very cloudy with people wondering whether it's still maintained 

![Is TypeORM dead?](./typeorm-is-dead.png)


With that, as of 2023, I was cheered up to realize how vibrant are TypeORM and Sequelize repositories. As part of writing this article I measured the GitHub traction and while Prisma seems to be superior, the 'pure' OSS alternatives are in a surprisingly in a good shape. All the appreciation of the world for the people who make this awesome OSS work. See graphs below


**📊 How important:** ![Medium importance](./medium-importance-slider.png)

**🤔 How Prisma is different:** With [40M$ in its pocket](https://techcrunch.com/2022/05/03/prisma-raises-40m-for-its/?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAAHBus4GsueUUPsvSXnhV0LR76aKwoLAu93rGk7D3TDdH2umce0jtkhQ_NvbA008svtEk-PHUl9e3xjsf7AP3k2WxR2JEk8J5rDldXywyxQsMRnkCcHuHdoDG4EyFs2R8z25HXG8qehbHiGOE2knjCOGTZlzRQzLhTONVQB7hL9xo) and 80 employee (!) Prisma should fire features like a machine gun. While looking at the numbers, x3 more commits for example, it definitely has more contribution, but the differences seem rather marginal than dramatic

![Prisma has more commits](./commits-comparison.png)

(Based on two Prisma's repository: [prisma/prisma](https://github.com/prisma/prisma) and [prisma-engines](https://github.com/prisma/prisma-engines))

Metrics: issues age, amount of issues, patreon, downloads, 


**🏆 Is Prisma doing better?:** Yes, but the alternatives are also doing well

## 2. Make you forget SQL


**💁‍♂️ What is it about:** Using ORM is a doubtful choice for many who prefer interacting with the DB using lower level techniques. One of their arguments is against the efficiency of ORMs: Since the generated queries are not visible immediately to the developers, wasteful queries might get executed unknowingly. While all ORMs provide a syntactic sugar over SQL, there are differences in the level of abstraction. The more the ORM syntax resembles SQL, the more likely the developers will understand their actions

For example, TypeORM's query builder looks like SQL broken into convenient functions

```javascript
await createQueryBuilder('order')
    .leftJoinAndSelect(
      'order.userId',
      'order.productId',
      'country.name',
      'country.id'
    )
    .getMany();
```

A developer who read this code 👆 is likely to infer that a *join* query between two tables will get executed


**📊 How important:** ![Medium importance](./medium-importance-slider.png)

**🤔 How Prisma is different:** Prisma's mission statement is to simplify DB work, this is taken from their homepage:

"We designed its API to be intuitive, both for SQL veterans and *developers brand new to databases*"

Being ambitious to appeal also to database layman, Prisma builds a syntax with a little bit higher abstraction, for example:

```javascript
await prisma.order.findMany({
    select: {
      userId: true,
      productId: true,
      country: {
        select: { name: true, id: true },
      },
    },
});

```

No join is reminded here also it fetches record from two related tables (order, and country). Could you guess what SQL is produced here? how many queries? One right, a simple join. Surprise for you, actually two queries are made, one for each table, as the join logic happens on the client side. Why like this? in some cases, mostly where there is a lot of repetition in the DB cartesian join, querying each side of the relation is more efficient. But in other cases it's not, Prisma tries to make a guess for you but it will never be nearly as efficient as a developer who is making a thoughtful call. My point is, Prisma sweet and simple syntax might be a  bless for developer who are brand new to databases and aim to achieve a working solution in a short time. For longer term, having full awareness of the DB interactions is imperative, other ORMs encourage this awareness better

**🏆 Is Prisma doing better?:** Not necessarily

## 4. Performance

**💁‍♂️ What is it about:** Speak to ORM antagonist and you'll hear a common sensible argument: ORMs are much slower than a raw approach. To an extent, this is a legit observation as [most comparison](https://welingtonfidelis.medium.com/pg-driver-vs-knex-js-vs-sequelize-vs-typeorm-f9ed53e9f802) will show a none-negligible differences between raw/query-builder and ORM.

![raw is faster d](./pg-driver-is-faster.png)
*Example: : a direct insert against the PG driver is much shorter [Source](https://welingtonfidelis.medium.com/pg-driver-vs-knex-js-vs-sequelize-vs-typeorm-f9ed53e9f802)* 

 It should also be noted that these benchmarks don't tell the entire story - on top of raw queries, every solution must build a mapper layer that maps the raw data to JS objects, nesting them and more. This work is included within every ORM but not shown in benchmarks for the raw option. In reality, every team which doesn't use ORM would have to build their own small "ORM", including a mapper, which will also impact performance


**📊 How important:** ![Medium importance](./medium-importance-slider.png)

**🤔 How Prisma is different:** It was my hope to see a magic here, eating the ORM cake without counting the calories, seeing Prisma achieving an almost 'raw' query speed. I had some good and logical reasons for this hope: Prisma uses a DB client that is built with Rust, theoretically it could serialize to and nest objects faster. It was also built from the ground up and could build on the knowledge that was pilled in ORM space for years. Also, since it returns POJOs only (see bullet 'No Active Record here!') - no time should be spend on decorating objects with ORM fields

You already got it, this hope was not fulfilled. Going with every community benchmark ([one](https://dev.to/josethz00/benchmark-prisma-vs-typeorm-3873), [two](https://github.com/edgedb/imdbench), [three](https://deepkit.io/library)), Prisma at best is not faster than the average ORM. What is the reason? I can't tell exactly. Maybe the complicated system that must support Go, future languages, MongoDB and other non-relational DBs - has a price. Prisma might be a premium car you to bring home, it's not a 'Ferrari' though

![Prisma is not faster](./throughput-benchmark.png)
*Example: Prisma is not faster than others. It should be noted that in other benchmarks Prisma score higher and shows an 'average' performance [Source](https://github.com/edgedb/imdbench)*

**🏆 Is Prisma doing better?:** No

## 3. No active records here!

**💁‍♂️ What is it about:** Node in its early days was heavily inspired by Ruby (e.g., testing "describe"), many great patterns were embraced, [Active Record](https://en.wikipedia.org/wiki/Active_record_pattern) is not among the successful ones. What is this pattern about in a nutshell? say you deal with Orders in your system, with Active Record an Order object/class will hold both the entity properties, possible also some of the logic functions and also CRUD functions. Many find this pattern to be awful, why? ideally, when coding some logic/flow, one should not keep her mind busy with side effects and DB narratives. It also might be that accessing some property unconsciously invokes a heavy DB call (i.e., lazy loading). If not enough, in case of heavy logic, unit tests might be in order (i.e., read ['selective unit tests'](https://blog.stevensanderson.com/2009/11/04/selective-unit-testing-costs-and-benefits/)) - it's going to be much harder to write unit tests against code that interacts with the DB. In fact, all of the respectable and popular architecture (e.g., DDD, clean, 3-tiers, etc) advocate to 'isolate the domain', separate the core/logic of the system from the surrounding technologies. With all of that said, both TypeORM and Sequelize support the Active Record pattern which is displayed in many examples within their documentation. Both also support other better patterns like the data mapper (see below), but they still open the door for doubtful patterns


```javascript
// TypeORM active records 😟

@Entity()
class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    price: number

    @ManyToOne(() => Product, (product) => product.order)
    products: Product[]

    // Other columns here
}

function updateOrder(orderToUpdate: Order){
  if(orderToUpdate.price > 100){
    // some logic here
    orderToUpdate.status = "approval";
    orderToUpdate.save(); 
    orderToUpdate.products.forEach((products) =>{ 

    })
    orderToUpdate.usedConnection = ? 
  }
}



```

**📊 How important:** ![Medium importance](./medium-importance-slider.png)

**🤔 How Prisma is different:** The better alternative is the data mapper pattern. It acts as a bridge, an adapter, between simple object notations (domain objects with properties) to the DB language, typically SQL. Call it with a plain JS object, POJO, get it saved in the DB. Simple. It won't add functions to the result objects or do anything beyond returning pure data, no surprising side effects. In its purest sense, this is a DB-related utility and completely detached from the business logic. While both Sequelize and TypeORM support this, Prisma offers *only* this style - no room for mistakes.


```javascript
// Prisma approach with a data mapper  👍

// This was generated automatically by Prisma
type Order {
    id: number

    price: number

    products: Product[]

    // Other columns here
}

function updateOrder(orderToUpdate: Order){
  if(orderToUpdate.price > 100){
    orderToUpdate.status = "approval";
    prisma.order.update({ where: { id: orderToUpdate.id }, data: orderToUpdate }); 
    // Side effect 👆, but an explicit one. The thoughtful coder will move this to another function. Since it's happening outside, mocking is possible 👍
    products.forEach((products) =>{ // No lazy loading, the data is already here 👍

    })
  }  
}
```

 In [Practica.js](https://github.com/practicajs/practica) we take it one step further and put the prisma models within the "DAL" layer and wrap it with the [repository pattern](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design). You may glimpse [into the code here](https://github.com/practicajs/practica/blob/21ff12ba19cceed9a3735c09d48184b5beb5c410/src/code-templates/services/order-service/domain/new-order-use-case.ts#L21), this is the business flow that calls the DAL layer

## 4. Documentation


**💁‍♂️ What is it about:** TypeORM and Sequelize documentation is mediocre, TypeORM might be a little better. Based on my personal experience they do get a little better over the years, but still by no mean they deserve to be called "good" or "great". For example, if you seek to learn about 'raw queries' - Sequelize offers [a very short page](https://sequelize.org/docs/v6/core-concepts/raw-queries/) on this matter, TypeORM info is spread in multiple other pages. Looking to learn about pagination? Couldn't find Sequelize documents, TypeORM has [some short explanation](https://typeorm.io/select-query-builder#using-pagination), 150 words only


**📊 How important:** ![Medium importance](./medium-importance-slider.png)

**🤔 How Prisma is different:** Prisma documentation rocks! See their documents on similar topics: [raw queries](https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access) and [pagingation](https://www.prisma.io/docs/concepts/components/prisma-client/pagination), thousands of words, and dozens of code examples. The writing itself is also great, feels like some professional writers were involved

![Prisma docs are comprehensive](./count-docs.png)
 
 This chart above shows how comprehensive are Prisma docs (Obviously this by itself doesn't prove quality)


**🏆 Is Prisma doing better?:** You bet

## 5. Observability, metrics, and tracing

**💁‍♂️ What is it about:** Good chances are (say about 99.9%) that you'll find yourself diagnostic slow queries in production or any other DB-related quirks. What can you expect from traditional ORMs in terms of observability? Mostly logging. [Sequelize provides both logging](https://sequelize.org/api/v7/interfaces/queryoptions#benchmark) of query duration and programmatic access to the connection pool state ({size,available,using,waiting}). [TypeORM provides only logging](https://orkhan.gitbook.io/typeorm/docs/logging) of queries that suppress a pre-defined duration threshold. This is better than nothing, but assuming you don't read production logs 24/7, you'd probably need more than logging - an alert to fire when things seem faulty. To achieve this, it's your responsibility to bridge this info to your preferred monitoring system. Another logging downside for this sake is verbosity - we need to emit tons of information to the logs when all we really care for is the average duration. Metrics can serve this purpose much better as we're about to see soon with Prisma

What if you need to dig into which specific part of the query is slow? unfortunately, there is no breakdown of the query phases duration - it's being left to you as a black-box

```javascript
// Sequelize - logging various DB information

```

![Logging query duration](./sequelize-log.png)
Logging each query in order to realize trends and anomaly in the monitoring system


**📊 How important:** ![Medium importance](./medium-importance-slider.png)

**🤔 How Prisma is different:** Since Prisma targets also enterprises, it must bring strong ops capabilities. Beautifully, it packs support for both [metrics](https://www.prisma.io/docs/concepts/components/prisma-client/metrics) and [open telemetry tracing](https://www.prisma.io/docs/concepts/components/prisma-client/opentelemetry-tracing)!. For metrics, it generates custom JSON with metric keys and values so anyone can adapt this to any monitoring system (e.g., CloudWatch, statsD, etc). On top of this, it produces out of the box metrics in [Prometheus](https://prometheus.io/) format (one of the most popular monitoring platforms). For example, the metric 'prisma_client_queries_duration_histogram_ms' provides the average query length in the system overtime. What is even more impressive is the support for open-tracing - it feeds your OpenTelemetry collector with spans that describe the various phases of every query. For example, it might help realize what is the bottleneck in the query pipeline: Is it the DB connection, the query itself or the serialization?

![prisma tracing](./trace-diagram.png)
Prisma visualizes the various query phases duration with open-telemtry 

**🏆 Is Prisma doing better?:** Definitely

## 6. Continuity - will it be here with us in 2024/2025

**💁‍♂️ What is it about:** We live quite peacefully with the risk of one of our dependencies to disappear. With ORM though, this risk demand special attention because our buy-in is higher (i.e., harder to replace) and maintaining it was proven to be harder. Just look at a handful of successful ORMs in the past: objection.js, waterline, bookshelf - all of these respectful project had 0 commits in the past month. The single maintainer of objection.js [announced that he won't work the project anymore](https://github.com/Vincit/objection.js/issues/2335). This high churn rate is not surprising given the huge amount of moving parts to maintain, the gazillion corner cases and the modest 'budget' OSS projects live with. Looking at OpenCollective shows that [Sequelize](https://opencollective.com/sequelize#category-BUDGET) and [TypeORM](https://opencollective.com/typeorm) are funded with ~1500$ month in average. This is barely enough to cover a daily Starbucks cappuccino and croissant (6.95$ x 365) for 5 maintainers. Nothing contrasts this model more than a startup company that just raised its series B - Prisma is [funded with 40,000,000$ (40 millions)](https://www.prisma.io/blog/series-b-announcement-v8t12ksi6x#:~:text=We%20are%20excited%20to%20announce,teams%20%26%20organizations%20in%20this%20article.) and recruited 80 people! Should not this inspire us with high confidence about their continuity? I'll surprisingly suggest that quite the opposite is true

See, an OSS ORM has to go over one huge hump, but a startup company must pass through TWO. The OSS project will struggle to achieve the critical mass of features, including some high technical barriers (e.g., TypeScript support, ESM). This typically lasts years, but once it does - a project can focus mostly on maintenance and step out of the danger zone. The good news for TypeORM and Sequelize is that they already did! Both struggled to keep their heads above the water, there were rumors in the past that [TypeORM is not maintained anymore](https://github.com/typeorm/typeorm/issues/3267), but they managed to go through this hump. I counted, both projects had approximately ~2000 PRs in the past 3 years! Going with [repo-tracker](https://repo-tracker.com/r/gh/sequelize/sequelize), each see multiple commits every week. They both have vibrant traction, and the majority of features you would expect from an ORM. TypeORM even supports beyond-the-basics features like multi data source and caching. It's unlikely that now, once they reached the promise land - they will fade away. It might happen, there is no guarantee in the OSS galaxy, but the risk is low

![One hump](./one-hump.png)


**📊 How important:** ![Medium importance](./medium-importance-slider.png)

**🤔 How Prisma is different:** Prisma a little lags behind in terms of features, but with a budget of 40M$ - there are good reasons to believe that they will pass the first hump, achieving a critical mass of features. I'm more concerned with the second hump - showing revenues in 2 years or saying goodbye. As a company that is backed by venture capitals - the model is clear and cruel: In order to secure their next round, series B or C (depends whether the seed is counted), there must be a viable and proven business model. How do you 'sell' ORM? Prisma experiments with multiple products, none is mature yet or being paid for. How big is this risk? According to [this startup companies success statistics](https://spdload.com/blog/startup-success-rate/), "About 65% of the Series A startups get series B, while 35% of the companies that get series A fail.". Since Prisma already gained a lot of love and adoption from the community, there success chances are higher than the average round A/B company, but even 20% or 10% chances to fade away is concerning

> This is terrifying news - companies happily choose a young commercial OSS product without realizing that there are 10-30% chances for this product to disappear


![Two humps](./two-humps.png)

Some of startup companies who seek a viable business model do not shut the doors rather change the product, the license or the free features. This is not my subjective business analysis, here are few examples: [MongoDB changed their license](https://techcrunch.com/2018/10/16/mongodb-switches-up-its-open-source-license/), this is why the majority had to host their Mongo DB over a single vendor. [Redis did something similar](https://techcrunch.com/2019/02/21/redis-labs-changes-its-open-source-license-again/). What are the chances of Prisma pivoting to another type of product? It actually already happened before, Prisma 1 was mostly about graphQL client and server, [it's now retired](https://github.com/prisma/prisma1)

It's just fair to mention the other potential path - most round B companies do succeed to qualify for the next round, when this happens even bigger money will be involved in building the 'Ferrari' of JavaScript ORMs. I'm surely crossing my fingers for these great people, at the same time we have to be conscious about our choices


**🏆 Is Prisma doing better?:** Quite the opposite

## Closing

I hope that these thoughts, at least one of them, made you re-consider adding a new technique to your toolbox. In any case, let's keep our community vibrant, disruptive and kind. Respectful discussions are almost as important as the event loop. Almost.

https://www.edgedb.com/

## Some of my other articles

- [Book: Node.js testing best practices](https://github.com/testjavascript/nodejs-integration-tests-best-practices)
- [Book: JavaScript testing best practices](https://github.com/testjavascript/nodejs-integration-tests-best-practices)
- [How to be a better Node.js developer in 2020](https://yonigoldberg.medium.com/20-ways-to-become-a-better-node-js-developer-in-2020-d6bd73fcf424). The 2023 version is coming soon
- [Practica.js - A Node.js starter](https://github.com/practicajs/practica)
- [Node.js best practices](https://github.com/goldbergyoni/nodebestpractices)


**Ideas**

**Ideas**
N+1
E
It's repository pattern! No polymorphic look
GIS
Serverless heavy
Protection - at least one unique field, varchar-191, 
"break down quickly" - not true, it's hard to break it
Find and count all

** Complicaiton **
Compare field with field, group with count, distinct, views, triggers
Not supported: materialized view, 
Group by and count: https://sebhastian.com/sequelize-group-by/
Cursor based
Prisma prevents shooting in the foot
Opening - An opprtunity to see a from the ground up ORM
Opening - Node.js is like an elegant man with tints, do we finally have the NHibernate?, 
Ending - It might be NHibernate, not yet
Check GitHub extensions
Example how Prisma abstratcs - you can insert multiple M2M records (posts & categories in one call)
Performance tests
Error handling
License: "It allows users to use the software for any purpose, to distribute it, to modify it, and to distribute modified versions of the software under the terms of the license, without concern for royalties"
Prisma is shooting at 3 important things
Automatic transaction
Sequelize are writing v7

TO and Seq don't really have mapper

Prisma doesnt support: replication, soft delete, caching, 