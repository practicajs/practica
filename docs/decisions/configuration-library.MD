# Decision: Choosing a **_configuration_** library

**📔 What is it** - A decision data and discussion about the right configuration library

**⏰ Status** - Open, closed in April 1st 2022

**📁 Corresponding issue** - Here

**🎯Bottom-line** - Nest.js is a solid choice for teams who prefer to minimize design decisions and those willing to heavily rely on TypeScript. Fastify, on the other hands, covers many design decisions but leave more lose ends for the team to connect. It also relies less on advanced typing, hence a great choice for teams which prefer less abstractions and higher degree of flexibility. Express is fading out due to lack of maintenance

**📊 Detailed comparison table** -

<table width="80%" valign="top">

  <tr>
    <td></td>
    <td><h1>Express</h1></td>
    <td><h1>Nest.js</h2></td>
    <td><h1>Fastify</h2></td>
  </tr>
  <tr>
    <td colspan="4" align="center"><h3>Executive Summary</h2></td>
  </tr>
  <tr valign="top">
    <td>Performance</td>
    <td><img src="./almost-full.png"/><br/><br/><b>Not measureable</b>. Lack many mandatory solution layers</td>
    <td><img src="./almost-full.png"/><br><br><b>Reasonable</b/>. Throughout and start time are impacted by the many solution layers</td>
    <td>
      <img src="./full.png"/><br><br><b>Great</b>. Performance as a first citizen</td>
  </tr>
  <tr valign="top">
    <td>Community & Popularity<br></td>
    <td>🎖🎖🎖 <b>Unmatched</b><br><br>60,000 stars, 3M downloads week</td>
<td>🎖🎖🎖 <b>Unmatched</b><br><br>60,000 stars, 3M downloads week</td>
<td>🎖🎖<b>Popular but less</b><br><br>30,000 stars, 2M downloads week</td>
  </tr>
  <tr>
    <td>Flexibility</td>
    <td>🎖🎖 <b>No opinion but also no infrastructure</b><br><br>No obstacles and at the same time demands coding everything from scratch</td>
    <td>🎖🎖 <b>Do it my way</b><br><br>Text here</td>
    <td>🎖🎖🎖 <b>Good balance between freedom and features</b><br><br>Text will come here</td>
  </tr>
  <tr>
    <td>Dimension 5</td>
    <td>👍🏼<br><br>Explanation</td>
    <td>👍🏼<br><br>Explanation</td>
    <td>🙅🏽‍♂️<br><br>Explanation</td>
  </tr>
  <tr>
    <td class="tg-ho3n" colspan="4" align="center"><h2>Community & Popularity</h2></td>
  </tr>
  <tr>
    <td>❗ Stars</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
  </tr>
  <tr>
    <td>Downloads/Week</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
  </tr>
  <tr>
    <td>Web Site Rank</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
  </tr>
  
  <tr>
    <td>Google Trend Ranking</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
  </tr>
  
  <tr>
    <td>Number of npm packages</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
  </tr>
  <tr>
    <td class="tg-ho3n" colspan="4" align="center"><h2>Application Services</h2></td>
  </tr>
  <tr>
    <td>Caching</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
  </tr>
  <tr>
    <td>DB connection</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
  </tr>
    <tr>
    <td>Token-based authentication</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
  </tr>
    <tr>
    <td>GraphQL</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
  </tr>
  <tr>
    <td>Web Socket</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
  </tr>
  <tr>
    <td>Message Queue</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
  </tr>
  <tr>
    <td>Health Check</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
  </tr>
  <tr>
    <td class="tg-ho3n" colspan="4" align="center"><h2>Modularity</h2></td>
  </tr>
  <tr>
    <td>Style</td>
    <td><br><br>Middleware - Non-scoped functions</td>
    <td><br><br>Modules - Highly separated and abstracted containers</td>
    <td><br><br>Plugin - Scoped functions</td>
  </tr>
  <tr>
    <td>Global and local</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
  </tr>
  <tr>
    <td>❗ Hirearchy</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
  </tr>
  <tr>
    <td>Explictly define entrypoints</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
  </tr>
  <tr>
    <td>Conditional features</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
  </tr>
  <tr>
    <hr/>
    <td class="tg-ho3n" colspan="4" align="center"><h1>Drill-Down</h1></td>
  </tr>
  <tr>
    <td class="tg-ho3n" colspan="4" align="center"><h2>Validation</h2></td>
  </tr>
  <tr>
    <td>Style</td>
    <td></b>❌ &nbsp; Not included</b></td>
    <td>Class-based decorators validation</td>
    <td>JSON Schema style</td>
  </tr>
  <tr>
  <td>❗ DTO intellisense<br/><br/><sup>Get IDE warning and autocomplete</sup></td>
    <td></b>No</b></td>
    <td>🎖 Yes</td>
    <td>Partially<br/><br/>Using 3rd party JSON schema infer tools</td>
  </tr>
    <tr>
    <td>OpenAPI generators<br/></td>
    <td></b>No</b></td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
    <tr>
    <td>Custom error format<br/></td>
    <td></b>Not relevant</b></td>
    <td>Yes. Demands custom error via exceptionFactory and custom error handling</td>
    <td>Yes. Via setSchemaErrorFormatter or setErrorHandler</td>
  </tr>
  <tr>
    <td>Replace validation library/engine</td>
    <td>🏼<br><br>Not relevant</td>
    <td>⚠️<br><br>No. Heavily based on class-validator</td>
    <td>🎖<br><br> Yes. Via custom validatorCompiler (still has tight coupling to JSON Schema)</td>
  </tr>
    <tr>
    <td>Amount of congifuration options</td>
    <td><br><br>Not relevant</td>
    <td><br><br>20</td>
    <td>🎖<br><br> 41. Via AJV engine </td>
  </tr>
    <tr>
    <td>Applicable to message queue payloads</td>
    <td><br><br>Not relevant</td>
    <td>🎖<br><br>Yes. Via Nest 'Microservices'</td>
    <td><br><br> No. </td>
  </tr>
  <tr>
    <td class="tg-ho3n" colspan="4" align="center"><h2>Database</h2></td>
  </tr>
  <tr>
    <td>Dimension 6</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
  </tr>
  <tr>
    <td>Dimension 7</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
  </tr>
  <tr>
    <td class="tg-ho3n" colspan="4" align="center"><h2>Database</h2></td>
  </tr>
  <tr>
    <td>Style</td>
    <td></b>❌ &nbsp; Not included</b></td>
    <td>Class-based decorators validation</td>
    <td>JSON Schema style</td>
  </tr>
  <tr>
    <td class="tg-ho3n" colspan="4" align="center"><h2>Authentication</h2></td>
  </tr>
  <tr>
    <td>Style</td>
    <td></b>❌ &nbsp; Not included</b></td>
    <td>Class-based decorators validation</td>
    <td>JSON Schema style</td>
  </tr>
</table>
