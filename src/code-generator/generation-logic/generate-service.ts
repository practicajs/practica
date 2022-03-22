import fsExtra from "fs-extra";
import path from "path";
import execa from "execa";
import { generationOptions } from "./generation-options";

export const generateApp = async (options: generationOptions) => {
  console.log("ds2");
  const targetDirectory = path.join(options.targetDirectory, options.appName);
  const sourceDirectory = path.join(__dirname, "../../code-templates/basic-app");
  console.log(`About to generate app`, options, targetDirectory);
  await fsExtra.mkdir(targetDirectory);
  await fsExtra.copy(sourceDirectory, targetDirectory);
  if (options.installDependencies) {
    const npmi = await execa("npm", ["install"], { cwd: targetDirectory });
    console.log(npmi);
  }
  console.log(`App was generated successfully`);
  return;
};
