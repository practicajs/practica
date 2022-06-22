---
id: features
sidebar_position: 5
---

# Features and practices

***WIP - This doc is being written these days***

This list will outline all the capabilities and roadmap of Practica.js

Here will come a filter panel to search by categories, what's strategic, and more

## 1.1.1 Logger

**What:** A reputable and hardened logger

**Tags:** #strategic #logger

**👷🏾 Status:** <img src="/img/full.png"/>  Production-ready, more hardening is welcome

**🏆 Chosen libraries:** [Pino.js](https://github.com/pinojs/pino) [(Decision log here)](https://github.com)

**🎁 Bundles:** example-flow, full-flow

**🏁 CLI flags:** --logger=true|false

## 1.1.2 Prevent infinite logger serialization loop

**What:** Limit logged JSON depth when cyclic reference is introduced

**Tags:** #logger

**👷🏾 Status:** <img src="/img/partial.png"/>  Idea, not implemented

**🏆 Chosen libraries:** [Pino.js](https://github.com/pinojs/pino) [(Decision log here)](https://github.com)

**🎁 Bundles:** example-flow, full-flow

**🏁 CLI flags:** None, always true

## 2.0.0 Configuration

**What:** A configuration retriever module that packs good practices

**Tags:** #strategic #configuration

**👷🏾 Status:** <img src="/img/full.png"/>  Production-ready, more hardening is welcome

**🏆 Chosen libraries:** [Convict](0https://github.com/mozilla/node-convict) [(Decision log here)](./decisions/configuration-library.md)

**🎁 Bundles:** example-flow, full-flow

**🏁 CLI flags:** -

**Additional 100 features will come here**