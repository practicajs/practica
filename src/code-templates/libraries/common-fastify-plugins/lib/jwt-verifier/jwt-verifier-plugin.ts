import { FastifyRequest as Request, FastifyPluginCallback } from 'fastify';
import jwt from 'jsonwebtoken';
import fastifyPluginWrapper from 'fastify-plugin';

export type JWTOptions = {
  secret: string;
};

export type AuthenticatedUser = {
  id: string;
  name: string;
  roles: string[];
};

type VerificationResult =
  | { success: false }
  | { success: true; user: AuthenticatedUser };

const userPropertyName = 'user';
const JWTVerifierPlugin: FastifyPluginCallback<JWTOptions> = (
  app,
  options,
  pluginDefinitionIsDone
) => {
  app.decorateRequest(userPropertyName, null);
  app.addHook('onRequest', (request, reply, onRequestIsDone) => {
    const verificationResult = verifyTokenOnRequest(request, options.secret);
    if (!verificationResult.success) {
      reply.status(401).send();
    } else {
      request[userPropertyName] = verificationResult.user;
    }
    onRequestIsDone();
  });
  pluginDefinitionIsDone();
};

const verifyTokenOnRequest = (
  request: Request,
  secret: string
): VerificationResult => {
  const authenticationHeader = getAuthenticationHeaderValue(request);
  if (!authenticationHeader) {
    return { success: false };
  }
  let token: string;
  // A token comes in one of two forms: 'token' or 'Bearer token'
  const authHeaderParts = authenticationHeader.split(' ');

  if (authHeaderParts.length > 2) {
    // It should have 1 or 2 parts (separated by space), the incoming string has unknown structure
    return { success: false };
  }
  if (authHeaderParts.length === 2) {
    [, token] = authHeaderParts;
  } else {
    token = authenticationHeader;
  }

  try {
    const JWTVerificationResponse = jwt.verify(token, secret);
    if (!isJwtObjectPayload(JWTVerificationResponse)) {
      return { success: false };
    }

    return { success: true, user: JWTVerificationResponse.data };
  } catch (error) {
    return { success: false };
  }
};

function isJwtObjectPayload(value: unknown): value is jwt.JwtPayload {
  return typeof value === 'object' && value !== null && 'data' in value;
}

function getAuthenticationHeaderValue(request: Request): string | undefined {
  if (request.headers.authorization) {
    return request.headers.authorization;
  }
  if (request.headers.Authorization) {
    if (Array.isArray(request.headers.Authorization)) {
      if (request.headers.Authorization.length === 0) {
        return undefined;
      }
      return request.headers.Authorization[0];
    }
    return request.headers.Authorization;
  }

  return undefined;
}

declare module 'fastify' {
  interface FastifyRequest {
    user: AuthenticatedUser | null;
  }
}

export const JWTVerifier = fastifyPluginWrapper(JWTVerifierPlugin);
