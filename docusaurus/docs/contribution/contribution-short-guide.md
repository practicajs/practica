# Contributing to Practica.js - The short guide

## You belong with us

If you reached down to this page, you probably belong with us 💜. We are in an ever-going quest for better software practices. This journey can bring two things to your benefit: A lot of learning and global impact on many people's craft. Does this sounds attractive?

Note: This is a shortened guide that suits those are willing to quickly contribute. Once you deepen your relations with Practica.js - It's a good idea to read the [full guide](https://github.com/practicajs/practica/blob/main/CONTRIBUTING.md)

## 3 things to consider

- Our philospophy is all about minimalism and simplicity - We strive to write less code, rely on existing and reputable libraries, stick to Node/JS standards and avoid adding our own abstractions
- Popular vendors only - Each technology and vendor that we introduce must super popular and reliable. For example, a library must one of the top 5 most starred in its category. See [full vendor choose instructions here](./vendor-pick-library.MD)
- 

## The internals in a nutshell

Practica is divided into two main worlds:

**- The code generator - Code and CLI to get the user preferences and copy the right code to her computer**

Here you will find CLI, UI, and logic to generate the right code. 

**- The code templates - The output of our program: An example Microservice and libraries that the user will code with**

Here you will the generated code that we will selectivelly copy to the user's computer. This files are not pure TS/JS files rather template files, to code with these files, you must first generate aside code for yourself, then you'll receive valid TS files which you can modify. Later on, once your tests pass and you're happy - You must copy the changes back to the template files

## Workflow

1. Idea
2. Optional: Design
3. PR

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
nvm i
```

✅ Ensure all tests pass:

```
npm t
```

✅ You can safely start now: Code, run the test and vice versa
