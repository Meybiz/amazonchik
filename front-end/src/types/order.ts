import { CardItems, ShipAddress } from "./CardType";
import { User } from "./User";


export type Order = {
    _id: string
    orderItems: CardItems[]
    shipAddress: ShipAddress
    payMethod: string
    user: User
    createAt: string
    isPaid: boolean
    paidAt: string
    isDeliver: boolean
    deliverAt: string
    itemsPrice: number
    shipPrice: number
    taxPrice: number
    totalPrice: number
}
