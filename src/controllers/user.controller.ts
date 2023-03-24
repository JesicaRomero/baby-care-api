import type { NextFunction, Request, Response } from 'express'
import { Baby, User } from '../models'

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await User.findOne({
    where: {
      email,
      password,
    },
  })
  if (!user) {
    return res.status(401).send('Invalid email or password')
  }
  return res.json(user)
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, babyName, birthdate, email, password, communityCode } = req.body;
  console.log(req.body);
  try {
    const user = await User.create({
      username,
      email,
      password
    });
    console.log({ user });

    res.status(201).json({
      ok: true,
      status: 201,
      message: user
    });
  } catch (error) {
    next(error);
  }
}

export default {
  login,
  register
}
