import { AppError } from "../error-handling";
import { factorDefaultOptions } from "../generation-logic/generation-options";
import { generateApp } from "../generation-logic/generate-service";
import { spinner, cliTexts } from "../utils";

export async function handleNonInteractiveCommand(options: any) {
  try {
    const generationOptions = factorDefaultOptions({
      installDependencies: options.installDependencies,
      overrideIfExists: options.overrideIfExists,
      targetDirectory: options.targetDirectory || process.cwd(),
      appName: options.appName,
    });
    spinner.start(cliTexts.nonInteractiveCli.onStart);
    await generateApp(generationOptions);
    spinner.succeed(cliTexts.nonInteractiveCli.onSucceed);
  } catch (error: AppError | any) {
    const errorMessageToUser = error.message
      ? `${error.message}`
      : cliTexts.nonInteractiveCli.onError.default;
    spinner.fail(errorMessageToUser);
    process.exit(1);
  }
}
