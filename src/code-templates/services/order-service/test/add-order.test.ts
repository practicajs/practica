import axios from 'axios';
import sinon from 'sinon';
import nock from 'nock';
import { startWebServer, stopWebServer } from '../entry-points/api/server';
import * as testHelpers from './test-helpers';

// Configuring file-level HTTP client with base URL will allow
// all the tests to approach with a shortened syntax
let axiosAPIClient;

beforeAll(async () => {
  process.env.JWT_TOKEN_SECRET = testHelpers.exampleSecret;
  // ️️️✅ Best Practice: Place the backend under test within the same process
  const apiConnection = await startWebServer();
  const axiosConfig = {
    baseURL: `http://127.0.0.1:${apiConnection.port}`,
    validateStatus: () => true, // Don't throw HTTP exceptions. Delegate to the tests to decide which error is acceptable
    headers: {
      // ️️️✅ Best Practice: Test like production, include real token to stretch the real authentication mechanism
      authorization: testHelpers.signValidTokenWithDefaultUser(),
    },
  };
  axiosAPIClient = axios.create(axiosConfig);

  // ️️️✅ Best Practice: Ensure that this component is isolated by preventing unknown calls
  nock.disableNetConnect();
  nock.enableNetConnect('127.0.0.1');
});

beforeEach(() => {
  // ️️️✅ Best Practice: Start each test with a clean slate
  nock.cleanAll();
  sinon.restore();

  nock('http://localhost/user/').get(`/1`).reply(200, {
    id: 1,
    name: 'John',
    terms: 45,
  });
});

afterAll(async () => {
  nock.enableNetConnect();
  stopWebServer();
});

// ️️️✅ Best Practice: Structure tests by routes and stories
describe('/api', () => {
  describe('POST /orders', () => {
    // ️️️✅ Best Practice: Check the response
    test('When adding a new valid order, Then should get back approval with 200 response', async () => {
      // Arrange
      const orderToAdd = {
        userId: 1,
        productId: 2,
        deliveryAddress: '123 Main St, New York, NY 10001',
        paymentTermsInDays: 30,
      };

      // Act
      const receivedAPIResponse = await axiosAPIClient.post(
        '/order',
        orderToAdd
      );

      // Assert
      expect(receivedAPIResponse).toMatchObject({
        data: {
          id: expect.any(Number),
        },
      });
    });

    // ️️️✅ Best Practice: Check the new state
    // In a real-world project, this test can be combined with the previous test
    test('When adding a new valid order, Then should be able to retrieve it', async () => {
      // Arrange
      const orderToAdd = {
        userId: 1,
        productId: 2,
        deliveryAddress: '123 Main St, New York, NY 10001',
        paymentTermsInDays: 30,
      };

      // Act
      const {
        data: { id: addedOrderId },
      } = await axiosAPIClient.post('/order', orderToAdd);

      // Assert
      const { data, status } = await axiosAPIClient.get(
        `/order/${addedOrderId}`
      );

      expect({
        data,
        status,
      }).toMatchObject({
        status: 200,
        data: {
          ...orderToAdd,
        },
      });
    });

    // ️️️✅ Best Practice: Check invalid input
    test('When adding an order without specifying product, stop and return 400', async () => {
      // Arrange
      const orderToAdd = {
        userId: 1,
        deliveryAddress: '123 Main St, New York, NY 10001',
        paymentTermsInDays: 30,
      };

      // Act
      const orderAddResult = await axiosAPIClient.post('/order', orderToAdd);

      // Assert
      expect(orderAddResult.status).toBe(400);
    });

    // ️️️✅ Best Practice: Check error handling
    test.todo('When a new order failed, an invalid-order error was handled');

    // ️️️✅ Best Practice: Check monitoring metrics
    test.todo(
      'When a new valid order was added, then order-added metric was fired'
    );

    // ️️️✅ Best Practice: Simulate external failures
    test.todo(
      'When the user service is down, then order is still added successfully'
    );

    test('When the user does not exist, return 404 response', async () => {
      // Arrange
      nock('http://localhost/user/').get(`/7`).reply(404);
      const orderToAdd = {
        userId: 7,
        productId: 1,
        deliveryAddress: '123 Main St, New York, NY 10001',
        paymentTermsInDays: 30,
      };

      // Act
      const orderAddResult = await axiosAPIClient.post('/order', orderToAdd);

      // Assert
      expect(orderAddResult.status).toBe(404);
    });
  });
});

export {};
