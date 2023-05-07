declare namespace Express {

    export interface Request {
        user: {
            _id: string
            name: string
            enail: string
            isAdmin: boolean
            token: string
        }
    }
}