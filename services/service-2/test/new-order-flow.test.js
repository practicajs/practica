const axios = require('axios');
const nock = require('nock');
const { initializeWebServer, stopWebServer } = require('../entry-points/api');
const testHelpers = require('./test-helpers');

let apiAddress, axiosClient;

beforeEach(() => {
  nock('http://localhost/user/').get(`/1`).reply(200, {
    id: 1,
    name: 'John',
  });
});

beforeAll(async () => {
  apiAddress = await initializeWebServer();
  axiosClient = testHelpers.getAxiosInstance(apiAddress);
});

afterAll(async () => {
  // Close the connection here
  await stopWebServer();
});

describe('api', () => {
  describe(':POST /order', () => {
    test('When a valid order, then the response is successful with all order fields', async () => {
      // Arrange
      const orderToAdd = { userId: 1, productId: 1, mode: 'require-approval' };

      // Act
      const receivedResponse = await axiosClient.post('/order', orderToAdd);

      // Assert
      expect(receivedResponse).toMatchObject({
        status: 200,
        data: {
          ...orderToAdd,
          id: expect.any(Number),
        },
      });
    });
  });
});

beforeEach(() => {
  nock('http://localhost/user/').get(`/1`).reply(200, {
    id: 1,
    name: 'John',
  });
});
