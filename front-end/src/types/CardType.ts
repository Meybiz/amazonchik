export type CardItems = {
    image: string | undefined
    slug: string
    quantity: number
    countInStock: number
    price: number
    _id: string
    name: string
}

export type ShipAddress = {
    fullName: string
    address: string
    city: string
    postalCode: string
    country: string
}

export type Cart = {
    cartItems: CardItems[]
    shipAddress: ShipAddress
    payMethod: string
    itemPrice: number
    shipPrice: number
    taxprice: number
    totalPrice: number
}