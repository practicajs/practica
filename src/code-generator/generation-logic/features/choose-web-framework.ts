import path from "path";
import * as fsExtra from "fs-extra";
import { generationOptions } from "../generation-options";
import {
  getMicroservicePath,
  replacePhraseInAllFiles,
  replacePhraseInFile,
} from "../string-manipulation-helpers";

export async function chooseWebFramework(
  generatedAppRoot: string,
  options: generationOptions
) {
  const microservicePath = getMicroservicePath(generatedAppRoot);
  if (options.webFramework === "express") {
    await adjustTheCodeToExpressFramework(microservicePath);
  } else if (options.webFramework === "fastify") {
    await adjustTheCodeToFastifyFramework(microservicePath);
  }
}

async function adjustTheCodeToFastifyFramework(microservicePath: string) {
  const expressFolder = path.join(microservicePath, "entry-points-express");
  await fsExtra.rmdir(expressFolder, { recursive: true });
  const fastifyFolderOldName = path.join(
    microservicePath,
    "entry-points-fastify"
  );
  const packageJSONPath = path.join(microservicePath, "package.json");
  await replacePhraseInFile(
    packageJSONPath,
    '"(.*?)express(.*?)": "(.*)"(,?)\n',
    ""
  );
  const fastifyFolderNewName = path.join(microservicePath, "entry-points");
  await fsExtra.move(fastifyFolderOldName, fastifyFolderNewName, {
    overwrite: true,
  });
  await replacePhraseInAllFiles(
    microservicePath,
    "/entry-points-fastify/api/",
    "/entry-points/api/"
  );
}

async function adjustTheCodeToExpressFramework(microservicePath: string) {
  const fastifyFolder = path.join(microservicePath, "entry-points-fastify");
  await fsExtra.rmdir(fastifyFolder, { recursive: true });
  const expressFolderOldName = path.join(
    microservicePath,
    "entry-points-express"
  );
  const packageJSONPath = path.join(microservicePath, "package.json");
  await replacePhraseInFile(
    packageJSONPath,
    '"(.*?)fastify(.*?)": "(.*)"(,?)\n',
    ""
  );
  const expressFolderNewName = path.join(microservicePath, "entry-points");
  await fsExtra.rename(expressFolderOldName, expressFolderNewName);
  await replacePhraseInAllFiles(
    microservicePath,
    "/entry-points-fastify/api/",
    "/entry-points/api/"
  );
}
