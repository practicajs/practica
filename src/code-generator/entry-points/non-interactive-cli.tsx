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
    const errorMessageToUser = error.message
      ? `❣️ ${error.message}`
      : `❣️ Embarrassingly our code generator failed. Yeah, almost 100% test coverage did not help here. Could you be nice to us and open an issue?`;
    console.error(errorMessageToUser);
    process.exit(1);
  }
}
