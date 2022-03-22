#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startAppGenerator = void 0;
var program = require("commander").program;
var util = require("util");
var app_generation_wizard_1 = require("./app-generation-wizard");
var generateService = require("./generation-logic/generate-service");
var factorDefaultOptions = require("./generation-logic/generation-options").factorDefaultOptions;
function startAppGenerator() {
    program
        .name("Practice - Best Practices Generator")
        .description("Generate best practices for your project")
        .version("0.0.1");
    program
        .command("wizard")
        .description("Open an interactive UI for customization")
        .action(function (str, options) {
        (0, app_generation_wizard_1.renderWizard)();
    });
    program
        .command("generate")
        .description("Generates code using flags")
        .option("-f, --framework <string>", "Framework to use")
        .option("-d, --db <string>", "DB to use")
        .option("-id, --install-dependencies", "Whether to install dependencies")
        .action(function (options) {
        console.log(options.framework, options.db, options.installDependencies);
        console.log(program.args, program.opts());
        console.log(process.cwd());
        var generationOptions = factorDefaultOptions({
            installDependencies: options.installDependencies,
            targetDirectory: process.cwd(),
        });
        generateService.generateApp(generationOptions);
    });
    program.option("--framework", "Use framework");
    program.option("--db", "Use DB");
    program.parse();
}
exports.startAppGenerator = startAppGenerator;
