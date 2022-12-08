import { AppError } from "../error-handling";
import { factorDefaultOptions } from "../generation-logic/generation-options";
import { generateApp } from "../generation-logic/generate-service";
import { spinner, nonInteractiveCliTexts } from "./ui-elements";
export async function handleNonInteractiveCommand(options: any) {
  try {
    const generationOptions = factorDefaultOptions({
      installDependencies: options.installDependencies,
      overrideIfExists: options.overrideIfExists,
      ORM: options.orm,
      targetDirectory: options.targetDirectory || process.cwd(),
      appName: options.appName,
    });
    spinner.start(nonInteractiveCliTexts.onStart);
    await generateApp(generationOptions);
    spinner.succeed(nonInteractiveCliTexts.onSucceed);
  } catch (error: AppError | any) {
    const errorMessageToUser = error.message
      ? `${error.message}`
      : nonInteractiveCliTexts.onError.default;
    spinner.fail(errorMessageToUser);
    process.exit(1);
  }
}
