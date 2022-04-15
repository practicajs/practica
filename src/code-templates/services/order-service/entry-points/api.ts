const express = require("express");
const util = require("util");
const bodyParser = require("body-parser");
import { configurationProvider } from "configuration-provider";
import orderController from "./controllers/order-controller";
const errorHandler =
  require("../../../libraries/error-handling/error-handling").errorHandler;

let connection, expressApp;

const initializeWebServer = () => {
  return new Promise<string>((resolve, reject) => {
    // A typical Express setup
    expressApp = express();
    expressApp.use(bodyParser.json());
    defineRoutes(expressApp);
    const portToListenTo = configurationProvider.get("port");
    const webServerPort = portToListenTo || 0;
    console.log(`About to listen to port ${webServerPort}`);
    connection = expressApp.listen(webServerPort, (error) => {
      resolve(connection.address());
    });
  });
};

const stopWebServer = () => {
  return new Promise<void>((resolve, reject) => {
    connection.close(() => {
      resolve();
    });
  });
};

const defineRoutes = (expressApp) => {
  const router = express.Router();

  // add new order
  router.post("/", async (req, res, next) => {
    try {
      console.log(
        `Order API was called to add new Order ${util.inspect(req.body)}`
      );
      const addOrderResponse = await new orderController().addOrder(req.body);
      return res.json(addOrderResponse);
    } catch (error) {
      next(error);
    }
  });

  // get existing order by id
  router.get("/:id", async (req, res, next) => {
    console.log(`Order API was called to get user by id ${req.params.id}`);
    const response = await new orderController().getOrder(req.params.id);

    if (!response) {
      res.status(404).end();
      return;
    }

    res.json(response);
  });

  // delete order by id
  router.delete("/:id", async (req, res, next) => {
    console.log(`Order API was called to delete order ${req.params.id}`);
    await new orderController().deleteOrder(req.params.id);
    res.status(204).end();
  });

  expressApp.use("/order", router);

  expressApp.use(async (error, req, res, next) => {
    if (typeof error === "object") {
      if (error.isTrusted === undefined || error.isTrusted === null) {
        error.isTrusted = true; //Error during a specific request is usually not catastrophic and should not lead to process exit
      }
    }
    await errorHandler.handleError(error);

    res.status(error?.HTTPStatus || 500).end();
  });
};

process.on("uncaughtException", (error) => {
  errorHandler.handleError(error);
});

process.on("unhandledRejection", (reason) => {
  errorHandler.handleError(reason);
});

export { initializeWebServer, stopWebServer };
