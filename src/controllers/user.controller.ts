import type { Request, Response, NextFunction } from 'express'
import { Baby, User } from '../models'

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({
      where: {
        email,
        password,
      },
      include: [Baby],
      attributes: { exclude: ['password'] },
    })
    if (!user) {
      return res.status(401).json({
        data: null,
        error: {
          statusCode: 401,
          message: 'Invalid email or password',
        },
      })
    }
    return res.json({ data: { user } })
  } catch (error) {
    next(error)
  }
}

/**
 * 
 * @author Roxy Pérez
 * @param req query parameters - user data with baby and community code
 * @param res `204: No content, 412: Incorrect or missing data`
 * @example calling `/register` with body:
 * ``` 
 * "username": "Roxy",
    "babyName": "Lulu",
    "birthdate": "2023-12-01",
    "email": "perez@gmail.com",
    "password": "password",
    "communityCode": 17 
    ```
 * 
 */
const register = async (req: Request, res: Response) => {
  try {
    const { username, babyName, birthdate, email, password, communityCode } =
      req.body
    const user = await User.create({
      username,
      email,
      password,
    })
    const newUser = user.dataValues

    await Baby.create({
      userId: newUser.id,
      name: babyName,
      birthdate,
      community_code: communityCode,
    })
    res.status(204).json({
      ok: true,
      status: 204,
      message: 'No content',
    })
  } catch (error) {
    res.status(412).json({
      ok: false,
      status: 412,
      message: 'Incorrect or missing data',
    })
  }
}

/**
 * 
 * @author Roxy Pérez
 * @param req query parameters - user data with baby and community code
 * @param res `200: Ok, 404: Not found, 412: Incorrect or missing data`
 * @example calling `/edit-profile` with body:
 * ``` 
 * "username": "Roxy",
    "babyName": "Alexia",
    "birthdate": "2023-12-01",
    "email": "perez@gmail.com",
    "password": "password",
    "communityCode": 8 
    ```
 * 
 */
const editProfile = async (req: Request, res: Response) => {
  try {
    const { username, email, password, babyName, birthdate, communityCode } =
      req.body

    const user = await User.findOne({
      where: { email },
      include: [Baby],
    })

    if (!user) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: 'User not found',
      })
    }

    user.dataValues.username = username
    user.dataValues.email = email
    user.dataValues.password = password
    user.dataValues.Baby.name = babyName
    user.dataValues.Baby.birthdate = birthdate
    user.dataValues.Baby.community_code = communityCode

    await user.save()

    res.status(200).json({
      ok: true,
      status: 200,
      message: user,
    })
  } catch (error) {
    res.status(412).json({
      ok: false,
      status: 412,
      message: 'Incorrect or missing data',
    })
  }
}

const getUserWithBaby = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      include: [Baby],
    })
    if (!user) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: 'User not found',
      })
    }
    res.json(user)
  } catch (error) {
    console.log(error)
  }
}

export default {
  login,
  register,
  editProfile,
  getUserWithBaby,
}
