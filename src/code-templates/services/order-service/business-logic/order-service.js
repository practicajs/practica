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
exports.getUser = exports.deleteUser = exports.addOrder = void 0;
const axios = require("axios");
const OrderRepository = require("../data-access/order-repository").default;
const { AppError } = require("../../../libraries/error-handling/error-handling");
const MessageQueueClient = require("../../../libraries/message-queue-client/message-queue-client").default;
const axiosHTTPClient = axios.create();
const addOrder = function (newOrder) {
    return __awaiter(this, void 0, void 0, function* () {
        // validation
        if (!newOrder.productId) {
            throw new AppError("invalid-order", `No product-id specified`, 400);
        }
        // verify user existence by calling external Microservice
        const userWhoOrdered = yield getUserFromUsersService(newOrder.userId);
        if (!userWhoOrdered) {
            throw new AppError("user-doesnt-exist", `The user ${newOrder.userId} doesnt exist`, 404);
        }
        // save to DB (Caution: simplistic code without layers and validation)
        const DBResponse = yield new OrderRepository().addOrder(newOrder);
        // We should notify others that a new order was added - Let's put a message in a queue
        yield new MessageQueueClient().sendMessage("new-order", newOrder);
        return DBResponse;
    });
};
exports.addOrder = addOrder;
const deleteUser = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new OrderRepository().deleteOrder(userId);
    });
};
exports.deleteUser = deleteUser;
const getUser = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(OrderRepository);
        return yield new OrderRepository().getOrderById(userId);
    });
};
exports.getUser = getUser;
function getUserFromUsersService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getUserResponse = yield axiosHTTPClient.get(`http://localhost/user/${userId}`, {
                timeout: 2000,
                validateStatus: (status) => {
                    return status < 500;
                },
            });
            return getUserResponse.data;
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) === "ECONNABORTED") {
                throw new AppError("user-verification-failed", `Request to user service failed so user cant be verified`, 503);
            }
            throw error;
        }
    });
}
