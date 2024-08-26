// Unit tests for: handleNonInteractiveCommand

import { AppError } from "../../error-handling";
import { factorDefaultOptions } from "../../generation-logic/generation-options";
import { generateApp } from "../../generation-logic/generate-service";
import { nonInteractiveCliTexts, spinner } from "../ui-elements";
import { handleNonInteractiveCommand } from "../non-interactive-cli";

jest.mock("../../generation-logic/generation-options");
jest.mock("../../generation-logic/generate-service");
jest.mock("../ui-elements");

// @ts-ignore
jest.spyOn(process, 'exit').mockImplementation(() => { });

describe("handleNonInteractiveCommand() handleNonInteractiveCommand method", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Happy Path", () => {
    it("should start the spinner, generate the app, and succeed", async () => {
      // Arrange
      const options = {
        installDependencies: true,
        overrideIfExists: false,
        orm: "typeorm",
        webFramework: "express",
        targetDirectory: "/my/app",
        appName: "myApp",
      };
      (factorDefaultOptions as jest.Mock).mockReturnValue(options);
      (generateApp as jest.Mock).mockResolvedValue(undefined);

      // Act
      await handleNonInteractiveCommand(options);

      // Assert
      expect(spinner.start).toHaveBeenCalledWith(
        nonInteractiveCliTexts.onStart
      );
      expect(generateApp).toHaveBeenCalledWith(options);
      expect(spinner.succeed).toHaveBeenCalledWith(
        nonInteractiveCliTexts.onSucceed
      );
    });
  });

  describe("Edge Cases", () => {
    it("should handle missing targetDirectory by using process.cwd()", async () => {
      // Arrange
      const options = {
        installDependencies: true,
        overrideIfExists: false,
        orm: "typeorm",
        webFramework: "express",
        appName: "myApp",
      };
      const cwd = process.cwd();
      (factorDefaultOptions as jest.Mock).mockReturnValue(options);
      (generateApp as jest.Mock).mockResolvedValue(undefined);

      // Act
      await handleNonInteractiveCommand(options);

      // Assert
      expect(factorDefaultOptions).toHaveBeenCalledWith(
        expect.objectContaining({
          targetDirectory: cwd,
        })
      );
    });

    it("should handle errors thrown by generateApp", async () => {
      // Arrange
      const options = {
        installDependencies: true,
        overrideIfExists: false,
        orm: "typeorm",
        webFramework: "express",
        targetDirectory: "/my/app",
        appName: "myApp",
      };
      const error = new AppError("generation-failed", "Generation failed");
      (factorDefaultOptions as jest.Mock).mockReturnValue(options);
      (generateApp as jest.Mock).mockRejectedValue(error);

      // Act
      await handleNonInteractiveCommand(options);

      // Assert
      expect(spinner.fail).toHaveBeenCalledWith("Generation failed");
      expect(process.exit).toHaveBeenCalledWith(1);
    });

    it("should handle generic errors gracefully", async () => {
      // Arrange
      const options = {
        installDependencies: true,
        overrideIfExists: false,
        orm: "typeorm",
        webFramework: "express",
        targetDirectory: "/my/app",
        appName: "myApp",
      };
      const error = new Error("Some unexpected error");
      (factorDefaultOptions as jest.Mock).mockReturnValue(options);
      (generateApp as jest.Mock).mockRejectedValue(error);

      // Act
      await handleNonInteractiveCommand(options);

      // Assert
      expect(spinner.fail).toHaveBeenCalledWith("Some unexpected error");
      expect(process.exit).toHaveBeenCalledWith(1);
    });

    it("should use default error message if error has no message", async () => {
      // Arrange
      const options = {
        installDependencies: true,
        overrideIfExists: false,
        orm: "typeorm",
        webFramework: "express",
        targetDirectory: "/my/app",
        appName: "myApp",
      };
      const error = new Error();
      (factorDefaultOptions as jest.Mock).mockReturnValue(options);
      (generateApp as jest.Mock).mockRejectedValue(error);

      // Act
      await handleNonInteractiveCommand(options);

      // Assert
      expect(spinner.fail).toHaveBeenCalledWith(
        nonInteractiveCliTexts.onError.default
      );
      expect(process.exit).toHaveBeenCalledWith(1);
    });
  });
});

// End of unit tests for: handleNonInteractiveCommand
