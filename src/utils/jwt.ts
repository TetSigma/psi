import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

export const signJwt = (payload: object, expiresIn: string | number = '1h'): string => {
  const options = { expiresIn } as SignOptions;
  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyJwt = (token: string): object | string => {
  return jwt.verify(token, JWT_SECRET);
};
