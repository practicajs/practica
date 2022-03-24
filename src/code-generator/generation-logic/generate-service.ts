import fsExtra from "fs-extra";
import path from "path";
import execa from "execa";
import { generationOptions } from "./generation-options";

export const generateApp = async (options: generationOptions) => {
  const targetDirectory = path.join(options.targetDirectory, options.appName);
  const sourceDirectory = path.join(__dirname, "../../code-templates");
  console.log(`About to generate app`, options, targetDirectory);
  console.time("copy");
  await fsExtra.mkdir(targetDirectory);
  await fsExtra.copy(sourceDirectory, targetDirectory, {
    // We don't want to copy the node_modules folder since it's slow and error-prone
    filter: (copyFromPath, copyToPath) => {
      if (path.basename(copyFromPath) === "node_modules") {
        return false;
      } else {
        return true;
      }
    },
  });
  console.timeEnd("copy");

  if (options.installDependencies) {
    console.time("install-dependencies");
    const microserviceDirectory = path.join(targetDirectory, "services", "order-service");
    await execa("npm", ["install"], { cwd: microserviceDirectory });
    // Temporarily install libraries modules, in the near future we will use a monorepo framework
    const MQLibraryDirectory = path.join(targetDirectory, "libraries", "message-queue-client");
    await execa("npm", ["install"], { cwd: MQLibraryDirectory });
    console.timeEnd("install-dependencies");
  }

  console.log(`App was generated successfully`);
  return;
};
