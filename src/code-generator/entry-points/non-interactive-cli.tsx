const {
  factorDefaultOptions,
} = require("../generation-logic/generation-options");
const generateService = require("../generation-logic/generate-service");

export function handleNonInteractiveCommand(options: any) {
  const generationOptions = factorDefaultOptions({
    installDependencies: options.installDependencies,
    appName: options.appName,
    targetDirectory: process.cwd(),
  });
  generateService.generateApp(generationOptions);
}
