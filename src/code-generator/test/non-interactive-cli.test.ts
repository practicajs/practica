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

describe("Non-interactive CLI component tests", () => {
  test("When installing with specified app name, then the created folder has this specific name", async () => {
    // Arrange
    const specificAppName = "test";

    // Act
    await execa("ts-node", [
      "./bin/cli.ts",
      "immediate",
      `--target-directory=${emptyFolderForATest}`,
      `--app-name=${specificAppName}`,
    ]);

    // Assert
    const generatedSolutionFolder = path.join(
      emptyFolderForATest,
      specificAppName
    );
    const pathExists = await fsExtra.pathExists(generatedSolutionFolder);
    expect({ pathExists }).toStrictEqual({ pathExists: true });
    const destinationFolderContent = await fsExtra.readdir(
      generatedSolutionFolder
    );
    expect(destinationFolderContent.length).toBeGreaterThan(0);
  });

  test("When installing without app name, then it's created with the default name", async () => {
    // Arrange

    // Act
    await execa("ts-node", [
      "./bin/cli.ts",
      "immediate",
      `--target-directory=${emptyFolderForATest}`,
      // 👉 No name provided
    ]);

    // Assert
    const generatedSolutionFolder = path.join(
      emptyFolderForATest,
      "default-app-name"
    );
    const pathExists = await fsExtra.pathExists(generatedSolutionFolder);
    expect({ pathExists }).toStrictEqual({ pathExists: true });
    const destinationFolderContent = await fsExtra.readdir(
      generatedSolutionFolder
    );
    expect(destinationFolderContent.length).toBeGreaterThan(0);
  });
});
