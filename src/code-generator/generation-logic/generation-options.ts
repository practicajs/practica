export type generationOptions = {
  appName: string;
  baseFramework: string;
  DBType: string;
  mainMicroserviceName: string;
  emitBestPracticesHints: boolean;
  targetDirectory: string;
  installDependencies: boolean;
};

export const factorDefaultOptions = (
  overrides: Partial<generationOptions>
): generationOptions => {
  const defaults: generationOptions = {
    appName: "default-app-name",
    baseFramework: "express",
    DBType: "pg",
    mainMicroserviceName: "microservice-example-1",
    emitBestPracticesHints: true,
    targetDirectory: process.cwd(),
    installDependencies: false,
  };

  const result = Object.assign(defaults, overrides);

  return result;
};
