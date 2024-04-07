import fastifyPluginWrapper from 'fastify-plugin';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { randomUUID } from 'node:crypto';
import { context } from '@practica/global-context';

const REQUEST_ID_HEADER = 'x-request';
function RequestContextPlugin(fastify: FastifyInstance, _options, next) {
  fastify.addHook(
    'onRequest',
    (request: FastifyRequest, reply: FastifyReply, hookIsDone) => {
      let requestId: string | undefined;
      if (Array.isArray(request.headers[REQUEST_ID_HEADER])) {
        const [firstRequestId] = request.headers[REQUEST_ID_HEADER];
        requestId = firstRequestId;
      } else {
        requestId = request.headers[REQUEST_ID_HEADER];
      }

      if (!requestId) {
        requestId = randomUUID();
        request.headers[REQUEST_ID_HEADER] = requestId;
      }

      // // reply.header[REQUEST_ID_HEADER] = requestId;

      const currentContext = context().getStore();

      if (currentContext) {
        currentContext.requestId = requestId;
        hookIsDone();
        return;
      }

      context().run({ requestId }, hookIsDone);
    }
  );
  next();
}

export const RequestContext = fastifyPluginWrapper(RequestContextPlugin);
