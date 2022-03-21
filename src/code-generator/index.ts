#!/usr/bin/env node

const { program } = require("commander");
const util = require("util");

import { renderWizard } from "./app-generation-wizard";
const generateService = require("./generation-logic/generate-service");

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
    .action((options) => {
      console.log(options.framework, options.db);
      console.log(program.args, program.opts());
      console.log(process.cwd());
      generateService.generateApp({
        baseFramework: "express2",
        DBType: "mongo",
        mainMicroserviceName: "microservice-1",
        emitBestPracticesHints: true,
        targetDirectory: process.cwd(),
        appName: "test-app",
      });
    });

  program.option("--framework", "Use framework");
  program.option("--db", "Use DB");

  program.parse();
}
