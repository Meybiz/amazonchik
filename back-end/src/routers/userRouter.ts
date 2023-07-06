import express, {Request, Response} from 'express';
import  asyncHandler  from 'express-async-handler';
import { User, UserModel } from '../model/userModel';
import { ProdModel } from '../model/prodModel';
import  bcrypt  from 'bcryptjs';
import { genToken } from './../types/utels';
import apiClient from './../../../front-end/src/apiClient';

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


userRouter.put('/updatename', asyncHandler(async(req: Request, res: Response) => {
    const {name} = req.body
    

    try {
        const user = await UserModel.findOne({_id: req.body._id})
        if (!user) {
            res.status(404).json({message: 'Не найдено профиля'})
            return
        }
        user.name = name
        const updUser = await user.save()

        res.json({
            _id: updUser._id,
            name: updUser.name,
            email: updUser.email,
            isAdmin: updUser.isAdmin,
            token: genToken(updUser),
        })
    }
    catch (err){
        console.error('Ошибка при изменении имени', err)
        res.status(500).json({message: 'Ошибка сервера'})
        
    }
}))

userRouter.put('/updateemail', asyncHandler(async(req: Request, res: Response) => {
    const {email} = req.body

    try {
        const user = await UserModel.findOne({_id: req.body._id})
        console.log(user)
        if(!user) {
            res.status(404).json({message: 'Профиль с таким email не найден'})
            return
        }

        user.email = email
        const updEmail = await user.save()

        res.json({
            _id: updEmail._id,
            name:updEmail.name,
            email: updEmail.email,
            isAdmin: updEmail.isAdmin,
            token: genToken(updEmail)
        })
    }
    catch (err){
        console.error('Ошибка при обновлении имени на сервере', err)
        res.status(500).json({message: 'Ошибка при сравнении данных'})
    }
}))
