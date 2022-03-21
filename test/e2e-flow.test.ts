import execa from "execa";
import path from "path";
import fsExtra from "fs-extra";

beforeAll(async () => {
  const targetDirectory = path.join(__dirname, "output-folders-for-testing", `target-folder-${Date.now()}`);
  await fsExtra.mkdir(path.join(targetDirectory));
  const buildResult = await execa("npm", ["run", "build"]);
  const linkResult = await execa("npm", ["link"], { cwd: path.join(__dirname, "../.dist") });
  const generateResult = await execa("practica", ["generate"], { cwd: targetDirectory });
  console.log(generateResult);
  const testResult = await execa("npm", ["test"], { cwd: targetDirectory });
  console.log(testResult);
}, 40000);

describe("/api", () => {
  test("Empty", () => {
    expect(true).toBeTruthy();
  });
});
