---
sidebar_position: 1
sidebar_label: Configuration Library
---

# Decision: Choosing a **_configuration_** library

**📔 What is it** - A decision data and discussion about the right configuration library

**⏰ Status** - Open, closed in April 1st 2022

**📁 Corresponding discussion** - [Here](https://github.com/practicajs/practica/issues/10)

**🎯Bottom-line: our recommendation** - **✨convict✨** ticks all the boxes by providing both strict schema, fail fast option, entry documentation and hierarchical structure

**📊 Detailed comparison table**

| | dotenv | Convict | nconf | config |
| --- | --- | --- | --- | --- |
| **Executive Summary** |
| Performance (load time for 100 keys) | ![Full](/img/docs/decisions/full.png) <br/> 1ms | ![Almost full](/img/docs/decisions/almost-full.png) <br/> 5ms |  ![Almost full](/img/docs/decisions/almost-full.png) <br/> 4ms | ![Almost full](/img/docs/decisions/almost-full.png) <br/> 5ms |
| Popularity | ![Full](/img/docs/decisions/full.png) <br/> Superior | ![Partial](/img/docs/decisions/partial.png) <br/> Less popular than competitors | ![Almost full](/img/docs/decisions/almost-full.png) <br/> Highly popular | ![Almost full](/img/docs/decisions/almost-full.png) <br/> Highly popular |
| ❗ Fail fast & strich schema | ![Almost full](/img/docs/decisions/almost-full.png) <br/> No | ![Full](/img/docs/decisions/full.png) <br/> Yes | ![Partial](/img/docs/decisions/partial.png) <br/> No |  ![Partial](/img/docs/decisions/partial.png) <br/> No |
| Items documentation | ![Partial](/img/docs/decisions/partial.png) <br/> No | ![Full](/img/docs/decisions/full.png) <br/> Yes | ![Partial](/img/docs/decisions/partial.png) <br/> No |  ![Partial](/img/docs/decisions/partial.png) <br/> No |
| Hierarchical configuration schema | ![Partial](/img/docs/decisions/partial.png) <br/> No | ![Full](/img/docs/decisions/full.png) <br/> Yes | ![Full](/img/docs/decisions/full.png) <br/> Yes |  ![Partial](/img/docs/decisions/partial.png) <br/> No |
| **More details: Community & Popularity - March 2022** |
| Stars | 4200 ✨ | 2500 ✨ | 2500 ✨ | 1000 ✨ |
| Downloads/Week | 12,900,223 📁 | 4,000,000 📁 | 6,000,000 📁 | 5,000,000 📁 |
| Dependents | 26,000 👩‍👧 | 600 👧 | 800 👧 | 1000 👧 |
