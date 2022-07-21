import jwt from "jsonwebtoken";

export type JWTOptions = {
  secret: string;
};

export const jwtVerifierMiddleware = (options: JWTOptions) => {
  // 🔒 TODO - Once your project is off a POC stage, change your JWT flow to async using JWKS
  // Read more here: https://www.npmjs.com/package/jwks-rsa
  const middleware = (req, res, next) => {
    const authHeader =
      req.headers["authorization"] || req.headers["Authorization"];

    if (!authHeader) {
      return res.sendStatus(401);
    }

    let token: string;

    // The token might come first or after a 'bearer {token}' prefix
    const authHeaderParts = authHeader.split(" ");
    if (authHeaderParts.length > 2) {
      // It should have 1 or 2 parts (separated by space), the incoming string is not supported
      return res.sendStatus(401);
    } else if (authHeaderParts.length === 2) {
      token = authHeaderParts[1];
    } else {
      token = authHeader;
    }

    jwt.verify(token, options.secret, (err: any, jwtContent: any) => {
      // @todo: use logger and error handler here
      console.log(err);

      if (err) {
        return res.sendStatus(401);
      }

      req.user = jwtContent.data;

      next();
    });
  };
  return middleware;
};
