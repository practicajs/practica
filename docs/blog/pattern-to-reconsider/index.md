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


**💁‍♂️ What is it about:** You're decorating *every* class *by default* as injectable. Say A, B, C, although internal details - no unit tests, it's still decorated. DI becomes your coding style, just like you're using classes

```javascript
require('dotenv').config();
console.log(process.env.DB_USER_NAME);
```

**📊 How popular:** No numbers here but I could confidently say that in *all* of the Nest.js app that I see, this is the case

**🤔 Why it might be wrong:** DI is not a coding style rather engieering measure that should be used contextually to solve problems. It also has a price that you should consider if worth paying - encapsulation, confusion, slower (Nest.js serverless issue). If you don't need it for a specific class/case, why pay this price? DI is sometimes useful and the right weapon to pull - But it's not always

**☀️ Better alternative:** Leanify your engineering approach - avoid using any tool unless serves real-world need immediately. Need to dynamically factor some provider? Use if/else with plain simple JS code, need to mock something? monkey patching is also an option (better clutter test code tha production code, right?). Really have a reason to decouple the factoring of a dependency from the dependant? Use DI!

Ideas: The complexity tree, good articles, 

## 4. Passport.js for token authorization


**💁‍♂️ What is it about:** Typical need to validate JWT token, whether you're the issuer or an external issue like Google/Facebook

```javascript
require('dotenv').config();
console.log(process.env.DB_USER_NAME);
```

**📊 How popular:** 1,389,720 weekly downloads

**🤔 Why it might be wrong:** It brings high abstractions that demand learning new concepts, when basic token authentication demands no more than few lines of code. Passport shines when there is a need to support many providers - int this case the abstraction worth its price

**☀️ Better alternative:** Code it yourself or with the provider library

Ideas: 

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

**💁‍♂️ What is it about:** Fastify introduces great patterns, preserves the simplicity of express while bringing more batteries. One thing that got me wondering is the 'decorate' feature which allows placing common utilities/services inside a widely accessible container object:

```javascript
logger example
```

It should be noted that 'decorate' allows scoping the access per plugin/area of the system

**📊 How popular:** Fastify has 696,122 weekly download and growing rapidly. The decorator concept is part of the framework's core

**🤔 Why it might be wrong:** Some services and utilities serve cross-cutting-concern needs like logger and should be accessible from other layers like domain and DAL. The fastify object is not accessible to this layer, you probably don't want to, req can come from MQ

**☀️ Better alternative:** A good old Node.js module is a standard way to expose functionality. It should be noted that Node.js module won't provide scoped access/configuration per specific routes

Code example of logger

## 7. Logging from a catch clause

**💁‍♂️ What is it about:** You catch an error somewhere deep in the code (not on the route level), then call logger.error to make this error observable

```javascript
try{
    axios.post('https://thatService.io/api/users);
}
catch(error){
    logger.error(error, this, {operation: addNewOrder});
}
```

**📊 How popular:** Hard to put my hands on numbers but it's quite popular, right?

**🤔 Why it might be wrong:** Error should get handled/logged in a central location. Often do I see various catch clauses that handle the error in a different way with different tags for example. This behaviour is also likely to change, consider incrementing a metric on every error, and keeping this DRY is valuable here. Other than that, there should be a motivation to put a catch clause instead of letting the error bubble down to the route/entry-point. It's useful if we wish to change the flow based on the error or enrich the error with more information - this is not the case here

**☀️ Better alternative:** Avoid catch, let the error bubble down the layer, unless the error changes the flow or there is value in enriching the error with more context. When deciding to use catch, delegate the handling/logging to your centralized handler

Code example of catch and handler

## 8. Package.lock OR Reading environment variables in all the code layers

The Monorepo market is hot like fire. Weirdly, now when the demand for Monoreps is exploding, one of the leading libraries - Lerna- has just retired. When looking closely, it might not be just a coincidence - With so many disruptive and shiny features brought on by new vendors, Lerna 

## 9. Use Morgan logger for express web requests

**💁‍♂️ What is it about:** In many express, found the following line merely logs the request info

```javascript
try{
    axios.post('https://thatService.io/api/users);
}
catch(error){
    logger.error(error, this, {operation: addNewOrder});
}
```

**📊 How popular:** 2,901,574 downloads/week

**🤔 Why it might be wrong:** You already have your main logger, right? Is it Pino? Winston? something else? great. Why deal with and configure yet another logger? 

**☀️ Better alternative:** Use you main logger in a middleware and log the desired request/response properties

Code example of logging with Pino

## 10. having conditional code based on NODE_ENV value

**💁‍♂️ What is it about:** To differentiate between the dev and prod env, it's common to set a environment variable NODE_ENV with "production|test" so various tooling and code can act differently. For example, some templating engines will cache compiled templates only in prod. Other example, different configuration and services something troublesome

```javascript
if(process.env.NODE_ENV === "production"){
    // This is unlikely to be tested since test runner usually set NODE_ENV=test
    setLogger({stdout: true, prettyPrint: false});
    // If this branch exists, why not add more different configurations:
    collectMetrics();
}
else{
    setLogger({splunk: true, prettyPrint: true});
}
```

**📊 How popular:** 5,034,323 code results in GitHub when searching for "NODE_ENV". It doesn't seem like a rare pattern

**🤔 Why it might be wrong:** Anytime your code checks whether it's production, this branch can't be tested and might fail in production. In this example... Additionally, it opens the door to add more logic and configuration to these branches. Theoretically one can set NODE_ENV = "production" in testing but then what's the point in separating?

**☀️ Better alternative:** Conceptually, there is one environment - "production", developers should strive for *code* that is identical while the surrounding services like log aggregator, collaborator REST API (things that we anyway don't test) can differ. In the rare cases where the code behaviour must be different, set a flag per functionality and not per environment - this at least discourages setting more functionality in production or testing if/else branch. See example below:

```javascript
//package.json
"scripts": {
    "start": "LOG_PRETTY_PRINT=false index.js",
    "test": "LOG_PRETTY_PRINT=true jest"
}

//index.js
setLogger({prettyPrint: process.env.LOG_PRETTY_PRINT})
```