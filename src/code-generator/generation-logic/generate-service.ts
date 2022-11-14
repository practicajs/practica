import * as replacementUtilities from "replace-in-file";
import fsExtra from "fs-extra";
import path from "path";
import execa from "execa";
import { generationOptions } from "./generation-options";
import { AppError } from "../error-handling";
// This is where the code generation logic lives. In high-level, based on the provided option, it creates
// a folder, decides which code to generate, run the code through a templating engine and emit it to the target folder
export const generateApp = async (options: generationOptions) => {
  const targetPath = path.join(options.targetDirectory, options.appName);

  await createTargetPathOrThrowIfExists(targetPath, options.overrideIfExists);
  await copyAppFilesToTargetPath(targetPath);
  if (options.installDependencies) {
    await installDependencies(targetPath);
  }
  await adjustCodeBasedOnPreferences(targetPath, options);
  return;
};

async function createTargetPathOrThrowIfExists(
  targetPath: string,
  overrideIfExists: boolean
) {
  const targetPathExists = await fsExtra.pathExists(targetPath);

  if (targetPathExists) {
    const isTargetDirectoryEmpty =
      (await fsExtra.readdir(targetPath)).length === 0;
    if (!isTargetDirectoryEmpty && !overrideIfExists) {
      throw new AppError(
        "directory-is-not-empty",
        "The target directory is not empty, if you want to override it please provide option --overrideIfExists=true or -ov=true"
      );
    } else {
      await fsExtra.rm(targetPath, { recursive: true });
      await fsExtra.mkdir(targetPath, {});
    }
  }
}
async function copyAppFilesToTargetPath(targetPath: string) {
  const sourceDirectory = path.join(__dirname, "../../code-templates");
  await fsExtra.copy(sourceDirectory, targetPath, {
    // We don't want to copy the node_modules folder since it's slow and error-prone
    filter: (copyFromPath, copyToPath) => {
      if (path.basename(copyFromPath) === "node_modules") {
        return false;
      } else {
        return true;
      }
    },
    overwrite: true,
  });
}

async function installDependencies(targetPath: string) {
  await execa("npm", ["install"], {
    cwd: targetPath,
  });
  await execa("npx", ["turbo", "run", "build", "--continue=false"], {
    cwd: targetPath,
  });
}

async function adjustCodeBasedOnPreferences(
  generatedAppRoot: string,
  options: generationOptions
) {
  console.log("adjusting soon", options);
  const microservicePath = getMicroservicePath(generatedAppRoot);
  if (options.ORM === "prisma") {
    console.log("adjusting for prisma");
    const sequelizeFolder = path.join(microservicePath, "data-access");
    console.log(sequelizeFolder);
    await fsExtra.rm(sequelizeFolder, { recursive: true });
    const prismaFolder = path.join(microservicePath, "data-access-prisma");
    const prismaFolderNewName = path.join(microservicePath, "data-access");
    console.log(prismaFolderNewName);
    await fsExtra.rename(prismaFolder, prismaFolderNewName);
    console.log("renamed");
    const phrasesToRemove = [
      '"db:migrate":().*,\n',
      '"(.*?)sequelize(.*?)": "(.*)"(,?)\n',
    ];
    for (const phraseToReplace of phrasesToRemove) {
      const fromExpression = new RegExp(phraseToReplace, "g");

      await replacementUtilities.replaceInFile({
        files: path.join(microservicePath, "package.json"),
        from: fromExpression,
        to: "",
      });
    }

    await replacementUtilities.replaceInFile({
      files: path.join(microservicePath, "package.json"),
      from: "db:migrate:prisma",
      to: "db:migrate",
    });

    await replacementUtilities.replaceInFile({
      files: path.join(microservicePath, "package.json"),
      from: "data-access-prisma/prisma/schema.prisma",
      to: "data-access/prisma/schema.prisma",
    });
  } else if (options.ORM === "sequelize") {
    const prismaFolder = path.join(microservicePath, "data-access-prisma");
    await fsExtra.rm(prismaFolder, { recursive: true });
    const patternsToRemove = [
      '"(.*?)prisma(.*?)": "(.*)"(,?)\n',
      '"db:generate-client"(.*?)\n',
    ];
    for (const pattern of patternsToRemove) {
      const result = await replacementUtilities.replaceInFile({
        files: path.join(microservicePath, "package.json"),
        from: new RegExp(pattern, "g"),
        to: "",
      });
      console.log("💜", result);
    }
  }
}

function getMicroservicePath(rootPath: string) {
  return path.join(rootPath, "services", "order-service");
}
