import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { useContext, useEffect } from 'react';
import { useCreateOrderMutate } from "../hooks/orderHook";
import { toast } from "react-toastify";
import { getError } from './../utils';
import { ApiEr } from "../types/ApiEr";
import ChekStep from './../components/ChekStep';
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Loading from "../components/Loading";



export default function PlaceOrderPAge() {
    const nav = useNavigate()
    const {state, dispatch} = useContext(Store)
    const {cart, userInfo} = state

    const round = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100

    cart.itemPrice = round(cart.cartItems.reduce((a, b) => a + b.price * b.quantity, 0))
    cart.shipPrice = cart.itemPrice > 100 ?  round(0) : round(10)
    cart.taxprice = round(0.15 * cart.itemPrice)
    cart.totalPrice = cart.itemPrice + cart.shipPrice + cart.taxprice



    const {mutateAsync: createOrder, isLoading} = useCreateOrderMutate()


    const placeOrderhandler = async () => {
        try {
            const data = await createOrder({
                orderItems: cart.cartItems,
                shipAddress: cart.shipAddress,
                payMethod: cart.payMethod,
                itemsPrice: cart.itemPrice,
                shipPrice: cart.shipPrice,
                taxPrice: cart.taxprice,
                totalPrice: cart.totalPrice,
            })
            dispatch({type: 'CLEAR_CART'})
            localStorage.removeItem('cartItems')
            nav(`/order/${data.order._id}`)
        } catch (error) {
            toast.error(getError(error as ApiEr))
        }
    }

    useEffect(() => {
        if (!cart.payMethod) {
            nav('/payment')
        }
    }, [cart, nav])

    return (
        <div>
            <ChekStep step1 step2 step3 step4></ChekStep>
            <Helmet>
                <title>Покупки</title>
            </Helmet>
            <h1 className="my-3">Информация об оплате</h1>
            <Row>
                <Col md={8}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>О покупателе</Card.Title>
                            <Card.Text>
                                <strong>ФИО:</strong> {cart.shipAddress.fullName} <br/>
                                <strong>Адрес:</strong> {cart.shipAddress.address} <br/>
                                {cart.shipAddress.city}, {cart.shipAddress.postalCode},
                                {cart.shipAddress.country}
                            </Card.Text>
                            <Link to="/shipping">Изменить</Link>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>Оплата</Card.Title>
                            <Card.Text><strong>Метод:</strong> {cart.payMethod}</Card.Text>
                            <Link to="/payment">Изменить</Link>
                        </Card.Body>
                    </Card>
                </Col>

                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title>Список покупок</Card.Title>
                        <ListGroup variant="flush">
                            {cart.cartItems.map((i) => (
                                <ListGroup.Item key={i._id}>
                                    <Row className="align-items-center">
                                        <Col md={6}>
                                            <img src={i.image} alt={i.name} className="img-fluid rounded img-thumbnail" />{" "}
                                            <Link to={`/product/${i.slug}`}>{i.name}</Link>
                                        </Col>
                                        <Col md={3}>
                                            <span>{i.quantity}</span>
                                        </Col>
                                        <Col md={3}>${i.price}</Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <Link to="/cart">Edit</Link>
                    </Card.Body>
                </Card>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Информация о заказе</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Товаров на сумму</Col>
                                        <Col>${cart.itemPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Доставка</Col>
                                        <Col>${cart.shipPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Налог</Col>
                                        <Col>${cart.taxprice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col><strong>Общая цена</strong></Col>
                                        <Col>${cart.totalPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button type="button" disabled={cart.cartItems.length === 0 || isLoading} onClick={placeOrderhandler}>Купить</Button>
                                        {isLoading && <Loading></Loading>}
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