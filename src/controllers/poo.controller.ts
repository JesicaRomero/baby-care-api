import type { Request, Response, NextFunction } from 'express';
import { Poo } from '../models';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { babyId } = req.params;
    const poos = await Poo.findAll({
      where: { babyId },
      order: [['date', 'DESC']],
      limit: 50,
    });
    return res.json({ data: { poos } });
  } catch (error: unknown) {
    next(error);
  }
};

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const poo = await Poo.findOne({
      where: { id },
    });
    return res.json({ data: { poo } });
  } catch (error: unknown) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const poo = await Poo.create(req.body);
    return res.json({ data: { poo } });
  } catch (error: unknown) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const poo = await Poo.update(req.body, {
      where: { id },
    });
    return res.json({ data: { poo } });
  } catch (error: unknown) {
    next(error);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const poo = await Poo.destroy({
      where: { id },
    });
    return res.json({ data: { poo } });
  } catch (error: unknown) {
    next(error);
  }
};

export default {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
