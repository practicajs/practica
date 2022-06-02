import jwt from 'jsonwebtoken';

export interface JWTOptions {
  secret: string;
}

export enum HTTP_STATUS_CODES {
  OK = 200,
  UNAUTHORIZED = 401,
}

export const jwtAuthenticate = (opts: JWTOptions) => {
  // @todo change JWT flow to async using JWKS
  const middleware = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) {
      return res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);
    }
  
    jwt.verify(token, opts.secret, (err: any, user: any) => {
      // @todo: use logger and error handler here
      console.log(err);
  
      if (err) {
        return res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);
      }
  
      req.user = user;
  
      next();
    })
  }
  return middleware;
}
