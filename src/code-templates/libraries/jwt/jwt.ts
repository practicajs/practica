import jwt from 'jsonwebtoken';

export interface JWTOptions {
  secret: string;
}

export const jwtAuthenticate = (opts: JWTOptions) => {
  const middleware = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    console.log('aa:', authHeader);
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, opts.secret, (err: any, user: any) => {
      // @todo: use logger and error handler here
      console.log(err);
  
      if (err) {
        return res.sendStatus(403);
      }
  
      req.user = user;
  
      next();
    })
  }
  return middleware;
}
