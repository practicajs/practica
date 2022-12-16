---
id: features
sidebar_position: 5
---

# Coming soon: Features and practices

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

**🏁 CLI flags:** `--logger=true|false`

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

**What:** Slow tests automatically shown clearly in the console and exported to a json report

**Tags:** #dx #testing

**👷🏾 Status:** <img src="/img/full.png"/>  Production-ready, more hardening is welcome

**🏆 Chosen libraries:** [jest-performance-reporter](https://github.com/sholzmayer/jest-performance-reporter)

**🎁 Bundles:** example-flow, full-flow

### 3.2 Autocomplete

**What:** When running tests in watch mode and choosing filename or test name patterns autocomplete will assist you

**Tags:** #dx #testing

**👷🏾 Status:** <img src="/img/full.png"/>  Production-ready, more hardening is welcome

**🏆 Chosen libraries:** [jest-watch-typeahead](https://github.com/jest-community/jest-watch-typeahead)


## 4. Docker
### 4.1 Secured dockerfile

**What:** We build a production-ready .dockerfile that avoids leaking secrets and leaving dev dependencies in

**Tags:** #security #docker

**👷🏾 Status:** <img src="/img/full.png"/>  Production-ready, more hardening is welcome

**🏆 Chosen libraries:** N/A

### 4.1 Layered build

**What:** The poduction artifact omit building tools to stay more compact and minimize attack sutface

**Tags:** #security #docker

**👷🏾 Status:** <img src="/img/full.png"/>  Production-ready, more hardening is welcome

**🏆 Chosen libraries:** N/A

### 4.2 Compact base image

**What:** A small, ~100MB, base image of Node is used

**Tags:** #docker

**👷🏾 Status:** <img src="/img/full.png"/>  Production-ready, more hardening is welcome

**🏆 Chosen libraries:** N/A


### 4.2 Testing docker-compose

**What:** Testing optimized database and other infrastrucuture running from docker-compose during the automated tests

**Tags:** #testing #docker #database

**👷🏾 Status:** <img src="/img/full.png"/>  Production-ready, more hardening is welcome

**🏆 Chosen libraries:** N/A


**Additional 100 features will come here**

## 5. Database
### 5.1 Sequelize ORM

**What:** Support for one of the most popular and matured ORM - Sequelize

**Tags:** #orm #db

**👷🏾 Status:** <img src="/img/full.png"/>  Production-ready, more hardening is welcome

**🏆 Chosen libraries:** Sequelize

### 5.2 Prisma ORM

**What:** Support for one of an emerging and type safe ORM - Prisma

**Tags:** #orm #db

**👷🏾 Status:** <img src="/img/full.png"/>  Production-ready, more hardening is welcome

**🏆 Chosen libraries:** Prisma

### 5.3 Migration

**What:** Includes migration files and commands for production-safe updates

**Tags:** #orm #db

**👷🏾 Status:** <img src="/img/full.png"/>  Production-ready, more hardening is welcome

**🏆 Chosen libraries:** Prisma

## 6. Request-level store

### 6.1 Automatic correlation-id

**What:** Automatically emit unique correlation id to every log line

**Tags:** #log #tracing

**👷🏾 Status:** <img src="/img/full.png"/>  Production-ready, more hardening is welcome

**🏆 Chosen libraries:** N/A