import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();
export const sign = (payload) => jwt.sign(payload, process.env.JWT_LOGIN_SECRET, { expiresIn: '12h' });
export const verify = (payload) => jwt.verify(payload, process.env.JWT_LOGIN_SECRET);
