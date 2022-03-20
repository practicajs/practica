"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var amqplib = require('amqplib');
var EventEmitter = require('events').EventEmitter;
var _a = require('../error-handling'), AppError = _a.AppError, errorHandler = _a.errorHandler;
var FakeMessageQueueProvider = require('./fake-message-queue-provider').FakeMessageQueueProvider;
// This is a simplistic client for a popular message queue product - RabbitMQ
// It's generic in order to be used by any service in the organization
var MessageQueueClient = /** @class */ (function (_super) {
    __extends(MessageQueueClient, _super);
    function MessageQueueClient(customMessageQueueProvider) {
        var _this = _super.call(this) || this;
        _this.isReady = false;
        // To facilitate testing, the client allows working with a fake MQ provider
        // It can get one in the constructor here or even change by environment variables
        if (customMessageQueueProvider) {
            _this.messageQueueProvider = customMessageQueueProvider;
        }
        else if (process.env.MESSAGE_QUEUE_PROVIDER === 'real') {
            _this.messageQueueProvider = amqplib;
        }
        else {
            _this.messageQueueProvider = new FakeMessageQueueProvider();
        }
        return _this;
    }
    MessageQueueClient.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connectionProperties, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        connectionProperties = {
                            protocol: 'amqp',
                            hostname: 'localhost',
                            port: 5672,
                            username: 'rabbitmq',
                            password: 'rabbitmq',
                            locale: 'en_US',
                            frameMax: 0,
                            heartbeat: 0,
                            vhost: '/',
                        };
                        _a = this;
                        return [4 /*yield*/, this.messageQueueProvider.connect(connectionProperties)];
                    case 1:
                        _a.connection = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.connection.createChannel()];
                    case 2:
                        _b.channel = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MessageQueueClient.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connection) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connection.close()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    MessageQueueClient.prototype.sendMessage = function (queueName, message) {
        return __awaiter(this, void 0, void 0, function () {
            var sendResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.channel) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.channel.assertQueue(queueName)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)))];
                    case 4:
                        sendResponse = _a.sent();
                        return [2 /*return*/, sendResponse];
                }
            });
        });
    };
    MessageQueueClient.prototype.consume = function (queueName, onMessageCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.channel) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.channel.assertQueue(queueName);
                        return [4 /*yield*/, this.channel.consume(queueName, function (theNewMessage) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    //Not awaiting because some MQ client implementation get back to fetch messages again only after handling a message
                                    onMessageCallback(theNewMessage.content.toString())
                                        .then(function () {
                                        _this.channel.ack(theNewMessage);
                                    })
                                        .catch(function (error) {
                                        _this.channel.nack(theNewMessage);
                                        error.isTrusted = true; //Since it's related to a single message, there is no reason to let the process crash
                                        errorHandler.handleError(error);
                                    });
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MessageQueueClient;
}(EventEmitter));
module.exports = MessageQueueClient;
