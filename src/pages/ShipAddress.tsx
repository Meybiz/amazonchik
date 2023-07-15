import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from 'react'
import { Store } from "../Store";
import ChekStep from "../components/ChekStep";
import { Helmet } from "react-helmet-async";
import { Button, Form } from "react-bootstrap";


export default function ShipAddress () {
    const nav = useNavigate()
    const {state, dispatch } = useContext(Store)
    const {cart: {shipAddress, payMethod},} = state

    const [payMethodName, setPayMethodName] = useState(payMethod || 'PayPal')

    useEffect(() => {
        if (!shipAddress.address) {
            nav('/shipping')
        }
    }, [shipAddress, nav])


    const submithandler = (e:React.SyntheticEvent) => {
        e.preventDefault()
        dispatch({type: 'SAVE_PAY_METHOD', payload: payMethodName})
        localStorage.setItem('payMethod', payMethodName)
        nav('/placeorder')
    }

    return (
        <div>
            <ChekStep step1 step2 step3></ChekStep>
            <div className="container small-container"></div>
            <Helmet>
                <title>Способ Оплаты</title>
            </Helmet>
        <h1 className="my-3">Способ Оплаты</h1>
        <Form onSubmit={submithandler}>
            <div className="mb-3">
                <Form.Check type="radio" id="paypal" label="PayPal" value="PayPal" checked={payMethodName === 'PayPal'} onChange={(e) => setPayMethodName(e.target.value)}></Form.Check>
            </div>
            <div className="mb-3">
                <Button type='submit'>Оплатить</Button>
            </div>
        </Form>
        </div>
    )
}