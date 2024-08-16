// Unit tests for: chooseORM

import * as fsExtra from "fs-extra";
import path from "path";

import { generationOptions } from "../../generation-options";
import {
  getMicroservicePath,
  replacePhraseInFile,
} from "../../string-manipulation-helpers";
import { chooseORM } from "../choose-orm";

jest.mock('fs-extra');

jest.mock("../../string-manipulation-helpers", () => {
  const actual = jest.requireActual("../../string-manipulation-helpers"); // This fetches the actual implementations

  return {
    ...actual, // Uses the actual implementations
    getMicroservicePath: jest.fn(),
    replacePhraseInFile: jest.fn(),
  };
});

describe("chooseORM() chooseORM method", () => {
  const generatedAppRoot = "mock/generated/app/root";
  const mockMicroservicePath = "mock/microservice/path";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Happy Path", () => {
    it("should adjust the code to Prisma ORM", async () => {
      (getMicroservicePath as jest.Mock).mockReturnValue(mockMicroservicePath);

      const options: generationOptions = {
        appName: "testApp",
        ORM: "prisma",
        webFramework: "express",
        DBType: "postgres",
        mainMicroserviceName: "mainService",
        emitBestPracticesHints: true,
        targetDirectory: "target/dir",
        installDependencies: true,
        overrideIfExists: false,
      };
      (replacePhraseInFile as jest.Mock).mockResolvedValue(undefined);

      await chooseORM(generatedAppRoot, options);

      expect(getMicroservicePath).toHaveBeenCalledWith(generatedAppRoot);
      expect(fsExtra.rm).toHaveBeenCalledWith(
        path.join(mockMicroservicePath, "data-access"),
        { recursive: true }
      );
      expect(fsExtra.rename).toHaveBeenCalledWith(
        path.join(mockMicroservicePath, "data-access-prisma"),
        path.join(mockMicroservicePath, "data-access")
      );
      expect(replacePhraseInFile).toHaveBeenCalledTimes(4);
    });

    it("should adjust the code to Sequelize ORM", async () => {
      const options: generationOptions = {
        appName: "testApp",
        ORM: "sequelize",
        webFramework: "express",
        DBType: "postgres",
        mainMicroserviceName: "mainService",
        emitBestPracticesHints: true,
        targetDirectory: "target/dir",
        installDependencies: true,
        overrideIfExists: false,
      };
      (replacePhraseInFile as jest.Mock).mockResolvedValue(undefined);

      await chooseORM(generatedAppRoot, options);

      expect(getMicroservicePath).toHaveBeenCalledWith(generatedAppRoot);
      expect(fsExtra.rm).toHaveBeenCalledWith(
        path.join(mockMicroservicePath, "data-access-prisma"),
        { recursive: true }
      );
      expect(replacePhraseInFile).toHaveBeenCalledTimes(3); // Expecting 3 calls for Sequelize adjustments
    });
  });

  describe("Edge Cases", () => {
    it("should handle an unsupported ORM gracefully", async () => {
      const options: generationOptions = {
        appName: "testApp",
        ORM: "unsupported" as any, // Simulating an unsupported ORM
        webFramework: "express",
        DBType: "postgres",
        mainMicroserviceName: "mainService",
        emitBestPracticesHints: true,
        targetDirectory: "target/dir",
        installDependencies: true,
        overrideIfExists: false,
      };

      await expect(chooseORM(generatedAppRoot, options)).resolves.not.toThrow();
      expect(getMicroservicePath).toHaveBeenCalledWith(generatedAppRoot);
      expect(fsExtra.rm).not.toHaveBeenCalled(); // No folder should be removed
      expect(replacePhraseInFile).not.toHaveBeenCalled(); // No phrases should be replaced
    });
  });
});

// End of unit tests for: chooseORM
