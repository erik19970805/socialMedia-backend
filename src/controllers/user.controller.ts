import { Request, Response } from 'express';
import User from '../models/user.model';

// eslint-disable-next-line import/prefer-default-export
export const searchUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username } = req.query;

    let users;
    if (username) {
      users = await User.find({ username: { $regex: username as string } })
        .limit(10)
        .select('fullname username avatar');
    }
    return res.json({ users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
