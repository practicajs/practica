import * as configurationProvider from '@practica/configuration-provider';
import cors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import Fastify, { FastifyInstance } from 'fastify';
import { Server } from 'http';
import { OpenAPIOptions, OpenAPIUIOptions } from './open-api-options';
import configurationSchema from '../../config';
import { routes } from './fastify-routes';

let httpServer: Server;

// ️️️✅ Best Practice: API exposes a start/stop function to allow testing control WHEN this should happen
export async function startWebServer() {
  configurationProvider.initializeAndValidate(configurationSchema);
  // logger.info(`Starting the web server now`);
  const app = Fastify({
    logger: true,
  }).withTypeProvider<TypeBoxTypeProvider>();

  await generateOpenAPI(app);
  registerCommonPlugins(app);
  registerAllRoutes(app);
  await listenToRequests(app);
  httpServer = app.server;
  return app.server.address();
}

export async function stopWebServer() {
  //  logger.info(`Stopping the web server now`);
  if (httpServer) {
    await httpServer.close();
  }
}

async function generateOpenAPI(app: FastifyInstance) {
  app.register(fastifySwagger, OpenAPIOptions);
  app.register(fastifySwaggerUi, OpenAPIUIOptions);
}

async function registerAllRoutes(app: FastifyInstance) {
  app.register(routes, { prefix: 'api/v1' });
}

async function listenToRequests(app: FastifyInstance): Promise<void> {
  return new Promise((resolve, reject) => {
    const portToListenTo = configurationProvider.getValue('port');
    const webServerPort = portToListenTo
      ? parseInt(portToListenTo, 10)
      : undefined;
    app.listen({ host: '0.0.0.0', port: webServerPort }, (err) => {
      if (err) {
        // logger.error(err.toString());
        reject(err);
        // eslint-disable-next-line
        process.exit(1);
      }
      resolve();
    });
  });
}

async function registerCommonPlugins(app: FastifyInstance) {
  app.register(cors, {
    origin: '*',
    methods: ['POST'],
  });
}
