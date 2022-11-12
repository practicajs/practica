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
    <td><h1>full-blown</h1></td>
    <td><h1>bullseye-slim</h1></td>
    <td><h1>alpine</h1></td>
  </tr>
  <tr>
    <td colspan="4" align="center"><h2>Key Dimensions</h2></td>
  </tr>
  <tr valign="top">
    <td><b>Officially supported</b></td>
    <td><img src="/img/docs/decisions/full.png"/><br/><br/>Yes</td>
    <td><img src="/img/docs/decisions/full.png"/><br/><br/>Yes</td>
<td><img src="/img/docs/decisions/partial.png"/><br/><br/>No? Looking for sources</td>
  </tr>
  <tr valign="top">
    <td><b>CVEs (Medium severity and above)</b></td>
    <td><img src="/img/docs/decisions/partial.png"/><br/><br/>❗️Trivy: 521, Snyk: TBD</td>
    <td><img src="/img/docs/decisions/almost-full.png"/><br/><br/>Trivy: 11 high, Snyk: TBD</td>
    <td><img src="/img/docs/decisions/full.png"/><br/><br/>Trivy: 0 high, Snyk: TBD</td>
  </tr>
  <tr valign="top">
    <td><b>Size in MB</b></td>
    <td><img src="/img/docs/decisions/partial.png"/><br/><br/>950 MB</td>
    <td><img src="/img/docs/decisions/almost-full.png"/><br/><br/>150 MB</td>
    <td><img src="/img/docs/decisions/full.png"/><br/><br/>90 MB</td>
  </tr>
  <tr valign="top">
    <td><b>Native modules installation</b><br/><sub><sup>Packages that run native code installer (e.g., with node-gyp)</sup></sub></td>
    <td><img src="/img/docs/decisions/full.png"/><br/><br/>Standard C compiler glibc</td>
    <td><img src="/img/docs/decisions/full.png"/><br/><br/>Standard C compiler glibc</td>
    <td><img src="/img/docs/decisions/almost-full.png"/><br/><br/>A less standard compiler, musl - might break under some circumstances</td>
  </tr>
<td colspan="4" align="center"><h2>Other important dimensions to consider?</h2></td></table>
