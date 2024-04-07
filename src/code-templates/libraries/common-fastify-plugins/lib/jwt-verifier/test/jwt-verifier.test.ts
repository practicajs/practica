import axios from 'axios';
import { startTestServer, stopTestServer } from './fastify-for-testing';
import {
  exampleSecret,
  signExpiredToken,
  signValidTokenWithDefaultUser,
} from './jwt-helper';

describe('JWTVerifier plugin', () => {
  beforeAll(async () => {
    await startTestServer(exampleSecret);
  });

  afterAll(async () => {
    await stopTestServer();
  });
  test('When not providing a token, then get back 401', async () => {
    // Arrange

    // Act
    const receivedResponse = await getAxiosInstance().get('/');

    // Assert
    expect(receivedResponse.status).toBe(401);
  });

  test('When providing a valid but expired token, then get back 401', async () => {
    // Arrange

    // Act
    const validToken = signExpiredToken('joe', 'admin');
    const receivedResponse = await getAxiosInstance().get('/', {
      headers: { Authorization: validToken },
    });

    // Assert
    expect(receivedResponse.status).toBe(401);
  });

  test.each(['authorization', 'Authorization'])(
    'When providing a valid token in the %s header, then get back 200',
    async (headerName) => {
      // Arrange
      const validToken = signValidTokenWithDefaultUser();

      // Act

      const receivedResponse = await getAxiosInstance().get('/', {
        headers: { [headerName]: validToken },
      });

      // Assert
      expect(receivedResponse.status).toBe(200);
    }
  );

  test('When providing an non-sense token, then get back 401', async () => {
    // Arrange

    // Act
    const receivedResponse = await getAxiosInstance().get('/', {
      headers: { Authorization: 'Bearer non-sense' },
    });

    // Assert
    expect(receivedResponse.status).toBe(401);
  });
});

function getAxiosInstance() {
  return axios.create({
    baseURL: 'http://localhost:3000',
    validateStatus: () => true,
  });
}
