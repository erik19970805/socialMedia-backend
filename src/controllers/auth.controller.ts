import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user.interface';
import Users from '../models/user.model';
import { token } from '../config/config';

const createAccessToken = (payload: { id: string }): string =>
  jwt.sign(payload, token.accessToken, { expiresIn: '1d' });
const createRefreshToken = (payload: { id: string }): string =>
  jwt.sign(payload, token.refreshToken, { expiresIn: '30d' });

export const signup = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { fullname, username, email, password, gender }: IUser = req.body;
    const newUserName = username.toLocaleLowerCase().replace(/ /g, '');

    const userName = await Users.findOne({ username: newUserName });
    if (userName) return res.status(400).json({ error: 'Este usuario ya existe' });

    const userEmail = await Users.findOne({ email });
    if (userEmail) return res.status(400).json({ error: 'El correo electronico ya existe' });

    if (password.length < 6)
      return res.status(400).json({ error: 'La contraseña debe tener almenos 6 caracteres' });

    const newUser = new Users({ fullname, username, email, password, gender });

    const accessToken = createAccessToken({ id: newUser._id });
    const resfreshToken = createRefreshToken({ id: newUser._id });

    res.cookie('refreshtoken', resfreshToken, {
      httpOnly: true,
      path: '/api/auth/refresh_token',
      maxAge: 30 * 7 * 24 * 60 * 60 * 100,
    });

    await newUser.save();
    return res.json({ message: 'Su cuenta se creo correctamente', accessToken });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const signin = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password }: IUser = req.body;

    const user = await Users.findOne({ email }).populate('followers following', '-password');
    if (!user) return res.status(400).json({ error: 'El correo electronico no existe' });
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Contraseña incorrecta' });

    const accessToken = createAccessToken({ id: user._id });
    const resfreshToken = createRefreshToken({ id: user._id });

    res.cookie('refreshtoken', resfreshToken, {
      httpOnly: true,
      path: '/api/auth/refresh_token',
      maxAge: 30 * 7 * 24 * 60 * 60 * 100,
    });

    return res.json({ accessToken, user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const signout = (req: Request, res: Response): Response => {
  try {
    res.clearCookie('refreshtoken', { path: '/api/auth/refresh_token' });
    return res.json({ message: 'Se ha cerrado la sesión' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const generateAccessToken = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { refreshtoken } = req.cookies;

    if (!refreshtoken) return res.status(400).json({ error: 'Debe iniciar sesión' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = jwt.verify(refreshtoken, token.refreshToken);

    if (!result.id) return res.status(400).json({ error: 'Debe iniciar sesión' });

    const user = await Users.findById(result.id).populate('followers following', '-password');
    if (!user) return res.status(400).json({ error: 'El usuario no existe' });
    const accessToken = createAccessToken({ id: user._id });

    return res.json({ accessToken, user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
