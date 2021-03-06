---
sidebar_position: 3
sidebar_label: OpenAPI
---

# Decision: Choosing **_OpenAPI** generator tooling

**π What is it** - A decision data and discussion about the right OpenAPI tools and approach

**β° Status** - Open, closed in June 1st 2022

**π Corresponding discussion** - [Here](https://github.com/practicajs/practica/issues/67)

**π―Bottom-line: our recommendation** - TBD

**π Detailed comparison table**

<table width="80%" valign="top">
  <tr>
    <td></td>
    <td><h1>tsoa</h1></td>
    <td><h1>JSON Schema</h1></td>
    <td><h1>Other option 1</h1></td>
    <td><h1>Other option 2</h1></td>
  </tr>
  <tr>
    <td colspan="5" align="center"><h2>Executive Summary</h2></td>
  </tr>
  <tr valign="top">
    <td>Some dimension</td>
    <td><img src="/practica/img/docs/decisions/full.png"/><br/><br/>1ms</td>
    <td><img src="/practica/img/docs/decisions/almost-full.png"/><br/><br/>5ms</td>
    <td>
      <img src="/practica/img/docs/decisions/almost-full.png"/><br/><br/>4ms</td>
    <td><img src="/practica/img/docs/decisions/almost-full.png"/><br/><br/>5ms</td>
  </tr>
  <tr valign="top">
    <td>Some dimension</td>
    <td><img src="/practica/img/docs/decisions/full.png"/><br/><br/>Superior</td>
    <td><img src="/practica/img/docs/decisions/partial.png"/><br/><br/>Less popular than competitors</td>
    <td><img src="/practica/img/docs/decisions/almost-full.png"/><br/><br/>Highly popular</td>
    <td>
      <img src="/practica/img/docs/decisions/almost-full.png"/><br/><br/>Highly popular</td>
  </tr>
  <tr valign="top">
    <td>β Important factor</td>
    <td><img src="/practica/img/docs/decisions/almost-full.png"/><br/><br/>No</td>
    <td><img src="/practica/img/docs/decisions/full.png"/><br/><br/>Yes</td>
    <td><img src="/practica/img/docs/decisions/partial.png"/><br/><br/>No</td>
    <td>
      <img src="/practica/img/docs/decisions/partial.png"/><br/><br/>No</td>
  </tr>

  <tr>
    <td class="tg-ho3n" colspan="5" align="center"><h2>More details: Community & Popularity - March 2022</h2></td>
  </tr>
  <tr>
    <td>Stars</td>
    <td><br/>4200 β¨</td>
    <td><br/>2500 β¨</td>
    <td><br/>2500 β¨</td>
    <td><br/>1000 β¨</td>
  </tr>
  <tr>
    <td>Downloads/Week</td>
    <td><br/>12,900,223 π</td>
    <td><br/>4,000,000 π</td>
    <td><br/>6,000,000 π</td>
    <td><br/>5,000,000 π</td>
  </tr>
    <tr>
    <td>Dependents</td>
    <td><br/>26,000 π©βπ§</td>
    <td><br/>600 π§</td>
    <td><br/>800 π§</td>
    <td><br/>1000 π§</td>
  </tr>
</table>
