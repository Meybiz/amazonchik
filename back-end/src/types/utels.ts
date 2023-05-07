import jwt  from 'jsonwebtoken'
import { User } from './../model/userModel';

export const genToken = (user: User) => {
    return jwt.sign(
        {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    },
    process.env.JWTSECRET || 'somethingsecret',
    {
        expiresIn: '40d',
    }
    )
}
