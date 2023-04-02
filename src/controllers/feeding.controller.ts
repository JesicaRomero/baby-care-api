import { Request, Response } from 'express';
import { Feeding } from '../models/feeding';

/**
 * 
 * @author Roxy Pérez
 * @param req query parameters - user data with baby and community code
 * @param res `204: No content, 412: Incorrect or missing data`
 * @example calling `/feeding/` with body:
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
const getAll = async (req: Request, res: Response) => {
    try {
        const babyId = req.params.babyId;
        const feedings = await Feeding.findAll({
            where: { babyId },
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: feedings
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

/**
 * 
 * @author Roxy Pérez
 * @param req query parameters - user data with baby and community code
 * @param res `204: No content, 412: Incorrect or missing data`
 * @example calling `/api/v1/feeding` with body:
 * ``` 
 * {
    "timeLeftBreast": "",
    "timeRightBreast": "",
    "amountBottle": "",
    "amountSolids": "20",
    "type": "solids",
    "babyId": "34ce330d-9d08-459f-b760-27196400c27f"
}
    ```
 * 
 */
const create = async (req: Request, res: Response) => {
    try {
        const { babyId, type } = req.body;
        console.log(req.body);
        const feeding = await Feeding.create({
            babyId,
            type,
            timeLeftBreast: req.body.timeLeftBreast || null,
            timeRightBreast: req.body.timeRightBreast || null,
            amountBottle: req.body.amountBottle || null,
            amountSolids: req.body.amountSolids || null
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: feeding,
        });
    } catch (err) {
        console.log(err);
        res.status(412).json({
            ok: false,
            status: 412,
            message: 'Incorrect or missing data',
        });
    }
}

export default { getAll, create }