import fsExtra from "fs-extra";
import path from "path";
import execa from "execa";
import { generationOptions } from "./generation-options";
import { AppError } from "../error-handling";
const packageJsonPath = "../../code-templates/services/order-service/package.json";
// This is where the code generation logic lives. In high-level, based on the provided option, it creates
// a folder, decides which code to generate, run the code through a templating engine and emit it to the target folder
export const generateApp = async (options: generationOptions) => {
  const targetDirectory = path.join(options.targetDirectory, options.appName);
  const sourceDirectory = path.join(__dirname, "../../code-templates");
  const packageJson = JSON.parse(fsExtra.readFileSync(`${sourceDirectory}/services/order-service/package.json`, 'utf8'));

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
  const webPLatform = packageJson['baseFramework'];
  const chosenWebPLatform = webPLatform[options.baseFramework];
  console.log(`dan chosen web plat ${JSON.stringify(chosenWebPLatform)}`);
  const dependencies = { ...packageJson.dependencies, ...chosenWebPLatform }
  console.log(`dan ${JSON.stringify(dependencies)}`);
  packageJson.dependencies = dependencies;
  
  fsExtra.writeFileSync(path.join(__dirname, packageJsonPath), JSON.stringify(packageJson, null, 4));

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
