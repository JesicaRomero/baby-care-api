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

const register = async (req: Request, res: Response) => {
  try {
    const { username, babyName, birthdate, email, password, community_code } = req.body;
    const user = await User.create({
      username,
      email,
      password
    });

    const newUser = user.dataValues;

    const baby = await Baby.create({
      user_id: newUser.id,
      name: babyName,
      birthdate,
      community_code: community_code,
    });
    res.status(201).json({
      ok: true,
      status: 201,
      message: { newUser, baby }
    });
  } catch (error) {
    res.status(500).send('Ha ocurrido un error en el registro');
  }
}

export default {
  login,
  register
}
