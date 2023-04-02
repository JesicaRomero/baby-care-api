import type { Request, Response, NextFunction } from 'express';
import { Baby, User, AutonomousCommunity } from '../models';
import { compareHash, encryptPassword } from '../shared/crypto';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
      include: [Baby],
    });

    if (user) {
      const isCorrectPassword = await compareHash(
        password,
        user.dataValues.password
      );
      if (isCorrectPassword) {
        delete user.dataValues.password;
        return res.json({ data: { user } });
      }
    }

    return res.status(401).json({
      data: null,
      error: {
        statusCode: 401,
        message: 'Invalid email or password',
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @author Roxy Pérez
 * @param req query parameters - user data with baby and community code
 * @param res `204: No content, 412: Incorrect or missing data`
 * @example calling `/register` with body:
 * ``` 
 * "username": "Roxy",
    "babyName": "Lulu",
    "birthday": "2023-12-01",
    "email": "perez@gmail.com",
    "password": "password",
    "communityCode": 17 
    ```
 * 
 */
const register = async (req: Request, res: Response) => {
  try {
    const userWithBaby = req.body;

    const verifyUser = await User.findOne({
      where: {
        email: userWithBaby.email,
      }
    });

    if (verifyUser) return res.status(409).json({
      ok: false,
      status: 409,
      message: 'User already exist'
    });

    const user = await User.create({
      username: userWithBaby.username,
      email: userWithBaby.email,
      password: await encryptPassword(userWithBaby.password),
    });

    await Baby.create({
      userId: user.dataValues.id,
      name: userWithBaby.baby.name,
      birthday: userWithBaby.baby.birthday,
      communityCode: userWithBaby.baby.communityCode
    });
    res.status(204).json({
      ok: true,
      status: 204,
      message: 'No content',
    });
  } catch (error) {
    console.log(error);
    res.status(412).json({
      ok: false,
      status: 412,
      message: 'Incorrect or missing data',
    });
  }
};

/**
 * 
 * @author Roxy Pérez
 * @param req query parameters - user data with baby and community code
 * @param res `200: Ok, 404: Not found, 412: Incorrect or missing data`
 * @example calling `/edit-profile` with body:
 * ``` 
 * "username": "Roxy",
    "babyName": "Alexia",
    "birthday": "2023-12-01",
    "email": "perez@gmail.com",
    "password": "password",
    "communityCode": 8 
    ```
 * 
 */
const editProfile = async (req: Request, res: Response) => {
  try {
    let { username, name, email, password, newPassword } = req.body;
    console.log(req.body);

    let user = await User.findOne({
      where: { email },
      include: [{ model: Baby }],
    });

    if (!user) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: 'User not found',
      });
    }

    if (password && newPassword) {
      const passwordMatch = await compareHash(password, user.dataValues.password);
      if (passwordMatch) {
        const hashedPassword = await encryptPassword(newPassword);
        password = hashedPassword;
        user.set({ username, email, password });
      } else return res.status(401).json({
        ok: false,
        status: 401,
        message: 'Current password is incorrect',
      });
    } else user.set({ username, email });

    if (name) {  
      const baby = await Baby.update(
        { name },
        {
          where: {
            userId: user.dataValues.id,
          },
        }
      );
      console.log(baby);
    }

    user = await user.save();

    const updatedUser = await User.findOne({
      where: { email },
      include: [{ model: Baby }],
    });

    res.status(200).json({
      ok: true,
      status: 200,
      message: { updatedUser }
    });
  } catch (error) {
    res.status(412).json({
      ok: false,
      status: 412,
      message: 'Incorrect or missing data',
    });
  }
};

const getCommunities = async (req: Request, res: Response) => {
  try {
    const communities = await AutonomousCommunity.findAll({
      order: [['name', 'ASC']],
    });
    res.status(200).json({
      ok: true,
      status: 200,
      communities
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

export default {
  login,
  register,
  editProfile,
  getCommunities
};
