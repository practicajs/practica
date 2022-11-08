import jwt from 'jsonwebtoken';
import axios from 'axios';

export const getAxiosInstance = (address) => {
  const axiosConfig = {
    baseURL: `http://127.0.0.1:${address.port}`,
    Headers: {
      'content-type': 'application/json',
      authorization: 'Bearer...',
    },
  };

  return axios.create(axiosConfig);
};

export function signValidTokenWithDefaultUser() {
  return internalSignTokenSynchronously('joe', 'admin', Date.now() + 60 * 60);
}

export function signValidToken(user, role) {
  return internalSignTokenSynchronously(user, role, Date.now() + 60 * 60);
}

export function signExpiredToken(user, role) {
  return internalSignTokenSynchronously(user, role, 0);
}

function internalSignTokenSynchronously(user, roles, expirationInUnixTime) {
  const token = jwt.sign(
    {
      exp: expirationInUnixTime,
      data: {
        user,
        roles,
      },
    },
    exampleSecret
  );

  return token;
}

export const exampleSecret = 'secret';
