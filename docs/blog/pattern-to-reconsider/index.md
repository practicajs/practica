  ---
slug: pattern-to-reconsider
date: 2022-08-02T10:00
hide_table_of_contents: true
title: Popular Node.js tools and patterns that you should re-consider
authors: [goldbergyoni]
tags: [node.js, express, nestjs, fastify, passport, dotenv]
---

# Popular Node.js tools and patterns that you should re-consider

Node.js is getting aged, good but also bad (quote from habit). To live longer, Node.js should change its skin, like the phoenix bird and re-consider its patterns

"Mastery is created by habits. However, sometimes when we’re on auto-pilot performing habits, we tend to slip up... Just being we are gaining experience through performing the habits does not mean that we are improving. We actually go backwards on the improvement scale with most habits that turn into auto-pilot". James suggested that we should alway gauge our habits and occasionally ask - What went well this year?

The difference between a platform that is perceived as obsolete (Ruby?) vs a platform that lives for a long time, is the amount of changes and paradigm changes that the community is willing to consider. Our loyalty is to innovation, an everlast concept unlike Ruby

Am I sure that these patterns are wrong? No, I'm not. The important drill here is keep discussing things and not pasting them because we're used to

![Monorepos](/img/monorepo-theme-1.png)

## 1. Dotenv as your configuration source

**💁‍♂️ What is it about:** A super popular technique in which the app configurable values (e.g., DB user name) are stored in a simple text file. Then, when the app loads, the dotenv library sets all the text file values as environment variables so the code can read those


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

**🤔 Why it might be wrong:** Dotenv is so easy and intuitive to start with so one easily overlook fundamental features: It's hard to infer the configuration schema and realize the reason and typing of each key. Consequently, there is no built-in way to fail fast when a mandatory key is missing (a flow might fail after already started and doing side-effects). In the example above, the blog post will be saved to DB and only then too late the code will realize that a mandatory key is missing leaving the app hanging in an invalid state. On top of this, in the precense of many keys, it's not possible to organize them hierarchically. If not enough, it encourages developers to commit this .env file which might contain production values - this happens because there is no clear way to define development defaults (teams usually work around this by committing .env.example file and then asking whomever pulls code to rename this file manually. If they remember of course)


**☀️ Better alternative:** Some configuration libraries provide out of the box solution to all of these needs, mostly a clear schema and the possibility to validate early and fail if needed. See comparison of options here. One of the better alternatives is 'convict', here is the same example, hopefully better:

```javascript
// config.js
export default {
  userService: {
    url: {
        // Hierarchical, documented and strongly typed 👇
        doc: 'The URL of the user management service including a trailing slash',
        format: 'url',
        default: 'http://localhost:4001',
        nullable: false,
        env: 'USER_SERVICE_URL',
        }
  },
  //more keys here
}

//start.js
import convict from 'convict';
import configSchema from 'config';
convict(configSchema);
// Fail fast!
convictConfigurationProvider.validate();

//blog-post.js
repository.savePost(post);
// Will never arrive here if the URL is not set
await axios.put(`${convict.get(userService.url)}/api/user/${post.userId}/incrementPosts`)
```

## 2. Calling a 'fat' service from the API controller

**💁‍♂️ What is it about:** Consider a reader of our code who wishes to understand the entire *high-level* flow or delve into a very *specific* part. She first lands on the API controller, where requests start. This controller layer, unlike what its name implies, is just an adapter and kept really thin and simple. Great thus far. Then the controller calls a big 'service' with thousands lines of code that represent the entire logic

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

**📊 How popular:** It's hard to pull solid numbers here, I could confidently say that in *most* of the app that I see, this is the case

**🤔 Why it might be wrong:** We're here to tame complexities. One of the useful techniques, is deferring a complexity to the later stage possible. In this case, the reader's of the code (hopefully) easily skim through the tests and the controller, and then as she lands on the service - she gets all the complexity of the domain and the code although she is not interested in all the details. This is unnecessary complexity

**☀️ Better alternative:** Controller should call a special type of service, a **use-case**, which is responsible to *summarize* the flow in a business and simple language. Each flow/feature is described using a use-case, each contains 4-10 lines of code, that tell the story without technical details. It mostly orchestrates other small services, clients, and repositories who hold all the implementation details. With use cases, the reader can grasp the high-level flow easily, she can now **choose** where she would like to focus. She is now exposed only to necessary complexity. This technique also encourages partitioning the code to the smaller object that the use-case orchestrate. Bonus: By looking at coverage reports, one can tell which features are covered, not just files/functions

```javascript
// add-order-use-case.js
export async function addOrder(newOrder: addOrderDTO) {
  orderValidation.assertOrderIsValid(newOrder);
  const userWhoOrdered = await userServiceClient.getUserWhoOrdered(newOrder.userId);
  paymentTermsService.assertPaymentTerms(
    newOrder.paymentTermsInDays,
    userWhoOrdered.terms
  );

  const response = await orderRepository.addOrder(newOrder);

  return response;
}

```

Ideas: Encourage breaking down to small services, transactions, controller is a bad name, clean architecture, code coverage

## 3. Nest.js: Wire *everything* with dependency injection


**💁‍♂️ What is it about:** If you're doing Nest.js, besides having a powerful framework in your hands, you probably use DI for *everything* and make every class injectable. Say you have a weather-service that depends upon humidity-service, and **there is no requirement to swap** the humidity-service and replace it with some alternative services. You still inject humidity-service into the weather-service. It becomes part of your development style, "why not" you think - I may need to stub it during testing or replace it in the future

 
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

**📊 How popular:** No numbers here but I could confidently say that in *all* of the Nest.js app that I've seen, this is the case

**🤔 Why it might be wrong:** Dependency injection is not a priceless coding style rather a pattern that you should pull in the right moment, like an other pattern. Why? because any pattern has its price. What price you ask? First, encapsulation is violated, clients of weather-service are now aware that other providers it uses *internally*, some may get tempted to override it also its not under their responsibility. Second, it's another layer of complexity to learn, maintain and another way to shoot yourself in the legs. StackOverflow ows some of its revenues to Nest.js DI, plenty of discussions try to solve this puzzle (e.g. did you know that in case of circular dependency the order of imports matter?). Third, there is the performance thing - Nest.js for example struggled to provide decent start time for serverless environments and had to introduce [lazy loaded modules](https://docs.nestjs.com/fundamentals/lazy-loading-modules). Don't get me wrong, **in some cases**, there is a clear need to decouple a dependency from its caller, or to allow clients to inject custom implementations (e.g., the strategy pattern) - **In such case**, when there is a value, you may consider whether the *value of DI worth its price*. If you don't have this case, why pay for nothing?

**☀️ Better alternative:** 'Leanify' your engineering approach - avoid using any tool unless serves real-world need immediately. Start simple, a dependant class just import its dependency and use it. Facing a situation when there is a need to factor dynamic objects? There are handful of simple patterns, simpler than DI, that you should consider like 'if/else', factory function and more. Singleton are requested? consider techniques with lower costs like the module system with factory function. Need to stub/mock for testing? Monkey patching might be better than DI: better clutter your test code a bit than clutter your production code. Have a strong need to hide from an object where its dependencies are coming from? You sure? Use DI!

```typescript
// humidity-service.ts - not customer facing
  export async function getHumidity(when: Datetime): Promise<number> {
    // Fetches from some specific cloud service
  }

// weather-service.ts - customer facing
import { getHumidity } from './humidity-service.ts';

    // ✅ No wiring is happening externally, all is flat and explicit. Simple
  export async function getWeather(when: Datetime): Promise<number> {
    // Fetch temperature from somewhere and then humidity from GoogleHumidityService
    // Nobody needs to know about it, its an implementation details
    await getHumidity(when);
     
  }
```

Ideas: The complexity tree, good articles, not really di, nest example app, YAGNI

## 4. Passport.js for token authentication


**💁‍♂️ What is it about:** Commonly, you're in a need to issue or/and authenticate JWT tokens. You might also need to allow log-in from *one* single social network like Google/Facebook. When faced with these kind of needs, Node.js developers rush to the glorious library Passport.js like butterflies attracted to light

**📊 How popular:** 1,389,720 weekly downloads

**🤔 Why it might be wrong:** If you're simply tasked with guarding your routes with JWT token - you're just few lines of code shy from ticking the goal. Instead of messing up with a new framework, instead of introducing levels of indirections (you call passport, then it calls you), instead of spending time learning new abstractions - just use one of the simple and reputable JWT parsing libraries like [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) or [fast-jwt](https://github.com/nearform/fast-jwt). Have concerns with the security hardening? Good point, will you get better hardening with direct understanding of your configuration and flow or by hiding things behind a framework? I'm not sure. Also, Passport might take care for hardening the flow, but what about secrets/token managements and DB protection - various cloud services or OSS projects, can tick all of those boxes. Consider also that Passport doesn't aim to handle authorization or user management. It seems to me like many who opt for Passport.js are not fully aware which needs are satisfied and which are left open. All of that said, Passport definitely shines when looking for a quick way to support *many* social login providers


**☀️ Better alternative:** If all you need is a token authentication? These few lines of code below might be all you need, you might also see [practica.js JWT lib example](https://github.com/practicajs/practica/tree/main/src/code-templates/libraries/jwt-token-verifier). You probably need more than this - support async JWT flow with JWKS, securely manage and rotate the secrets and more. In this case, OSS solution like [keycloak](https://github.com/keycloak/keycloak) or commercial options like Auth0[https://github.com/auth0] are alternatives to consider 

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

**💁‍♂️ What is it about:** When testing against an API, supertest provides a sweat syntax that can both detect the webserver address, make HTTP call and also assert on the response. A three in one package. 

```javascript
require('dotenv').config();
console.log(process.env.DB_USER_NAME);
```

**📊 How popular:** 2,717,744 weekly downloads

**🤔 Why it might be wrong:** You already have your assertion library, why code some tests using another... which actually was suppoed to be HTTP client. On top of this, supertest encourage coupling to express, not API (won't work on remote env, couples to implementation). Last but not least, there are more popular HTTP clients, better maintained and features that might be relevant for testing

**☀️ Better alternative:** A popular and standard HTTP client library like Node.js Fetch or Axios

code example


## 6. Fastify decorate for non request/web utilities

**💁‍♂️ What is it about:** Fastify introduces great patterns, I mostly like how it preserves the simplicity of express while bringing more batteries. One thing that got me wondering is the 'decorate' feature which allows placing common utilities/services inside a widely accessible container object. I'm referring here specifically to the case where a cross cutting concern utility/service is being used:

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

It should be noted that 'decoration' is also used to place values (e.g., user) inside a request - this is a slightly different case and sensible

**📊 How popular:** Fastify has 696,122 weekly download and growing rapidly. The decorator concept is part of the framework's core

**🤔 Why it might be wrong:** Some services and utilities serve cross-cutting-concern needs and should be accessible from other layers like domain and DAL. The fastify object might not accessible to these layers, and you also probably don't want to couple your web framework with you business logic. Consider that some of your business logic and repositories might get invoked from non-REST clients like CRON, MQ and similar - In these cases Fastify won't get involved at all

**☀️ Better alternative:** A good old Node.js module is a standard way to expose and consume functionality. Need a singleton? Use the module system caching. Need to instantiate a service with in correlation with some Fastify life-cycle hook (e.g., DB connection on start)? Call it from that Fastify hook

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

**💁‍♂️ What is it about:** You catch an error somewhere deep in the code (not on the route level), then call logger.error to make this error observable. Feels simple and necessary

```javascript
try{
    axios.post('https://thatService.io/api/users);
}
catch(error){
    logger.error(error, this, {operation: addNewOrder});
}
```

**📊 How popular:** Hard to put my hands on numbers but it's quite popular, right?

**🤔 Why it might be wrong:** First, errors should get handled/logged in a central location. Error handling is a critical path, without a centralized and unified behaviour, it's easy for different catch clauses along the code to behave differently. For example, a request might arise to tag all errors with certain metadata, or on top of logging to also fire a monitoring metric - applying this in ~100 different locations is not a walk in the park. Second, catch clauses should be minimized to very specific scenarios. By default, the natural flow of an error is bubbling down to the route/entry-point - from there is will get forwarded to the error handler. Catch clauses should serve two very specific needs: When one wishes to change the flow based on the error or enrich the error with more information (which is not the case in this example)

**☀️ Better alternative:** Let the error bubble down the layer, unless the error changes the flow or there is value in enriching the error with more context. When deciding to use catch, delegate the handling/logging to your centralized handler:

```javascript
try{
    axios.post('https://thatService.io/api/users);
}
catch(error){
    // ✅ A central location that handles error
    errorHandler.handle(error, this, {operation: addNewOrder});
}
```

## 8. Package.lock OR Reading environment variables in all the code layers

The Monorepo market is hot like fire. Weirdly, now when the demand for Monoreps is exploding, one of the leading libraries - Lerna- has just retired. When looking closely, it might not be just a coincidence - With so many disruptive and shiny features brought on by new vendors, Lerna 

## 9. Use Morgan logger for express web requests

**💁‍♂️ What is it about:** In many express apps, you are likely to find a pattern that is being copy-pasted for ages - Using Morgan logger to log requests information:

```javascript
const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('combined'))
```

**📊 How popular:** 2,901,574 downloads/week

**🤔 Why it might be wrong:** Wait a second, you already have your main logger, right? Is it Pino? Winston? something else? great. Why deal with and configure yet another logger? I do appreciate the request domain-specific language (DSL) of Morgan, sweet syntax, does it justify having two loggers?

**☀️ Better alternative:** Put your chosen logger in a middleware and log the desired request/response properties:

```javascript
// ✅ Use your preferred logger for all the tasks
const logger = require("pino")();
app.use((req, res, next) => {
  res.on("finish", () => {
    logger.info(`${req.url} ${res.statusCode}`);// Add other properties here
  });
  next();
});

```

## 10. Having conditional code based on NODE_ENV value

**💁‍♂️ What is it about:** To differentiate between a configuration of development vs production, it's common to set the environment variable NODE_ENV with "production|test". Doing so allows the various tooling to act differently. For example, some templating engines will cache compiled templates only in production. Beyond tooling, custom applications use this to specify behaviours that are unique to the development or production environment:

```javascript
if(process.env.NODE_ENV === "production"){
    // This is unlikely to be tested since test runner usually set NODE_ENV=test
    setLogger({stdout: true, prettyPrint: false});
    // If this code branch above exists, why not add more production-only configurations:
    collectMetrics();
}
else{
    setLogger({splunk: true, prettyPrint: true});
}
```

**📊 How popular:** 5,034,323 code results in GitHub when searching for "NODE_ENV". It doesn't seem like a rare pattern

**🤔 Why it might be wrong:** Anytime your code checks whether it's production or not, this branch won't get hit by default in some test runner (e.g., Jest set NODE_ENV=test). In *any* test runner, the developer must remember to test for each possible value of this environment  variable. In the example above, 'collectMetrics()' will be tested for the first time in production. Additionally, putting this conditions opens the door to add more differences between production and the developer machine. Theoretically, one can set NODE_ENV = "production" in testing and cover all the branches, but then if you can test the production version, what's the point in separating?

**☀️ Better alternative:** To avoid having untested code **that you wrote**, the same code must get executed in all environments - no if(production)/else(development) conditions. Inevitably, developers machine are likely to have different surrounding infrastructure like different logging system. We feel comfortable with it because these infrastructural libraries are battle tested and anyway not ours. Practically, we may put different values in the configuration but not in the code. For example, a typical logger emits JSON in production but in development machine it emits 'pretty-print' colorful lines. To meet this, we set ENV VAR that tells whether what logging style we aim for:


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

