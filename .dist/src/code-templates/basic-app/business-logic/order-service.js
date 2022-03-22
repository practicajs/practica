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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.deleteUser = exports.addOrder = void 0;
var axios = require("axios");
var OrderRepository = require("../data-access/order-repository").default;
console.log(typeof OrderRepository);
var AppError = require("../error-handling").AppError;
var MessageQueueClient = require("../libraries/message-queue-client").default;
var axiosHTTPClient = axios.create();
var addOrder = function (newOrder) {
    return __awaiter(this, void 0, void 0, function () {
        var userWhoOrdered, DBResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // validation
                    if (!newOrder.productId) {
                        throw new AppError("invalid-order", "No product-id specified", 400);
                    }
                    return [4 /*yield*/, getUserFromUsersService(newOrder.userId)];
                case 1:
                    userWhoOrdered = _a.sent();
                    if (!userWhoOrdered) {
                        throw new AppError("user-doesnt-exist", "The user ".concat(newOrder.userId, " doesnt exist"), 404);
                    }
                    return [4 /*yield*/, new OrderRepository().addOrder(newOrder)];
                case 2:
                    DBResponse = _a.sent();
                    // We should notify others that a new order was added - Let's put a message in a queue
                    return [4 /*yield*/, new MessageQueueClient().sendMessage("new-order", newOrder)];
                case 3:
                    // We should notify others that a new order was added - Let's put a message in a queue
                    _a.sent();
                    return [2 /*return*/, DBResponse];
            }
        });
    });
};
exports.addOrder = addOrder;
var deleteUser = function (userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new OrderRepository().deleteOrder(userId)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
exports.deleteUser = deleteUser;
var getUser = function (userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(OrderRepository);
                    return [4 /*yield*/, new OrderRepository().getOrderById(userId)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
exports.getUser = getUser;
function getUserFromUsersService(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var getUserResponse, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axiosHTTPClient.get("http://localhost/user/".concat(userId), {
                            timeout: 2000,
                            validateStatus: function (status) {
                                return status < 500;
                            },
                        })];
                case 1:
                    getUserResponse = _a.sent();
                    return [2 /*return*/, getUserResponse.data];
                case 2:
                    error_1 = _a.sent();
                    if ((error_1 === null || error_1 === void 0 ? void 0 : error_1.code) === "ECONNABORTED") {
                        throw new AppError("user-verification-failed", "Request to user service failed so user cant be verified", 503);
                    }
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
