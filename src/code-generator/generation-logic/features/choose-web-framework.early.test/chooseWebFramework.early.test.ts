// Unit tests for: chooseWebFramework

import path from "path";
import * as fsExtra from "fs-extra";

import { generationOptions } from "../../generation-options";
import { chooseWebFramework } from "../choose-web-framework";
import {
  getLibrariesPath,
  getMicroservicePath,
  replacePhraseInFile,
} from "../../string-manipulation-helpers";

jest.mock("fs-extra");

jest.mock("../../string-manipulation-helpers", () => {
  const actual = jest.requireActual("../../string-manipulation-helpers");

  return {
    ...actual,
    getMicroservicePath: jest.fn(),
    getLibrariesPath: jest.fn(),
    replacePhraseInFile: jest.fn(),
    replacePhraseInAllFiles: jest.fn(),
  };
});

describe("chooseWebFramework() chooseWebFramework method", () => {
  const mockGeneratedAppRoot = "/mock/generated/app/root";
  const mockOptions: generationOptions = {
    appName: "testApp",
    ORM: "sequelize",
    webFramework: "express",
    DBType: "postgres",
    mainMicroserviceName: "mainService",
    emitBestPracticesHints: true,
    targetDirectory: "/mock/target/directory",
    installDependencies: true,
    overrideIfExists: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Happy Path", () => {
    it("should adjust the code to Express framework", async () => {
      // Arrange
      const microservicePathMock = "/path/to/microservice";
      (getMicroservicePath as jest.Mock).mockReturnValue("/path/to/microservice");
      (getLibrariesPath as jest.Mock).mockReturnValue("/path/to/libraries");

      // Act
      await chooseWebFramework(mockGeneratedAppRoot, mockOptions);

      // Assert
      expect(getMicroservicePath).toHaveBeenCalledWith(mockGeneratedAppRoot);
      expect(getLibrariesPath).toHaveBeenCalledWith(mockGeneratedAppRoot);
      expect(fsExtra.rm).toHaveBeenCalledTimes(2);
      expect(replacePhraseInFile).toHaveBeenCalledTimes(1);
    });

    it("should adjust the code to Fastify framework", async () => {
      // Arrange
      const fastifyOptions = { ...mockOptions, webFramework: "fastify" as const };
      // getMicroservicePathMock.mockReturnValue(`${mockGeneratedAppRoot}/microservice`);
      // getLibrariesPathMock.mockReturnValue(`${mockGeneratedAppRoot}/libraries`);

      // Act
      await chooseWebFramework(mockGeneratedAppRoot, fastifyOptions);

      // Assert
      expect(getMicroservicePath).toHaveBeenCalledWith(mockGeneratedAppRoot);
      expect(getLibrariesPath).toHaveBeenCalledWith(mockGeneratedAppRoot);
      expect(fsExtra.rm).toHaveBeenCalledTimes(2);
      expect(replacePhraseInFile).toHaveBeenCalledTimes(1);
    });
  });

  describe("Edge Cases", () => {
    it("should handle case when webFramework is not recognized", async () => {
      // Arrange
      const invalidOptions = { ...mockOptions, webFramework: "unknown" as 'express' | 'fastify' };
      // getMicroservicePathMock.mockReturnValue(`${mockGeneratedAppRoot}/microservice`);
      // getLibrariesPathMock.mockReturnValue(`${mockGeneratedAppRoot}/libraries`);

      // Act
      await chooseWebFramework(mockGeneratedAppRoot, invalidOptions);

      // Assert
      expect(getMicroservicePath).toHaveBeenCalledWith(mockGeneratedAppRoot);
      expect(getLibrariesPath).toHaveBeenCalledWith(mockGeneratedAppRoot);
      // No calls to adjust functions should be made
      expect(fsExtra.rm).not.toHaveBeenCalled();
      expect(replacePhraseInFile).not.toHaveBeenCalled();
    });

    it("should handle missing generatedAppRoot", async () => {
      // Arrange
      const emptyRootOptions = { ...mockOptions, webFramework: "express" as const };
      const emptyGeneratedAppRoot = "";

      // Act
      await chooseWebFramework(emptyGeneratedAppRoot, emptyRootOptions);

      // Assert
      expect(getMicroservicePath).toHaveBeenCalledWith(emptyGeneratedAppRoot);
      expect(getLibrariesPath).toHaveBeenCalledWith(emptyGeneratedAppRoot);
      expect(fsExtra.rm).toHaveBeenCalled();
      expect(replacePhraseInFile).toHaveBeenCalled();
    });
  });
});

// End of unit tests for: chooseWebFramework
