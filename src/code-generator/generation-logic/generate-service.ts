import fsExtra from "fs-extra";
import path from "path";
import execa from "execa";
import { generationOptions } from "./generation-options";

// This is where the code generation logic lives. In high-level, based on the provided option, it creates
// a folder, decides which code to generate, run the code through a templating engine and emit it to the target folder
export const generateApp = async (options: generationOptions) => {
  const targetDirectory = path.join(options.targetDirectory, options.appName);
  const sourceDirectory = path.join(__dirname, "../../code-templates");
  console.log(`About to generate app`, options, targetDirectory);
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

  if (options.installDependencies) {
    // Dependencies should be installed from the app/microservice directory. All the rest is dependency of the app
    const microserviceDirectory = path.join(targetDirectory, "services", "order-service");
    await execa("npm", ["install"], { cwd: microserviceDirectory });
    // Temporarily install libraries modules, in the near future we will use a monorepo framework
    const MQLibraryDirectory = path.join(targetDirectory, "libraries", "message-queue-client");
    await execa("npm", ["install"], { cwd: MQLibraryDirectory });
  }

  console.log(`App was generated successfully`);
  return;
};
