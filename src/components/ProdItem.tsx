import { Button, Card } from 'react-bootstrap';
import { Product }  from '../types/Product';
import { Link } from 'react-router-dom';
import Ratings from './Ratings';
import { useContext } from 'react';
import { Store } from '../Store';
import { CardItems } from '../types/CardType';
import { convertProdItem } from '../utils';
import { toast } from 'react-toastify';

function ProdItem ({product}: {product: Product}) {
    const {state, dispatch} = useContext(Store);
    const {
        cart: {
            cartItems
        }
    } = state

    const addToCartHandler = (item: CardItems) => {
        const existItem = cartItems.find((x) => x._id === item._id)
        const quantity = existItem ? existItem.quantity + 1 : 1
        if (product.countInStock < quantity) {
            alert('Sorry. Product is out')
            return
        } 
        dispatch({
            type: 'ADD_TO_CART',
            payload: {...item, quantity},
        })
        toast.success('Товар добавлен в корзину')
    }
    return (
        <Card>
        <Link to={`/product/${product.slug}`}>
            <img className='card-img-top' src={product.image} alt={product.name} />
        </Link>
        <Card.Body>
            <Link to={`/product/${product.slug}`}>
                <Card.Title>{product.name}</Card.Title>
            </Link>
        </Card.Body>
        <Ratings ratings={product.rating} numReview={product.numReviews} captions='' />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
            <Button variant='light' className='out' disabled>
                Нет в наличии
            </Button>
        ) : (
            <Button onClick={() => addToCartHandler(convertProdItem(product))} variant='primary' className='add'>Добавить в Корзину</Button>
        )
    }
    </Card>
    )}

export default ProdItem
