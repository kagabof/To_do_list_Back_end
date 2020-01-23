import { tokenDecoder } from '../helpers/tokenHelper';

export default async (req, res, next) => {
  const authHeader = req.get('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  let decoded;
  try {
    decoded = token && await tokenDecoder(token);
  } catch (error) {
    req.isAuth = false;
    return next();
  }
  if (!authHeader || !decoded.id || !token || token === undefined) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.role = decoded.role;
  req.userId = decoded.id;
  return next();
};
