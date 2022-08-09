/* eslint-disable consistent-return */
import jwt, { VerifyErrors } from 'jsonwebtoken';

export type JWTOptions = {
  secret: string;
};

export const jwtVerifierMiddleware = (options: JWTOptions) => {
  // 🔒 TODO - Once your project is off a POC stage, change your JWT flow to async using JWKS
  // Read more here: https://www.npmjs.com/package/jwks-rsa
  const middleware = (req, res, next) => {
    const authenticationHeader =
      req.headers.authorization || req.headers.Authorization;

    if (!authenticationHeader) {
      return res.sendStatus(401);
    }

    let token: string;

    // A token comes in one of two forms: 'token' or 'Bearer token'
    const authHeaderParts = authenticationHeader.split(' ');
    if (authHeaderParts.length > 2) {
      // It should have 1 or 2 parts (separated by space), the incoming string is not supported
      return res.sendStatus(401);
    }

    if (authHeaderParts.length === 2) {
      [, token] = authHeaderParts;
    } else {
      token = authenticationHeader;
    }

    jwt.verify(
      token,
      options.secret,
      // TODO: we should remove this any according to the library, jwtContent can not contain data property
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err: VerifyErrors | null, jwtContent: any) => {
        // @todo: use logger and error handler here
        // eslint-disable-next-line no-console
        console.log(err);

        if (err) {
          return res.sendStatus(401);
        }

        req.user = jwtContent.data;

        next();
      }
    );
  };
  return middleware;
};
