---
sidebar_position: 4
sidebar_label: OpenAPI Decision
---

# Decision: Choosing **_Monorepo** approach and tool

**📔 What is it** - Choosing the right Monorepo tool and features for the boilerplate

**⏰ Status** - Open

**📁 Corresponding discussion** - [Here](https://github.com/practicajs/practica/issues/80)

**🎯Bottom-line: our recommendation** - TBD

**📊 Detailed comparison table**

<table width="80%" valign="top">
  <tr>
    <td></td>
    <td><h1>nx</h1></td>
    <td><h1>Turborepo</h1></td>
    <td><h1>Lerna</h1></td>
    <td><h1>Yarn workspace</h1></td>
  </tr>
  <tr>
    <td colspan="5" align="center"><h2>Executive Summary</h2></td>
  </tr>
  <tr valign="top">
    <td>Maintainability</td>
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
