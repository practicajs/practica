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
var express = require('express');
var connection;
var initializeWebServer = function () {
    return new Promise(function (resolve, reject) {
        // A typical Express setup
        expressApp = express();
        defineRoutes(expressApp);
        connection = expressApp.listen(3000, function () {
            resolve(connection.address());
        });
    });
};
var stopWebServer = function () {
    return new Promise(function (resolve, reject) {
        connection.close(function () {
            resolve();
        });
    });
};
var defineRoutes = function (expressApp) {
    var router = express.Router();
    // add new order
    router.post('/', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var addOrderResponse, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log("Order API was called to add new Order ".concat(util.inspect(req.body)));
                    return [4 /*yield*/, orderService.addOrder(req.body)];
                case 1:
                    addOrderResponse = _a.sent();
                    return [2 /*return*/, res.json(addOrderResponse)];
                case 2:
                    error_1 = _a.sent();
                    next(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // get existing order by id
    router.get('/:id', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Order API was called to get user by id ".concat(req.params.id));
                    return [4 /*yield*/, orderService.getUser(req.params.id)];
                case 1:
                    response = _a.sent();
                    if (!response) {
                        res.status(404).end();
                        return [2 /*return*/];
                    }
                    res.json(response);
                    return [2 /*return*/];
            }
        });
    }); });
    // delete order by id
    router.delete('/:id', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Order API was called to delete order ".concat(req.params.id));
                    return [4 /*yield*/, orderService.deleteUser(req.params.id)];
                case 1:
                    _a.sent();
                    res.status(204).end();
                    return [2 /*return*/];
            }
        });
    }); });
    expressApp.use('/order', router);
    expressApp.use(function (error, req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof error === 'object') {
                        if (error.isTrusted === undefined || error.isTrusted === null) {
                            error.isTrusted = true; //Error during a specific request is usually not catastrophic and should not lead to process exit
                        }
                    }
                    return [4 /*yield*/, errorHandler.handleError(error)];
                case 1:
                    _a.sent();
                    res.status((error === null || error === void 0 ? void 0 : error.status) || 500).end();
                    return [2 /*return*/];
            }
        });
    }); });
};
module.exports = {
    initializeWebServer: initializeWebServer,
    stopWebServer: stopWebServer,
};
