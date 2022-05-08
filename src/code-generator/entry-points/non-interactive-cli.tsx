const {
  factorDefaultOptions,
} = require("../generation-logic/generation-options");
const generateService = require("../generation-logic/generate-service");

export function handleNonInteractiveCommand(options: any) {
  const generationOptions = factorDefaultOptions({
    installDependencies: options.installDependencies,
    targetDirectory: process.cwd(),
    emitBestPracticesHints: options.emitBestPracticesHints,
  });
  generateService.generateApp(generationOptions); //TODO: Make this async, show progress bar and nice message in the end
}
