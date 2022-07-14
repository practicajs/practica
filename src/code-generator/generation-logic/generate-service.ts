import fsExtra from "fs-extra";
import path from "path";
import execa from "execa";
import { generationOptions } from "./generation-options";
import { AppError } from "../error-handling";
import allChangeableNPMs from "../../code-templates/allChangeableNPMs.json";
// import packageJsonToCopy from "../../code-templates/package.json";

// This is where the code generation logic lives. In high-level, based on the provided option, it creates
// a folder, decides which code to generate, run the code through a templating engine and emit it to the target folder
export const generateApp = async (options: generationOptions) => {
  const targetDirectory = path.join(options.targetDirectory, options.appName);
  const sourceDirectory = path.join(__dirname, "../../code-templates");

  const targetDirectoryExists = await fsExtra.pathExists(targetDirectory);

  if (targetDirectoryExists) {
    const isTargetDirectoryEmpty =
      (await fsExtra.readdir(targetDirectory)).length === 0;
    if (!isTargetDirectoryEmpty && !options.overrideIfExists) {
      throw new AppError(
        "directory-is-not-empty",
        "The target directory is not empty, if you want to override it please provide option --overrideIfExists=true or -ov=true"
      );
    } else {
      await fsExtra.rm(targetDirectory, { recursive: true });
      await fsExtra.mkdir(targetDirectory, {});
    }
  }

  await fsExtra.copy(sourceDirectory, targetDirectory, {
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

  // customize package.json base on chosen properties such as db, etc
  const baseFramework = allChangeableNPMs['baseFramework'];
  const DBType = allChangeableNPMs['db'];
  const chosenWebPLatform = baseFramework[options.baseFramework];
  const chosenDB = DBType[options.DBType];
  //console.log(`chosenDB ${JSON.stringify(chosenDB)}`);
  const targetDirectoryPackageJson = `${targetDirectory}/services/order-service/package.json`;
  const packageJsonToOverwrite = JSON.parse(fsExtra.readFileSync(targetDirectoryPackageJson, 'utf8'));
  const dependencies = { ...packageJsonToOverwrite.dependencies, ...chosenWebPLatform, ...chosenDB }
  // console.log(`dependencies: ${JSON.stringify(dependencies)}`);
  packageJsonToOverwrite.dependencies = dependencies;
  fsExtra.writeFileSync(targetDirectoryPackageJson, JSON.stringify(packageJsonToOverwrite, null, 4));

  // TODO: remove unescassery types 
  // TODO: remove the copy of allChangeableNPMs from target
  // TODO: handle errors

  // write 
  if (options.installDependencies) {
    await execa("npm", ["install"], {
      cwd: targetDirectory,
    });

    await execa(
      "npm",
      ["run", "lerna", "--", "exec", "--scope", "order-service", "npm install"],
      {
        cwd: targetDirectory,
      }
    );
  }

  console.log(`App was generated successfully`);
  return;
};
