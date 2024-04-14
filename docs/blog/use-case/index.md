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

As the code reader begins her journey with implementation services, she is immediately plunged into the details.

As the code reader journey starts with implementation-services, she is by design plunged into the details. This immersion exposes her to both product and technical complexities right from the start. In our typical code example, the code must first use a dependency injection system to factor some classes, check for nulls in the state and get some values from the distributed config system - all before addressing the task at hand. This is called *accidental complexity*. Tackling complexity is one of the finest art of app design, as the code planner you can't just eliminate complexity, but you may at least reduce the chances of someone meeting it.

![The blocking-complexity tree](./blocking-complexity-tree.jpg)
*The accidental-complexity tree: A visitor aiming to reach a specific leaf must navigate through all the intervening poisoned fruits.*

This is where the 'Use Case' approach shines: it encourages using first only high-level product steps and lightweight-technical details. It shifts the coder's and reader's brain into thinking about 'What', and 'Who', rather than the 'How'. She can easily ignore steps that are unrelated with her work, complexity was avoided. A true strategic win.

![The spread-complexity tree](./deferred-complexity-tree.jpg)
*The spread-complexity tree: Complexity is pushed to the periphery, allowing the reader to navigate directly to the essential fruits only.*


### 3. A practical workflow that combines outside-in and inside-out

Ideas: before delving into the bits and bits, functions, start your implementation journey by deciding who are the key services, repositories that will act here. Put an empty skeletons, this become your TODO list. This is also an ideal chance to think about the design, see next

Some steps might call for early actions like...

Now you're not the reader but rather the coder

The use-case is your todo list that highlights actions items and risks

When looking from high-level standpoint you might realize dependencies and risks - "

Risk-based development, identify integrations, example: no email token!,

### 3. The optimal design viewpoint

Code example: design doesn't fit

It's not just a nice lego craft, it's a verification that the various pieces fit

Ideas: A sensible break-down of the overall problem into smaller units that make sense. It's the perfect design stand-point: not just 10,000ft diagram, not high-level layers, but rather a description of the concrete units that will solve the problem, including the technology! (e.g., validation framework). It's a perfect angle to realize where things don't make sense: 

sendEmail(fullOrder)
saveOrder(OrderInsert)

Design-wise, it's much better than TDD as it doesn't deal with one-unit, 

small services!

show how service breakdown doesn't make sense - high level view, better than TDD, 2. concise domain. The story when elad screwed

### 4. Better coverage reports that prioritize testing


Ideas: coverage reports - Genuine test coverage insights as it tells which Features are covered. Someone tells you that 70% of your code are covered, with testing, how bad? not sure. On the other hand, 90% covered, but then you open the report and see that add-order - your main revenue generator - 

Visual: picture of coverage report

it prioritizes coverage report by *business* priority


### 5. Achieving a domain-driven code in a simple manner

We all heard high-words about aligning our code with the product domain, DDD, screaming architecture, to name a few. In fact, the commonality among all the reputable software architecture is the advice to separate the domain code from the technical layers. This advice strike as abstract theoretic advice to many. The use case pattern brings these ideas to our code in a simple form - this is where the product lingo is formalized

Ideas: Great communication asset - share with team lead, domain language/screaming (the hook between product and code), , some quote from DDD, 

### 6. Natural observability spans

 Open-telemetry, show abstraction, show Jaegear, 

## Some gotchas to be prepared for


### 1. Transactions

### 2. Small and simple API calls

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

