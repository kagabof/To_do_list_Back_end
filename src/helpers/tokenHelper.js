import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const tokenGenerater = async (payload) => {
  const token = await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1 sec' });
  return token;
};

const tokenDecoder = async (token) => {
  const user = await jwt.verify(token, process.env.SECRET_KEY);
  return user;
};

export {
  tokenGenerater,
  tokenDecoder,
};
