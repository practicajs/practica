import fsExtra from "fs-extra";
import execa from "execa";
import path from "path";
import * as testHelpers from "./test-helpers";

let emptyFolderForATest: string;

beforeEach(async () => {
  emptyFolderForATest = await testHelpers.createUniqueFolder();
});

afterEach(async () => {
  await fsExtra.remove(emptyFolderForATest);
});

describe("Non-interactive CLI", () => {
  test.skip("When installing with the default flags, the generated app sanity tests pass", async () => {
    // Arrange
    console.log(
      `Starting E2E test with the output folder: ${emptyFolderForATest}`
    );
    await execa("npm", ["run", "build"]);
    await execa("npm", ["link"], {
      cwd: path.join(__dirname, "../.dist"),
    });

    // Act
    await execa(
      "create-node-app",
      [
        "immediate",
        "--install-dependencies",
        "--orm=sequelize",
        "--web-framework=fastify",
      ],
      {
        cwd: emptyFolderForATest,
      }
    );

    // Assert
    const testResult = await execa("npm", ["test"], {
      cwd: path.join(emptyFolderForATest, "default-app-name"),
    });

    expect(testResult.exitCode).toBe(0);
  }, 150000);
});
