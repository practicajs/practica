import fastify from 'fastify';
import { Server } from 'http';
import { RequestContext } from '../request-context-plugin';

let httpServer: Server;

export const startTestServer = async (callbackOnRequest: () => void) => {
  const app = fastify({ logger: true });

  app.register(RequestContext);

  app.get('/example-route', async (req, res) => {
    callbackOnRequest();
    return res.status(200).send({ message: 'Hello, world!' });
  });
  await app.listen({ port: 3001 });
  httpServer = app.server;
};

export const stopTestServer = async () => {
  if (httpServer) {
    await httpServer.close();
  }
};
