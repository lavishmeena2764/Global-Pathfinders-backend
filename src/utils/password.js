import dotev from 'dotenv';

dotev.config();

import jwt from 'jsonwebtoken';

export function getJwt(object, expiresIn = '30d') {
  const secret = process.env.SECRET;
  const options = {
    algorithm: 'HS256', 
    expiresIn: expiresIn,
  };

  const token = jwt.sign({ payload: object }, secret, options);

  return token;
}