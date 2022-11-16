import fsExtra from "fs-extra";
import execa from "execa";
import path from "path";
import * as testHelpers from "./test-helpers";

let emptyFolderForATest: string;

beforeEach(async () => {
  emptyFolderForATest = await testHelpers.createUniqueFolder();
});

afterEach(async () => {
  //await fsExtra.remove(emptyFolderForATest);
});

describe("Non-interactive CLI component tests", () => {
  describe("ORM type", () => {
    test("When ORM type is Prisma, then the created DAL folder has prisma dependency and files", async () => {
      // Arrange

      // Act
      await execa("ts-node", [
        "./bin/cli.ts",
        "immediate",
        `--target-directory=${emptyFolderForATest}`,
        `--app-name=test`,
        "--orm=prisma",
      ]);

      // Assert
      const rootPath = path.join(
        emptyFolderForATest,
        "test",
        "services",
        "order-service"
      );
      const isPrismaInPackageJSON = await testHelpers.doesFileContainPhrase(
        path.join(rootPath, "package.json"),
        "prisma"
      );
      const isSequelizeInPackageJSON = await testHelpers.doesFileContainPhrase(
        path.join(rootPath, "package.json"),
        "sequelize"
      );
      const isPrismaFolderInDALLayer = await testHelpers.doesFolderExistInPath(
        path.join(rootPath, "data-access", "prisma")
      );
      expect({
        isSequelizeInPackageJSON,
        isPrismaInPackageJSON,
        isPrismaFolderInDALLayer,
      }).toStrictEqual({
        isSequelizeInPackageJSON: false,
        isPrismaFolderInDALLayer: true,
        isPrismaInPackageJSON: true,
      });
    });

    test("When ORM type is sequelize, then the created DAL folder has only sequelize dependency and files", async () => {
      // Arrange

      // Act
      await execa("ts-node", [
        "./bin/cli.ts",
        "immediate",
        `--target-directory=${emptyFolderForATest}`,
        `--app-name=test`,
        "--orm=sequelize",
      ]);

      // Assert
      const rootPath = path.join(
        emptyFolderForATest,
        "test",
        "services",
        "order-service"
      );
      const isPrismaInPackageJSON = await testHelpers.doesFileContainPhrase(
        path.join(rootPath, "package.json"),
        "prisma"
      );
      const isSequelizeInPackageJSON = await testHelpers.doesFileContainPhrase(
        path.join(rootPath, "package.json"),
        "sequelize"
      );
      const isSequelizeFolderInDALLayer =
        await testHelpers.doesFolderExistInPath(
          path.join(rootPath, "data-access", "config")
        );
      const isPrismaFolderThere = await testHelpers.doesFolderExistInPath(
        path.join(rootPath, "data-access-prisma")
      );
      expect({
        isSequelizeInPackageJSON,
        isPrismaInPackageJSON,
        isSequelizeFolderInDALLayer,
        isPrismaFolderThere,
      }).toStrictEqual({
        isSequelizeInPackageJSON: true,
        isSequelizeFolderInDALLayer: true,
        isPrismaInPackageJSON: false,
        isPrismaFolderThere: false,
      });
    });
  });
  describe("Flag app name", () => {
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
});
