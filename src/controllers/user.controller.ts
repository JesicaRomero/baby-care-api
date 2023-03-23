import type { Request, Response } from 'express'
import { User } from '../models'

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

export default { login }
