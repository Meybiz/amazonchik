import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { CardItems } from '../types/CardType';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Row, Col, ListGroup, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';

export default function CartPage() {

    const nav = useNavigate();

    const {
        state: {
            mode,
            cart: { cartItems },
        },
        dispatch,
    } = useContext(Store);


    const updateHandler = async (item: CardItems, quantity: number) => {
        if (item.countInStock < quantity) {
            toast.warn('Sorry. Product is out')
            return
        } 
        dispatch({
            type: 'ADD_TO_CART',
            payload: {...item, quantity},
        })
        nav('/cart')
    }
    const checkHandler = () => {
        nav('/signin?redirect=/shipping')
    }

    const removehandler = (item: CardItems) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: item,
        })
    }
    return (
        <div>
            <Helmet>
                <title>Shop Card</title>
            </Helmet>
            <h1>Shopping Caarts</h1>
            <Row>
                <Col md={8}>
                    {
                        cartItems.length === 0 ? (
                            <Message>
                                Твоя корзина пуста. <Link to='/'>На главную</Link>
                            </Message>
                        ) : (
                            <ListGroup variant='flush'>
                                {
                                    cartItems.map((item: CardItems) => (
                                        <ListGroup.Item key={item._id}>
                                                <Row className='align-items-center'>
                                                    <Col md={4}>
                                                        <img src={item.image} alt={item.name} className='img-fluid rounded thumbnail'></img>
                                                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={3}>
                                                        {' '}
                                                        <Button 
                                                        onClick={() => updateHandler(item, item.quantity - 1)}
                                                        variant={mode}
                                                        disabled={item.quantity === 1}
                                                        ><i className='fas fa-minus-circle'></i></Button>
                                                        <span>{item.quantity}</span>
                                                        <Button 
                                                        onClick={() => updateHandler(item, item.quantity + 1)}
                                                        variant={mode}
                                                        disabled={item.quantity === item.countInStock}
                                                        ><i className='fas fa-plus-circle'></i></Button>
                                                    </Col>
                                                    <Col md={2}>
                                                        <Button variant={mode} onClick={() => removehandler(item)}>
                                                            <i className='fas fa-trash'></i>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        )
                    }
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>
                                        Всего  ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}{' '} товаров) :
                                        ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                                    </h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className='d-grid'>
                                        <Button 
                                        type='button'
                                        variant='primary'
                                        onClick={checkHandler}
                                        disabled={cartItems.length === 0}
                                        >
                                            Proceed Checkout
                                        </Button>
                                        </div>
                                    
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}