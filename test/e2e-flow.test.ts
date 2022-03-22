import execa from "execa";
import path from "path";
import fsExtra from "fs-extra";
import * as testHelpers from "./test-helpers";

beforeAll(async () => {}, 40000);

describe("Non-interactive", () => {
  test("When passing no parameters, the generated app sanity tests pass", async () => {
    // Arrange
    const targetDirectory = await testHelpers.createUniqueFolder(__dirname);
    await execa("npm", ["run", "build"]);
    await execa("npm", ["link"], { cwd: path.join(__dirname, "../.dist") });

    // Act
    const generateResult = await execa("practica", ["generate", "--install-dependencies"], { cwd: targetDirectory });
    console.log(generateResult);

    // Assert
    const testResult = await execa("npm", ["test"], { cwd: targetDirectory });
    console.log(testResult);
  }, 70000);
});
