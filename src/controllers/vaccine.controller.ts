import { Request, Response } from 'express';
import { Vaccine } from '../models/vaccine';


/**
 * 
 * @author Roxy Pérez
 * @param req query parameters - user data with baby and community code
 * @param res `204: No content, 412: Incorrect or missing data`
 * @example calling `/vaccine` with body:
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
const getAll = async (_req: Request, res: Response) => {
    try {
        const vaccines = await Vaccine.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            message: vaccines
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

const getVaccineByPeriod = async (req: Request, res: Response) => {
    const { period } = req.params;

    try {
        const vaccines = await Vaccine.findAll({
            where: {
                period,
            },
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: vaccines
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

const getVaccineByCommunity = async (req: Request, res: Response) => {
    const { communityCode } = req.params;

    try {
        const vaccines = await Vaccine.findAll({
            where: {
                communityCode,
            },
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: vaccines
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

export default { getAll, getVaccineByPeriod, getVaccineByCommunity }