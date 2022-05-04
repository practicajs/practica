import axios from 'axios';
import express from 'express';
import jwt from 'jsonwebtoken';

import { jwtAuthenticate } from './jwt';

// Configuring file-level HTTP client with base URL will allow
// all the tests to approach with a shortened syntax
const app = express();
const port = 3000;
const ttl = '5m';
const payload = { username: 'test-user' };
const secret = 'secret';

let axiosAPIClient,
    server,
    token;

beforeAll(async () => {
  // ️️️✅ Best Practice: Place the backend under test within the same process
  token = jwt.sign(payload, secret, { expiresIn: ttl });
  app.get('/secure-page', jwtAuthenticate({ secret }), (req, res) => {
    res.send(req.user);
  });

  server = app.listen(port);

  const axiosConfig = {
    baseURL: `http://127.0.0.1:${port}`,
    validateStatus: () => true, //Don't throw HTTP exceptions. Delegate to the tests to decide which error is acceptable
  };
  axiosAPIClient = axios.create(axiosConfig);

});

beforeEach(() => {
});

afterEach(() => {
});

afterAll(async () => {
  // ️️️✅ Best Practice: Clean-up resources after each run
  server.close(() => {});
});

describe('JWT middlewarwe', () => {
  describe('Request protected endpoint', () => {
    test('When using a valid token, then should retrieve a user and receive 200 response', async () => {
      const headers = {"Authorization" : `Bearer ${token}`};
      const response  = await axiosAPIClient.get(`/secure-page`, { headers });
      expect(response.status).toEqual(200);
      expect(response.data.username).toEqual(payload.username);
    });

    test('When using an empty token, then should receive unauthorized response', async () => {
      const headers = {};
      const response  = await axiosAPIClient.get(`/secure-page`, { headers });
      expect(response.status).toEqual(401);
      expect(response.data.toLowerCase()).toEqual('unauthorized');
    });

    test('When using an invalid token, then should receive forbidden response', async () => {
      const invalidToken = 'some-token';
      const headers = {"Authorization" : `Bearer ${invalidToken}`};
      const response  = await axiosAPIClient.get(`/secure-page`, { headers });
      expect(response.status).toEqual(403);
      expect(response.data.toLowerCase()).toEqual('forbidden');
    });
  });
});
