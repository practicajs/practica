import util from "util";
import express from "express";
import * as newOrderUseCase from "../../domain/new-order-use-case";
import { errorHandler } from "@practica/error-handling";

export const defineRoutes = (expressApp: express.Application) => {
  const router = express.Router();

  router.post("/", async (req, res, next) => {
    try {
      console.log(
        `Order API was called to add new Order ${util.inspect(req.body)}`
      );
      const addOrderResponse = await newOrderUseCase.addOrder(req.body);
      return res.json(addOrderResponse);
    } catch (error) {
      next(error);
    }
  });

  // get existing order by id
  router.get("/:id", async (req, res, next) => {
    console.log(`Order API was called to get user by id ${req.params.id}`);
    const response = await newOrderUseCase.getOrder(req.params.id);

    if (!response) {
      res.status(404).end();
      return;
    }

    res.json(response);
  });

  // delete order by id
  router.delete("/:id", async (req, res, next) => {
    console.log(`Order API was called to delete order ${req.params.id}`);
    await newOrderUseCase.deleteOrder(req.params.id);
    res.status(204).end();
  });

  expressApp.use("/order", router)
};
