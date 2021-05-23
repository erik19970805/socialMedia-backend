/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import User from '../models/user.model';
import { token } from '../config/config';

const auth = async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const reqToken = req.header('Authorization');

    if (!reqToken) return res.status(400).json({ error: 'Autenticación Invalida' });

    const decoded: any = jwt.verify(reqToken, token.accessToken);
    if (!decoded) return res.status(400).json({ error: 'Autenticación Invalida' });

    const user = await User.findOne({ _id: decoded.id });

    req.user = user;
    return next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export default auth;
