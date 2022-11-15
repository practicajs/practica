import * as fsExtra from "fs-extra";
import path from "path";
import { generationOptions } from "../generation-options";
import * as replacementUtilities from "replace-in-file";

// shorten string replacement

// This feature allows the user to choose which ORM (DB mapper) to use
export async function chooseORM(
  generatedAppRoot: string,
  options: generationOptions
) {
  const microservicePath = getMicroservicePath(generatedAppRoot);
  if (options.ORM === "prisma") {
    await adjustTheCodeToPrismaORM(microservicePath);
  } else if (options.ORM === "sequelize") {
    await adjustTheCodeToSequelizeORM(microservicePath);
  }
}

async function adjustTheCodeToPrismaORM(microservicePath: string) {
  // Remove the sequelize folder and all the phrased from package.json
  const sequelizeFolder = path.join(microservicePath, "data-access");
  await fsExtra.rm(sequelizeFolder, { recursive: true });
  const prismaFolder = path.join(microservicePath, "data-access-prisma");
  const prismaFolderNewName = path.join(microservicePath, "data-access");
  await fsExtra.rename(prismaFolder, prismaFolderNewName);
  const packageJSONPath = path.join(microservicePath, "package.json");
  await replacePhraseInFile(
    packageJSONPath,
    '"(.*?)sequelize(.*?)": "(.*)"(,?)\n',
    ""
  );
  await replacePhraseInFile(packageJSONPath, '"db:migrate":().*,\n', "");

  // Now rename the Prisma things to be the default
  await replacePhraseInFile(packageJSONPath, "db:migrate:prisma", "db:migrate");
  await replacePhraseInFile(
    packageJSONPath,
    "data-access-prisma/prisma/schema.prisma",
    "data-access/prisma/schema.prisma"
  );
}

async function adjustTheCodeToSequelizeORM(microservicePath: string) {
  const prismaFolder = path.join(microservicePath, "data-access-prisma");
  await fsExtra.rm(prismaFolder, { recursive: true });
  const packageJSONPath = path.join(microservicePath, "package.json");
  await replacePhraseInFile(
    packageJSONPath,
    '"(.*?)prisma(.*?)": "(.*)"(,?)\n',
    ""
  );
  await replacePhraseInFile(packageJSONPath, '"db:generate-client"(.*?)\n', "");
}

async function replacePhraseInFile(
  path: string,
  whatToReplaceInRegex: string,
  replacement: string
) {
  await replacementUtilities.replaceInFile({
    files: path,
    from: new RegExp(whatToReplaceInRegex, "g"),
    to: replacement,
  });
}

function getMicroservicePath(rootPath: string) {
  return path.join(rootPath, "services", "order-service");
}
