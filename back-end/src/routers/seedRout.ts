import  express, {Request, Response}  from 'express';
import  asyncHandler  from 'express-async-handler';
import { ProdModel } from '../model/prodModel';
import { sampleProd } from '../data';

export const sRouter = express.Router();

sRouter.get('/', asyncHandler(async (req: Request, res: Response) => {
    await ProdModel.deleteMany({})
    const createProd = await ProdModel.insertMany(sampleProd)
    res.json({createProd})
}))
