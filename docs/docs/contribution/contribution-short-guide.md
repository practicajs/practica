---
sidebar_position: 1
sidebar_label: Short guide
---

# Contributing to Practica.js - The short guide

## You belong with us

We are in an ever-going quest for better software practices. If you reached down to this page, you probably belong with us 💜. 

Note: This is a shortened guide that suits those are willing to quickly contribute. Once you deepen your relations with Practica.js - It's a good idea to read the [full guide](https://github.com/practicajs/practica/blob/main/CONTRIBUTING.md)

## 2 things to consider

- Our philosophy is all about minimalism and simplicity - We strive to write less code, rely on existing and reputable libraries, stick to Node/JS standards and avoid adding our own abstractions
- Popular vendors only - Each technology and vendor that we introduce must super popular and reliable. For example, a library must one of the top 5 most starred and downloaded in its category. . See [full vendor choose instructions here](./vendor-pick-guidelines.md)

## The main internals tiers (in a nutshell)

For a quick start, you don't neccesserily need to understand the entire codebase. Typically, your contribution will fall under one of these three categories:

### Option 1 - External or configuration change

**High-level changes**

If you simply mean to edit things beyond the code - There is no need to delve into the internals. For example, when changing documentation, CI/bots, and alike - One can simply perform the task without delving into the code

### Option 2 - The code generator

**Code and CLI to get the user preferences and copy the right code to her computer**

Here you will find CLI, UI, and logic to generate the right code. We run our own custom code to go through the code-template foler and filter out parts/files based on the user preferences. For example, should she ask NOT to get a GitHub Actions file - The generator will remove this file from the output

How to work with it?

1. If all you need is to alter the logic, you may just code in the ~/code-generator/generation-logic folder and run the tests (located in the same folder)
2. If you wish to modify the CLI UI, then you'll need to build the code before running (because there is no way to run TypeScript in CLI). Open two terminals: 

- Open one terminal to compile the code:

```
npm run build:watch
```

- Open second terminal to run the CLI UI:

```
npm run start:cli
```

### Option 3 - The code templates

**The output of our program: An example Microservice and libraries**

Here you will the generated code that we will selectively copy to the user's computer which is located under {root}/src/code-templates. It's preferable to work on this code outside the main repository in some side folder. To achieve this, simply generate the code using the CLI, code, run the tests, then finally copy to the main repository

1. Install dependencies

```
nvm use && npm i
```

2. Build the code

```
npm run build
```

3. Bind the CLI command to our code

```
cd .dist && npm link
```

4. Generate the code to your preferred working folder

```
cd {some folder like $HOME}
create-node-app immediate --install-dependencies
```

4. Now you can work on the generated code. Later on, once your tests pass and you're happy - copy the changes back to ~/practica/src/code-templates

5. Run the tests while you code

```
#From the folder where you generated the code to. You might need to 'git init'
cd default-app-name/services/order-service
npm run test:dev
```


## Workflow

1. Idea - Claim an existing issue or open a new one
2. Optional: Design - If you're doing something that is not straightforward, share your high-level approach to this within the issue
3. PR - Once you're done, run the tests locally then PR to main. Ensure all checks pass. If you introduced a new feature - Update the docs

## Commit standards

 Commit messages must follow [conventional commit guidelines](https://www.conventionalcommits.org/en/v1.0.0/#summary), read the full guide for more info.

## Development machine setup

✅ Ensure Node, Docker and [NVM](https://github.com/nvm-sh/nvm#installing-and-updating) are installed

✅ Configure GitHub and npm 2FA!

✅ Close the repo if you are a maintainer, or fork it if have no collaborators permissions

✅ With your terminal, ensure the right Node version is installed:

```
nvm use
```

✅ Install dependencies:


```
npm i
```

✅ Ensure all tests pass:

```
npm t
```

✅ You can safely start now: Code, run the test and vice versa
