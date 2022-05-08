import {
  factorDefaultOptions,
} from "../generation-logic/generation-options";
import { generateApp } from "../generation-logic/generate-service";

export function handleNonInteractiveCommand(options: any) {
  const generationOptions = factorDefaultOptions({
    installDependencies: options.installDependencies,
    targetDirectory: process.cwd(),
  });
  generateApp(generationOptions); //TODO: Make this async, show progress bar and nice message in the end
}
