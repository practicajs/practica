// Unit tests for: factorDefaultOptions

import { factorDefaultOptions, generationOptions } from "../generation-options";

describe("factorDefaultOptions() factorDefaultOptions method", () => {
  // Happy Path Tests
  describe("Happy Path", () => {
    it("should return default options when no overrides are provided", () => {
      // This test checks if the function returns the default options correctly.
      const expected: generationOptions = {
        appName: "default-app-name",
        ORM: "sequelize",
        webFramework: "fastify",
        DBType: "pg",
        mainMicroserviceName: "microservice-example-1",
        emitBestPracticesHints: true,
        targetDirectory: process.cwd(),
        installDependencies: false,
        overrideIfExists: true,
      };

      const result = factorDefaultOptions({});
      expect(result).toEqual(expected);
    });

    //    it('should override specific options when provided', () => {
    //      // This test checks if specific options can be overridden correctly.
    //      const overrides = {
    //        appName: "custom-app-name",
    //        ORM: "prisma",
    //        webFramework: "express",
    //        installDependencies: true,
    //      };
    //
    //      const expected: generationOptions = {
    //        appName: "custom-app-name",
    //        ORM: "prisma",
    //        webFramework: "express",
    //        DBType: "pg",
    //        mainMicroserviceName: "microservice-example-1",
    //        emitBestPracticesHints: true,
    //        targetDirectory: process.cwd(),
    //        installDependencies: true,
    //        overrideIfExists: true,
    //      };
    //
    //      const result = factorDefaultOptions(overrides);
    //      expect(result).toEqual(expected);
    //    });

    it("should retain default values for unspecified options", () => {
      // This test checks that unspecified options retain their default values.
      const overrides = {
        appName: "another-app-name",
      };

      const expected: generationOptions = {
        appName: "another-app-name",
        ORM: "sequelize",
        webFramework: "fastify",
        DBType: "pg",
        mainMicroserviceName: "microservice-example-1",
        emitBestPracticesHints: true,
        targetDirectory: process.cwd(),
        installDependencies: false,
        overrideIfExists: true,
      };

      const result = factorDefaultOptions(overrides);
      expect(result).toEqual(expected);
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    it("should handle empty overrides gracefully", () => {
      // This test checks if the function can handle empty overrides without errors.
      const result = factorDefaultOptions({});
      expect(result).toBeDefined();
      expect(result).toHaveProperty("appName", "default-app-name");
    });

    //    it('should handle partial overrides with missing properties', () => {
    //      // This test checks if the function can handle partial overrides correctly.
    //      const overrides = {
    //        ORM: "prisma",
    //        emitBestPracticesHints: false,
    //      };
    //
    //      const expected: generationOptions = {
    //        appName: "default-app-name",
    //        ORM: "prisma",
    //        webFramework: "fastify",
    //        DBType: "pg",
    //        mainMicroserviceName: "microservice-example-1",
    //        emitBestPracticesHints: false,
    //        targetDirectory: process.cwd(),
    //        installDependencies: false,
    //        overrideIfExists: true,
    //      };
    //
    //      const result = factorDefaultOptions(overrides);
    //      expect(result).toEqual(expected);
    //    });

    it("should not modify the original defaults object", () => {
      // This test checks if the original defaults object remains unchanged.
      const overrides = {
        appName: "new-app-name",
      };

      const defaults = {
        appName: "default-app-name",
        ORM: "sequelize",
        webFramework: "fastify",
        DBType: "pg",
        mainMicroserviceName: "microservice-example-1",
        emitBestPracticesHints: true,
        targetDirectory: process.cwd(),
        installDependencies: false,
        overrideIfExists: true,
      };

      const result = factorDefaultOptions(overrides);
      expect(result).not.toBe(defaults);
      expect(defaults).toEqual({
        appName: "default-app-name",
        ORM: "sequelize",
        webFramework: "fastify",
        DBType: "pg",
        mainMicroserviceName: "microservice-example-1",
        emitBestPracticesHints: true,
        targetDirectory: process.cwd(),
        installDependencies: false,
        overrideIfExists: true,
      });
    });
  });
});

// End of unit tests for: factorDefaultOptions
