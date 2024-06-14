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

# Popular Node.js tools and patterns to re-consider

Node.js is maturing. Many patterns and frameworks were embraced - it's my belief that developers' productivity dramatically increased in the past years. One downside of maturity is habits - we now reuse existing techniques more often. How is this a problem?

In his novel book 'Atomic Habits' the author James Clear states that:

> "Mastery is created by habits. However, sometimes when we're on auto-pilot performing habits, we tend to slip up... Just being we are gaining experience through performing the habits does not mean that we are improving. We actually go backwards on the improvement scale with most habits that turn into auto-pilot". In other words, practice makes perfect, and bad practices make things worst

We copy-paste mentally and physically things that we are used to, but these things are not necessarily right anymore. Like animals who shed their shells or skin to adapt to a new reality, so the Node.js community should constantly gauge its existing patterns, discuss and change

Luckily, unlike other languages that are more committed to specific design paradigms (Java, Ruby) - Node is a house of many ideas. In this community, I feel safe to question some of our good-old tooling and patterns. The list below contains my personal beliefs, which are brought with reasoning and examples. 

Are those disruptive thoughts surely correct? I'm not sure. There is one things I'm sure about though - For Node.js to live longer, we need to encourage critics, focus our loyalty on innovation, and keep the discussion going. The outcome of this discussion is not "don't use this tool!" but rather becoming familiar with other techniques that, _under some circumstances_ might be a better fit

![Animals and frameworks shed their skin](./crab.webp)

_The True Crab's exoskeleton is hard and inflexible, he must shed his restrictive exoskeleton to grow and reveal the new roomier shell_


## TOC - Patterns to reconsider

1. Dotenv
2. Calling a service from a controller
3. Nest.js dependency injection for all classes
4. Passport.js
5. Supertest
6. Fastify utility decoration
7. Logging from a catch clause
8. Morgan logger
9. NODE_ENV

<!--truncate-->
## 1. Dotenv as your configuration source

**💁‍♂️ What is it about:** A super popular technique in which the app configurable values (e.g., DB user name) are stored in a simple text file. Then, when the app loads, the dotenv library sets all the text file values as environment variables so the code can read this

```javascript
// .env file
USER_SERVICE_URL=https://users.myorg.com

//start.js
require('dotenv').config();

//blog-post-service.js
repository.savePost(post);
//update the user number of posts, read the users service URL from an environment variable
await axios.put(`${process.env.USER_SERVICE_URL}/api/user/${post.userId}/incrementPosts`)

```

**📊 How popular:** 21,806,137 downloads/week!

**🤔 Why it might be wrong:** Dotenv is so easy and intuitive to start with, so one might easily overlook fundamental features: For example, it's hard to infer the configuration schema and realize the meaning of each key and its typing. Consequently, there is no built-in way to fail fast when a mandatory key is missing - a flow might fail after starting and presenting some side effects (e.g., DB records were already mutated before the failure). In the example above, the blog post will be saved to DB, and only then will the code realize that a mandatory key is missing - This leaves the app hanging in an invalid state. On top of this, in the presence of many keys, it's impossible to organize them hierarchically. <strike>If not enough, it encourages developers to commit this .env file which might contain production values - this happens because there is no clear way to define development defaults.</strike> .env is meant to define development and development only. We expressely [recommend against committing your .env file to code](https://github.com/motdotla/dotenv#should-i-commit-my-env-file).  Teams usually work around this by committing .env.example file and then asking whoever pulls code to rename this file manually. Recently, the same people that pioneered dotenv are [extending it with syncing features](https://github.com/dotenv-org/dotenv-vault) to avoid this work around.

**☀️ Better alternative:** Some configuration libraries provide out of the box solution to all of these needs. They encourage a clear schema and the possibility to validate early and fail if needed. See [comparison of options here](https://practica.dev/decisions/configuration-library). One of the better alternatives is ['convict'](https://github.com/mozilla/node-convict), down below is the same example, this time with Convict, hopefully it's better now:

Doesn't sharing a `config.js` file that should NOT be committed to code have the same risk as committing a .env file?

```javascript
// config.js
export default {
  userService: {
    url: {
      // Hierarchical, documented and strongly typed 👇
      doc: "The URL of the user management service including a trailing slash",
      format: "url",
      default: "http://localhost:4001",
      nullable: false,
      env: "USER_SERVICE_URL",
    },
  },
  //more keys here
};

//start.js
import convict from "convict";
import configSchema from "config";
convict(configSchema);
// Fail fast!
convictConfigurationProvider.validate();

//blog-post.js
repository.savePost(post);
// Will never arrive here if the URL is not set
await axios.put(
  `${convict.get(userService.url)}/api/user/${post.userId}/incrementPosts`
);
```

## 2. Calling a 'fat' service from the API controller

**💁‍♂️ What is it about:** Consider a reader of our code who wishes to understand the entire _high-level_ flow or delve into a very _specific_ part. She first lands on the API controller, where requests start. Unlike what its name implies, this controller layer is just an adapter and kept really thin and straightforward. Great thus far. Then the controller calls a big 'service' with thousands of lines of code that represent the entire logic

```javascript
// user-controller
router.post('/', async (req, res, next) => {
    await userService.add(req.body);
    // Might have here try-catch or error response logic
}

// user-service
exports function add(newUser){
    // Want to understand quickly? Need to understand the entire user service, 1500 loc
    // It uses technical language and reuse narratives of other flows
    this.copyMoreFieldsToUser(newUser)
    const doesExist = this.updateIfAlreadyExists(newUser)
    if(!doesExist){
        addToCache(newUser);
    }
    // 20 more lines that demand navigating to other functions in order to get the intent
}


```

**📊 How popular:** It's hard to pull solid numbers here, I could confidently say that in _most_ of the app that I see, this is the case

**🤔 Why it might be wrong:** We're here to tame complexities. One of the useful techniques is deferring a complexity to the later stage possible. In this case though, the reader of the code (hopefully) starts her journey through the tests and the controller - things are simple in these areas. Then, as she lands on the big service - she gets tons of complexity and small details, although she is focused on understanding the overall flow or some specific logic. This is **unnecessary** complexity

**☀️ Better alternative:** The controller should call a particular type of service, a **use-case** , which is responsible for _summarizing_ the flow in a business and simple language. Each flow/feature is described using a use-case, each contains 4-10 lines of code, that tell the story without technical details. It mostly orchestrates other small services, clients, and repositories that hold all the implementation details. With use cases, the reader can grasp the high-level flow easily. She can now **choose** where she would like to focus. She is now exposed only to **necessary** complexity. This technique also encourages partitioning the code to the smaller object that the use-case orchestrates. Bonus: By looking at coverage reports, one can tell which features are covered, not just files/functions

This idea by the way is formalized in the ['clean architecture' book](https://www.bookdepository.com/Clean-Architecture-Robert-Martin/9780134494166?redirected=true&utm_medium=Google&utm_campaign=Base1&utm_source=IL&utm_content=Clean-Architecture&selectCurrency=ILS&w=AFF9AU99ZB4MTDA8VTRQ&gclid=Cj0KCQjw3eeXBhD7ARIsAHjssr92kqLn60dnfQCLjbkaqttdgvhRV5dqKtnY680GCNDvKp-16HtZp24aAg6GEALw_wcB) - I'm not a big fan of 'fancy' architectures, but see - it's worth cherry-picking techniques from every source. You may walk-through our [Node.js best practices starter, practica.js](https://github.com/practicajs/practica), and examine the use-cases code

```javascript
// add-order-use-case.js
export async function addOrder(newOrder: addOrderDTO) {
  orderValidation.assertOrderIsValid(newOrder);
  const userWhoOrdered = await userServiceClient.getUserWhoOrdered(
    newOrder.userId
  );
  paymentTermsService.assertPaymentTerms(
    newOrder.paymentTermsInDays,
    userWhoOrdered.terms
  );

  const response = await orderRepository.addOrder(newOrder);

  return response;
}
```

## 3. Nest.js: Wire _everything_ with dependency injection

**💁‍♂️ What is it about:** If you're doing Nest.js, besides having a powerful framework in your hands, you probably use DI for _everything_ and make every class injectable. Say you have a weather-service that depends upon humidity-service, and **there is no requirement to swap** the humidity-service with alternative providers. Nevertheless, you inject humidity-service into the weather-service. It becomes part of your development style, "why not" you think - I may need to stub it during testing or replace it in the future

```typescript
// humidity-service.ts - not customer facing
@Injectable()
export class GoogleHumidityService {

  async getHumidity(when: Datetime): Promise<number> {
    // Fetches from some specific cloud service
  }
}

// weather-service.ts - customer facing
import { GoogleHumidityService } from './humidity-service.ts';

export type weatherInfo{
    temperature: number,
    humidity: number
}

export class WeatherService {
  constructor(private humidityService: GoogleHumidityService) {}

  async GetWeather(when: Datetime): Promise<weatherInfo> {
    // Fetch temperature from somewhere and then humidity from GoogleHumidityService
  }
}

// app.module.ts
@Module({
  providers: [GoogleHumidityService, WeatherService],
})
export class AppModule {}
```

**📊 How popular:** No numbers here but I could confidently say that in _all_ of the Nest.js app that I've seen, this is the case. In the popular ['nestjs-realworld-example-ap[p'](](https://github.com/lujakob/nestjs-realworld-example-app)) all the services are 'injectable'

**🤔 Why it might be wrong:** Dependency injection is not a priceless coding style but a pattern you should pull in the right moment, like any other pattern. Why? Because any pattern has a price. What price, you ask? First, encapsulation is violated. Clients of the weather-service are now aware that other providers are being used _internally_. Some clients may get tempted to override providers also it's not under their responsibility. Second, it's another layer of complexity to learn, maintain, and one more way to shoot yourself in the legs. StackOverflow owes some of its revenues to Nest.js DI - plenty of discussions try to solve this puzzle (e.g. did you know that in case of circular dependencies the order of imports matters?). Third, there is the performance thing - Nest.js, for example struggled to provide a decent start time for serverless environments and had to introduce [lazy loaded modules](https://docs.nestjs.com/fundamentals/lazy-loading-modules). Don't get me wrong, **in some cases**, there is a good case for DI: When a need arises to decouple a dependency from its caller, or to allow clients to inject custom implementations (e.g., the strategy pattern). **In such case**, when there is a value, you may consider whether the _value of DI is worth its price_. If you don't have this case, why pay for nothing?

I recommend reading the first paragraphs of this blog post ['Dependency Injection is EVIL'](https://www.tonymarston.net/php-mysql/dependency-injection-is-evil.html) (and absolutely don't agree with this bold words)

**☀️ Better alternative:** 'Lean-ify' your engineering approach - avoid using any tool unless it serves a real-world need immediately. Start simple, a dependent class should simply import its dependency and use it - Yeah, using the plain Node.js module system ('require'). Facing a situation when there is a need to factor dynamic objects? There are a handful of simple patterns, simpler than DI, that you should consider, like 'if/else', factory function, and more. Are singletons requested? Consider techniques with lower costs like the module system with factory function. Need to stub/mock for testing? Monkey patching might be better than DI: better clutter your test code a bit than clutter your production code. Have a strong need to hide from an object where its dependencies are coming from? You sure? Use DI!

```typescript
// humidity-service.ts - not customer facing
export async function getHumidity(when: Datetime): Promise<number> {
  // Fetches from some specific cloud service
}

// weather-service.ts - customer facing
import { getHumidity } from "./humidity-service.ts";

// ✅ No wiring is happening externally, all is flat and explicit. Simple
export async function getWeather(when: Datetime): Promise<number> {
  // Fetch temperature from somewhere and then humidity from GoogleHumidityService
  // Nobody needs to know about it, its an implementation details
  await getHumidity(when);
}
```

___

## 1 min pause: A word or two about me, the author

My name is Yoni Goldberg, I'm a Node.js developer and consultant. I wrote few code-books like [JavaScript testing best practices](https://github.com/goldbergyoni/javascript-testing-best-practices) and [Node.js best practices](https://github.com/goldbergyoni/nodebestpractices) (100,000 stars ✨🥹). That said, my best guide is [Node.js testing practices](https://github.com/testjavascript/nodejs-integration-tests-best-practices) which only few read 😞. I shall release [an advanced Node.js testing course soon](https://testjavascript.com/) and also hold workshops for teams. I'm also a core maintainer of [Practica.js](https://github.com/practicajs/practica) which is a Node.js starter that creates a production-ready example Node Monorepo solution that is based on the standards and simplicity. It might be your primary option when starting a new Node.js solution

___

## 4. Passport.js for token authentication

**💁‍♂️ What is it about:** Commonly, you're in need to issue or/and authenticate JWT tokens. Similarly, you might need to allow login from _one_ single social network like Google/Facebook. When faced with these kinds of needs, Node.js developers rush to the glorious library [Passport.js](https://www.passportjs.org/) like butterflies are attracted to light

**📊 How popular:** 1,389,720 weekly downloads

**🤔 Why it might be wrong:** When tasked with guarding your routes with JWT token - you're just a few lines of code shy from ticking the goal. Instead of messing up with a new framework, instead of introducing levels of indirections (you call passport, then it calls you), instead of spending time learning new abstractions - use a JWT library directly. Libraries like [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) or [fast-jwt](https://github.com/nearform/fast-jwt) are simple and well maintained. Have concerns with the security hardening? Good point, your concerns are valid. But would you not get better hardening with a direct understanding of your configuration and flow? Will hiding things behind a framework help? Even if you prefer the hardening of a battle-tested framework, Passport doesn't handle a handful of security risks like secrets/token, secured user management, DB protection, and more. My point, you probably anyway need fully-featured user and authentication management platforms. Various cloud services and OSS projects, can tick all of those security concerns. Why then start in the first place with a framework that doesn't satisfy your security needs? It seems like many who opt for Passport.js are not fully aware of which needs are satisfied and which are left open. All of that said, Passport definitely shines when looking for a quick way to support _many_ social login providers

**☀️ Better alternative:** Is token authentication in order? These few lines of code below might be all you need. You may also glimpse into [Practica.js wrapper around these libraries](https://github.com/practicajs/practica/tree/main/src/code-templates/libraries/jwt-token-verifier). A real-world project at scale typically need more: supporting async JWT [(JWKS)](https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-key-sets), securely manage and rotate the secrets to name a few examples. In this case, OSS solution like [keycloak (https://github.com/keycloak/keycloak) or commercial options like Auth0[https://github.com/auth0] are alternatives to consider

```javascript
// jwt-middleware.js, a simplified version - Refer to Practica.js to see some more corner cases
const middleware = (req, res, next) => {
    if(!req.headers.authorization){
        res.sendStatus(401)
    }

    jwt.verify(req.headers.authorization, options.secret, (err: any, jwtContent: any) => {
      if (err) {
        return res.sendStatus(401);
      }

      req.user = jwtContent.data;

      next();
    });
```

## 5. Supertest for integration/API testing

**💁‍♂️ What is it about:** When testing against an API (i.e., component, integration, E2E tests), the library [supertest](https://www.npmjs.com/package/supertest) provides a sweet syntax that can both detect the web server address, make HTTP call and also assert on the response. Three in one

```javascript
test("When adding invalid user, then the response is 400", (done) => {
  const request = require("supertest");
  const app = express();
  // Arrange
  const userToAdd = {
    name: undefined,
  };

  // Act
  request(app)
    .post("/user")
    .send(userToAdd)
    .expect("Content-Type", /json/)
    .expect(400, done);

  // Assert
  // We already asserted above ☝🏻 as part of the request
});
```

**📊 How popular:** 2,717,744 weekly downloads

**🤔 Why it might be wrong:** You already have your assertion library (Jest? Chai?), it has a great error highlighting and comparison - you trust it. Why code some tests using another assertion syntax? Not to mention, Supertest's assertion errors are not as descriptive as Jest and Chai. It's also cumbersome to mix HTTP client + assertion library instead of choosing the best for each mission. Speaking of the best, there are more standard, popular, and better-maintained HTTP clients (like fetch, axios and other friends). Need another reason? Supertest might encourage coupling the tests to Express as it offers a constructor that gets an Express object. This constructor infers the API address automatically (useful when using dynamic test ports). This couples the test to the implementation and won't work in the case where you wish to run the same tests against a remote process (the API doesn't live with the tests). My repository ['Node.js testing best practices'](https://github.com/testjavascript/nodejs-integration-tests-best-practices) holds examples of how tests can infer the API port and address

**☀️ Better alternative:** A popular and standard HTTP client library like Node.js Fetch or Axios. In [Practica.js](https://github.com/practicajs/practica) (a Node.js starter that packs many best practices) we use Axios. It allows us to configure a HTTP client that is shared among all the tests: We bake inside a JWT token, headers, and a base URL. Another good pattern that we look at, is making each Microservice generate HTTP client library for its consumers. This brings strong-type experience to the clients, synchronizes the provider-consumer versions and as a bonus - The provider can test itself with the same library that its consumers are using

```javascript
test("When adding invalid user, then the response is 400 and includes a reason", (done) => {
  const app = express();
  // Arrange
  const userToAdd = {
    name: undefined,
  };

  // Act
  const receivedResponse = axios.post(
    `http://localhost:${apiPort}/user`,
    userToAdd
  );

  // Assert
  // ✅ Assertion happens in a dedicated stage and a dedicated library
  expect(receivedResponse).toMatchObject({
    status: 400,
    data: {
      reason: "no-name",
    },
  });
});
```

## 6. Fastify decorate for non request/web utilities

**💁‍♂️ What is it about:** [Fastify](https://github.com/fastify/fastify) introduces great patterns. Personally, I highly appreciate how it preserves the simplicity of Express while bringing more batteries. One thing that got me wondering is the 'decorate' feature which allows placing common utilities/services inside a widely accessible container object. I'm referring here specifically to the case where a cross-cutting concern utility/service is being used. Here is an example:

```javascript
// An example of a utility that is cross-cutting-concern. Could be logger or anything else
fastify.decorate('metricsService', function (name) {
  fireMetric: () => {
    // My code that sends metrics to the monitoring system
  }
})

fastify.get('/api/orders', async function (request, reply) {
  this.metricsService.fireMetric({name: 'new-request'})
  // Handle the request
})

// my-business-logic.js
exports function calculateSomething(){
  // How to fire a metric?
}
```

It should be noted that 'decoration' is also used to place values (e.g., user) inside a request - this is a slightly different case and a sensible one

**📊 How popular:** Fastify has 696,122 weekly download and growing rapidly. The decorator concept is part of the framework's core

**🤔 Why it might be wrong:** Some services and utilities serve cross-cutting-concern needs and should be accessible from other layers like domain (i.e, business logic, DAL). When placing utilities inside this object, the Fastify object might not be accessible to these layers. You probably don't want to couple your web framework with your business logic: Consider that some of your business logic and repositories might get invoked from non-REST clients like CRON, MQ, and similar - In these cases, Fastify won't get involved at all so better not trust it to be your service locator

**☀️ Better alternative:** A good old Node.js module is a standard way to expose and consume functionality. Need a singleton? Use the module system caching. Need to instantiate a service in correlation with a Fastify life-cycle hook (e.g., DB connection on start)? Call it from that Fastify hook. In the rare case where a highly dynamic and complex instantiation of dependencies is needed - DI is also a (complex) option to consider

```javascript
// ✅ A simple usage of good old Node.js modules
// metrics-service.js

exports async function fireMetric(name){
  // My code that sends metrics to the monitoring system
}

import {fireMetric} from './metrics-service.js'

fastify.get('/api/orders', async function (request, reply) {
  metricsService.fireMetric({name: 'new-request'})
})

// my-business-logic.js
exports function calculateSomething(){
  metricsService.fireMetric({name: 'new-request'})
}
```

## 7. Logging from a catch clause

**💁‍♂️ What is it about:** You catch an error somewhere deep in the code (not on the route level), then call logger.error to make this error observable. Seems simple and necessary

```javascript
try{
    axios.post('https://thatService.io/api/users);
}
catch(error){
    logger.error(error, this, {operation: addNewOrder});
}
```

**📊 How popular:** Hard to put my hands on numbers but it's quite popular, right?

**🤔 Why it might be wrong:** First, errors should get handled/logged in a central location. Error handling is a critical path. Various catch clauses are likely to behave differently without a centralized and unified behavior. For example, a request might arise to tag all errors with certain metadata, or on top of logging, to also fire a monitoring metric. Applying these requirements in ~100 locations is not a walk in the park. Second, catch clauses should be minimized to particular scenarios. By default, the natural flow of an error is bubbling down to the route/entry-point - from there, it will get forwarded to the error handler. Catch clauses are more verbose and error-prone - therefore it should serve two very specific needs: When one wishes to change the flow based on the error or enrich the error with more information (which is not the case in this example)

**☀️ Better alternative:** By default, let the error bubble down the layers and get caught by the entry-point global catch (e.g., Express error middleware). In cases when the error should trigger a different flow (e.g., retry) or there is value in enriching the error with more context - use a catch clause. In this case, ensure the .catch code also reports to the error handler

```javascript
// A case where we wish to retry upon failure
try{
    axios.post('https://thatService.io/api/users);
}
catch(error){
    // ✅ A central location that handles error
    errorHandler.handle(error, this, {operation: addNewOrder});
    callTheUserService(numOfRetries++);
}
```

## 8. Use Morgan logger for express web requests

**💁‍♂️ What is it about:** In many web apps, you are likely to find a pattern that is being copy-pasted for ages - Using Morgan logger to log requests information:

```javascript
const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("combined"));
```

**📊 How popular:** 2,901,574 downloads/week

**🤔 Why it might be wrong:** Wait a second, you already have your main logger, right? Is it Pino? Winston? Something else? Great. Why deal with and configure yet another logger? I do appreciate the HTTP domain-specific language (DSL) of Morgan. The syntax is sweet! But does it justify having two loggers?

**☀️ Better alternative:** Put your chosen logger in a middleware and log the desired request/response properties:

```javascript
// ✅ Use your preferred logger for all the tasks
const logger = require("pino")();
app.use((req, res, next) => {
  res.on("finish", () => {
    logger.info(`${req.url} ${res.statusCode}`); // Add other properties here
  });
  next();
});
```

## 9. Having conditional code based on `NODE_ENV` value

**💁‍♂️ What is it about:** To differentiate between development vs production configuration, it's common to set the environment variable NODE_ENV with "production|test". Doing so allows the various tooling to act differently. For example, some templating engines will cache compiled templates only in production. Beyond tooling, custom applications use this to specify behaviours that are unique to the development or production environment:

```javascript
if (process.env.NODE_ENV === "production") {
  // This is unlikely to be tested since test runner usually set NODE_ENV=test
  setLogger({ stdout: true, prettyPrint: false });
  // If this code branch above exists, why not add more production-only configurations:
  collectMetrics();
} else {
  setLogger({ splunk: true, prettyPrint: true });
}
```

**📊 How popular:** 5,034,323 code results in GitHub when searching for "NODE_ENV". It doesn't seem like a rare pattern

**🤔 Why it might be wrong:** Anytime your code checks whether it's production or not, this branch won't get hit by default in some test runner (e.g., Jest set `NODE_ENV=test`). In _any_ test runner, the developer must remember to test for each possible value of this environment variable. In the example above, `collectMetrics()` will be tested for the first time in production. Sad smiley. Additionally, putting these conditions opens the door to add more differences between production and the developer machine - when this variable and conditions exists, a developer gets tempted to put some logic for production only. Theoretically, this can be tested: one can set `NODE_ENV = "production"` in testing and cover the production branches (if she remembers...). But then, if you can test with `NODE_ENV='production'`, what's the point in separating? Just consider everything to be 'production' and avoid this error-prone mental load

**☀️ Better alternative:** Any code that was written by us, must be tested. This implies avoiding any form of if(production)/else(development) conditions. Wouldn't anyway developers machine have different surrounding infrastructure than production (e.g., logging system)? They do, the environments are quite difference, but we feel comfortable with it. These infrastructural things are battle-tested, extraneous, and not part of our code. To keep the same code between dev/prod and still use different infrastructure - we put different values in the configuration (not in the code). For example, a typical logger emits JSON in production but in a development machine it emits 'pretty-print' colorful lines. To meet this, we set ENV VAR that tells whether what logging style we aim for:

```javascript
//package.json
"scripts": {
    "start": "LOG_PRETTY_PRINT=false index.js",
    "test": "LOG_PRETTY_PRINT=true jest"
}

//index.js
//✅ No condition, same code for all the environments. The variations are defined externally in config or deployment files
setLogger({prettyPrint: process.env.LOG_PRETTY_PRINT})
```

## Closing

I hope that these thoughts, at least one of them, made you re-consider adding a new technique to your toolbox. In any case, let's keep our community vibrant, disruptive and kind. Respectful discussions are almost as important as the event loop. Almost.

## Some of my other articles

- [Book: Node.js testing best practices](https://github.com/testjavascript/nodejs-integration-tests-best-practices)
- [Book: JavaScript testing best practices](https://github.com/testjavascript/nodejs-integration-tests-best-practices)
- [How to be a better Node.js developer in 2020](https://yonigoldberg.medium.com/20-ways-to-become-a-better-node-js-developer-in-2020-d6bd73fcf424). The 2023 version is coming soon
- [Practica.js - A Node.js starter](https://github.com/practicajs/practica)
- [Node.js best practices](https://github.com/goldbergyoni/nodebestpractices)
