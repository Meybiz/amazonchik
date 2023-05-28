import jwt  from 'jsonwebtoken'
import { User } from './../model/userModel';
import { NextFunction, Request, Response } from 'express';

export const genToken = (user: User) => {
    return jwt.sign(
        {
        _id: user._id,
        name: user.name,
        email: user.email,
        balance: user.balance,
        isAdmin: user.isAdmin
    },
    process.env.JWTSECRET || 'somethingsecret',
    {
        expiresIn: '40d',
    }
    )
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const {authorization} = req.headers
    if (authorization) {
        const token: string = authorization.slice(7, authorization.length)
        console.log(token)
        const decode = jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret')
        req.user = decode as {
            _id: string
            name: string
            email: string
            balance: number
            isAdmin: boolean
            token: string
        }
        next()
    } else {
        res.status(401).json({message: 'No Token'})
    }
}
