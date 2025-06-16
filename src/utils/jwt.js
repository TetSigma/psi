import * as jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
export const signJwt = (payload, expiresIn = '1h') => {
    const options = { expiresIn };
    return jwt.sign(payload, JWT_SECRET, options);
};
export const verifyJwt = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
