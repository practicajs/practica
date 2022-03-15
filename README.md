

![Best practices starter](/docs/images/practica-logo.png)

<br/>

### Generate a Node.js app that is packed with best practices AND simplicty in mind. Based on our repo [Node.js best practices](https://github.com/goldbergyoni/nodebestpractices) (77,000 stars)

🗓 **Alpha project:** This project is very premature WIP, please revisit by June 2022

# 3 things you oughta to know first

### 1. Best practices *on top of* known Node.js frameworks

We don't invent new wheels rather use your favorite framework and empower it with more structure and practices. For example, with a single command you get express/fastify based code base with ~100 additional best practices inside

![Built on top of known frameworks](/docs/images/on-top-of-frameworks.png)

### 2. SIMPLE like Node.js was meant to be

Keeping it simple, flat and based on native Node/JS capabilities is part of this project DNA. We believe that too many abstractions, high-complexity and fancy language features become soon a strategic slowdown for the team. To name a few example, our code flow is flat with almost no level of indirection, although using TypeScript - almost no features are being used besides types, for modularization we simply use... Node.js modules


![Built on top of known frameworks](/docs/images/abstractions-vs-simplicity.png)

### 3. Supports many technologies and frameworks

Since it's about good practices and simplicity, there is no need to narrow this code to specific framework or DB. We aim to support the major Node.js frameworks and databases

![Built on top of known frameworks](/docs/images/tech-stack.png)



https://user-images.githubusercontent.com/8571500/156916532-c73fd814-8815-486b-8117-04add11a5907.mp4



# A very quick start

- Open your terminal and type `npx practica`
- Answer few questions to customize for your own needs
- Start the project by typing `npm start` or run the test with `npm test`. Standard, ah?
- Become familiar with the code by reading it starting from index.ts. This is the nice part - The code is yours, no abstractions hiding
- Customize the routes and data model for your own needs by changing these 3 files (link soon)
- Feel free to adjust the code, the tests with 100% coverage protect your back

This is only the tip of the iceberg, read more at [https://practic.io](https://practic.io)


# Practices and features

We apply more than 100 practices and optimizations, you can opt-in or out for most of these features using our CLI flags. Following is few examples of features, to learn about the full list of features, [please visit here](https://practicajs.org/features)

| **Feature**                         	| **Explanation**                                                                                                                                                                                                                                                                        	| **Flag**                	| **Documentation link** 	|
|-------------------------------------	|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|-------------------------	|------------------------	|
|            Monorepo setup           	| Generates two components (e.g., Microservices) in a single repository with interactions between the two                                                                                                                                                                                	| --monorepo, --mr        	| [Docs here]()          	|
| Output escaping and sanitizing      	| Clean-out outgoing responses from potential HTML security risks like XSS                                                                                                                                                                                                               	| --output-escape, --oe   	| [Docs here]()          	|
| Integration (component) testing     	| Generates full-blown component/integration tests setup including DB                                                                                                                                                                                                                    	| --tests, --t            	| [Docs here]()          	|
| Unique request ID (Correlation ID)  	| Generates module that creates a unique correlation/request ID for every incoming request. This is available for any other object during the request life-span. Internally it uses Node's built-in [AsyncLocalStorage](https://nodejs.org/api/async_hooks.html#class-asynclocalstorage) 	| --correlation-id, --coi 	| [Docs here]()          	|
| Dockerfile                          	| Generates dockerfile that embodies 20> best practices                                                                                                                                                                                                                                  	| --docker-file, --df     	| [Docs here]()          	|
| Strong-schema configuration         	| A configuration module that dynamically load run-time configuration keys and includes a strong schema so it can fail fast                                                                                                                                                              	| Built-in with basic app 	| [Docs here](https://github.com/bestpractices/practica/blob/main/docs/decisions/configuration-library.MD)          	|

📗 **[Full features list - 100+ more](https://practica.io/features)**


# Steering committee

Practica is a community-driven open-source project. It's being led voluntarily by engineers from many companies. On top of this, these companies below which are keen to great engineeting practices chose to let their engineers contribute massively and push this project firmly 💚

![Autodesk](/docs/images/autodesk.png)

![Cox2m](/docs/images/cox2m.png)

# The people behind this

## Core team

Images of core team

## Contributors

Images of core contributors

# Partners

These companies are obliged to implement these best practices and daily routine and they also fund this project generously

![Cox2m](/docs/images/minta.png)

