const fs = require("fs").promises;
const path = require("path");

(async function () {
  const OSTempFolder = fs.tmpdir();
  const temporaryTestingFolder = await fs.mkdtemp(`${OSTempFolder}${path.sep}`);
  console.log(temporaryTestingFolder);
})();
