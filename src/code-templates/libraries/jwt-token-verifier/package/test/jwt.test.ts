import * as httpMocks from 'node-mocks-http';
import * as sinon from 'sinon';
import { jwtVerifierMiddleware } from '../lib/jwt-verifier-middleware';
import * as jwtHelper from './jwt-helper';

beforeEach(() => {
  sinon.restore();
});

describe('JWT middleware', () => {
  test('When using a valid token with bearer, then should allow request and receive 200 response', async () => {
    // Arrange
    const validToken = jwtHelper.signValidToken('test-user', ['admin']);
    const jwtMiddleware = jwtVerifierMiddleware({
      secret: jwtHelper.exampleSecret,
    });
    const headers = { Authorization: `Bearer ${validToken}` };
    const request = httpMocks.createRequest({
      headers,
    });
    const response = httpMocks.createResponse({ req: request });
    const nextFn = sinon.spy();

    // Act
    jwtMiddleware(request, response, nextFn);

    // Assert
    expect(response.statusCode).toEqual(200);
    expect(request.user).toEqual({ user: 'test-user', roles: ['admin'] });
    expect(nextFn.called).toBeTruthy();
  });

  test('When using a valid token without bearer, then should allow request and receive 200 response', async () => {
    // Arrange
    const validToken = jwtHelper.signValidToken('test-user', ['admin']);
    const jwtMiddleware = jwtVerifierMiddleware({
      secret: jwtHelper.exampleSecret,
    });
    const headers = { Authorization: `${validToken}` };
    const request = httpMocks.createRequest({
      headers,
    });
    const response = httpMocks.createResponse({ req: request });
    const nextFn = sinon.spy();

    // Act
    jwtMiddleware(request, response, nextFn);

    // Assert
    expect(response.statusCode).toEqual(200);
    expect(request.user).toEqual({ user: 'test-user', roles: ['admin'] });
    expect(nextFn.called).toBeTruthy();
  });

  test('When using an empty token, then should receive unauthorized response', async () => {
    const jwtMiddleware = jwtVerifierMiddleware({
      secret: jwtHelper.exampleSecret,
    });
    const headers = { Authorization: `` };
    const request = httpMocks.createRequest({
      headers,
    });
    const response = httpMocks.createResponse({ req: request });
    const nextFn = sinon.spy();

    // Act
    jwtMiddleware(request, response, nextFn);

    // Assert
    expect(response.statusCode).toEqual(401);
    expect({ nextCallCount: 0 }).toMatchObject({
      nextCallCount: nextFn.callCount,
    });
  });

  test('When using an invalid multiword header, then receive unauthorized response', async () => {
    // Arrange
    const jwtMiddleware = jwtVerifierMiddleware({
      secret: jwtHelper.exampleSecret,
    });
    const headers = { Authorization: `Multiple words bearer one more` };
    const request = httpMocks.createRequest({
      headers,
    });
    const response = httpMocks.createResponse({ req: request });
    const nextFn = sinon.spy();

    // Act
    jwtMiddleware(request, response, nextFn);

    // Assert
    expect(response.statusCode).toEqual(401);
    expect({ nextCallCount: 0 }).toMatchObject({
      nextCallCount: nextFn.callCount,
    });
  });

  test('When using a fake unsigned token, then should receive unauthorized response', async () => {
    const jwtMiddleware = jwtVerifierMiddleware({
      secret: jwtHelper.exampleSecret,
    });
    const headers = { Authorization: `Bearer Not-really-token-fake` };
    const request = httpMocks.createRequest({
      headers,
    });
    const response = httpMocks.createResponse({ req: request });
    const nextFn = sinon.spy();

    // Act
    jwtMiddleware(request, response, nextFn);

    // Assert
    expect(response.statusCode).toEqual(401);
    expect({ nextCallCount: 0 }).toMatchObject({
      nextCallCount: nextFn.callCount,
    });
  });

  test('When using an expired token, then should receive unauthorized response', async () => {
    const jwtMiddleware = jwtVerifierMiddleware({
      secret: jwtHelper.exampleSecret,
    });
    const expiredToken = jwtHelper.signExpiredToken('test-user', ['admin']);
    const headers = { Authorization: `Bearer ${expiredToken}` };
    const request = httpMocks.createRequest({
      headers,
    });
    const response = httpMocks.createResponse({ req: request });
    const nextFn = sinon.spy();

    // Act
    jwtMiddleware(request, response, nextFn);

    // Assert
    expect(response.statusCode).toEqual(401);
    expect({ nextCallCount: 0 }).toMatchObject({
      nextCallCount: nextFn.callCount,
    });
  });
});
