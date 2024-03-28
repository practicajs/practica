import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { errorHandler } from './error-handler';

export function fastifyErrorMiddleware(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  const responseToRequest = errorHandler.handleError(error);

  reply.status(responseToRequest).send();
}
