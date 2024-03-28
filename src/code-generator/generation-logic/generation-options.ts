export type generationOptions = {
  appName: string;
  ORM: "sequelize" | "prisma";
  webFramework: "express" | "fastify";
  DBType: string;
  mainMicroserviceName: string;
  emitBestPracticesHints: boolean;
  targetDirectory: string;
  installDependencies: boolean;
  overrideIfExists: boolean;
};

export const factorDefaultOptions = (
  overrides: Partial<generationOptions>
): generationOptions => {
  const defaults = {
    appName: "default-app-name",
    webFramework: "fastify",
    DBType: "pg",
    ORM: "sequelize",
    mainMicroserviceName: "microservice-example-1",
    emitBestPracticesHints: true,
    targetDirectory: process.cwd(),
    installDependencies: false,
    overrideIfExists: true,
  };

  const result = Object.assign(defaults, overrides);

  return result;
};
