import util from 'util';
import express from 'express';
import { logger } from '@practica/logger';
import * as newOrderUseCase from '../../domain/new-order-use-case';
import { wrapHandler } from '@practica/middlewares';

export default function defineRoutes(expressApp: express.Application) {
  const router = express.Router();

  router.post('/', wrapHandler(async (req, res, next) => {
    logger.info(
      `Order API was called to add new Order ${util.inspect(req.body)}`
    );
    // ✅ Best Practice: Using the 3-tier architecture, routes/controller are kept thin, logic is encapsulated in a dedicated domain folder
    const addOrderResponse = await newOrderUseCase.addOrder(req.body);
    res.json(addOrderResponse);
  }));

  // get existing order by id
  router.get('/:id', wrapHandler(async (req, res, next) => {
    logger.info(`Order API was called to get user by id ${req.params.id}`);
    const response = await newOrderUseCase.getOrder(
      parseInt(req.params.id, 10)
    );

    if (!response) {
      res.status(404).end();
      return;
    }

    res.json(response);
  }));

  // delete order by id
  router.delete('/:id', wrapHandler(async (req, res) => {
    logger.info(`Order API was called to delete order ${req.params.id}`);
    await newOrderUseCase.deleteOrder(parseInt(req.params.id, 10));
    res.status(204).end();
  }));

  expressApp.use('/order', router);
}
