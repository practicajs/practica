import fsExtra from "fs-extra";
import path from "path";

export const getRandomFolderPath = (basePath: string) => {
  const randomFolderName = new Date().getTime().toString();

  return path.join(basePath, randomFolderName);
};

export const createUniqueFolder = async (basePath: string): Promise<string> => {
  const folderForCodeGenerationOutput = path.join(basePath, specialFolderForTesting);
  const randomFolderForSpecificTest = getRandomFolderPath(folderForCodeGenerationOutput);
  const doesPathExist = await fsExtra.pathExists(randomFolderForSpecificTest);
  if (!doesPathExist) {
    await fsExtra.mkdir(randomFolderForSpecificTest, { recursive: true });
  }

  return randomFolderForSpecificTest;
};

export const specialFolderForTesting = "output-folders-for-testing";
