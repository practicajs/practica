import { IncomingMessage, Server, ServerResponse } from 'node:http';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { Type } from '@sinclair/typebox';
import { FastifyBaseLogger, FastifyInstance } from 'fastify';
import { logger } from '@practica/logger';
import util from 'node:util';
import { orderSchema } from '../../domain/order-schema';
import * as newOrderUseCase from '../../domain/new-order-use-case';

export async function routes(app: FastifyWithTypeProvider) {
  app.post('/', {
    schema: {
      body: orderSchema,
      response: {
        202: {
          description:
            'Successful acceptance of logs, but not necessarily processing',
          type: 'null',
        },
        ...commonHTTPResponses,
      },
    },
    handler: async (request) => {
      logger.info(
        `Order API was called to add new Order ${util.inspect(request.body)}`
      );
      // ✅ Best Practice: Using the 3-tier architecture, routes/controller are kept thin, logic is encapsulated in a dedicated domain folder
      const addOrderResponse = await newOrderUseCase.addOrder(request.body);
      return addOrderResponse;
    },
  });

  app.get('/:id', {
    schema: {
      response: {
        200: orderSchema,
        ...commonHTTPResponses,
      },
      params: Type.Object({
        id: Type.Number(),
      }),
    },
    handler: async (request, response) => {
      // Validation runs before the handler, request.params.id must be a number
      logger.info(`Order API was called to get order by id`, {
        orderId: request.params.id,
      });
      const result = await newOrderUseCase.getOrder(request.params.id);

      if (!result) {
        response.status(404);
        return;
      }

      response.send(result);
    },
  });

  app.delete('/:id', {
    schema: {
      response: {
        204: orderSchema,
        ...commonHTTPResponses,
      },
      params: Type.Object({
        id: Type.Number(),
      }),
    },
    handler: async (request, response) => {
      logger.info(`Order API was called to delete order`, {
        orderId: request.params.id,
      });
      await newOrderUseCase.deleteOrder(request.params.id);
      response.status(204).send();
    },
  });
}

const commonHTTPResponses = {
  401: {
    description: 'Unauthorized request, please provide a valid API key',
    type: 'null',
  },
  400: {
    description: 'Bad request, please check your request body',
    type: 'null',
  },
  500: {
    description: 'Internal server error, please try again later',
    type: 'null',
  },
};

export type FastifyWithTypeProvider = FastifyInstance<
  Server<typeof IncomingMessage, typeof ServerResponse>,
  IncomingMessage,
  ServerResponse<IncomingMessage>,
  FastifyBaseLogger,
  TypeBoxTypeProvider
>;
