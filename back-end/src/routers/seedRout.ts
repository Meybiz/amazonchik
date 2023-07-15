import  express, {Request, Response}  from 'express';
import  asyncHandler  from 'express-async-handler';
import { ProdModel } from '../model/prodModel';
import { sampleProd, sampleUsers } from '../data';
import { UserModel } from '../model/userModel';

export const sRouter = express.Router();

sRouter.get('/', asyncHandler(async (req: Request, res: Response) => {
    await ProdModel.deleteMany({})
    const createProd = await ProdModel.insertMany(sampleProd)


    await UserModel.deleteMany({})
    const createUser = await UserModel.insertMany(sampleUsers) 

    res.json({createProd, createUser})
}))


sRouter.get('/')
