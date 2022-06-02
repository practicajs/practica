import * as httpMocks from 'node-mocks-http';
import * as sinon from 'sinon';
import jwt from 'jsonwebtoken';

import { jwtAuthenticate } from './jwt';

const ttl = '5m';
const payload = { username: 'test-user' };
const secret = 'secret';

let token,
  jwtMiddleware,
  nextFn;

beforeAll(async () => {
  // ️️️✅ Best Practice: Place the backend under test within the same process
  token = jwt.sign(payload, secret, { expiresIn: ttl });
  jwtMiddleware = jwtAuthenticate({ secret });
});

beforeEach(() => {
  nextFn = sinon.spy();
});

afterEach(() => {
  nextFn = sinon.resetHistory();
});

afterAll(async () => {
  // ️️️✅ Best Practice: Clean-up resources after each run
  sinon.restore();
});

describe('JWT middlewarwe', () => {
  describe('Calling with request/response objects', () => {
    test('When using a valid token, then should retrieve a user and receive 200 response', async () => {
      const headers = {'Authorization' : `Bearer ${token}`};
      const request = httpMocks.createRequest({
        headers,
      });
      const response = httpMocks.createResponse({ req: request });
      jwtMiddleware(request, response, nextFn);

      expect(nextFn.called).toBeTruthy();
      expect(response.statusCode).toEqual(200);
    });

    test('When using an empty token, then should receive unauthorized response', async () => {
      const headers = {};
      const request = httpMocks.createRequest({
        headers,
      });
      const response = httpMocks.createResponse({ req: request });
      jwtMiddleware(request, response, nextFn);
      const data = response._getData();

      expect(response.statusCode).toEqual(401);
      expect(data.toLowerCase()).toEqual('unauthorized');
    });

    test('When using an invalid token, then should receive unauthorized response', async () => {
      const invalidToken = 'some-token';
      const headers = {"Authorization" : `Bearer ${invalidToken}`};
      const request = httpMocks.createRequest({
        headers,
      });
      const response = httpMocks.createResponse({ req: request });
      jwtMiddleware(request, response, nextFn);
      const data = response._getData();

      expect(response.statusCode).toEqual(401);
      expect(data.toLowerCase()).toEqual('unauthorized');
    });
  });
});
