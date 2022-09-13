---
sidebar_position: 5
sidebar_label: Docker base image
---

# Decision: Choosing a **Docker base image**

**📔 What is it** - The Dockerfile that is included inherits from a base Node.js image. There are variois considerations when choosing the right option which are listed below

**⏰ Status** - Open for discussions

**📁 Corresponding discussion** - [Here](https://github.com/practicajs/practica/issues/229)

**🎯Bottom-line: our recommendation** - TBD

**📊 Detailed comparison table**

<table valign="top">
  <tr>
    <td></td>
    <td><h1>node:{version}</h1></td>
    <td><h1>node:{version}-bullseye-slim</h1></td>
    <td><h1>node:{version}-alpine</h1></td>
  </tr>
  <tr>
    <td colspan="5" align="center"><h2>Key Dimensions</h2></td>
  </tr>
  <tr valign="top">
    <td><b>Officially supported</b></td>
    <td><img src="/img/docs/decisions/full.png"/><br/><br/>Huge eco-system and commercial-grade maintenance</td>
    <td><img src="/img/docs/decisions/full.png"/><br/><br/>Trending, commercial-grade maintenance</td>
  </tr>
  <tr valign="top">
    <td><b>CVEs (vunelerabilities)</b></td>
    <td><img src="/img/docs/decisions/partial.png"/><br/><br/>Packages are highly coupled</td>
    <td><img src="/img/docs/decisions/almost-full.png"/><br/><br/>Workflow is coupled</td>
  </tr>
  <tr valign="top">
    <td><b>Size in MB</b></td>
    <td><img src="/img/docs/decisions/full.png"/><br/><br/>Smart inference and execution plan, shared dependencies, cache</td>
    <td><img src="/img/docs/decisions/full.png"/><br/><br/>Smart inference and execution plan, shared dependencies, cache</td>
  </tr>
    <tr valign="top">
      <td><b>Other important dimensions to add?</b></td>
    <td><img src="/img/docs/decisions/partial.png"/><br/><br/>Non standard Node.js stuff: One single root package.json by default, TS-paths for linking</td>
    <td><img src="/img/docs/decisions/full.png"/><br/><br/>An external build layer</td>
  </tr>
</table>
