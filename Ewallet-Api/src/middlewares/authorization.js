
import out from '../helpers/response';
import { verify } from '../helpers/jwt';

export const isUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const user = verify(token);
    if(!user)  return out(res, 403, 'You don\'t have access to do that action', null, 'FORBIDDEN');
    req.token = token;
    req.user = user;
    return next();
  } catch (error) {
    return out(res, 401, error.message || error, null, 'AUTHENTICATION_ERROR');
  }
};
