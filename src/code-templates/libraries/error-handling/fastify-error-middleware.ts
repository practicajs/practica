import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { covertUnknownToAppError, errorHandler } from './error-handler';

export function fastifyErrorMiddleware(
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply
) {
  // The error strategy is to assume that errors that happened during a request are not fatal (vs errors that happened during the app initialization)
  const standardAppError = covertUnknownToAppError(error);
  standardAppError.isCatastrophic = false;
  const responseToRequest = errorHandler.handleError(standardAppError);
  reply.status(responseToRequest).send({});
}
