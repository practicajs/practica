// Unit tests for: generateApp

import fsExtra from "fs-extra";
import execa from "execa";

import { generationOptions } from "../generation-options";
import { AppError } from "../../error-handling";
import { chooseORM } from "../features/choose-orm";
import { chooseWebFramework } from "../features/choose-web-framework";
import { generateApp } from "../generate-service";

jest.mock("execa");
jest.mock("fs-extra");

jest.mock("../features/choose-orm", () => {
  const actual = jest.requireActual("../features/choose-orm");
  return {
    ...actual,
    chooseORM: jest.fn(),
  };
});

jest.mock("../features/choose-web-framework", () => {
  const actual = jest.requireActual("../features/choose-web-framework");
  return {
    ...actual,
    chooseWebFramework: jest.fn(),
  };
});

describe("generateApp() generateApp method", () => {
  const mockOptions: generationOptions = {
    appName: "test-app",
    ORM: "sequelize",
    webFramework: "express",
    DBType: "mysql",
    mainMicroserviceName: "main",
    emitBestPracticesHints: true,
    targetDirectory: "/mock/path",
    installDependencies: true,
    overrideIfExists: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Happy Path", () => {
    it("should create app directory and copy files when target directory is empty", async () => {
      // @ts-ignore
      jest.spyOn(fsExtra, "pathExists").mockResolvedValue(false);
      jest.spyOn(fsExtra, "mkdir").mockResolvedValue(undefined);
      // @ts-ignore
      jest.spyOn(fsExtra, "copy").mockResolvedValue(undefined);
      // jest.spyOn(execa, "execa").mockResolvedValue(undefined);
      // @ts-ignore
      execa.mockResolvedValue(undefined);

      await generateApp(mockOptions);

      const mockPath = mockOptions.targetDirectory + "/" + mockOptions.appName;
      expect(fsExtra.pathExists).toHaveBeenCalledWith(mockPath);
      expect(fsExtra.copy).toHaveBeenCalledWith(
        expect.any(String),
        mockPath,
        expect.any(Object)
      );
      expect(chooseORM).toHaveBeenCalledWith(
        mockPath,
        mockOptions
      );
      expect(chooseWebFramework).toHaveBeenCalledWith(
        mockPath,
        mockOptions
      );
      expect(execa).toHaveBeenCalledWith("npm", ["install"], {
        cwd: mockPath,
      });
      expect(execa).toHaveBeenCalledWith("npx", ["turbo", "run", "build"], {
        cwd: mockPath,
      });
    });

    it("should not install dependencies if installDependencies is false", async () => {
      const optionsWithoutInstall = {
        ...mockOptions,
        installDependencies: false,
      };
      // @ts-ignore
      jest.spyOn(fsExtra, "pathExists").mockResolvedValue(false);
      jest.spyOn(fsExtra, "mkdir").mockResolvedValue(undefined);
      // @ts-ignore
      jest.spyOn(fsExtra, "copy").mockResolvedValue(undefined);

      await generateApp(optionsWithoutInstall);

      expect(execa).not.toHaveBeenCalledWith("npm", ["install"], {
        cwd: expect.any(String),
      });
    });
  });

  describe("Edge Cases", () => {
    it("should throw an error if the target directory is not empty and overrideIfExists is false", async () => {
      // @ts-ignore
      jest.spyOn(fsExtra, "pathExists").mockResolvedValue(true);
      // @ts-ignore
      jest.spyOn(fsExtra, "readdir").mockResolvedValue(["file.txt"]);

      await expect(generateApp(mockOptions)).rejects.toThrow(AppError);
      await expect(generateApp(mockOptions)).rejects.toThrow(
        "The target directory is not empty"
      );
    });

    it("should remove the existing directory and create a new one if overrideIfExists is true", async () => {
      const optionsWithOverride = { ...mockOptions, overrideIfExists: true };
      // @ts-ignore
      jest.spyOn(fsExtra, "pathExists").mockResolvedValue(true);
      // @ts-ignore
      jest.spyOn(fsExtra, "readdir").mockResolvedValue(["file.txt"]);
      jest.spyOn(fsExtra, "rm").mockResolvedValue(undefined);
      jest.spyOn(fsExtra, "mkdir").mockResolvedValue(undefined);
      // @ts-ignore
      jest.spyOn(fsExtra, "copy").mockResolvedValue(undefined);

      await generateApp(optionsWithOverride);

      expect(fsExtra.rm).toHaveBeenCalledWith("/mock/path/test-app", {
        recursive: true,
      });
      expect(fsExtra.mkdir).toHaveBeenCalledWith("/mock/path/test-app", {});
    });

    it("should handle errors thrown by chooseORM", async () => {
      // @ts-ignore
      jest.spyOn(fsExtra, "pathExists").mockResolvedValue(false);
      jest.spyOn(fsExtra, "mkdir").mockResolvedValue(undefined);
      // @ts-ignore
      jest.spyOn(fsExtra, "copy").mockResolvedValue(undefined);
      (chooseORM as jest.Mock).mockRejectedValue(new Error("ORM error"));

      await expect(generateApp(mockOptions)).rejects.toThrow("ORM error");
    });
  });
});

// End of unit tests for: generateApp
