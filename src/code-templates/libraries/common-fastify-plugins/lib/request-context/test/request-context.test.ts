import axios from 'axios';
import { context } from '@practica/global-context';
import { startTestServer, stopTestServer } from './fastify-for-testing';
import { RequestContextStore } from '../store-definition';

describe('JWTVerifier plugin', () => {
  beforeAll(async () => {});

  afterAll(async () => {
    await stopTestServer();
  });
  test('When a function is called by some route, then the context store has all the mandatory properties', async () => {
    // Arrange
    let currentContext: RequestContextStore | undefined;
    const calledOnRequest = () => {
      currentContext = context().getStore();
    };
    await startTestServer(calledOnRequest);

    // Act
    await getAxiosInstance().get('/example-route');

    // Assert
    expect(currentContext).toMatchObject({ requestId: expect.any(String) });
  });
});

function getAxiosInstance() {
  return axios.create({
    baseURL: 'http://localhost:3001',
    validateStatus: () => true,
  });
}
