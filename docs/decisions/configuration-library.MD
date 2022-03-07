# Decision: Choosing a **_configuration_** library

**📔 What is it** - A decision data and discussion about the right configuration library

**⏰ Status** - Open, closed in April 1st 2022

**📁 Corresponding discussion** - [Here](https://github.com/bestpractices/best-practice-starter/issues/10)

**🎯Bottom-line** - convict ticks all the boxes by providing both strict schema, fail fast option, entry documentation and hirearchical structure

**📊 Detailed comparison table** -

<table width="80%" valign="top">
  <tr>
    <td></td>
    <td><h1>dotenv</h1></td>
    <td><h1>Convict</h2></td>
    <td><h1>nconf</h2></td>
    <td><h1>config</h2></td>
  </tr>
  <tr>
    <td colspan="4" align="center"><h3>Executive Summary</h2></td>
  </tr>
  <tr valign="top">
    <td>Performance (load time for 100 keys)</td>
    <td><img src="./full.png"/><br/><br/><b>1ms</b>L</td>
    <td><img src="./almost-full.png"/><br><br><b>Reasonable</b/>5ms</td>
    <td>
      <img src="./almost-full.png"/><br><br><b>Great</b>4ms</td>
    <td><img src="./almost-full.png"/><br><br><b>Reasonable</b/>5ms</td>
  </tr>
  <tr valign="top">
    <td>Popularity</td>
    <td><img src="./full.png"/><br/><br/><b>Not measureable</b>Superior</td>
    <td><img src="./partial-full.png"/><br><br><b>Reasonable</b/>Less popular than competitors</td>
    <td><img src="./almost-full.png"/><br><br><b>Reasonable</b/>Highly popular</td>
    <td>
      <img src="./almost-full.png"/>Highly popular</td>
  </tr>
  <tr valign="top">
    <td>Fail fast & strich schema</td>
    <td><img src="./almost-full.png"/><br/><br/><b>Not measureable</b>. Lack many mandatory solution layers</td>
    <td><img src="./almost-full.png"/><br><br><b>Reasonable</b/>. Throughout and start time are impacted by the many solution layers</td>
    <td><img src="./almost-full.png"/><br><br><b>Reasonable</b/>. Throughout and start time are impacted by the many solution layers</td>
    <td>
      <img src="./full.png"/><br><br><b>Great</b>. Performance as a first citizen</td>
  </tr>
  <tr valign="top">
    <td>Items documentation</td>
    <td><img src="./almost-full.png"/><br/><br/><b>Not measureable</b>. Lack many mandatory solution layers</td>
    <td><img src="./almost-full.png"/><br><br><b>Reasonable</b/>. Throughout and start time are impacted by the many solution layers</td>
    <td><img src="./almost-full.png"/><br><br><b>Reasonable</b/>. Throughout and start time are impacted by the many solution layers</td>
    <td>
      <img src="./full.png"/><br><br><b>Great</b>. Performance as a first citizen</td>
  </tr>
    <tr valign="top">
    <td>Hirearchical configuration schema</td>
    <td><img src="./almost-full.png"/><br/><br/><b>Not measureable</b>. Lack many mandatory solution layers</td>
    <td><img src="./almost-full.png"/><br><br><b>Reasonable</b/>. Throughout and start time are impacted by the many solution layers</td>
    <td><img src="./almost-full.png"/><br><br><b>Reasonable</b/>. Throughout and start time are impacted by the many solution layers</td>
    <td>
      <img src="./full.png"/><br><br><b>Great</b>. Performance as a first citizen</td>
  </tr>
  <tr>
    <td class="tg-ho3n" colspan="4" align="center"><h2>More details: Community & Popularity</h2></td>
  </tr>
  <tr>
    <td>❗ Stars</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
  </tr>
  <tr>
    <td>Downloads/Week</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
  </tr>
    <tr>
    <td>Dependent upon</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
    <td><br><br>Explanation</td>
  </tr>
</table>
