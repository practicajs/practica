import { Server } from "http";
import * as logger from "@practica/logger";
import { AddressInfo } from "net";
import express from "express";
import bodyParser from "body-parser";
import { defineRoutes } from "./routes";
import { errorHandler } from "@practica/error-handling";
import * as configurationProvider from "@practica/configuration-provider";
import configurationSchema from "../../config";

let connection: Server;

// ️️️✅ Best Practice: API exposes a start/stop function to allow testing control WHEN this should happen
async function startWebServer(): Promise<AddressInfo> {
  // ️️️✅ Best Practice: Declare a strict configuration schema and fail fast if the configuration is invalid
  configurationProvider.initialize(configurationSchema);
  const expressApp = express();
  expressApp.use(bodyParser.json());
  defineRoutes(expressApp);
  defineErrorHandler(expressApp);
  const APIAddress = await openConnection(expressApp);
  return APIAddress;
}

async function stopWebServer() {
  return new Promise<void>((resolve, reject) => {
    connection.close(() => {
      resolve();
    });
  });
}

async function openConnection(
  expressApp: express.Application
): Promise<AddressInfo> {
  return new Promise((resolve, reject) => {
    // ️️️✅ Best Practice: Allow a dynamic port (port 0 = ephemeral) so multiple webservers can be used in multi-process testing
    const portToListenTo = configurationProvider.getValue("port");
    const webServerPort = portToListenTo || 0;
    logger.info(`About to listen to port ${webServerPort}`);
    connection = expressApp.listen(webServerPort, () => {
      errorHandler.listenToErrorEvents(connection);
      resolve(connection.address() as AddressInfo);
    });
  });
}

function defineErrorHandler(expressApp: express.Application) {
  expressApp.use(async (error, req, res, next) => {
    if (typeof error === "object") {
      if (error.isTrusted === undefined || error.isTrusted === null) {
        error.isTrusted = true; //Error during a specific request is usually not catastrophic and should not lead to process exit
      }
    }
    await errorHandler.handleError(error);

    res.status(error?.HTTPStatus || 500).end();
  });
}

export { startWebServer, stopWebServer };
