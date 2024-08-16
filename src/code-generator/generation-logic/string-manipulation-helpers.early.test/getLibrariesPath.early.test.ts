// Unit tests for: getLibrariesPath

import path from "node:path";

import { getLibrariesPath } from "../string-manipulation-helpers";

describe("getLibrariesPath() getLibrariesPath method", () => {
  // Happy Path Tests
  describe("Happy Path", () => {
    it("should return the correct libraries path for a valid root path", () => {
      // This test aims to verify that the function correctly constructs the libraries path.
      const rootPath = "/my/project";
      const expectedPath = path.join(rootPath, "libraries");
      expect(getLibrariesPath(rootPath)).toBe(expectedPath);
    });

    it("should handle root path with trailing slash", () => {
      // This test aims to check if the function correctly handles a root path with a trailing slash.
      const rootPath = "/my/project/";
      const expectedPath = path.join(rootPath, "libraries");
      expect(getLibrariesPath(rootPath)).toBe(expectedPath);
    });

    it("should handle root path with multiple trailing slashes", () => {
      // This test aims to check if the function correctly handles a root path with multiple trailing slashes.
      const rootPath = "/my/project////";
      const expectedPath = path.join(rootPath, "libraries");
      expect(getLibrariesPath(rootPath)).toBe(expectedPath);
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    it("should handle an empty root path", () => {
      // This test aims to verify that the function can handle an empty string as the root path.
      const rootPath = "";
      expect(getLibrariesPath(rootPath)).toBe("libraries"); // Expecting 'libraries' as the output
    });

    it("should handle a root path with only slashes", () => {
      // This test aims to check if the function correctly handles a root path that consists only of slashes.
      const rootPath = "//";
      expect(getLibrariesPath(rootPath)).toBe("/libraries");
    });

    it("should handle a root path with special characters", () => {
      // This test aims to verify that the function can handle a root path with special characters.
      const rootPath = "/my/project/!@#$%^&*()";
      const expectedPath = path.join(rootPath, "libraries");
      expect(getLibrariesPath(rootPath)).toBe(expectedPath);
    });

    it("should handle a root path that is a single dot", () => {
      // This test aims to check if the function correctly handles a root path that is a single dot (current directory).
      const rootPath = ".";
      expect(getLibrariesPath(rootPath)).toBe("libraries"); // Expecting './libraries' as the output
    });

    it("should handle a root path that is a double dot", () => {
      // This test aims to check if the function correctly handles a root path that is a double dot (parent directory).
      const rootPath = "..";
      expect(getLibrariesPath(rootPath)).toBe("../libraries"); // Expecting '../libraries' as the output
    });
  });
});

// End of unit tests for: getLibrariesPath
