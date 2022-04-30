---
sidebar_position: 3
sidebar_label: OpenAPI Decision
---

Notes: 

* 2 types of tools - `language-agnostic` like bazel, buck, pants, and `language-specific` like lerna, nx, rush.
I think `language-agnostic` are irrlevant for our comparision because the repo is js-oriented and those tools are tends to be more complex to configure 
because the can't do some assumption that `language-specific` tools can.
* vectors: task runners (parllel?), build systems (auto-resolve dependencies?, cache, performance), 
* What people want from their monorepo tool?



# Decision: Choosing **Monorepo** tooling

**📔 What is it** - A decision data and discussion about the right monorepo tools and approach

**⏰ Status** - Open, closed in TBD

**📁 Corresponding discussion** - TBD

**🎯Bottom-line: our recommendation** - TBD

**📊 Detailed comparison table**

<table width="80%" valign="top">
  <tr>
    <td></td>
    <td><h1>Yarn/Npm workspaces</h1></td>
    <td><h1>Nx</h1></td>
    <td><h1>Rush</h1></td>
    <td><h1>Lage</h1></td>
    <td><h1>Turborepo</h1></td>
    <td><h1>Bit</h1></td>
    <td><h1>Bolt</h1></td>
  </tr>
  <tr>
    <td colspan="5" align="center"><h2>Executive Summary</h2></td>
  </tr>
  <tr valign="top">
    <td>Some dimension</td>
    <td><img src="./img/full.png"/><br/><br/>1ms</td>
    <td><img src="./img/almost-full.png"/><br/><br/>5ms</td>
    <td>
      <img src="./img/almost-full.png"/><br/><br/>4ms</td>
    <td><img src="./img/almost-full.png"/><br/><br/>5ms</td>
  </tr>
  <tr valign="top">
    <td>Some dimension</td>
    <td><img src="./img/full.png"/><br/><br/>Superior</td>
    <td><img src="./img/partial.png"/><br/><br/>Less popular than competitors</td>
    <td><img src="./img/almost-full.png"/><br/><br/>Highly popular</td>
    <td>
      <img src="./img/almost-full.png"/><br/><br/>Highly popular</td>
  </tr>
  <tr valign="top">
    <td>❗ Important factor</td>
    <td><img src="./img/almost-full.png"/><br/><br/>No</td>
    <td><img src="./img/full.png"/><br/><br/>Yes</td>
    <td><img src="./img/partial.png"/><br/><br/>No</td>
    <td>
      <img src="./img/partial.png"/><br/><br/>No</td>
  </tr>

  <tr>
    <td class="tg-ho3n" colspan="5" align="center"><h2>More details: Community & Popularity - March 2022</h2></td>
  </tr>
  <tr>
    <td>Stars</td>
    <td><br/>4200 ✨</td>
    <td><br/>2500 ✨</td>
    <td><br/>2500 ✨</td>
    <td><br/>1000 ✨</td>
  </tr>
  <tr>
    <td>Downloads/Week</td>
    <td><br/>12,900,223 📁</td>
    <td><br/>4,000,000 📁</td>
    <td><br/>6,000,000 📁</td>
    <td><br/>5,000,000 📁</td>
  </tr>
    <tr>
    <td>Dependents</td>
    <td><br/>26,000 👩‍👧</td>
    <td><br/>600 👧</td>
    <td><br/>800 👧</td>
    <td><br/>1000 👧</td>
  </tr>
</table>
