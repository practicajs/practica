import execa from "execa";
import path from "path";
import * as testHelpers from "./test-helpers";
import { setupVerdaccio, teardownVerdaccio } from "./verdaccio-helper";
import fsExtra from "fs-extra";

let emptyFolderForATest: string;

beforeEach(async () => {
  emptyFolderForATest = await testHelpers.createUniqueFolder();
});

afterEach(async () => {
  await fsExtra.remove(emptyFolderForATest);
});

describe("Non-interactive CLI", () => {
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

  test("When installing with the default flags, the generated app sanity tests pass", async () => {
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

  test("When installing with prisma ORM, the generated app sanity tests pass", async () => {
    // Arrange
    console.log(
      `Starting E2E test with the output folder: ${emptyFolderForATest}`
    );

    // Act
    await execa(
      "npx",
      [
        "@practica/create-node-app",
        "immediate",
        "--orm=prisma",
        "--install-dependencies",
      ],
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
