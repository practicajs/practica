import { Server } from 'http';
import { logger } from '@practica/logger';
import { AddressInfo } from 'net';
import express from 'express';
import { errorHandler } from '@practica/error-handling';
import * as configurationProvider from '@practica/configuration-provider';
import { jwtVerifierMiddleware } from '@practica/jwt-token-verifier';
import configurationSchema from '../../config';
import defineRoutes from './routes';

let connection: Server;

// ️️️✅ Best Practice: API exposes a start/stop function to allow testing control WHEN this should happen
async function startWebServer(): Promise<AddressInfo> {
  // ️️️✅ Best Practice: Declare a strict configuration schema and fail fast if the configuration is invalid
  configurationProvider.initialize(configurationSchema);
  logger.configureLogger(
    // eslint-disable-next-line
    // @ts-ignore TODO: fix this
    { prettyPrint: configurationProvider.getValue('logger.prettyPrint') },
    true
  );
  const expressApp = express();
  expressApp.use(express.urlencoded({ extended: true }));
  expressApp.use(express.json());
  expressApp.use(
    jwtVerifierMiddleware({
      secret: configurationProvider.getValue('jwtTokenSecret'),
    })
  );
  defineRoutes(expressApp);
  handleRouteErrors(expressApp);
  const APIAddress = await openConnection(expressApp);
  return APIAddress;
}

async function stopWebServer() {
  return new Promise<void>((resolve) => {
    if (connection !== undefined) {
      connection.close(() => {
        resolve();
      });
    }
  });
}

async function openConnection(
  expressApp: express.Application
): Promise<AddressInfo> {
  return new Promise((resolve) => {
    // ️️️✅ Best Practice: Allow a dynamic port (port 0 = ephemeral) so multiple webservers can be used in multi-process testing
    const portToListenTo = configurationProvider.getValue('port');
    const webServerPort = portToListenTo || 0;
    logger.info(`Server is about to listen to port ${webServerPort}`);
    connection = expressApp.listen(webServerPort, () => {
      errorHandler.listenToErrorEvents(connection);
      resolve(connection.address() as AddressInfo);
    });
  });
}

function handleRouteErrors(expressApp: express.Application) {
  expressApp.use(
    async (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      error: any,
      req: express.Request,
      res: express.Response,
      // Express requires next function in default error handlers
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      next: express.NextFunction
    ) => {
      if (error && typeof error === 'object') {
        if (error.isTrusted === undefined || error.isTrusted === null) {
          error.isTrusted = true; // Error during a specific request is usually not fatal and should not lead to process exit
        }
      }
      // ✅ Best Practice: Pass all error to a centralized error handler so they get treated equally
      errorHandler.handleError(error);

      res.status(error?.HTTPStatus || 500).end();
    }
  );
}

export { startWebServer, stopWebServer };
