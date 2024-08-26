// Unit tests for: getMicroservicePath

import path from "node:path";

import { getMicroservicePath } from "../string-manipulation-helpers";

describe("getMicroservicePath() getMicroservicePath method", () => {
  // Happy Path Tests
  describe("Happy Path", () => {
    it("should return the correct microservice path for a valid root path", () => {
      // This test aims to verify that the function returns the expected path when given a valid root path.
      const rootPath = "/my/app";
      const expectedPath = path.join(rootPath, "services", "order-service");
      expect(getMicroservicePath(rootPath)).toBe(expectedPath);
    });

    it("should handle root path with trailing slash", () => {
      // This test aims to check if the function correctly handles a root path that ends with a slash.
      const rootPath = "/my/app/";
      const expectedPath = path.join(rootPath, "services", "order-service");
      expect(getMicroservicePath(rootPath)).toBe(expectedPath);
    });

    it("should handle root path with multiple trailing slashes", () => {
      // This test aims to verify that the function can handle a root path with multiple trailing slashes.
      const rootPath = "/my/app///";
      const expectedPath = path.join(rootPath, "services", "order-service");
      expect(getMicroservicePath(rootPath)).toBe(expectedPath);
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    it("should handle an empty root path", () => {
      // This test aims to check how the function behaves when given an empty string as the root path.
      const rootPath = "";
      expect(getMicroservicePath(rootPath)).toBe(
        path.join("services", "order-service")
      );
    });

    it("should handle a root path that is just a slash", () => {
      // This test aims to verify that the function returns the correct path when the root path is a single slash.
      const rootPath = "/";
      const expectedPath = path.join(rootPath, "services", "order-service");
      expect(getMicroservicePath(rootPath)).toBe(expectedPath);
    });

    it("should handle a root path with spaces", () => {
      // This test aims to check if the function can handle a root path that contains spaces.
      const rootPath = "/my app";
      const expectedPath = path.join(rootPath, "services", "order-service");
      expect(getMicroservicePath(rootPath)).toBe(expectedPath);
    });

    it("should handle a root path with special characters", () => {
      // This test aims to verify that the function can handle a root path with special characters.
      const rootPath = "/my@app#2023";
      const expectedPath = path.join(rootPath, "services", "order-service");
      expect(getMicroservicePath(rootPath)).toBe(expectedPath);
    });
  });
});

// End of unit tests for: getMicroservicePath
