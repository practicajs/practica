import util from 'util';
import express from 'express';
import { logger } from '@practica/logger';
import * as newOrderUseCase from '../../domain/new-order-use-case';

export default function defineRoutes(expressApp: express.Application) {
  const router = express.Router();

  router.post('/', async (req, res, next) => {
    try {
      logger.info(
        `Order API was called to add new Order ${util.inspect(req.body)}`
      );
      // ✅ Best Practice: Using the 3-tier architecture, routes/controller are kept thin, logic is encapsulated in a dedicated domain folder
      const addOrderResponse = await newOrderUseCase.addOrder(req.body);
      return res.json(addOrderResponse);
    } catch (error) {
      next(error);
      return undefined;
    }
  });

  // get existing order by id
  router.get('/:id', async (req, res) => {
    logger.info(`Order API was called to get user by id ${req.params.id}`);
    const response = await newOrderUseCase.getOrder(req.params.id);

    if (!response) {
      res.status(404).end();
      return;
    }

    res.json(response);
  });

  // delete order by id
  router.delete('/:id', async (req, res) => {
    logger.info(`Order API was called to delete order ${req.params.id}`);
    await newOrderUseCase.deleteOrder(req.params.id);
    res.status(204).end();
  });

  expressApp.use('/order', router);
}
