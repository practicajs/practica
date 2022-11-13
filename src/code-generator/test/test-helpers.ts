import fsExtra from "fs-extra";
import path from "path";
import os from "os";

function getRandomFolderPath(basePath: string) {
  const randomFolderName = new Date().getTime().toString();

  return path.join(basePath, randomFolderName);
}

export const createUniqueFolder = async (): Promise<string> => {
  const testOutputFolder = path.join(os.tmpdir(), "practica-tests-output");
  const doesPathExist = await fsExtra.pathExists(testOutputFolder);
  if (!doesPathExist) {
    await fsExtra.mkdir(testOutputFolder, { recursive: true });
  }
  const uniqueTestFolderPath = await fsExtra.mkdtemp(
    `${testOutputFolder}${path.sep}`
  );

  return uniqueTestFolderPath;
};