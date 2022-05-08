import fsExtra from "fs-extra";
import path from "path";
import execa from "execa";
import * as fsWalk from '@nodelib/fs.walk';
import { generationOptions } from "./generation-options";
import Handlebars from 'handlebars';
import shouldIgnoreFile from './filters';

// This is where the code generation logic lives. In high-level, based on the provided option, it creates
// a folder, decides which code to generate, run the code through a templating engine and emit it to the target folder
export const generateApp = async (options: generationOptions) => {
  const targetDirectory = path.join(options.targetDirectory, options.appName);
  const sourceDirectory = path.join(__dirname, "../../code-templates");

  console.log(`About to generate app`, options, targetDirectory);
  if (await fsExtra.pathExists(targetDirectory)) {
    await fsExtra.rm(targetDirectory, { recursive: true }); //TODO: Revisit this default and consider
  }
  await fsExtra.mkdir(targetDirectory);

  await fsWalk.walk(sourceDirectory, async (error, entries) => {
    await Promise.all(entries.map(async (entry) => {
      if (shouldIgnoreFile(entry.path)) {
        return;
      }

      const pathRelativeToRoot = path.relative(sourceDirectory, entry.path);
      let targetPath = path.join(targetDirectory, pathRelativeToRoot);

      if (entry.dirent.isDirectory()) {
        await fsExtra.mkdir(targetPath);
      } else {
        const content = await fsExtra.readFile(entry.path, 'utf8');
        const template = Handlebars.compile(content);
        const targetConent = template(options);
        await fsExtra.writeFile(targetPath, targetConent);
      }
    }));
  });

  if (options.installDependencies) {
    await execa("npm", ["install"], {
      cwd: targetDirectory,
    });

    await execa("npm", ["run", "lerna", "--", "bootstrap"], {
      cwd: targetDirectory,
    });
  }

  console.log(`App was generated successfully`);
  return;
};
