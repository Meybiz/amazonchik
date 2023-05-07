import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { Store } from '../Store';
import { signupMutate } from '../hooks/userHook';
import { toast } from 'react-toastify';
import { getError } from './../utils';
import { ApiEr } from '../types/ApiEr';
import { Container, Form, Button, } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
export default function Regpage() {

    const nav = useNavigate()
    const { search } = useLocation()
    const redirectUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectUrl ? redirectUrl : '/'


    const [name, Setname] = useState('')
    const [email, SetEmail] = useState('')
    const [pass, SetPass] = useState('')
    const [confirmPass, SetConfirmPass] = useState('')

    const { state, dispatch } = useContext(Store)
    const { userInfo } = state

    useEffect(() => {
        if (userInfo) {
            nav(redirect)
        }
    }, [userInfo, redirect, nav])

    const { mutateAsync: signup, isLoading } = signupMutate()


    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (pass !== confirmPass) {
            toast.error('Пароли не совпадают')
            return
        }
        try {
            const data = await signup({ name, email, password: pass })
            dispatch({ type: 'LOGIN', payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data))
            nav(redirect)
        }
        catch (error) {
            toast.error(getError(error as ApiEr))
        }
    }
    return (
        <Container className='small-container'>
            <Helmet>
                <title>Регистрация</title>
            </Helmet>
            <h1 className='my-2'>Зарегистрироваться</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='mb-3' controlId='name'>
                    <Form.Label>Имя</Form.Label>
                    <Form.Control onChange={(e) => Setname(e.target.value)} required />
                </Form.Group>
                <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email</Form.Label>
                    <Form.Control type="email" onChange={(e) => SetEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className='mb-3' controlId='password'>
                <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" onChange={(e) => SetPass(e.target.value)} required />
                </Form.Group>
                <Form.Group className='mb-3' controlId='confirmPass'>
                <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" onChange={(e) => SetConfirmPass(e.target.value)} required />
                </Form.Group>

                <div className='mb-3'>
                    <Button disabled={isLoading} type="submit">Зарегистрироваться</Button>
                </div>

                <div className='mb-3'>
                    Уже есть Аккаунт? {' '}
                    <Link to={`/signin?redirect=${redirect}`}>Войти</Link>
                </div>
            </Form>
        </Container>
    )
}