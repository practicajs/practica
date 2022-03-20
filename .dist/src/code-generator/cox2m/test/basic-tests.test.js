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
var axios = require('axios');
var sinon = require('sinon');
var nock = require('nock');
var _a = require('../entry-points/api'), initializeWebServer = _a.initializeWebServer, stopWebServer = _a.stopWebServer;
var OrderRepository = require('../data-access/order-repository');
// Configuring file-level HTTP client with base URL will allow
// all the tests to approach with a shortened syntax
var axiosAPIClient;
beforeAll(function (done) { return __awaiter(void 0, void 0, void 0, function () {
    var apiConnection, axiosConfig;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, initializeWebServer()];
            case 1:
                apiConnection = _a.sent();
                axiosConfig = {
                    baseURL: "http://127.0.0.1:".concat(apiConnection.port),
                    validateStatus: function () { return true; }, //Don't throw HTTP exceptions. Delegate to the tests to decide which error is acceptable
                };
                axiosAPIClient = axios.create(axiosConfig);
                // ️️️✅ Best Practice: Ensure that this component is isolated by preventing unknown calls
                nock.disableNetConnect();
                nock.enableNetConnect('127.0.0.1');
                done();
                return [2 /*return*/];
        }
    });
}); });
beforeEach(function () {
    nock('http://localhost/user/').get("/1").reply(200, {
        id: 1,
        name: 'John',
    });
});
afterEach(function () {
    nock.cleanAll();
    sinon.restore();
});
afterAll(function (done) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // ️️️✅ Best Practice: Clean-up resources after each run
            return [4 /*yield*/, stopWebServer()];
            case 1:
                // ️️️✅ Best Practice: Clean-up resources after each run
                _a.sent();
                nock.enableNetConnect();
                done();
                return [2 /*return*/];
        }
    });
}); });
// ️️️✅ Best Practice: Structure tests
describe('/api', function () {
    describe('GET /order', function () {
        test('When asked for an existing order, Then should retrieve it and receive 200 response', function () { return __awaiter(void 0, void 0, void 0, function () {
            var orderToAdd, addedOrderId, getResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderToAdd = {
                            userId: 1,
                            productId: 2,
                            mode: 'approved',
                        };
                        return [4 /*yield*/, axiosAPIClient.post("/order", orderToAdd)];
                    case 1:
                        addedOrderId = (_a.sent()).data.id;
                        return [4 /*yield*/, axiosAPIClient.get("/order/".concat(addedOrderId))];
                    case 2:
                        getResponse = _a.sent();
                        //Assert
                        expect(getResponse).toMatchObject({
                            status: 200,
                            data: {
                                userId: 1,
                                productId: 2,
                                mode: 'approved',
                            },
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        test('When asked for an non-existing order, Then should receive 404 response', function () { return __awaiter(void 0, void 0, void 0, function () {
            var nonExistingOrderId, getResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nonExistingOrderId = -1;
                        return [4 /*yield*/, axiosAPIClient.get("/order/".concat(nonExistingOrderId))];
                    case 1:
                        getResponse = _a.sent();
                        //Assert
                        expect(getResponse.status).toBe(404);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('POST /orders', function () {
        // ️️️✅ Best Practice: Check the response
        test('When adding a new valid order, Then should get back approval with 200 response', function () { return __awaiter(void 0, void 0, void 0, function () {
            var orderToAdd, receivedAPIResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderToAdd = {
                            userId: 1,
                            productId: 2,
                            mode: 'approved',
                        };
                        return [4 /*yield*/, axiosAPIClient.post('/order', orderToAdd)];
                    case 1:
                        receivedAPIResponse = _a.sent();
                        //Assert
                        expect(receivedAPIResponse).toMatchObject({
                            status: 200,
                            data: {
                                id: expect.any(Number),
                                mode: 'approved',
                            },
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        // ️️️✅ Best Practice: Check the new state
        // In a real-world project, this test can be combined with the previous test
        test('When adding a new valid order, Then should be able to retrieve it', function () { return __awaiter(void 0, void 0, void 0, function () {
            var orderToAdd, addedOrderId, _a, data, status;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        orderToAdd = {
                            userId: 1,
                            productId: 2,
                            mode: 'approved',
                        };
                        return [4 /*yield*/, axiosAPIClient.post('/order', orderToAdd)];
                    case 1:
                        addedOrderId = (_b.sent()).data.id;
                        return [4 /*yield*/, axiosAPIClient.get("/order/".concat(addedOrderId))];
                    case 2:
                        _a = _b.sent(), data = _a.data, status = _a.status;
                        expect({
                            data: data,
                            status: status,
                        }).toMatchObject({
                            status: 200,
                            data: {
                                id: addedOrderId,
                                userId: 1,
                                productId: 2,
                            },
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        // ️️️✅ Best Practice: Check external calls
        test('When adding a new valid order, Then an email should be send to admin', function () { return __awaiter(void 0, void 0, void 0, function () {
            var emailPayload, orderToAdd;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //Arrange
                        process.env.SEND_MAILS = 'true';
                        nock('http://mailer.com')
                            .post('/send', function (payload) { return ((emailPayload = payload), true); })
                            .reply(202);
                        orderToAdd = {
                            userId: 1,
                            productId: 2,
                            mode: 'approved',
                        };
                        //Act
                        return [4 /*yield*/, axiosAPIClient.post('/order', orderToAdd)];
                    case 1:
                        //Act
                        _a.sent();
                        //Assert
                        // ️️️✅ Best Practice: Assert that the app called the mailer service appropriately
                        expect(emailPayload).toMatchObject({
                            subject: expect.any(String),
                            body: expect.any(String),
                            recipientAddress: expect.stringMatching(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        // ️️️✅ Best Practice: Check invalid input
        test('When adding an order without specifying product, stop and return 400', function () { return __awaiter(void 0, void 0, void 0, function () {
            var orderToAdd, orderAddResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderToAdd = {
                            userId: 1,
                            mode: 'draft',
                        };
                        return [4 /*yield*/, axiosAPIClient.post('/order', orderToAdd)];
                    case 1:
                        orderAddResult = _a.sent();
                        //Assert
                        expect(orderAddResult.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        // ️️️✅ Best Practice: Check error handling
        test.todo('When a new order failed, an invalid-order error was handled');
        // ️️️✅ Best Practice: Check monitoring metrics
        test.todo('When a new valid order was added, then order-added metric was fired');
        // ️️️✅ Best Practice: Simulate external failures
        test.todo('When the user service is down, then order is still added successfully');
        test('When the user does not exist, return 404 response', function () { return __awaiter(void 0, void 0, void 0, function () {
            var orderToAdd, orderAddResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //Arrange
                        nock('http://localhost/user/').get("/7").reply(404, null);
                        orderToAdd = {
                            userId: 7,
                            productId: 2,
                            mode: 'draft',
                        };
                        return [4 /*yield*/, axiosAPIClient.post('/order', orderToAdd)];
                    case 1:
                        orderAddResult = _a.sent();
                        //Assert
                        expect(orderAddResult.status).toBe(404);
                        return [2 /*return*/];
                }
            });
        }); });
        test('When order failed, send mail to admin', function () { return __awaiter(void 0, void 0, void 0, function () {
            var emailPayload, orderToAdd;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //Arrange
                        process.env.SEND_MAILS = 'true';
                        nock('http://mailer.com')
                            .post('/send', function (payload) { return ((emailPayload = payload), true); })
                            .reply(202);
                        sinon
                            .stub(OrderRepository.prototype, 'addOrder')
                            .throws(new Error('Unknown error'));
                        orderToAdd = {
                            userId: 1,
                            productId: 2,
                            mode: 'approved',
                        };
                        //Act
                        return [4 /*yield*/, axiosAPIClient.post('/order', orderToAdd)];
                    case 1:
                        //Act
                        _a.sent();
                        //Assert
                        // ️️️✅ Best Practice: Assert that the app called the mailer service appropriately
                        expect(emailPayload).toMatchObject({
                            subject: expect.any(String),
                            body: expect.any(String),
                            recipientAddress: expect.stringMatching(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
