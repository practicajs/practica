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
exports.MessageQueueStarter = void 0;
const MessageQueueClient = require(".../../libraries/message-queue-client");
const { errorHandler, AppError } = require("../error-handling");
const OrderRepository = require("../data-access/order-repository");
// This is message queue entry point. Like API routes but for message queues.
class MessageQueueStarter {
    constructor(customMessageQueueProvider) {
        this.messageQueueClient = new MessageQueueClient(customMessageQueueProvider);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.consumeUserDeletionQueue();
        });
    }
    consumeUserDeletionQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            // This function is what handles a new message. Like API route handler, but for MQ
            const deletedOrderMessageHandler = (message) => __awaiter(this, void 0, void 0, function* () {
                // Validate to ensure it is not a poisoned message (invalid) that will loop into the queue
                const newMessageAsObject = JSON.parse(message);
                // ️️️✅ Best Practice: Validate incoming MQ messages using your validator framework (simplistic implementation below)
                if (!newMessageAsObject.id) {
                    throw new AppError("invalid-message", true);
                }
                const orderRepository = new OrderRepository();
                yield orderRepository.deleteOrder(newMessageAsObject.id);
            });
            // Let's now register to new delete messages from the queue
            yield this.messageQueueClient.consume("deleted-user", deletedOrderMessageHandler);
            return;
        });
    }
}
exports.MessageQueueStarter = MessageQueueStarter;
process.on("uncaughtException", (error) => {
    errorHandler.handleError(error);
});
process.on("unhandledRejection", (reason) => {
    errorHandler.handleError(reason);
});
