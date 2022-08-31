import { program } from "commander";
import { renderWizard } from "./interactive-cli";
import { handleNonInteractiveCommand } from "./non-interactive-cli";

export function startAppGenerator() {
  program
    .name("Practice - Best Practices Generator")
    .description("Generate best practices for your project")
    // TODO: Take this value from package.json
    .version("0.0.1");

  program
    .command("interactive")
    .description("Open an interactive UI for customization")
    .action((str, options) => {
      renderWizard();
    });

  program
    .command("immediate")
    .description("Generates code using flags (a non-interactive CLI)")
    .option("-f, --framework <string>", "Framework to use")
    .option("-d, --db <string>", "DB to use")
    .option("-id, --install-dependencies", "Whether to install dependencies")
    .option(
      "-ov, --override-if-exists",
      "If set to true, the existing generated app will be overriden"
    )
    .action((options) => {
      handleNonInteractiveCommand(options);
    });

  program.parse();
}
