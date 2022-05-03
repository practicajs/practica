
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
    <td><h1>workspace (npm, yarn, pnpm)</h1></td>
  </tr>
  <tr>
    <td colspan="5" align="center"><h2>Executive Summary</h2></td>
  </tr>
  <tr valign="top">
    <td>Community and maintenance</td>
    <td><img src="./img/full.png"/><br/><br/>Huge eco-system and commercial-grade maintenance</td>
    <td><img src="./img/full.png"/><br/><br/>Tredning, commercial-grade maintenance</td>
    <td>
      <img src="./img/partial.png"/><br/><br/>Not maintained anymore</td>
    <td><img src="./img/almost-full.png"/><br/><br/>Solid</td>
  </tr>
  <tr valign="top">
    <td>❗Encourage component autonomy</td>
    <td><img src="./img/partial.png"/><br/><br/>Packages are highly coupled</td>
    <td><img src="./img/almost-full.png"/><br/><br/>Workflow is coupled</td>
    <td><img src="./img/almost-full.png"/><br/><br/>npm link prevents bypasses the SemVer</td>
    <td>
      <img src="./img/full.png"/><br/><br/>Minor concern: shared NODE_MODULES on the root</td>
  </tr>
  <tr valign="top">
    <td>Build speed</td>
    <td><img src="./img/full.png"/><br/><br/>Smart inference and execution plan, shared depedencies, cache</td>
    <td><img src="./img/full.png"/><br/><br/>Smart inference and execution plan, shared depedencies, cache</td>
    <td><img src="./img/partial.png"/><br/><br/>Parallel tasks execution, copied dependencies</td>
    <td>
      <img src="./img/partial.png"/><br/><br/>Shared depedencies</td>
  </tr>
    <tr valign="top">
    <td>Versioning strategy</td>
    <td><img src="./img/almost-full.png"/><br/><br/>Only fixed versioning</td>
    <td><img src="./img/almost-full.png"/><br/><br/>Only independent versioning</td>
    <td><img src="./img/full.png"/><br/><br/>Both fixed and independent versioning</td>
    <td>
      <img src="./img/almost-full.png"/><br/><br/>Only independent versioning</td>
  </tr>
    <tr>
    <td class="tg-ho3n" colspan="5" align="center"><h2>Tasks and build pipeline</h2></td>
  </tr>
  <tr>
    <td>Parallel task execution</td>
    <td><br/>Supports parllel execution</td>
    <td><br/>Supports parllel execution</td>
    <td><br/>Seuqence execution only</td>
    <td><br/>Sequance execution only</td>
  </tr>
  <tr>
    <td>Cache</td>
    <td><br/>Remote (premium) and local cache</td>
    <td><br/>Remote (premium) and local cache</td>
    <td><br/>No</td>
    <td><br/>No</td>
  </tr>
    <tr>
    <td>Visual dependency graph</td>
    <td><br/>Supported</td>
    <td><br/>Supported, task dependencies</td>
    <td><br/>None</td>
    <td><br/>None</td>
  </tr>
  <tr>
    <td>Depndency resolution</td>
    <td><br/>Supported</td>
    <td><br/>Supported</td>
    <td><br/>None</td>
    <td><br/>None</td>
  </tr>
  <tr>
    <td class="tg-ho3n" colspan="5" align="center"><h2>Linking packages</h2></td>
  </tr>
  <tr>
    <td>Mechanism</td>
    <td><br/>Via TypeScript paths and webpack</td>
    <td><br/>Symlinks via the package manager</td>
    <td><br/>Symlinks via the package manager</td>
    <td><br/>Symlinks</td>
  </tr>
   <tr>
    <td>Can opt-out?</td>
    <td><br/>No</td>
    <td><br/>Yes</td>
    <td><br/>Yes</td>
    <td><br/>Yes</td>
  </tr>
  <tr>
    <td class="tg-ho3n" colspan="5" align="center"><h2>Hoisting</h2></td>
  </tr>
    <td>Boost npm installs</td>
    <td><br/>Root package.json and NODE_MODULES</td>
    <td><br/>Yes via workspaces</td>
    <td><br/>Yes via workspaces</td>
    <td><br/>Yes via workspaces</td>
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
