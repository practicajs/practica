import fastify from 'fastify';
import { Server } from 'http';
import { JWTVerifier } from '../jwt-verifier-plugin';

let httpServer: Server;

export const startTestServer = async (JWTSecret: string) => {
  const app = fastify({ logger: true });

  app.register(JWTVerifier, { secret: JWTSecret });

  app.get('/', async () => ({ message: 'Hello, world!' }));
  await app.listen({ port: 3000 });
  httpServer = app.server;
};

export const stopTestServer = async () => {
  if (httpServer) {
    await httpServer.close();
  }
};
