---
sidebar_position: 2
sidebar_label: Monorepo
---

# Decision: Choosing **Monorepo** approach and tooling

**📔 What is it** - Choosing the right Monorepo tool and features for the boilerplate

**⏰ Status** - Open for discussions

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
    <td><b>Community and maintenance</b></td>
    <td><img src="https://raw.githubusercontent.com/practicajs/practica/main/docs/static/img/docs/decisions/full.png"/><br/><br/>Huge eco-system and commercial-grade maintenance</td>
    <td><img src="https://raw.githubusercontent.com/practicajs/practica/main/docs/static/img/docs/decisions/full.png"/><br/><br/>Trending, commercial-grade maintenance</td>
    <td>
      <img src="https://raw.githubusercontent.com/practicajs/practica/main/docs/static/img/docs/decisions/partial.png"/><br/><br/>Not maintained anymore</td>
    <td><img src="https://raw.githubusercontent.com/practicajs/practica/main/docs/static/img/docs/decisions/almost-full.png"/><br/><br/>Solid</td>
  </tr>
  <tr valign="top">
    <td><b>❗Encourage component autonomy</b></td>
    <td><img src="https://raw.githubusercontent.com/practicajs/practica/main/docs/static/img/docs/decisions/partial.png"/><br/><br/>Packages are highly coupled</td>
    <td><img src="https://raw.githubusercontent.com/practicajs/practica/main/docs/static/img/docs/decisions/almost-full.png"/><br/><br/>Workflow is coupled</td>
    <td><img src="https://raw.githubusercontent.com/practicajs/practica/main/docs/static/img/docs/decisions/almost-full.png"/><br/><br/>npm link bypasses the SemVer</td>
    <td>
      <img src="https://raw.githubusercontent.com/practicajs/practica/main/docs/static/img/docs/decisions/full.png"/><br/><br/>Minor concern: shared NODE_MODULES on the root</td>
  </tr>
  <tr valign="top">
    <td><b>Build speed</b></td>
    <td><img src="https://raw.githubusercontent.com/practicajs/practica/main/docs/static/img/docs/decisions/full.png"/><br/><br/>Smart inference and execution plan, shared depedencies, cache</td>
    <td><img src="https://raw.githubusercontent.com/practicajs/practica/main/docs/static/img/docs/decisions/full.png"/><br/><br/>Smart inference and execution plan, shared depedencies, cache</td>
    <td><img src="https://raw.githubusercontent.com/practicajs/practica/main/docs/static/img/docs/decisions/partial.png"/><br/><br/>Parallel tasks execution, copied dependencies</td>
    <td>
      <img src="https://raw.githubusercontent.com/practicajs/practica/main/docs/static/img/docs/decisions/partial.png"/><br/><br/>Shared depedencies</td>
  </tr>
    <tr valign="top">
      <td><b>Standardization</b></td>
    <td><img src="https://raw.githubusercontent.com/practicajs/practica/main/docs/static/img/docs/decisions/partial.png"/><br/><br/>Non standard Node.js stuff: One single root package.json by default, TS-paths for linking</td>
    <td><img src="https://raw.githubusercontent.com/practicajs/practica/main/docs/static/img/docs/decisions/full.png"/><br/><br/>An externous build layer</td>
    <td><img src="https://raw.githubusercontent.com/practicajs/practica/main/docs/static/img/docs/decisions/full.png"/><br/><br/>An externous build layer</td>
    <td>
      <img src="https://raw.githubusercontent.com/practicajs/practica/main/docs/static/img/docs/decisions/full.png"/><br/><br/>An externous package centralizer</td>
  </tr>
    <tr>
    <td class="tg-ho3n" colspan="5" align="center"><h2>Tasks and build pipeline</h2></td>
  </tr>
  <tr>
    <td><b>❗️Parallel task execution</b></td>
    <td><br/>Yes</td>
    <td><br/>Yes</td>
    <td><br/>No</td>
    <td><br/>Yes* (Yarn & Pnpm)</td>
  </tr>
  <tr>
    <td><b>Ignore missing commands/scripts</b></td>
    <td><br/>No</td>
    <td><br/>Yes</td>
    <td><br/>Yes</td>
    <td><br/>Yes</td>
  </tr>
  <tr>
    <td><b>❗️In-project cache</b></td>
    <td><br/>Yes</td>
    <td><br/>Yes</td>
    <td><br/>No</td>
    <td><br/>No</td>
  </tr>
    <tr>
      <td><b>Visual dependency graph</b></td>
    <td><br/>Yes</td>
    <td><br/>Yes</td>
    <td><br/>Partially, via plugin</td>
    <td><br/>No</td>
  </tr>
  <tr>
    <td>❗️Realize packages that are affected by a change</td>
    <td><br/>Yes, both through package.json and code</td>
    <td><br/>Yes, through package.json</td>
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
  <tr>
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
    <td>Plugins</td>
    <td><br/>Supported</td>
    <td><br/>None</td>
    <td><br/>None</td>
    <td><br/>None</td>
  </tr>
  <tr>
    <td>Scaffold new component from a gallery</td>
    <td><br/>Supported</td>
    <td><br/>None</td>
    <td><br/>None</td>
    <td><br/>None</td>
  </tr>
  <tr>
    <td>Distributed task execution</td>
    <td><br/>Supported</td>
    <td><br/>None</td>
    <td><br/>None</td>
    <td><br/>None</td>
  </tr>
  <tr>
    <td>Detecting affected packages</td>
    <td><br/>Supported</td>
    <td><br/>Supported</td>
    <td><br/>Supported</td>
    <td><br/>None</td>
  </tr>
  <tr>
    <td>Create a new package to the repo</td>
    <td><br/>Built it code genreation with useful templates</td>
    <td><br/>None, 3rd party code generator can be used</td>
    <td><br/>None, 3rd party code generator can be used</td>
    <td><br/>None, 3rd party code generator can be used</td>
  </tr>
  <tr>
    <td>Adapt changes in the monorepo tool</td>
    <td><br/>Supported via nx migrate</td>
    <td><br/>Supported via codemod</td>
    <td><br/>None</td>
    <td><br/>None</td>
  </tr>
  <tr>
    <td>Incremental builds</td>
    <td><br/>Supported</td>
    <td><br/>Supported</td>
    <td><br/>None</td>
    <td><br/>None</td>
  </tr>
  <tr>
    <td>Cross-package modifications</td>
    <td><br/>Supported via nx generate</td>
    <td><br/>None</td>
    <td><br/>None</td>
    <td><br/>None</td>
  </tr>
</table>
