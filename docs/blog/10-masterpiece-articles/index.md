---
slug: masterpiece-articles
date: 2022-12-10T10:00
hide_table_of_contents: true
title: 10 masterpiece articles about testing that you don't want to miss
authors: [goldbergyoni]
tags:
  [
    node.js,
    testing,
    javascript,
    tdd,
    unit,
    integration
  ]
---

## What's so special about these articles?

Intro

I read 100+ articles, scanned Google, mostly JS, 

### 🏅 1. 'Unit test fetish'

**✍️ Author:** Martin Sústrik

**🔖 Abstract:** The article opens with 'I hear that prople feel an uncontrollable urge to write unit tests nowaydays. If you are one of those affected, spare few minutes and consider these reasons for NOT writing unit tests'. Despite these words, the article is not against unit tests as a principle rather highlights when & where unit tests fall short. In these cases, other techniques should be considered. Here is an example: Unit tests inherently have lower return on investment, the author comes with a sounding analogy for this: 'If you are painting a house, you want to start with a biggest brush at hand and spare the tiny brush for the end to deal with fine details. If you begin your QA work with unit tests, you are essentially trying to paint entire house using the finest chinese calligraphy brush...'

**👓 Read time:** 5 min (1000 words)

**🔗 Link:** [https://250bpm.com/blog:40/](https://250bpm.com/blog:40/)

### 🏅 2. 'Testing implementation details'

**✍️ Author:** Kent C Dodds

**🔖 Abstract:** The author outlines with a code example the unavoidable tragic faith of a tester who assert on implementation details. Put aside the effort in testing so many details, going this route always end with 'false positive' and 'false negative' that clouds the tests reliability. The article illustrate this with a frontend code example but the lesson takeaway is ubiquitous to any kind of testing

p.s. This author has another outstanding post about a modern testing strategy, checkout this one as well - ['Write tests. Not too many. Mostly integration'](https://kentcdodds.com/blog/write-tests)

**👓 Read time:** 13 min (2600 words)

**🔗 Link:** [https://kentcdodds.com/blog/testing-implementation-details](https://kentcdodds.com/blog/testing-implementation-details)

### 🏅 3. 'Test Desiderata'

**✍️ Author:** Kent Beck

**🔖 Abstract:** Not sure about this article yet. His majesty, 

**👓 Read time:** 5 min (908 words)

**🔗 Link:** [https://medium.com/@kentbeck_7670/test-desiderata-94150638a4b3](https://medium.com/@kentbeck_7670/test-desiderata-94150638a4b3)

### 🏅 4. 'How to Unit Test with Node.js?' (for beginners)

**✍️ Author:** Ryan Jones

**🔖 Abstract:** *One single recommendation for beginners:* Any other article on this list covers advanced testing. This article, and only this one, is meant for testing newbies who are looking to take their first practical steps in this world

This tutorial was chosen from a handful of other alternatives because it's well-written and also relatively comprehensive. It covers the first steps 'kata' that a beginner should learn first about: the test anatomy syntax, test runners CLI, assertions and asynchronous tests. Goes without words, this knowledge won't be sufficient for covering a real-world app with testing, but it gets you safely to the next phase. My personal advice: after reading this one, your next step is learning about [test doubles (mocking)](https://www.testim.io/blog/sinon-js-tutorial/)

**👓 Read time:** 16 min (3000 words)

**🔗 Link:** [https://medium.com/serverlessguru/how-to-unit-test-with-nodejs-76967019ba56](https://medium.com/serverlessguru/how-to-unit-test-with-nodejs-76967019ba56)

### 🏅 5. 'Testing Microservices, the sane way'

**✍️ Author:** Cindy Sridharan

**🔖 Abstract:** 12k claps

**👓 Read time:** 52 min (10,500 words)

**🔗 Link:** [https://copyconstruct.medium.com/testing-microservices-the-sane-way-9bb31d158c16](https://copyconstruct.medium.com/testing-microservices-the-sane-way-9bb31d158c16)

### 🏅 6. 'Mocking is a Code Smell'

**✍️ Author:** Eric Elliott

**🔖 Abstract:** Most of the articles here belong more to the 'modern wave of testing', here is something more 'classic' and appealing to TDD lovers or just anyone with a need to write unit tests. This article is about HOW to reduce the number of mocking (test doubles) in your tests. Not only because mocking is an overhead in test writing, also because they hint that something might be wrong. In other words, mocking is not definitely wrong and must be fixed right away but *many* mocking are a sign of something. Consider a module that inherits from many others, or a chatty one that collaborates with a handful of other modules to do its job - testing and changing this structure is a burden:

`
Mocking is required when our decomposition strategy has failed
`
The author goes through a various of techniques to design more autonomous units like using pure functions by isolating side-effects from the rest of the program logic, using pub/sub, isolating I/O, composing units with patterns like monadic compositions, and some more

The overall article tone is balanced. In some parts, it encourages functional programming and techniques that are far from the mainstream - consider reading these few parts with a grain of salt

**👓 Read time:** 32 min (6,300 words)

**🔗 Link:** [https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a](https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a)

### 🏅 7. 'Why Good Developers Write Bad Unit Tests'

**✍️ Author:** Michael Lynch

**🔖 Abstract:** Probably my favourite as it can convert, shows why especially, example

**👓 Read time:** 11 min (2,2000 words)

**🔗 Link:** [https://mtlynch.io/good-developers-bad-tests/](https://mtlynch.io/good-developers-bad-tests/)


### 🏅 8. 'An Overview of JavaScript Testing in 2022'

**✍️ Author:** Vitali Zaidman

**🔖 Abstract:** Different beast, rundown, comprehensive

**👓 Read time:** 37 min (7,400 words)

**🔗 Link:** [https://medium.com/welldone-software/an-overview-of-javascript-testing-7ce7298b9870](https://medium.com/welldone-software/an-overview-of-javascript-testing-7ce7298b9870)


### 🏅 9. 'Testing Error Handling in node.js'

**✍️ Author:** Lars Trieloff

**🔖 Abstract:** Drama, 

**👓 Read time:** 8 min (1,670 words)

**🔗 Link:** [https://blog.developer.adobe.com/testing-error-handling-in-node-js-567323397114](https://blog.developer.adobe.com/testing-error-handling-in-node-js-567323397114)


• https://www.jamesshore.com/v2/projects/nullables/testing-without-mocks
• Mine
• Mock is a code smell
• The long run
* Choose one in the end, put only one