import { Button, Card } from 'react-bootstrap';
import { Product }  from '../types/Product';
import { Link } from 'react-router-dom';
import Ratings from './Ratings';

function ProdItem ({product}: {product: Product}) {
    return <Card>
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
            <Button variant='primary' className='add'>Добавить в Корзину</Button>
        )
    }
    </Card>
}

export default ProdItem
