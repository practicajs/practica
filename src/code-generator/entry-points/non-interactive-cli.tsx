import { AppError } from "../error-handling";
const {
  factorDefaultOptions,
} = require("../generation-logic/generation-options");
const generateService = require("../generation-logic/generate-service");

export async function handleNonInteractiveCommand(options: any) {
  try {
    const generationOptions = factorDefaultOptions({
      installDependencies: options.installDependencies,
      overrideIfExists: options.overrideIfExists,
      targetDirectory: process.cwd(),
    });
    await generateService.generateApp(generationOptions);
  } catch (error: AppError | any) {
    console.error(`❣️ ${error.message}`);
    process.exit(1);
  }
}
