// Unit tests for: replacePhraseInFile

import * as replacementUtilities from "replace-in-file";

import { replacePhraseInFile } from "../string-manipulation-helpers";

jest.mock("replace-in-file");

describe("replacePhraseInFile() replacePhraseInFile method", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Happy Path Tests
  describe("Happy Path", () => {
    it("should replace a phrase in a file successfully", async () => {
      // Arrange
      const filePath = "path/to/file.txt";
      const regex = "oldPhrase";
      const replacement = "newPhrase";

      // Act
      await replacePhraseInFile(filePath, regex, replacement);

      // Assert
      expect(replacementUtilities.replaceInFile).toHaveBeenCalledWith({
        files: filePath,
        from: new RegExp(regex, "g"),
        to: replacement,
      });
    });

    it("should handle multiple replacements in a file", async () => {
      // Arrange
      const filePath = "path/to/file.txt";
      const regex = "phraseToReplace";
      const replacement = "replacementPhrase";

      // Act
      await replacePhraseInFile(filePath, regex, replacement);
      await replacePhraseInFile(filePath, regex, replacement);

      // Assert
      expect(replacementUtilities.replaceInFile).toHaveBeenCalledTimes(2);
      expect(replacementUtilities.replaceInFile).toHaveBeenCalledWith({
        files: filePath,
        from: new RegExp(regex, "g"),
        to: replacement,
      });
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    it("should handle an empty regex pattern", async () => {
      // Arrange
      const filePath = "path/to/file.txt";
      const regex = "";
      const replacement = "replacement";

      // Act
      await replacePhraseInFile(filePath, regex, replacement);

      // Assert
      expect(replacementUtilities.replaceInFile).toHaveBeenCalledWith({
        files: filePath,
        from: new RegExp(regex, "g"),
        to: replacement,
      });
    });

    it("should handle a regex that matches nothing", async () => {
      // Arrange
      const filePath = "path/to/file.txt";
      const regex = "nonExistentPhrase";
      const replacement = "replacement";

      // Act
      await replacePhraseInFile(filePath, regex, replacement);

      // Assert
      expect(replacementUtilities.replaceInFile).toHaveBeenCalledWith({
        files: filePath,
        from: new RegExp(regex, "g"),
        to: replacement,
      });
    });

    it("should handle a replacement string that is empty", async () => {
      // Arrange
      const filePath = "path/to/file.txt";
      const regex = "phraseToReplace";
      const replacement = "";

      // Act
      await replacePhraseInFile(filePath, regex, replacement);

      // Assert
      expect(replacementUtilities.replaceInFile).toHaveBeenCalledWith({
        files: filePath,
        from: new RegExp(regex, "g"),
        to: replacement,
      });
    });

    it("should throw an error if replaceInFile fails", async () => {
      // Arrange
      const filePath = "path/to/file.txt";
      const regex = "someRegex";
      const replacement = "replacement";
      (replacementUtilities.replaceInFile as jest.Mock).mockRejectedValue(
        new Error("File not found")
      );

      // Act & Assert
      await expect(
        replacePhraseInFile(filePath, regex, replacement)
      ).rejects.toThrow("File not found");
    });
  });
});

// End of unit tests for: replacePhraseInFile
