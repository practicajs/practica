import { AppError } from "../error-handling";
import { factorDefaultOptions } from "../generation-logic/generation-options";
import { generateApp } from "../generation-logic/generate-service";

export async function handleNonInteractiveCommand(options: any) {
  try {
    const generationOptions = factorDefaultOptions({
      installDependencies: options.installDependencies,
      overrideIfExists: options.overrideIfExists,
      targetDirectory: options.targetDirectory || process.cwd(),
      appName: options.appName,
    });
    await generateApp(generationOptions);
    process.stdout.write(`
    💚 You just treated yourself to an unmatched application starter
    📝 Open with your code editor and start coding/learning
    📗 Deepen your understanding by reading our article 'Coding with Practica': https://practica.dev/the-basics/coding-with-practica
    `);
  } catch (error: AppError | any) {
    const errorMessageToUser = error.message
      ? `❣️ ${error.message}`
      : `❣️ Embarrassingly our code generator failed. Yeah, almost 100% test coverage did not help here. Could you be nice to us and open an issue?`;
    console.error(errorMessageToUser);
    process.exit(1);
  }
}
