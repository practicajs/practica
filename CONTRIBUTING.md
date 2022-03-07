# How do we work together?

## You belong with us

If you reached down to this page, you probably belong with us 💜. We are in an ever-going quest for better software practices. This journey can bring two things to your benefit: A lot of learning and global impact on many people's craft. Does this sounds attractive? 

## A 3 min summary of this doc

https://user-images.githubusercontent.com/8571500/156925380-024a1bab-54ec-4799-a1e6-aa21b99dcff3.mp4

(Coming soon)

## Philosophy

Our main selling point is our philosophy, our philosophy is 'make it SIMPLE'. There is one really important holy grail in software - Speed. The faster you move, the more features and value is created for the users. The faster you move, more improvements cycles are deployed and the software/ops become better. [Researches show](https://puppet.com/resources/report/2020-state-of-devops-report) that faster team produces software that is more reliable. Complexity is the enemy of speed - Commonly apps are big, sophisiticated, has a lot of internal abstractions and demand long training before being productive. Our mission is to minimize complexity, get onboarded developers up to speed quickly, or in simple words - Let the reader of the code understand it in a breeze. If you make simplicity a 1st principle - Great things will come your way.

Big words, how exactly? Here are few examples:

**- Simple language -** We use TypeScipt becuase we believe in types, but we minimize advanced features. This boils down to using functions only, sometimes also classes. No abstracts, generic, complex types or anything that demand more CPU cycles from the reader. 

**- Less generic -** Yes, you read it right. If you can code a function that covers less scenarios but is shorter and simpler to understand - Consider this option first. Sometimes one if forced to make things generic - That's fine, at least we minimized the amount of complex code locations

**- Simple tools -** Need to use some 3rd party for some task? Choose the library that is doing the minimal amount of work. For example, when seeking a library that parses JWT tokens - avoid picking a super-fancy framework that can solve any authorization path (e.g., Passport). Instead, Opt for a library that is doing exactly this. This will result in code that is simpler to understand and reduced bug surface

**- Prefer Node/JavaScript built-in tooling -** Some new frameworks have abstractions over some standard tooling. They have their way of defining modules, libraries and others which demand learning one more concept and being exposed to unneccessary layer of bugs. Our preferred way is the vanila way, if it's part of JavaScript/Node - We use it. For example, should we need to group a bunch of files as a logical modules - We use ESM to export the relevant files and functions

[Our full coding guide will come here soon](./docs/coding-guide.MD)


## Small changes workflow

Every small change can make this repo much better. If you intend to contribute a relativelly small change like documentation change, linting rules, look&feel fixes, fixing TYPOs, comments or anything that is small and obvious - Just fork to your machine, code, ensure all tests pass (e.g., `npm test`), PR with a meaninful title, get **1** approver before merging

|          	| **➡️ Idea**                                                                                                   	| **➡ Design decisions**                                                                                                                                                                                                                 	| **➡ Code**                                                                                                                                                                                	| **➡️ Merge**                                                                                                                                                                                                                                        	|
|----------	|--------------------------------------------------------------------------------------------------------------	|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| **When** 	| Got an idea how to improve? Want to handle an existing issue?                                                	| When the change implies some major decisions, those should be discussed in advance                                                                                                                                                     	| When got confirmation from core maintainer that the design decisions are sensible                                                                                                         	| When you have accomplished a *short iteration* . If the whole change is small, PR in the end                                                                                                                                                       	|
| **What** 	| **1.** Create an issue (if doesn't exist) <br/>  **2.** Comment and specify your intent to handle this issue 	| **1.** Within the issue, specify your overall approach/design. Or just open a discussion<br/>  **2.** If choosing a 3rd party library, ensure to follow our vendor choosing principles (e.g., only top 3 most popular can be selected) 	| **1.** Do it with passions 💜 <br/>  **2.** Follow our coding guide. Keep it simple. Stay loyal to our philosophy <br/>  **3.** Run all the quality measures frequently (testing, linting) 	| **1.** Share your progress early by submit a (work in progress PR)[https://github.blog/2019-02-14-introducing-draft-pull-requests/] <br/>  **2.** Ensure all CI checks pass (e.g., testing) <br/>  **3.** Get at least one approval before merging 	|

## Roles

## Development machine setup

✅ Node.js >= 16.0.0
✅ Docker
✅ GitHub 2FA
✅ npm 2FA
✅ [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)


## Code structure

