---
sidebar_position: 3
---

# Coding with Practica

Now that you have Practice installed (if not, do this first), it's time to code great code using it

## Pre-requisites

Just before you start coding, ensure you have Docker and nvm (a utility that installs Node.js) installed. Both are considered as a good practice for development

## What did you install?

You now have a folder with Practica inside. What exactly can you find in this folder? An example Node.js solution with a single component (API, Microservice) that is called 'order-service'. Of course you'll change its name to something that represents your solution

Besides this component, there are also a bunch of reusable libraries like logger, error-handler and more. All sit together under a single root folder in a single Git repository - this style is called a 'Monorepo'

The code inside is coded with TypeScript and embodies many great practices that we thoughtfully picked

## Running and testing the solution

A minute before we start coding, let's ensure the solution starts and the tests pass. This will give us confidence to add more and more code knowing that the tests are watching our back

Just run the following typical commands:

1. CD into the solution folder

```bash
cd {your-solution-folder}
```

2. Install the right Node.js version

```bash
nvm use
```

3. Install dependencies

```bash
npm install
```

4. Run the tests

```bash
npm test
```

Tests pass? Great! 🥳  

They fail? oppss. Approach our discord or open an issue please

5. Optional: Start and check with Postman

Some rely on testing only, others like also to invoke routes using POSTMAN and test manually

```bash
npm start
```

Now visit our online POSTMAN collection, explore the routes, invoke and make yourself familiar with the app

We have the ground ready 🐥. Let's code now, just remember to run the tests once in a while to ensure nothing breaks

## The layers of a component in less than 2 minutes

A typical component (e.g., Microservice) contains 3 main layers. Each layer owns a plain folder. N-Tier.

**- Entry points -** This is the door to the application where flows start and requests come-in. Our example component has a REST API (i.e., API controllers), this is one kind of an entry-point. There might be other entry-points like a scheduled job, message queue and more. Whatever entry-point you're dealing with, the responsibility of this layer is minimal - receive requests and adapt them to the internal language. For example, a controller gets API request and does nothing than authenticate the users, extract the payload and call a domain layer function 👇

**- Domain -** A folder containing the heart of the app where the flows, logic and data-structure are defined. Its functions can serve any type of entry-points - whether it's being called from API or message queue, the domain layer is agnostic to the source of the caller. Code here may call other services via HTTP/queue. It's likely also to fetch from and save information in a DB, for this it will call the data-access layer 👇
  
**- Data-access -** Your entire DB interaction functionality and configuration is kept in this folder

This structure is called '3-tier architecture' which is a very robust yet simple way to organize code

## Let's code a flow from API to DB and in return

We're about to implement a simple feature to make you familiar with the major code areas. After reading/coding this section, you should be able to add routes, logic and DB objects to your system easily. The example code app is about adding and querying for Orders, goes without words that you'll change this to the columns and entities that your app is about

> **🗝 Key insight:** Practica has no hidden abstractions, you have to become familiar with the code and modify it to your needs. This minimizes scenarios where you get stuck when an abstraction is not suitable to your need or you don't understand how things work

**Requirements -** - Our missions is to code the following: Allow updating an order through the API. Orders should have now a new mandatory field: Status. If the existing order field 'paymentTermsInDays' is 0 (payment due date is in the past)) or the status is 'Delivered' - no changes are allowed

**1. Change the example component/service name**

Obviously your solution, has a different context and name. You probably want to rename the example service name from 'order-service' to {your-component-name}, both the folder name and the package.json name field:

*./services/order-service/package.json*
```javascript
{
  "name": "your-name-here",
  "version": "0.0.2",
  "description": "An example Node.js app that is packed with best practices",
}

```

If you're just experimenting with Practica, you may leave the name as-is for now
   
**2. Add a new 'Edit' route**

The express API routes are located in the entry-points layer in a file 'routes.ts': *[root]/services/order-service/entry-points/api/routes.ts*

This is a very typical express code, if you're familiar with express you'll be productive right away. This is a core principle of Practica - use battle tested technologies as-is. Let's just add a new route in this file:

```javascript
// A new route to edit order
router.put('/:id', async (req, res, next) => {
    try {
      logger.info(`Order API was called to edit order ${req.params.id}`);
      // Call the main code in the domain layer
      res.json(editOrderResponse).status(200).end();
    } catch (err) {
      next(err);
    }
  });
```

Looks highly familiar, right?

**3. Create a 'use case'**

Following good software practices, the entry-point (i.e., controller), should be thin and do nothing but adapt from HTTP requests to our internals - the domain layer. In the domain folder we need to create a function to handle this feature. We may just create a service code and put it there but preferably let's create a 'use case'. This is a special type of code object that is created for each feature/flow and describes it in simple steps and actions. It merely calls other services to do the 'real' work and handle the smaller details. This way, the reader who visits the use case can get understand the HIGH-LEVEL flow quickly and easily. We will implement it soon, for now let's just create a file under:

*[root]/services/order-service/domain/edit-order-use-case.ts*
```javascript
export default async function editOrder(orderId: number,
  updatedOrder: editOrderDTO
) : Promise<void>{
    Promise.resolve();
}
```

And call this from the edit route that we've added previously



**3. Write a test or POSTMAN**

**4. Put the data access code**

1. Code the logic part
   


- Various commands
  
  * Migration

- Ideas: Running the code, plain JS, no abstractions, - Focus or not, this is express code, 