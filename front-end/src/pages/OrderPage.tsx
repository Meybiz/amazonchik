
import { useContext } from 'react';
import { Store } from '../Store';
import { useParams, Link } from 'react-router-dom';
import { useGetOrderDetQuery } from './../hooks/orderHook';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { getError } from './../utils';
import { ApiEr } from '../types/ApiEr';
import { Helmet } from 'react-helmet-async';
import { Row, Col, Card, ListGroup } from 'react-bootstrap';
export default function OrderPage() {
    const {state} = useContext(Store)
    const {userInfo} = state

    const par = useParams()
    const {id: orderId} = par

    const {
        data: order, isLoading, error
    } = useGetOrderDetQuery(orderId!)
    
    
    return isLoading ? (
        <Loading></Loading>
    ) 
    :
    error ? (
        <Message variant='danger'>{getError(error as ApiEr)}</Message>
    )
    :
    !order ? (
        <Message variant='danger'>Заказ не найден</Message>
    ) : (
        <div>
            <Helmet>
                <title>Order {orderId}</title>
            </Helmet>
            <h1 className='my-3'>Заказ</h1>
            <Row>
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title> Покупки</Card.Title>
                            <Card.Text>
                                <strong>ФИО {order!.shipAddress.fullName}</strong>
                                <strong>Адресс {order!.shipAddress.address}</strong>,
                                {order!.shipAddress.city}, {order!.shipAddress.postalCode},
                                {order!.shipAddress.country}
                            </Card.Text>
                            {order.isDeliver ? (
                                <Message variant='success'>Доставлено по адресу {order.deliverAt}</Message>
                            ) : (
                                <Message variant='danger'>Не доставлено</Message>
                            )}
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>Способ оплаты</Card.Title>
                            <Card.Text>
                                <strong>Метод:</strong> {order.payMethod}
                            </Card.Text>
                            {order.isPaid ? (
                                <Message variant='success'>Оплачно {order.paidAt}</Message>
                            ) : (
                                <Message variant='danger'>Не оплачено</Message>
                            )}
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>Покупки</Card.Title>
                            <ListGroup variant='flush'>
                                {order.orderItems.map((i) => (
                                    <ListGroup.Item key={i._id}>
                                        <Row className='align-items-center'>
                                            <Col md={6}>
                                                <img
                                                    src={i.image}
                                                    alt={i.name}
                                                    className='img-fluid rounded img-thumbnail'
                                                ></img>{' '}
                                                <Link to={`/product/${i.slug}`}>{i.name}</Link>
                                            </Col>
                                            <Col md={3}>
                                                <span>{i.quantity}</span>
                                            </Col>
                                            <Col md={3}>
                                                ${i.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                <Card>
                        <Card.Body>
                            <Card.Title>Общая стоимость</Card.Title>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Товары:</Col>
                                        <Col>${order.itemsPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>НДС:</Col>
                                        <Col>${order.taxPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Общая:</Col>
                                        <Col>${order.totalPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
