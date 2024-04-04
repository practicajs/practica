import * as configurationProvider from '@practica/configuration-provider';
import cors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import Fastify, { FastifyInstance } from 'fastify';
import { Server } from 'http';
import { AddressInfo } from 'net';
import { fastifyErrorMiddleware } from '@practica/error-handling';
import { JWTVerifier, RequestContext } from '@practica/common-fastify-plugins';
import { logger } from '@practica/logger';
import { OpenAPIOptions, OpenAPIUIOptions } from './open-api-options';
import configurationSchema from '../../config';
import { routes } from './routes';
import { requestContextPlugin } from './request-context';

let httpServer: Server | undefined;

// ️️️✅ Best Practice: API exposes a start/stop function to allow testing control WHEN this should happen
export async function startWebServer(): Promise<AddressInfo> {
  logger.info(`Starting the web server now`);
  configurationProvider.initializeAndValidate(configurationSchema);
  const app = Fastify({
    logger: true,
  });

  app.setErrorHandler(fastifyErrorMiddleware);
  await generateOpenAPI(app);
  registerCommonPlugins(app);
  registerAllRoutes(app);
  const connectionAddress = await listenToRequests(app);
  httpServer = app.server;
  return connectionAddress;
}

export async function stopWebServer() {
  if (httpServer) {
    await httpServer.close();
    httpServer = undefined;
  }
}

async function generateOpenAPI(app: FastifyInstance) {
  app.register(fastifySwagger, OpenAPIOptions);
  app.register(fastifySwaggerUi, OpenAPIUIOptions);
}

async function registerAllRoutes(app: FastifyInstance) {
  app.register(routes, { prefix: '/order' });
}

async function listenToRequests(app: FastifyInstance): Promise<AddressInfo> {
  return new Promise((resolve, reject) => {
    const portToListenTo = configurationProvider.getValue('port');
    const webServerPort = portToListenTo
      ? parseInt(portToListenTo, 10)
      : undefined;
    app.listen({ host: '0.0.0.0', port: webServerPort }, (err) => {
      if (err) {
        reject(err);
        // eslint-disable-next-line
        process.exit(1);
      }
      resolve(app.server.address() as AddressInfo);
    });
  });
}

async function registerCommonPlugins(app: FastifyInstance) {
  app.register(RequestContext);
  app.register(JWTVerifier, {
    secret: configurationProvider.getValue('jwtTokenSecret'),
  });
  app.register(requestContextPlugin);
  app.register(cors, {
    origin: '*',
    methods: ['POST'],
  });
}
