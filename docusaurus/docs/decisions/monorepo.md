---
sidebar_position: 4
sidebar_label: Monorepo Decision
---

# Decision: Choosing **Monorepo** approach and tooling

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
    <td>Community and maintenance</td>
    <td><img src="./img/full.png"/><br/><br/>Huge eco-system and commercial-grade maintenance</td>
    <td><img src="./img/full.png"/><br/><br/>Tredning, commercial-grade maintenance</td>
    <td>
      <img src="./img/partial.png"/><br/><br/>None maintained anymore</td>
    <td><img src="./img/almost-full.png"/><br/><br/>Solid</td>
  </tr>
  <tr valign="top">
    <td>❗Encourage comonent autonomy</td>
    <td><img src="./img/partial.png"/><br/><br/>Packages are highly coupled</td>
    <td><img src="./img/partial.png"/><br/><br/>Packages are highly coupled</td>
    <td><img src="./img/almost-full.png"/><br/><br/>npm link prevents bypasses the SemVer</td>
    <td>
      <img src="./img/full.png"/><br/><br/>Minor concern: shared NODE_MODULES on the root</td>
  </tr>
  <tr valign="top">
    <td>Build speed</td>
    <td><img src="./img/full.png"/><br/><br/>Smart inference and execution plan, shared depedencies</td>
    <td><img src="./img/full.png"/><br/><br/>Smart inference and execution plan, shared depedencies</td>
    <td><img src="./img/partial.png"/><br/><br/>Parallel tasks execution, copied dependencies</td>
    <td>
      <img src="./img/almost-full.png"/><br/><br/>Shared depedencies</td>
  </tr>
    <tr>
    <td class="tg-ho3n" colspan="5" align="center"><h2>Tasks and build pipeline</h2></td>
  </tr>
  <tr>
    <td>Parallel tasks execution</td>
    <td><br/>Supported</td>
    <td><br/>Supported</td>
    <td><br/>Supported</td>
    <td><br/>-</td>
  </tr>
    <tr>
    <td>Visual dependency graph</td>
    <td><br/>Supported</td>
    <td><br/>Supported</td>
    <td><br/>None</td>
    <td><br/>None</td>
  </tr>
  <tr>
    <td>Infer affected packages</td>
    <td><br/>?</td>
    <td><br/>?</td>
    <td><br/>?</td>
    <td><br/>?</td>
  </tr>
  <tr>
    <td class="tg-ho3n" colspan="5" align="center"><h2>Linking packages</h2></td>
  </tr>
  <tr>
    <td>Mechanism</td>
    <td><br/>Via TypeScript paths and webpack</td>
    <td><br/>?</td>
    <td><br/>npm link</td>
    <td><br/>npm link</td>
  </tr>
  <tr>
    <td class="tg-ho3n" colspan="5" align="center"><h2>Hoisting</h2></td>
  </tr>
    <td>Boost npm installs</td>
    <td><br/>Root package.json and NODE_MODULES</td>
    <td><br/>Root package.json and NODE_MODULES</td>
    <td><br/>None</td>
    <td><br/>Link root NODE_MODULES to packages/NODE_MODULES</td>
  </tr>
  <tr>
    <td class="tg-ho3n" colspan="5" align="center"><h2>Others</h2></td>
  </tr>
  <tr>
    <td>Scaffold new component from a gallery</td>
    <td><br/>Supported</td>
    <td><br/>None</td>
    <td><br/>None</td>
    <td><br/>None</td>
  </tr>
</table>
