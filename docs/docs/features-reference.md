---
id: features
sidebar_position: 5
---

# Features and practices

***WIP - This doc is being written these days***

This list will outline all the capabilities and roadmap of Practica.js

Here will come a filter panel to search by categories, what's strategic, and more

## 1. Logger
### 1.1 Logger Library

**What:** A reputable and hardened logger

**Tags:** #strategic #logger

**👷🏾 Status:** <img src="/img/full.png"/>  Production-ready, more hardening is welcome

**🏆 Chosen libraries:** [Pino.js](https://github.com/pinojs/pino) [(Decision log here)](https://github.com)

**🎁 Bundles:** example-flow, full-flow

**🏁 CLI flags:** --logger=true|false

### 1.2 Prevent infinite logger serialization loop

**What:** Limit logged JSON depth when cyclic reference is introduced

**Tags:** #logger

**👷🏾 Status:** <img src="/img/partial.png"/>  Idea, not implemented

**🏆 Chosen libraries:** [Pino.js](https://github.com/pinojs/pino) [(Decision log here)](https://github.com)

**🎁 Bundles:** example-flow, full-flow

**🏁 CLI flags:** None, always true

## 2. Configuration
### 2.1 Configuration retriever module

**What:** A configuration retriever module that packs good practices

**Tags:** #strategic #configuration

**👷🏾 Status:** <img src="/img/full.png"/>  Production-ready, more hardening is welcome

**🏆 Chosen libraries:** [Convict](https://github.com/mozilla/node-convict) [(Decision log here)](./decisions/configuration-library.md)

**🎁 Bundles:** example-flow, full-flow

**🏁 CLI flags:** -

## 3. Testing experience
### 3.1 Slow tests detection

**What:** Slow tests automatically shown clearly in the console and exported to csv + json reports

**Tags:** #dx #testing

**👷🏾 Status:** <img src="/img/full.png"/>  Production-ready, more hardening is welcome

**🏆 Chosen libraries:** [jest-performance-reporter](https://github.com/sholzmayer/jest-performance-reporter)

**🎁 Bundles:** example-flow, full-flow

### 3.2 Autocomplete

**What:** When running tests in watch mode and choosing filename or test name patterns autocomplete will assist you

**Tags:** #dx #testing

**👷🏾 Status:** <img src="/img/full.png"/>  Production-ready, more hardening is welcome

**🏆 Chosen libraries:** [jest-watch-typeahead](https://github.com/jest-community/jest-watch-typeahead)

**🎁 Bundles:** example-flow, full-flow


**Additional 100 features will come here**