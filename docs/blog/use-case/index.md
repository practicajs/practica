---
slug: temporary-name
date: 2023-08-06T10:00
hide_table_of_contents: true
title: About the sweet and powerful 'use case' code pattern
authors: [goldbergyoni]
tags:
  [
    node.js,
    use-case,
    javascript,
    tdd,
    workflow,
    domain,
    tdd
  ]
---

## Intro: A sweet pattern that got lost in time

When was the last time you introduced a new pattern to your code? Your API controller is probably calling a code 'service', how about we place some mediator between the two and gain a handful of advantages? The 'use case' code pattern is a sweet, powerful, and easy to implement idea that can strategically elevate your code quality in a short time.

The term 'use case' means many different things in our industry. It's being used by product folks to describe a user journey, also being used in multiple architecture books to describe vague high-level concepts (e.g., clean-architecture use case, DDD application layer). This article is about the _code level_ pattern which emphasize how practically it can be implemented and the surprising merit it brings. Since it's sensible and intuitive, I bet that you already apply it implicitly to some extent - but it's only when properly formalizing it and doing it _right_ will truly unleash all of its power.

Technically, the use case pattern code belongs between the controller (e.g., API routes) and the business logic services (i.e., the domain layer). The use case code is called by the controller and tells in high-level words the flow that is about to happen. Doing so increases the code readability, navigability, pushes complexity toward the edges, improves observability and 3 other merits that are shown below with examples.

But let's start first by looking at a common problem and related code that calls for trouble:

<br/>

## The problem: too many details, too soon

Consider a typical case where a developer is asked to fix some bug over a codebase she didn't deal with in the last couple of months. The app is about some electronic shop, our developer has to fix something related with the new orders flow and _specifically_ something related with the price calculation.

She starts her journey, and for a start all feels dandy and peachy:

**- 🤗 Testing -** She starts her journey off the automated tests to learn about the flow from outside-in approach. The code is short and standard as should be:

```javascript
test("When adding an order with 100$ product, then the price charge should be 100$ ", async () => {
  // ....
})
```

**- 🤗 Controller -** She moves to skim through the implementation and start from the API routes. It hard to mess a controller code which is by design thin and simple:

```javascript
app.post("/api/order", async (req: Request, res: Response) => {
  const newOrder = req.body;
  await orderService.addOrder(newOrder); // 👈 This is where the real-work is done
  res.status(200).json({ message: "Order created successfully" });
});
```

Smooth sailing thus far. In ~90% of the apps that I reviewed, a controller would call a Service where the actual implementation starts. She navigates into the order service to find where and how to fix that pricing bug

**- 😲 The service -** Suddenly! She is thrown into hundred lins of code (at best) with tons of details. The majority of the information she is exposed to is not relevant to her task. There is a class with some state, and a base class it inherits from, and a dependency injection framework that wire all the dependent services, and more. Here is a sneak peak from a real-world service, I removed many of the details to simplify a bit. Read it, feel it:


```javascript
let DBRepository;

export class OrderService : ServiceBase<OrderDto> {
  async addOrder(orderRequest: OrderRequest): Promise<Order> {
  try {
    ensureDBRepositoryInitialized();
    const { openTelemetry, monitoring, secretManager, priceService, userService } =
      dependencyInjection.getVariousServices();
    logger.info("Add order flow starts now", orderRequest);
    openTelemetry.sendEvent("new order", orderRequest);

    const validationRules = await getFromConfigSystem("order-validation-rules");
    const validatedOrder = validateOrder(orderRequest, validationRules);
    if (!validatedOrder) {
      throw new Error("Invalid order");
    }
    this.base.startTransaction();
    const user = await userService.getUserInfo(validatedOrder.customerId);
    if (!user) {
      const savedOrder = await tryAddUserWithLegacySystem(validatedOrder);
      return savedOrder;
    }
    // And it goes on and on with the help of a handful other functions
}


```

So many details upfront, which of them is important for her to learn now? How can she find that pricing module? 

She is not happy:

**🗺 1. Hard to find her way -** It's hard to tell which pieces are involved, easily get the high-level flow, and from there easily deepen into the module of interest.

**🎨2. Bad design viewpoint -** If she need to adjust the flow, it's hard to reason about it and propose changes when all the pieces and details are tightly coupled.

**🧩2. Accidental complexity -** Right off the batt, she must make herself acquaintance with a handful of product and technical narratives. She just fell off the complexity cliff, from a zero-complexity controller straight into a 1000 pieces puzzle. Many of them are unrelated with her task. This moment in time is called 'accidental complexity', where a system is designed in a way that details meet the occasional reader early and unnecessarily. Some may suggest that pushing complexity to the edges is the holy grail of a well designed software.
 

[Image the complexity tree]


## The use-case pattern 

In a perfect world, she would love first to get a high-level brief of the involved steps so she can understand the whole flow, and from this comfort standpoint choose where to deepen her journey. This is what this pattern is all about.

The use case pattern is just a function that calls various other functions/services that do the actual job. It's typically very short, flat, no If/else, no try-catch, no algorithms, just plain calls to functions. This way, it tells the story in the simplest manner. Here is an example of the same order flow, can the developer tell now where the price calculation is located?:

```javascript
// /src/domain/use-cases/add-order-use-case.ts
export async function addOrderUseCase(orderRequest: OrderRequest): Promise<Order> {
  // 🖼 This is a use case - the story of the flow. Only simple, flat and high-level code is allowed
  const validatedOrder = validateAndCoerceOrder(orderRequest);
  const orderWithPricing = calculateOrderPricing(validatedOrder);
  const purchasingCustomer = await assertCustomerHasEnoughBalance(orderWithPricing);
  await addShippingWarningIfRelevant(orderWithPricing, purchasingCustomer);
  const savedOrder = await insertOrder(orderWithPricing);
  await sendSuccessEmailToCustomer(savedOrder, purchasingCustomer.email);
  const returnOrder = mapFromRepositoryToDto(savedOrder);

  return returnOrder;
}
```

Quite easy to understand the flow, right? Whether the underlying implementation is 500 lines, or 50K lines, wouldn't you want to start the exploration this way? I believe it's a gift to the reader. Note how it doesn't share too much details, but tells enough for one to understand WHAT is happening here and WHO is doing that.

Implementation-wise, one create a use-case file with a single function per each interaction with the system (e.g., a new post comment, a request to delete a user, etc). The use case function is called by the API controller, then it orchestrates various services and repositories.

Easy start, but doing it right demand a little thinking about the hidden merits of it, some gotchas and a few implementation best practices


## The merits, including some unusual ones

### 1. A navigation index

When seeking a specific book in the local library, the visitor doesn't have to skim through all the shelves to find a specific topic of interest. A Library is an information system that uses a navigational system, wayfinding signage, to highlight the path to a specific information area.


![Library catalog](./library-catalog.webp)
*The library catalog redirects the reader to the area of interest*

Likewise in our story, the developer seeks to find the pricing code so she can fix that nasty bug. The 'use case' is her hitchhikers guide to the app, or the yellow pages showing her where to find her desired entry. True, there are alternative techniques to make a self-explanatory design like modules and folders. Use case though is a much more intuitive: it shows only the relevant areas (and not 50 unrelated modules), it tells *when specifically*  this module is used, what is the *specific* entry point and which *specific* parameters are passed.

 
### 2. Deferred and spread complexity


As the code reader journey starts with implementation-services, she is by design plunged into the details. This immersion exposes her to both product and technical complexities right from the start. In our typical code example, the code must first use a dependency injection system to factor some classes, check for nulls in the state and get some values from the distributed config system - all before addressing the task at hand. This is called *accidental complexity*. Tackling complexity is one of the finest art of app design, as the code planner you can't just eliminate complexity, but you may at least reduce the chances of someone meeting it.

![The blocking-complexity tree](./blocking-complexity-tree.jpg)
*The accidental-complexity tree: A visitor aiming to reach a specific leaf must navigate through all the intervening poisoned fruits.*

This is where the 'Use Case' approach shines: it encourages using first only high-level product steps and lightweight-technical details. It shifts the coder's and reader's brain into thinking about 'What', and 'Who', rather than the 'How'. She can easily ignore steps that are unrelated with her work, complexity was avoided. A true strategic win.

![The spread-complexity tree](./deferred-complexity-tree.jpg)
*The spread-complexity tree: Complexity is pushed to the periphery, allowing the reader to navigate directly to the essential fruits only.*


### 3. A practical workflow that promotes efficiency

When tasked with coding a new flow, how do you start? Probably with some requirements reading, then creating an API route, and potentially some high-level tests (e.g., component tests). What is the next sensible step to start the coding phase? Starting with a use-case pushes you toward a great outside-in workflow that reveals risks early.

While coding a new use-case the various steps are noted down. Each step is a call to some service or repository functions, sometimes before they even exist. These steps naturally become your TODO list, a live document that tells not only what should be implemented but also where risky gotchas hide. Consider this use case:


```javascript
export async function addOrderUseCase(orderRequest: OrderRequest) {
  const orderWithPricing = calculateOrderPricing(validatedOrder);
  const purchasingCustomer = await assertCustomerExists(orderWithPricing.customerId);
  const savedOrder = await insertOrder(orderWithPricing);
  await sendSuccessEmailToCustomer(savedOrder, purchasingCustomer.email);
}
```

Looking at these steps above, before you're bogged with the implementation details, call for imperative early actions:

- sendSuccessEmailToCustomer - You didn't get from the Ops team a mail sending service with a valid token! Sometimes this demands an approval and might last more than a week (believe me, I know). Acting *now*, before spending 3 days on coding, can make a big difference
- calculateOrderPricing - This reminds you that the product team didn't share with you the last pricing definition, pinging them *now* before they are off for a vacation can make a great deal to the delivery date
- assertCustomerExists - This call goes to an external Microservice which belongs to the User Management team. Do they even provide a route to check for customer existence? If they don't, asking too late will be your blocker down the road

Not only this high-level thinking highlights your tasks and risks, it's also an optimal spot to start the design from:


### 4. The optimal design viewpoint

Early when coding a use-case, the various types and functions signature must be defined. Maybe even return some example dummy data from these functions. This implicitly becomes a great design drill that break-down the overall problem into small units that actually fit. 

This allows discovering early when the puzzle pieces don't fit while taking into the account the underlying technologies. For example, once I coded a use case like the follows:

```javascript
await sendSuccessEmailToCustomer(savedOrder, purchasingCustomer.email, orderId);
const savedOrder = await insertOrder(orderWithPricing);
```

In my initial plan, the order is saved after sending the email. Then I realized that the Order Id is needed for the email, but to obtain one the order must be saved to DB first. Unfortunately, it turned out that my ORM is not returning the ID of saved entities. My design didn't work, I realized this before spending days on details. Unlike 10,000 ft design diagrams, designing with a use-case mind the reality constraints.


### 5. Better coverage reports

Say you have 82.35% testing code coverage, are you happy and confident to deploy? Anyone having below 100% must ask - which code *exactly* is not covered with testing. Is this some nitty-gritty niche code or actually critical business operations that are not fully tested? Not easy to tell by looking at typical coverage reports, the viewer has to to go through many implementation files to draw a conclusion. 

Use-cases make this a little better. When looking specifically into the use-cases folder, we get *'features coverage'*, it's shown which user features and steps are not covered by testing:

![Use case coverage](./use-case-coverage.PNG)
*The use-cases folder test coverage report, some use-cases are only partially tested*

In the example above, the code has nice overall coverage, 82.35%. What about the remaining 17.65% code? Looking at the report, it's easy to note that the 'payment-use-case' is not tested. This is the flow where revenues are generated, a critical financial process which has a very low test coverage. This significant data obviously calls for actions. Use-cases coverage allow prioritizing testing by business priority rather than by technical function.

### 6. Practical domain-driven code

"Commit the team to exercising that domain language relentlessly in all communication within the team and in the code", this advice from the book 'Domain-Driven Design' suggests that the code should embrace product narratives. By doing so, the various stakeholders will share a common language. While this sounds sensible, it is also a little vague - how and where should this happen?

Use-cases bring this idea down to earth: the use-case files are named after user journeys in the system (e.g., purchase-new-goods), the use-case code itself is encouraged to describe the flow in a product language. Should the word 'cut' in used by folks nearby the company water-cooler to describe a price deduction, then the use case should call a function 'calculatePriceCut' to be aligned with the domain language.

### 7. Consistent observability

I bet you encountered the situation when you turn the log level to 'Debug' (or any other verbose mode) and gets gazillion, overwhelming, and unbearable amount of log statements. Great chances that you also met the opposite when setting the logger level to 'Info' but there are also almost zero logging for the routes that you're looking into. It's hard to formalize when exactly each type of logging should be invoked, the result is a typical inconsistent and lacking observability.

Use-cases can drive trustworthy and consistent monitoring by taking advantage of the produced use-case steps. Since the precious work of breaking-down the flow into meaningful steps was already done (e.g., send-email, charge-credit-card), each step can produce the desired level of logging. For example, one team's approach might be to emit logger.info on a use-case start and use-case end, and then each step will emit logger.debug. Whatever the chosen specific level is, use-case steps bring consistency and automation. Put aside logging, the same can be applied with any other observability technique like OpenTelemetry to produce custom spans for every flow step.


The implementation though demands some thinking, we better not mess a use-case with tons of log statement:

```javascript
// ❗️Verbose use case
export async function addOrderUseCase(orderRequest: OrderRequest): Promise<Order> {
  logger.info("Add order use case - Adding order starts now", orderRequest);
  const validatedOrder = validateAndCoerceOrder(orderRequest);
  logger.debug("Add order use case - The order was validated", validatedOrder);
  const orderWithPricing = calculateOrderPricing(validatedOrder);
  logger.debug("Add order use case - The order pricing was decided", validatedOrder);
  const purchasingCustomer = await assertCustomerHasEnoughBalance(orderWithPricing);
  logger.debug("Add order use case - Verified the user balance already", purchasingCustomer);
  const returnOrder = mapFromRepositoryToDto(purchasingCustomer as unknown as OrderRecord);
  logger.info("Add order use case - About to return result", returnOrder);
  return returnOrder;
}
```

One way around this is creating a step wrapper function that takes care to make each step observable. The following function will get called for each step:

```javascript
import { openTelemetry } from "@opentelemetry";
async function runUseCaseStep(stepName: string, stepFunction: () => unknown) {
  logger.debug(`Use case step ${stepName} starts now`);
  // Create Open Telemetry custom span
  openTelemetry.startSpan(stepName);
  return await stepFunction();
}
```

Now the use-case gets automated and consistent observability:

```javascript
export async function addOrderUseCase(orderRequest: OrderRequest) {
  // 🖼 This is a use case - the story of the flow. Only simple, flat and high-level code is allowed
  const validatedOrder = await runUseCaseStep("Validation", validateAndCoerceOrder.bind(null, orderRequest));
  const orderWithPricing = await runUseCaseStep("Calculate price", calculateOrderPricing.bind(null, validatedOrder));
  await runUseCaseStep("Send email", sendSuccessEmailToCustomer.bind(null, orderWithPricing));
}
```

The code is a little simplified, in real-world wrapper you'll have to put try-catch and cover other corner cases, but it makes the core point: each step is a meaningful milestone in the user's journey that gets *automated and consistent* observability.

## Some gotchas to be prepared for

### 1. Transactions

Not the level of details the reader is interested at, Aggregate steps, or externalize the transaction, 

### 2. Small and simple API calls

Straightforward routes, not journey, CRUD app? don't use

## Best practices for implementation

### 1. Combine product and tech language

### 2. Combine product and tech language
- Best practices - meaningful params - make it a story, no destructure, no if/else, the product language, one calls another, 
- No try-catch
- Less than 10 dead-simple lines
- Bonus: linter
- File name
- No destruct
- Immutable
- Mappers
- A use-case might another use-case
- No specifics, know WHICH, not WHAT, not HOW


## Closing: start today, almost zero overhead

Just save time, no tooling, no big changes, it's a sweet pattern that meant to live in every piece of software


## Tasks
Titles: title: The beautiful, powerful, and overlooked 'use case' code pattern

