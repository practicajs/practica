import execa from "execa";
import path from "path";
import * as testHelpers from "./test-helpers";
import { setupVerdaccio, teardownVerdaccio } from "./verdaccio-helper";

let emptyFolderForATest: string;

beforeEach(async () => {
  emptyFolderForATest = await testHelpers.createUniqueFolder();
});

describe("Non-interactive", () => {
  // This should be passed to every npm operation to make it use our local registry
  let npmEnvironmentVars: NodeJS.ProcessEnv;

  beforeAll(async () => {
    ({ npmEnvironmentVars } = await setupVerdaccio());

    await execa("npm", ["run", "publish:build"], {
      env: npmEnvironmentVars,
    });

    // Shouldn't take 10s but just in case
  }, 10_000);

  afterAll(async () => {
    await teardownVerdaccio();
  });

  test("When passing no parameters, the generated app sanity tests pass", async () => {
    // Arrange
    console.log(
      `Starting E2E test with the output folder: ${emptyFolderForATest}`
    );

    // Act
    await execa(
      "npx",
      ["@practica/create-node-app", "immediate", "--install-dependencies"],
      {
        cwd: emptyFolderForATest,
        env: npmEnvironmentVars,
      }
    );

    // Assert
    const testResult = await execa("npm", ["test"], {
      cwd: path.join(emptyFolderForATest, "default-app-name"),
    });

    expect(testResult.exitCode).toBe(0);
  }, 150000);
});
