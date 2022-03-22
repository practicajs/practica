import { createUniqueFolder } from "./../../../test/test-helpers";
import path from "path";
import fsExtra from "fs-extra";
import { generateApp } from "./generate-service";
import * as generationOptions from "./generation-options";
import * as testHelpers from "../../../test/test-helpers";

let uniqueEmptyFolderForASingleTest: string;

beforeEach(async () => {
  uniqueEmptyFolderForASingleTest = await testHelpers.createUniqueFolder(__dirname);
});

afterEach(async () => {
  //await fsExtra.remove(uniqueEmptyFolderForASingleTest);
});

describe("generateApp", () => {
  test("When destination does not exist, then the destination folder created and includes content ", async () => {
    // Arrange
    console.log("fsd00");
    const options = generationOptions.factorDefaultOptions({ targetDirectory: uniqueEmptyFolderForASingleTest });

    // Act
    console.log("fsd11");
    await generateApp(options);
    console.log("fsd22");

    // Assert
    const destinationFolderContent = await fsExtra.readdir(options.targetDirectory);
    expect(destinationFolderContent.length).toBeGreaterThan(0);
  });
});
