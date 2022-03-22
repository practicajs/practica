#!/usr/bin/env node
const { program } = require("commander");
const util = require("util");

import { renderWizard } from "./app-generation-wizard";
const generateService = require("./generation-logic/generate-service");
const { factorDefaultOptions } = require("./generation-logic/generation-options");

export function startAppGenerator() {
  program
    .name("Practice - Best Practices Generator")
    .description("Generate best practices for your project")
    .version("0.0.1");

  program
    .command("wizard")
    .description("Open an interactive UI for customization")
    .action((str, options) => {
      renderWizard();
    });

  program
    .command("generate")
    .description("Generates code using flags")
    .option("-f, --framework <string>", "Framework to use")
    .option("-d, --db <string>", "DB to use")
    .option("-id, --install-dependencies", "Whether to install dependencies")
    .action((options) => {
      console.log(options.framework, options.db, options.installDependencies);
      console.log(program.args, program.opts());
      console.log(process.cwd());
      const generationOptions = factorDefaultOptions({
        installDependencies: options.installDependencies,
        targetDirectory: process.cwd(),
      });
      generateService.generateApp(generationOptions);
    });

  program.option("--framework", "Use framework");
  program.option("--db", "Use DB");

  program.parse();
}
