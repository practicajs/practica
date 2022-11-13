import { program } from "commander";
import { renderWizard } from "./interactive-cli";
import { handleNonInteractiveCommand } from "./non-interactive-cli";
import { version } from "../../../package.json";

export function startAppGenerator() {
  program
    .name("Practice - Best Practices Generator")
    .description("Generate best practices for your project")
    .version(version);

  program
    .command("interactive")
    .description("Open an interactive UI for customization")
    .action((str, options) => {
      renderWizard();
    });

  program
    .command("immediate")
    .description("Generates code using flags (a non-interactive CLI)")
    .option("-id, --install-dependencies", "Whether to install dependencies")
    .option(
      "-td, --target-directory <type>",
      "Tha path to where the app should be installed"
    )
    .option(
      "-an, --app-name <type>",
      "The name of the app which will get used for the root folder name, package.json. and others",
      "default-app-name"
    )
    .option(
      "-o, --orm <type>",
      "The Type of ORM to use, currently 'sequelize' or 'prisma'",
      "prisma"
    )
    .option(
      "-ov, --override-if-exists",
      "If set to true, the existing generated app will be overriden"
    )
    .action((options) => {
      handleNonInteractiveCommand(options);
    });

  program.parse();
}
