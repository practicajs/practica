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

When was the last time you introduced a new pattern to your code? Your API controller is probably calling a code 'service', how about we place some mediator between the two and gain a handful of advantages? The 'use case' code pattern is a sweet, powerful, and easy to implement idea that can strategically elevate your backend code quality in a short time.

The term 'use case' means many different things in our industry. It's being used by product folks to describe a user journey, also being used in multiple architecture books to describe vague high-level concepts (e.g., clean-architecture use case, DDD application layer). This article is about the _code level_ pattern which emphasize how practically it can be implemented and the surprising merit it brings. Since it's sensible and intuitive, I bet that you already apply it implicitly to some extent - but it's only when properly formalizing it and doing it _right_ will truly unleash all of its power.

Technically, the use case pattern code belongs between the controller (e.g., API routes) and the business logic services (i.e., the domain layer). The use case code is called by the controller and tells in high-level words the flow that is about to happen. Doing so increases the code readability, navigability, pushes complexity toward the edges, improves observability and 3 other merits that are shown below with examples.

But let's start first by looking at a common problem and related code that calls for trouble:

<br/>

## The problem: too many details, too soon

Imagine a developer, returning to a codebase she hasn't touched in months, tasked with fixing a bug in the 'new orders flow'—specifically, an issue with price calculation in an electronic shop app.


Her journey begins promisingly smooth:  

She starts her journey, and for a start all feels smooth and peachy:

**- 🤗 Testing -** She starts her journey off the automated tests to learn about the flow from an outside-in approach. The testing code is short and standard, as should be:

```javascript
test("When adding an order with 100$ product, then the price charge should be 100$ ", async () => {
  // ....
})
```

**- 🤗 Controller -** She moves to skim through the implementation and starts from the API routes. Unsurprisingly, the Controller code is straightforward:

```javascript
app.post("/api/order", async (req: Request, res: Response) => {
  const newOrder = req.body;
  await orderService.addOrder(newOrder); // 👈 This is where the real-work is done
  res.status(200).json({ message: "Order created successfully" });
});
```

Smooth sailing thus far, almost zero complexity. Typically, the controller would now hand off to a Service where the real implementation begins, she navigates into the order service to find where and how to fix that pricing bug.

**- 😲 The service -** Suddenly! She is thrown into hundred lins of code (at best) with tons of details. She encounters classes with intricate states, inheritance hierarchies, a dependency injection framework that wire all the dependent services, and other boilerplate code. Here is a sneak peak from a real-world service, already simplified for brevity. Read it, feel it:


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
    // And it goes on and on until the pricing module is mentioned
}

```

So many details and things to learn upfront, which of them is crucial for her to learn now before dealing with her task? How can she find where is that pricing module?

She is not happy. Right off the bat, she must make herself acquaintance with a handful of product and technical narratives. She just fell off the complexity cliff: from a zero-complexity controller straight into a 1000-piece puzzle. Many of them are unrelated to her task.

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

Quite easy to understand the flow, right? Whether the underlying implementation is 500 lines, or 5000 lines, wouldn't you want to start the exploration this way? I believe it's a gift to the reader. Note how it doesn't share too much details, but tells enough for one to understand WHAT is happening here and WHO is doing that.

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
async function runUseCaseStep(stepName, stepFunction) {
  logger.debug(`Use case step ${stepName} starts now`);
  // Create Open Telemetry custom span
  openTelemetry.startSpan(stepName);
  return await stepFunction();
}
```

Now the use-case gets automated and consistent transparency:

```javascript
export async function addOrderUseCase(orderRequest: OrderRequest) {
  // 🖼 This is a use case - the story of the flow. Only simple, flat and high-level code is allowed
  const validatedOrder = await runUseCaseStep("Validation", validateAndCoerceOrder.bind(null, orderRequest));
  const orderWithPricing = await runUseCaseStep("Calculate price", calculateOrderPricing.bind(null, validatedOrder));
  await runUseCaseStep("Send email", sendSuccessEmailToCustomer.bind(null, orderWithPricing));
}
```

The code is a little simplified, in real-world wrapper you'll have to put try-catch and cover other corner cases, but it makes the core point: each step is a meaningful milestone in the user's journey that gets *automated and consistent* observability.

## Implementation best practices

### 1. Dead-simple 'no code'

Since use-cases are mostly about zero complexity, use no code constructs but flat calls to functions. No If/Else, no switch, no try/catch, nothing, only a simple list of steps. While ago I decided to put *only one* If/Else in a use-case: 

```javascript
export async function addOrderUseCase(orderRequest: OrderRequest) {
  const validatedOrder = validateAndCoerceOrder(orderRequest);
  const purchasingCustomer = await assertCustomerHasEnoughBalance(validatedOrder);
  if (purchasingCustomer.isPremium) {//❗️
    sendEmailToPremiumCustomer(purchasingCustomer);
    // This easily will grow with time to multiple if/else
  }
}
```

A month later when I visited the code above there were already three nested If/elses. Year from now the function above will host a typical imperative code with many nested branches. Avoid this slippery road by putting a very strict border, put the conditions within the step functions:


```javascript
export async function addOrderUseCase(orderRequest: OrderRequest) {
  const validatedOrder = validateAndCoerceOrder(orderRequest);
  const purchasingCustomer = await assertCustomerHasEnoughBalance(validatedOrder);
  await sendEmailIfPremiumCustomer(purchasingCustomer); //🙂
}
```

### 2. Find the right level of specificity

The finest art of a great use case is finding the right level of details. At this early stage, the reader is like a traveler who uses the map to get some sense of the area, or find a specific road. Definitely not learn about every road in the country. On the other hand, a good map doesn't show only the main highway and nothing else. For example, the following use-case is too short and vague:

```javascript
export async function addOrderUseCase(orderRequest: OrderRequest) {
  const validatedOrder = validateAndCoerceOrder(orderRequest);
  const finalOrderToSave = await applyAllBusinessLogic(validatedOrder);//🤔
  await insertOrder(finalOrderToSave);
}
```

The code above doesn't tell a story, neither eliminate some paths from the journey. Conversely, the following code is doing better in telling the story brief:

```javascript
export async function addOrderUseCase(orderRequest: OrderRequest) {
  const validatedOrder = validateAndCoerceOrder(orderRequest);
  const pricedOrder = await calculatePrice(validatedOrder);
  const purchasingCustomer = await assertCustomerHasEnoughBalance(orderWithPricing);
  const orderWithShippingInstructions = await addShippingInfo(pricedOrder, purchasingCustomer);
  await insertOrder(orderWithShippingInstructions);
}
```

Things get a little more challenging when dealing with long flows. What if there a handful of important steps, say 20? what if multiple use-case have a lot of repetition and shared step? Consider the case where 'admin approval' is a multi-step process which is invoked by a handful of different use-cases? When facing this, consider breaking-down into multiple use-cases where one is allowed to call the other.

### 3. When have no choice, control the DB transaction from the use-case

What if step 2 and step 5 both deal with data and must be atomic (fail or succeed together)? Typically you'll handle this with DB transactions, but since each step is discrete, how can a transaction be shared among the coupled steps?

If the steps take place one after the other, it makes sense to let the downstream service/repository handle them together and abstract the transaction from the use-case. What if the atomic steps are not consecutive? In this case, though not ideal, there is no escape from making the use-case acquaintance with a transaction object:

```javascript
export async function addOrderUseCase(orderRequest: OrderRequest) {
  // 🖼 This is a use case - the story of the flow. Only simple, flat and high-level code is allowed
  const transaction = Repository.startTransaction();
  const purchasingCustomer = await assertCustomerHasEnoughBalance(orderRequest, transaction);
  const orderWithPricing = calculateOrderPricing(purchasingCustomer);
  const savedOrder = await insertOrder(orderWithPricing, transaction);
  const returnOrder = mapFromRepositoryToDto(savedOrder);
  Repository.commitTransaction(transaction);
  return returnOrder;
}
```

### 4. Aggregate small use-cases in a single file

A use-case file is created per user-flow that is triggered from an API route. This model make sense for significant flows, how about small operations like getting an order by id? A 'get-order-by-id' use case is likely to have 1 line of code, seems like an unnecessary overhead to create a use-case file for every small request. In this case, consider aggregating multiple operations under a single conceptual use-case file. Here below for example, all the order queries co-live under the query-orders use-case file:

```javascript
// query-orders-use-cases.ts
export async function getOrder(id) {
  // 🖼 This is a use case - the story of the flow. Only simple, flat and high-level code is allowed
  const result = await orderRepository.getOrderByID(id);
  return result;
}

export async function getAllOrders(criteria) {
  // 🖼 This is a use case - the story of the flow. Only simple, flat and high-level code is allowed
  const result = await orderRepository.queryOrders(criteria);
  return result;
}
```

## Closing: start today, almost zero overhead

Just save time, no tooling, no big changes, it's a sweet pattern that meant to live in every piece of software


## Tasks

Titles:

- The beautiful, powerful, and overlooked 'use case' code pattern
- The beautiful use-case code pattern
- About the beautiful use-case code pattern
- The Power and beauty of the Use-Case Code Pattern in Application Development
- The Power and beauty of the Use-Case Code Pattern

## Ideas

- Title
- Nice logging view
- Nice open-telemetry view
- Bonus: linter
- No destruct
- BP: Immutable, Mappers
- meaningful params - make it a story, 
- Diagram for 1st paragraph that shows where

## How to promote

- Reddits with upvotes buy
- HN
- FB
- Whatsapps
- 