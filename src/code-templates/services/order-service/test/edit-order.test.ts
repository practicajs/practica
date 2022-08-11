import { Static } from '@sinclair/typebox';
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
  test('When editing order, then the new values are queryable', async () => {
    // Arrange
    const orderBeforeEdit = {
      userId: 1,
      productId: 2,
      deliveryAddress: '123 Main St, New York, NY 10001',
      paymentTermsInDays: 30,
    };
    const orderToEditId = (await axiosAPIClient.post('/order', orderBeforeEdit))
      .data.id;
    orderBeforeEdit.deliveryAddress = '161 Trumpeter Ave, Alaska';

    // Act
    await axiosAPIClient.put(`/order/${orderToEditId}`, {
      ...orderBeforeEdit,
      id: orderToEditId,
    });

    // Assert
    const orderAfterEdit = await axiosAPIClient.get(`/order/${orderToEditId}`);
    expect(orderAfterEdit.data).toMatchObject(orderBeforeEdit);
  });

  test('When editing order with Delivered status, then its rejected with status 409', async () => {
    // Arrange
    const orderBeforeEdit = {
      userId: 1,
      productId: 2,
      deliveryAddress: '123 Main St, New York, NY 10001',
      paymentTermsInDays: 30,
      status: 'delivered',
    };
    const orderToEditId = (await axiosAPIClient.post('/order', orderBeforeEdit))
      .data.id;
    orderBeforeEdit.deliveryAddress = '161 Trumpeter Ave, Alaska';

    // Act
    const receivedResponse = await axiosAPIClient.put(
      `/order/${orderToEditId}`,
      orderBeforeEdit
    );

    // Assert
    expect(receivedResponse.status).toBe(409);
  });
});

export {};
