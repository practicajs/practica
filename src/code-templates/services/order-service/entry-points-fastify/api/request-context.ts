import { fastifyRequestContext } from '@fastify/request-context';
import { FastifyInstance } from 'fastify';
import { randomUUID } from 'node:crypto';

export async function requestContextPlugin(app: FastifyInstance) {
  app.register(fastifyRequestContext, {
    defaultStoreValues: { requestId: '' },
  });
  app.addHook('preValidation', async () => {
    app.requestContext.set('requestId', randomUUID());
  });
}

declare module '@fastify/request-context' {
  interface RequestContextData {
    requestId: string;
  }
}
