import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState} from 'react'
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import ChekStep from '../components/ChekStep';
import { Form, Button } from 'react-bootstrap';
    export default function ShipPage() {

    const nav = useNavigate();
    const { state, dispatch } = useContext(Store);
    const {
        userInfo,
        cart: { shipAddress },
    } = state


    // useEffect(() => {
    //     if (!userInfo) {
    //         nav('/signin?redirect=/shipping')
    //     }
    // }, [userInfo, nav])

    const [fullName, setFullName] = useState(shipAddress.fullName || '')
    const [address, setAddress] = useState(shipAddress.address || '')
    const [city, setCity] = useState(shipAddress.city || '')
    const [postalCode, setPostalCode] = useState(shipAddress.postalCode || '')
    const [country, setCountry] = useState(shipAddress.country || '')


    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault()
        dispatch({
            type: 'SAVE_SHIP_ADDRESS',
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country,
            },
        })
        localStorage.setItem('shipAddress', JSON.stringify({
                fullName,
                address,
                city,
                postalCode,
                country,
        }))
        nav('/payment')
    }

    return (
        <div>
            <Helmet>
                <title>Адрес Доставки</title>
            </Helmet>
            <ChekStep step1 step2></ChekStep>
            <div className='container small-container'>
                <h1 className='my-3'>Адрест Доставки</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className='mb-3' controlId='fullName'>
                        <Form.Label>ФИО</Form.Label>
                        <Form.Control value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='address'>
                        <Form.Label>Адресс</Form.Label>
                        <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='city'>
                        <Form.Label>Город</Form.Label>
                        <Form.Control value={city} onChange={(e) => setCity(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='postalCode'>
                        <Form.Label>Почтовый индекс</Form.Label>
                        <Form.Control value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='country'>
                        <Form.Label>Страна</Form.Label>
                        <Form.Control value={country} onChange={(e) => setCountry(e.target.value)} required />
                    </Form.Group>
                    <div className='mb-3'>
                        <Button type='submit' variant='primary'>Заказать</Button>
                    </div>
                </Form>
            </div>
            
        </div>
    )
}