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

1. Change the example component/service name
   
2. Add a new 'Edit' route

3. Write a test?

4. Put the data access code

5. Code the logic part
   


- Various commands
  
  * Migration

- Ideas: Running the code, plain JS, no abstractions, - Focus or not, this is express code, 