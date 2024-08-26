import path from "path";
import fsExtra from "fs-extra";
import { generateApp } from "./generate-service";
import * as generationOptions from "./generation-options";
import * as testHelpers from "../../../test/test-helpers";

let uniqueEmptyFolderForASingleTest: string;

beforeEach(async () => {
  uniqueEmptyFolderForASingleTest = await testHelpers.createUniqueFolder();
});

afterEach(async () => {
  await fsExtra.remove(uniqueEmptyFolderForASingleTest);
});

describe("generateApp", () => {
  test.skip("When destination does not exist, then the destination folder created and includes content ", async () => {
    // Arrange
    const options = generationOptions.factorDefaultOptions({
      targetDirectory: uniqueEmptyFolderForASingleTest,
      installDependencies: false,
    });

    // Act
    await generateApp(options);

    // Assert
    const destinationFolderContent = await fsExtra.readdir(
      options.targetDirectory
    );
    expect(destinationFolderContent.length).toBeGreaterThan(0);
  });

  test.skip("When destination exists, has content inside, and flag --override-if-exists is passed as false, then should throw error", async () => {
    // Arrange
    const options = generationOptions.factorDefaultOptions({
      targetDirectory: uniqueEmptyFolderForASingleTest,
      overrideIfExists: false,
    });
    await generateApp(options);

    // Act
    const generateAppWrapper = async () => {
      await generateApp(options);
    };

    // Assert
    expect(generateAppWrapper()).rejects.toMatchObject({
      name: "directory-is-not-empty",
    });
  });
});
