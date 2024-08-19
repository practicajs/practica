import path from "path";
import * as fsExtra from "fs-extra";
import { generationOptions } from "../generation-options";
import {
  getLibrariesPath,
  getMicroservicePath,
  replacePhraseInAllFiles,
  replacePhraseInFile,
} from "../string-manipulation-helpers";

//TODO: since for now we support only 2 frameworks, the generation is not very clever and many tasks are duplicated
// once we need to support more -> we will make the generation more flexible
export async function chooseWebFramework(
  generatedAppRoot: string,
  options: generationOptions
) {
  const microservicePath = getMicroservicePath(generatedAppRoot);
  const librariesPath = getLibrariesPath(generatedAppRoot);
  if (options.webFramework === "express") {
    await adjustTheCodeToExpressFramework(microservicePath, librariesPath);
  } else if (options.webFramework === "fastify") {
    await adjustTheCodeToFastifyFramework(microservicePath, librariesPath);
  }
}

async function adjustTheCodeToFastifyFramework(
  microservicePath: string,
  librariesPath: string
) {
  const expressFolder = path.join(microservicePath, "entry-points-express");
  await fsExtra.rm(expressFolder, { recursive: true });
  const expressMiddlewaresFolder = path.join(
    librariesPath,
    "common-express-middlewares"
  );
  await fsExtra.rm(expressMiddlewaresFolder, { recursive: true });
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

async function adjustTheCodeToExpressFramework(
  microservicePath: string,
  librariesPath: string
) {
  const fastifyFolder = path.join(microservicePath, "entry-points-fastify");
  await fsExtra.rm(fastifyFolder, { recursive: true });
  const fastifyMiddlewaresFolder = path.join(
    librariesPath,
    "common-fastify-plugins"
  );
  await fsExtra.rm(fastifyMiddlewaresFolder, { recursive: true });
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
  await fsExtra.move(expressFolderOldName, expressFolderNewName, {
    overwrite: true,
  });
  await replacePhraseInAllFiles(
    microservicePath,
    "/entry-points-fastify/api/",
    "/entry-points/api/"
  );
}
