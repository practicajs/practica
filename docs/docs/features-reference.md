---
id: features
sidebar_position: 3
---

# Features and practices

This list outlines all the capabilities and roadmap of Practica.js

Here will come a filter panel to search by categories, what's strategic, and more

## 1.1.1 Logger

**What:** A reputable and hardened logger

**Tags:** #strategic #logger

**👷🏾 Status:** <img src="https://raw.githubusercontent.com/practicajs/practica/main/docs/static/img/docs/decisions/full.png"/>  Production-ready, more hardening is welcome

**🏆 Chosen libraries:** [Pino.js](https://github.com/pinojs/pino) [(Decision log here)](https://github.com)

**🎁 Bundles:** example-flow, full-flow

**🏁 CLI flags:** --logger=true|false

## 1.1.2 Prevent infinite logger serialization loop

**What:** Limit logged JSON depth when cyclic reference is introduced

**Tags:** #logger

**👷🏾 Status:** <img src="https://raw.githubusercontent.com/practicajs/practica/main/docs/static/img/docs/decisions/partial.png"/>  Idea, not implemented

**🏆 Chosen libraries:** [Pino.js](https://github.com/pinojs/pino) [(Decision log here)](https://github.com)

**🎁 Bundles:** example-flow, full-flow

**🏁 CLI flags:** None, always true

