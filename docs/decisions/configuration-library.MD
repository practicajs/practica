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
    <td colspan="5" align="center"><h3>Executive Summary</h2></td>
  </tr>
  <tr valign="top">
    <td>Performance (load time for 100 keys)</td>
    <td><img src="./full.png"/><br/><br/>1ms</td>
    <td><img src="./almost-full.png"/><br><br>5ms</td>
    <td>
      <img src="./almost-full.png"/><br><br>4ms</td>
    <td><img src="./almost-full.png"/><br><br>5ms</td>
  </tr>
  <tr valign="top">
    <td>Popularity</td>
    <td><img src="./full.png"/><br/><br/>Superior</td>
    <td><img src="./partial.png"/><br><br>Less popular than competitors</td>
    <td><img src="./almost-full.png"/><br><br>Highly popular</td>
    <td>
      <img src="./almost-full.png"/><br><br>Highly popular</td>
  </tr>
  <tr valign="top">
    <td>❗ Fail fast & strich schema</td>
    <td><img src="./almost-full.png"/><br/><br/>No</td>
    <td><img src="./full.png"/><br><br>Yes</td>
    <td><img src="./partial.png"/><br><br>No</td>
    <td>
      <img src="./partial.png"/><br><br>No</td>
  </tr>

  <tr valign="top">
    <td>Items documentation</td>
    <td><img src="./partial.png"/><br/><br/>No</td>
    <td><img src="./full.png"/><br><br>Yes</td>
    <td><img src="./partial.png"/><br><br>No</td>
    <td>
      <img src="./partial.png"/><br><br>No</td>
  </tr>    

  <tr valign="top">
    <td>Hirearchical configuration schema</td>
    <td><img src="./partial.png"/><br/><br/>No</td>
    <td><img src="./full.png"/><br><br>Yes</td>
        <td><img src="./full.png"/><br><br>Yes</td>
    <td>
      <img src="./partial.png"/><br><br>No</td>
  </tr>
  <tr>
    <td class="tg-ho3n" colspan="5" align="center"><h2>More details: Community & Popularity - March 2022</h2></td>
  </tr>
  <tr>
    <td>Stars</td>
    <td><br><br>4200 ✨</td>
    <td><br><br>2500 ✨</td>
    <td><br><br>2500 ✨</td>
    <td><br><br>1000 ✨</td>
    <td><br><br>2300 ✨</td>
  </tr>
  <tr>
    <td>Downloads/Week</td>
    <td><br><br>12,900,223 📁</td>
    <td><br><br>4,000,000 📁</td>
    <td><br><br>6,000,000 📁</td>
    <td><br><br>5,000,000 📁</td>
  </tr>
    <tr>
    <td>Dependents</td>
    <td><br><br>26,000 👩‍👧</td>
    <td><br><br>600 👧</td>
    <td><br><br>800 👧</td>
    <td><br><br>1000 👧</td>
  </tr>
</table>
