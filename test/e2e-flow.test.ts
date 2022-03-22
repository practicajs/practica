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
    console.log("build");
    await execa("npm", ["link"], { cwd: path.join(__dirname, "../.dist") });
    console.log("link");

    // Act
    const generateResult = await execa("practica", ["generate", "--install-dependencies"], { cwd: targetDirectory });
    console.log("build", targetDirectory);

    // Assert
    const testResult = await execa("npm", ["test"], { cwd: path.join(targetDirectory, "default-app-name") });
    console.log(testResult);
  }, 100000);
});
