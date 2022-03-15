const express = require('express');

let connection;

const initializeWebServer = () => {
  return new Promise((resolve, reject) => {
    // A typical Express setup
    expressApp = express();
    defineRoutes(expressApp);
    connection = expressApp.listen(3000, () => {
      resolve(connection.address());
    });
  });
};

const stopWebServer = () => {
  return new Promise((resolve, reject) => {
    connection.close(() => {
      resolve();
    });
  });
};

const defineRoutes = (expressApp) => {
  const router = express.Router();

  // add new order
  router.post('/', async (req, res, next) => {
    try {
      console.log(
        `Order API was called to add new Order ${util.inspect(req.body)}`
      );
      const addOrderResponse = await orderService.addOrder(req.body);
      return res.json(addOrderResponse);
    } catch (error) {
      next(error);
    }
  });

  // get existing order by id
  router.get('/:id', async (req, res, next) => {
    console.log(`Order API was called to get user by id ${req.params.id}`);
    const response = await orderService.getUser(req.params.id);

    if (!response) {
      res.status(404).end();
      return;
    }

    res.json(response);
  });

  // delete order by id
  router.delete('/:id', async (req, res, next) => {
    console.log(`Order API was called to delete order ${req.params.id}`);
    await orderService.deleteUser(req.params.id);
    res.status(204).end();
  });

  expressApp.use('/order', router);

  expressApp.use(async (error, req, res, next) => {
    if (typeof error === 'object') {
      if (error.isTrusted === undefined || error.isTrusted === null) {
        error.isTrusted = true; //Error during a specific request is usually not catastrophic and should not lead to process exit
      }
    }
    await errorHandler.handleError(error);

    res.status(error?.status || 500).end();
  });
};

module.exports = {
  initializeWebServer,
  stopWebServer,
};
