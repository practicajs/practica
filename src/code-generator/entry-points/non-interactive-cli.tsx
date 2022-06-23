import { AppError } from "../error-handling";
import { factorDefaultOptions } from "../generation-logic/generation-options";
import { generateApp } from "../generation-logic/generate-service";

export async function handleNonInteractiveCommand(options: any) {
  try {
    const generationOptions = factorDefaultOptions({
      installDependencies: options.installDependencies,
      overrideIfExists: options.overrideIfExists,
      targetDirectory: process.cwd(),
    });
    await generateApp(generationOptions);
  } catch (error: AppError | any) {
    const errorMessageToUser = error.message
      ? `❣️ ${error.message}`
      : `❣️ Embarrassingly our code generator failed. Yeah, almost 100% test coverage did not help here. Could you be nice to us and open an issue?`;
    console.error(errorMessageToUser);
    process.exit(1);
  }
}
