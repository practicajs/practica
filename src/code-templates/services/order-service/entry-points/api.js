"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopWebServer = exports.initializeWebServer = void 0;
const express = require("express");
const util = require("util");
const bodyParser = require("body-parser");
const errorHandler = require("../../../libraries/error-handling/error-handling").errorHandler;
const orderService = require("../business-logic/order-service");
let connection, expressApp;
const initializeWebServer = () => {
    return new Promise((resolve, reject) => {
        // A typical Express setup
        expressApp = express();
        expressApp.use(bodyParser.urlencoded({
            extended: true,
        }));
        expressApp.use(bodyParser.json());
        defineRoutes(expressApp);
        const webServerPort = process.env.PORT ? process.env.PORT : 0;
        connection = expressApp.listen(webServerPort, (error) => {
            resolve(connection.address());
        });
    });
};
exports.initializeWebServer = initializeWebServer;
const stopWebServer = () => {
    return new Promise((resolve, reject) => {
        connection.close(() => {
            resolve();
        });
    });
};
exports.stopWebServer = stopWebServer;
const defineRoutes = (expressApp) => {
    const router = express.Router();
    // add new order
    router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(`Order API was called to add new Order ${util.inspect(req.body)}`);
            const addOrderResponse = yield orderService.addOrder(req.body);
            return res.json(addOrderResponse);
        }
        catch (error) {
            next(error);
        }
    }));
    // get existing order by id
    router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Order API was called to get user by id ${req.params.id}`);
        const response = yield orderService.getUser(req.params.id);
        if (!response) {
            res.status(404).end();
            return;
        }
        res.json(response);
    }));
    // delete order by id
    router.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Order API was called to delete order ${req.params.id}`);
        yield orderService.deleteUser(req.params.id);
        res.status(204).end();
    }));
    expressApp.use("/order", router);
    expressApp.use((error, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (typeof error === "object") {
            if (error.isTrusted === undefined || error.isTrusted === null) {
                error.isTrusted = true; //Error during a specific request is usually not catastrophic and should not lead to process exit
            }
        }
        yield errorHandler.handleError(error);
        res.status((error === null || error === void 0 ? void 0 : error.HTTPStatus) || 500).end();
    }));
};
process.on("uncaughtException", (error) => {
    errorHandler.handleError(error);
});
process.on("unhandledRejection", (reason) => {
    errorHandler.handleError(reason);
});
