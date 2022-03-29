const { program } = require("commander");
import { renderWizard } from "./interactive-cli";
const { handleNonInteractiveCommand } = require("./non-interactive-cli");

export function startAppGenerator() {
  program
    .name("Practice - Best Practices Generator")
    .description("Generate best practices for your project")
    .version("0.0.1");

  program
    .command("interactive")
    .description("Open an interactive UI for customization")
    .action((str, options) => {
      renderWizard();
    });

  program
    .command("generate")
    .description("Generates code using flags (a non-interactive CLI)")
    .option("-f, --framework <string>", "Framework to use")
    .option("-d, --db <string>", "DB to use")
    .option("-id, --install-dependencies", "Whether to install dependencies")
    .action((options) => {
      handleNonInteractiveCommand(options);
    });

  program.option("--framework", "Use framework");
  program.option("--db", "Use DB");

  program.parse();
}
