import express, {Request, Response} from 'express';
import  asyncHandler  from 'express-async-handler';
import { User, UserModel } from '../model/userModel';
import  bcrypt  from 'bcryptjs';
import { genToken } from './../types/utels';

export const userRouter = express.Router()

userRouter.post('/signin', asyncHandler(async (req: Request, res: Response) => {
        const user = await UserModel.findOne({email: req.body.email})
        if(user) {
            if (bcrypt.compareSync(req.body.password, user.password) ) {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: genToken(user)
                })
                return 
            }
        }
        res.status(401).json({message: 'Неправильный email или пароль'})
    })
)


userRouter.post('/signup', asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    } as User);

    const savedUser = await user.save()
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: genToken(savedUser)
    })
}))
