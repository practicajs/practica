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
const axios = require("axios");
const sinon = require("sinon");
const nock = require("nock");
const { initializeWebServer, stopWebServer } = require("../entry-points/api");
const OrderRepository = require("../data-access/order-repository");
// Configuring file-level HTTP client with base URL will allow
// all the tests to approach with a shortened syntax
let axiosAPIClient;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // ️️️✅ Best Practice: Place the backend under test within the same process
    const apiConnection = yield initializeWebServer();
    const axiosConfig = {
        baseURL: `http://127.0.0.1:${apiConnection.port}`,
        validateStatus: () => true, //Don't throw HTTP exceptions. Delegate to the tests to decide which error is acceptable
    };
    axiosAPIClient = axios.create(axiosConfig);
    // ️️️✅ Best Practice: Ensure that this component is isolated by preventing unknown calls
    nock.disableNetConnect();
    nock.enableNetConnect("127.0.0.1");
}));
beforeEach(() => {
    nock("http://localhost/user/").get(`/1`).reply(200, {
        id: 1,
        name: "John",
    });
});
afterEach(() => {
    nock.cleanAll();
    sinon.restore();
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // ️️️✅ Best Practice: Clean-up resources after each run
    yield stopWebServer();
    nock.enableNetConnect();
}));
// ️️️✅ Best Practice: Structure tests
describe("/api", () => {
    describe("GET /order", () => {
        test("When asked for an existing order, Then should retrieve it and receive 200 response", () => __awaiter(void 0, void 0, void 0, function* () {
            //Arrange
            const orderToAdd = {
                userId: 1,
                productId: 2,
                mode: "approved",
            };
            const { data: { id: addedOrderId }, } = yield axiosAPIClient.post(`/order`, orderToAdd);
            //Act
            // ️️️✅ Best Practice: Use generic and reputable HTTP client like Axios or Fetch. Avoid libraries that are coupled to
            // the web framework or include custom assertion syntax (e.g. Supertest)
            const getResponse = yield axiosAPIClient.get(`/order/${addedOrderId}`);
            //Assert
            expect(getResponse).toMatchObject({
                status: 200,
                data: {
                    userId: 1,
                    productId: 2,
                    mode: "approved",
                },
            });
        }));
        test("When asked for an non-existing order, Then should receive 404 response", () => __awaiter(void 0, void 0, void 0, function* () {
            //Arrange
            const nonExistingOrderId = -1;
            //Act
            const getResponse = yield axiosAPIClient.get(`/order/${nonExistingOrderId}`);
            //Assert
            expect(getResponse.status).toBe(404);
        }));
    });
    describe("POST /orders", () => {
        // ️️️✅ Best Practice: Check the response
        test("When adding a new valid order, Then should get back approval with 200 response", () => __awaiter(void 0, void 0, void 0, function* () {
            //Arrange
            const orderToAdd = {
                userId: 1,
                productId: 2,
                mode: "approved",
            };
            //Act
            const receivedAPIResponse = yield axiosAPIClient.post("/order", orderToAdd);
            //Assert
            expect(receivedAPIResponse).toMatchObject({
                status: 200,
                data: {
                    id: expect.any(Number),
                    mode: "approved",
                },
            });
        }));
        // ️️️✅ Best Practice: Check the new state
        // In a real-world project, this test can be combined with the previous test
        test("When adding a new valid order, Then should be able to retrieve it", () => __awaiter(void 0, void 0, void 0, function* () {
            //Arrange
            const orderToAdd = {
                userId: 1,
                productId: 2,
                mode: "approved",
            };
            //Act
            const { data: { id: addedOrderId }, } = yield axiosAPIClient.post("/order", orderToAdd);
            //Assert
            const { data, status } = yield axiosAPIClient.get(`/order/${addedOrderId}`);
            expect({
                data,
                status,
            }).toMatchObject({
                status: 200,
                data: {
                    id: addedOrderId,
                    userId: 1,
                    productId: 2,
                },
            });
        }));
        // ️️️✅ Best Practice: Check invalid input
        test("When adding an order without specifying product, stop and return 400", () => __awaiter(void 0, void 0, void 0, function* () {
            //Arrange
            const orderToAdd = {
                userId: 1,
                mode: "draft",
            };
            //Act
            const orderAddResult = yield axiosAPIClient.post("/order", orderToAdd);
            //Assert
            expect(orderAddResult.status).toBe(400);
        }));
        // ️️️✅ Best Practice: Check error handling
        test.todo("When a new order failed, an invalid-order error was handled");
        // ️️️✅ Best Practice: Check monitoring metrics
        test.todo("When a new valid order was added, then order-added metric was fired");
        // ️️️✅ Best Practice: Simulate external failures
        test.todo("When the user service is down, then order is still added successfully");
        test("When the user does not exist, return 404 response", () => __awaiter(void 0, void 0, void 0, function* () {
            //Arrange
            nock("http://localhost/user/").get(`/7`).reply(404, null);
            const orderToAdd = {
                userId: 7,
                productId: 2,
                mode: "draft",
            };
            //Act
            const orderAddResult = yield axiosAPIClient.post("/order", orderToAdd);
            //Assert
            expect(orderAddResult.status).toBe(404);
        }));
    });
});
