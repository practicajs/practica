describe("Test error detection", () => {
  test("When expecting a different value, the test should fail", () => {
    expect(2 + 2).toBe(5);
  });
});
