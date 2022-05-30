import { Server } from "http";
import * as logger from "@practica/logger";
import { AddressInfo } from "net";
import express from "express";
import bodyParser from "body-parser";
import { configurationProvider } from "@practica/configuration-provider";
import { defineRoutes } from "./routes";
import { errorHandler } from "@practica/error-handling";

let connection: Server;

// ️️️✅ Best Practice: API exposes a start/stop function to allow testing control WHEN this should happen
const startWebServer = () => {
  return new Promise<AddressInfo>((resolve, reject) => {
    const expressApp = express();
    expressApp.use(bodyParser.json());
    defineRoutes(expressApp);
    const portToListenTo = configurationProvider.get("port");
    // ️️️✅ Best Practice: Allow a dynamic port (port 0 = ephemeral) so multiple webservers can be used in multi-process testing
    const webServerPort = portToListenTo || 0;
    logger.info(`About to listen to port ${webServerPort}`);
    connection = expressApp.listen(webServerPort, () => {
      resolve(connection.address() as AddressInfo);
    });
  });
};

const stopWebServer = () => {
  return new Promise<void>((resolve, reject) => {
    connection.close(() => {
      resolve();
    });
  });
};

process.on("uncaughtException", (error) => {
  errorHandler.handleError(error);
});

process.on("unhandledRejection", (reason) => {
  errorHandler.handleError(reason);
});
export { startWebServer, stopWebServer };
