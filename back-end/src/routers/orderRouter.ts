import express, {Request, Response} from 'express';
import  asyncHandler  from 'express-async-handler';
import { isAuth } from '../types/utels';
import { OrderModel } from '../model/orderModel';
import { Product } from '../model/prodModel';
export const orderRouter = express.Router()


orderRouter.get(
    '/history',
    isAuth,
    asyncHandler(async(req: Request, res: Response) => {
        const orders = await OrderModel.find({user: req.user._id})
        res.json(orders)
    })
)

orderRouter.get(
    '/:id',
    isAuth,
    asyncHandler(async (req:Request, res: Response) => {
        const order = await OrderModel.findById(req.params.id)
        if (order) {
            res.json(order)
        } else {
            res.status(404).json({message: 'заказ не найден'})
        }
    })
)


orderRouter.post('/', isAuth, asyncHandler(async(req: Request, res: Response) => {
    if (req.body.orderItems.length === 0) {
        res.status(400).send({message: 'Cart is Empty'})
    } else {
        const createdOrder = await OrderModel.create({
            orderItems: req.body.orderItems.map((x: Product) => ({
                ...x,
                product: x._id,
            })),
            shipAddress: req.body.shipAddress,
            payMethod: req.body.payMethod,
            shipPrice: req.body.shipPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id
        })
        res.status(201).json({message: 'Order Create', order: createdOrder})
    }
}))