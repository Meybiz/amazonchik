import { Row, Col } from 'react-bootstrap';
    export default function ChekStep(props: {

    step1?: boolean,
    step2?: boolean
    step3?: boolean,
    step4?: boolean
}) {
    return (
        <Row className='checkout-steps'>
                <Col className={props.step1 ? "active" : ""}>Вход</Col>
                <Col className={props.step2 ? "active" : ""}>Доставка</Col>
                <Col className={props.step3 ? "active" : ""}>Оплата</Col>
                <Col className={props.step4 ? "active" : ""}>Оформить заказ</Col>
        </Row>
    )
}