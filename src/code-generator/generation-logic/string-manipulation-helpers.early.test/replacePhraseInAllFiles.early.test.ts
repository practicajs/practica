// Unit tests for: replacePhraseInAllFiles

import * as replacementUtilities from "replace-in-file";

import { replacePhraseInAllFiles } from "../string-manipulation-helpers";

jest.mock("replace-in-file");

describe("replacePhraseInAllFiles() replacePhraseInAllFiles method", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Happy Path Tests
  describe("Happy Path", () => {
    it("should call replaceInFile with correct parameters", async () => {
      // Arrange
      const pathToRoot = "some/path";
      const whatToReplaceInRegex = "oldPhrase";
      const replacement = "newPhrase";

      // Act
      await replacePhraseInAllFiles(
        pathToRoot,
        whatToReplaceInRegex,
        replacement
      );

      // Assert
      expect(replacementUtilities.replaceInFile).toHaveBeenCalledWith({
        files: [`${pathToRoot}/**/*.*`],
        from: new RegExp(whatToReplaceInRegex, "g"),
        to: replacement,
      });
    });

    it("should handle different regex patterns correctly", async () => {
      // Arrange
      const pathToRoot = "another/path";
      const whatToReplaceInRegex = "\\d+";
      const replacement = "number";

      // Act
      await replacePhraseInAllFiles(
        pathToRoot,
        whatToReplaceInRegex,
        replacement
      );

      // Assert
      expect(replacementUtilities.replaceInFile).toHaveBeenCalledWith({
        files: [`${pathToRoot}/**/*.*`],
        from: new RegExp(whatToReplaceInRegex, "g"),
        to: replacement,
      });
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    it("should handle empty pathToRoot", async () => {
      // Arrange
      const pathToRoot = "";
      const whatToReplaceInRegex = "test";
      const replacement = "TEST";

      // Act
      await replacePhraseInAllFiles(
        pathToRoot,
        whatToReplaceInRegex,
        replacement
      );

      // Assert
      expect(replacementUtilities.replaceInFile).toHaveBeenCalledWith({
        files: [`${pathToRoot}/**/*.*`],
        from: new RegExp(whatToReplaceInRegex, "g"),
        to: replacement,
      });
    });

    it("should handle empty whatToReplaceInRegex", async () => {
      // Arrange
      const pathToRoot = "some/path";
      const whatToReplaceInRegex = "";
      const replacement = "newPhrase";

      // Act
      await replacePhraseInAllFiles(
        pathToRoot,
        whatToReplaceInRegex,
        replacement
      );

      // Assert
      expect(replacementUtilities.replaceInFile).toHaveBeenCalledWith({
        files: [`${pathToRoot}/**/*.*`],
        from: new RegExp(whatToReplaceInRegex, "g"),
        to: replacement,
      });
    });

    it("should handle empty replacement string", async () => {
      // Arrange
      const pathToRoot = "some/path";
      const whatToReplaceInRegex = "oldPhrase";
      const replacement = "";

      // Act
      await replacePhraseInAllFiles(
        pathToRoot,
        whatToReplaceInRegex,
        replacement
      );

      // Assert
      expect(replacementUtilities.replaceInFile).toHaveBeenCalledWith({
        files: [`${pathToRoot}/**/*.*`],
        from: new RegExp(whatToReplaceInRegex, "g"),
        to: replacement,
      });
    });

    it("should handle non-existing pathToRoot gracefully", async () => {
      // Arrange
      const pathToRoot = "non/existing/path";
      const whatToReplaceInRegex = "test";
      const replacement = "TEST";

      // Act
      await replacePhraseInAllFiles(
        pathToRoot,
        whatToReplaceInRegex,
        replacement
      );

      // Assert
      expect(replacementUtilities.replaceInFile).toHaveBeenCalledWith({
        files: [`${pathToRoot}/**/*.*`],
        from: new RegExp(whatToReplaceInRegex, "g"),
        to: replacement,
      });
    });
  });
});

// End of unit tests for: replacePhraseInAllFiles
