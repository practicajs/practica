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

<small>*For some lacking features there is a community package that bridges the gap; For workspace, we evaluated whether most of them support a specific feature</small>

<table valign="top">
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
    <td><img src="/docs/static/img/docs/decisions/full.png"/><br/><br/>Huge eco-system and commercial-grade maintenance</td>
    <td><img src="/docs/static/img/docs/decisions/full.png"/><br/><br/>Trending, commercial-grade maintenance</td>
    <td>
      <img src="/docs/static/img/docs/decisions/partial.png"/><br/><br/>Not maintained anymore</td>
    <td><img src="/docs/static/img/docs/decisions/almost-full.png"/><br/><br/>Solid</td>
  </tr>
  <tr valign="top">
    <td><b>❗Encourage component autonomy</b></td>
    <td><img src="/docs/static/img/docs/decisions/partial.png"/><br/><br/>Packages are highly coupled</td>
    <td><img src="/docs/static/img/docs/decisions/almost-full.png"/><br/><br/>Workflow is coupled</td>
    <td><img src="/docs/static/img/docs/decisions/almost-full.png"/><br/><br/>npm link bypasses the SemVer</td>
    <td>
      <img src="/docs/static/img/docs/decisions/full.png"/><br/><br/>Minor concern: shared NODE_MODULES on the root</td>
  </tr>
  <tr valign="top">
    <td><b>Build speed</b></td>
    <td><img src="/docs/static/img/docs/decisions/full.png"/><br/><br/>Smart inference and execution plan, shared dependencies, cache</td>
    <td><img src="/docs/static/img/docs/decisions/full.png"/><br/><br/>Smart inference and execution plan, shared dependencies, cache</td>
    <td><img src="/docs/static/img/docs/decisions/partial.png"/><br/><br/>Parallel tasks execution, copied dependencies</td>
    <td>
      <img src="/docs/static/img/docs/decisions/partial.png"/><br/><br/>Shared dependencies</td>
  </tr>
    <tr valign="top">
      <td><b>Standardization</b></td>
    <td><img src="/docs/static/img/docs/decisions/partial.png"/><br/><br/>Non standard Node.js stuff: One single root package.json by default, TS-paths for linking</td>
    <td><img src="/docs/static/img/docs/decisions/full.png"/><br/><br/>An external build layer</td>
    <td><img src="/docs/static/img/docs/decisions/full.png"/><br/><br/>An external build layer</td>
    <td>
      <img src="/docs/static/img/docs/decisions/full.png"/><br/><br/>An external package centralizer</td>
  </tr>
    <tr>
    <td class="tg-ho3n" colspan="5" align="center"><h2>Tasks and build pipeline</h2></td>
  </tr>
  <tr>
    <td><b>Run recursive commands (affect a group of packages)</b></td>
    <td><br/>Yes</td>
    <td><br/>Yes</td>
    <td><br/>Yes</td>
    <td><br/>Yes</td>
  </tr>
  <tr>
    <td><b>❗️Parallel task execution</b></td>
    <td><br/>Yes</td>
    <td><br/>Yes</td>
    <td><br/>No</td>
    <td><br/>Yes* (Yarn & Pnpm)</td>
  </tr>
    <tr>
    <td><b>❗️Realize which packages changed</b></td>
    <td><br/>Yes</td>
    <td><br/>Yes</td>
    <td><br/>Yes</td>
    <td><br/>No</td>
  </tr>
    <tr>
    <td><b>❗️Realize packages that are affected by a change</b></td>
    <td><br/>Yes<br/>both through package.json and code</td>
    <td><br/>Yes<br/>through package.json</td>
    <td><br/>None</td>
    <td><br/>None</td>
  </tr>
  <tr>
    <td><b>Ignore missing commands/scripts</b></td>
    <td><br/>No</td>
    <td><br/>Yes</td>
    <td><br/>Yes</td>
    <td><br/>Yes</td>
  </tr>
  <tr>
    <td><b>❗️In-project cache - Skip tasks if local result exists</b></td>
    <td><br/>Yes</td>
    <td><br/>Yes</td>
    <td><br/>No</td>
    <td><br/>No</td>
  </tr>
  <tr>
    <td><b>Remote cache - Skip tasks if remote result exists</b></td>
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
    <td><b>❗️Smart waterfall pipeline - Schedule unrelated tasks in parallel, not topologically</b></td>
    <td><br/>Yes</td>
    <td><br/>Yes</td>
    <td><br/>No</td>
    <td><br/>No</td>
  </tr>
  <tr>
    <td><b>Distributed task execution - Spread tasks across machines</b></td>
    <td><br/>Yes</td>
    <td><br/>No</td>
    <td><br/>No</td>
    <td><br/>No</td>
  </tr>
  <tr>
    <td class="tg-ho3n" colspan="5" align="center"><h2>Locally linking packages</h2></td>
  </tr>
  <tr>
    <td>❗️Is supported</td>
    <td>Partially<br/>Achieved through TS paths</td>
    <td><br/>No<br/>Relies on workspaces</td>
    <td><br/>Yes</td>
    <td><br/>Yes</td>
  </tr>
  <tr>
    <td><b>How</b></td>
    <td><br/>❗️Via TypeScript paths and webpack</td>
    <td><br/>Relies on workspaces</td>
    <td><br/>Symlink</td>
    <td><br/>Symlink</td>
  </tr>
   <tr>
     <td><b>❗️Can opt-out?</b></td>
    <td>Yes<br/>By default local packages are linked</td>
    <td>-</td>
    <td>No</td>
    <td>Partially<br/>Pnpm allows preferring remote packages, Yarn has a [focused package](https://classic.yarnpkg.com/blog/2018/05/18/focused-workspaces/) option which only works per a single package</td>
  </tr>
     <tr>
     <td><b>Link a range - only specific versions will be symlinked</b></td>
    <td>No</td>
    <td>-</td>
    <td>No</td>
    <td>Some<br/>Yarn and Pnpm allows workspace versioning</td>
  </tr>
  <tr>
    <td class="tg-ho3n" colspan="5" align="center"><h2>Optimizing dependencies installation speed</h2></td>
  </tr>
  <tr>
    <td><b>Supported</b></td>
    <td>Yes<br/>Via a single Root package.json and NODE_MODULES</td>
    <td>Yes<br/>Via caching</td>
    <td>No<br/>Can be used on top of yarn workspace</td>
    <td>Yes<br/>Via single node_modules folder</td>
  </tr>
  <tr>
    <td><b>Retain origin file path (some module refers to relative paths)</b></td>****
    <td>Partially<br/>NODE_MODULES is on the root, not per package</td>
    <td>Yes</td>
    <td>Not relevant</td>
    <td>Partially<br/>Pnpm uses hard link instead of symlinks</td>
  </tr>
  <tr>
    <td><b>Keep single NODE_MODULES per machine (faster, less disc space)</b></td>
    <td>No<br/></td>
    <td>No</td>
    <td>No</td>
    <td>Partially<br/>Pnpm supports this</td>
  </tr>
  <tr>
    <td class="tg-ho3n" colspan="5" align="center"><h2>Other features and considerations</h2></td>
  </tr>
   <tr>
     <td><b>Community plugins</b></td>
    <td><br/>Yes</td>
    <td><br/>No</td>
    <td><br/>Yes</td>
    <td><br/>Yes</td>
  </tr>
  <tr>
    <td><b>Scaffold new component from a gallery</b></td>
    <td><br/>Yes</td>
    <td><br/>None</td>
    <td><br/>None</td>
    <td><br/>None</td>
    <td>Create a new package to the repo</td>
    <td><br/>Built it code genreation with useful templates</td>
    <td><br/>None, 3rd party code generator can be used</td>
    <td><br/>None, 3rd party code generator can be used</td>
    <td><br/>None, 3rd party code generator can be used</td>
  </tr>
  <tr>
    <td><b>Adapt changes in the monorepo tool</b></td>
    <td><br/>Supported via nx migrate</td>
    <td><br/>Supported via codemod</td>
    <td><br/>None</td>
    <td><br/>None</td>
  </tr>
  <tr>
    <td><b>Incremental builds</b></td>
    <td><br/>Supported</td>
    <td><br/>Supported</td>
    <td><br/>None</td>
    <td><br/>None</td>
  </tr>
  <tr>
    <td><b>Cross-package modifications</b></td>
    <td><br/>Supported via nx generate</td>
    <td><br/>None</td>
    <td><br/>None</td>
    <td><br/>None</td>
  </tr>
</table>

__

Ideas for next iteration:
- Separate command execution and pipeline section
- Stars and popularity
- Features summary
- Polyrepo support

