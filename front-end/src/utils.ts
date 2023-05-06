import { Product } from "./types/Product";
import { ApiEr } from "./types/ApiEr";
import { CardItems } from "./types/CardType";

export const getError = (error: ApiEr) => {
    return error.response && error.response.data.message ? error.response.data.message : error.message
}

export const convertProdItem = (product : Product): CardItems => {
    const cardItem: CardItems = {
        image: product.image,
        slug: product.slug,
        quantity: 1,
        countInStock: product.countInStock,
        price: product.price,
        _id: product._id,
        name: product.name,
    }
    return cardItem
}