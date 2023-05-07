import { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { signinMutate } from '../hooks/userHook';
import { toast } from 'react-toastify';
import { getError } from './../utils';
import { ApiEr } from '../types/ApiEr';
import { Helmet } from 'react-helmet-async';
import { Container, Form, Button } from 'react-bootstrap';
import Loading from '../components/Loading';

export default function LoginPage() {

    const nav = useNavigate()
    const {search} = useLocation()
    const redirectInurl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInurl ? redirectInurl : '/'


    const [email, SetEmail] = useState('')
    const [password, SetPassword] = useState('')

    const {state, dispatch} = useContext(Store)
    const {userInfo} = state

    const {mutateAsync : signin, isLoading} = signinMutate()

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            const data = await signin({email, password})
            dispatch({type: 'LOGIN', payload: data})
            localStorage.setItem('userInfo', JSON.stringify(data))
            nav(redirect || '/')
        } 
        catch (error) {
            toast.error(getError(error as ApiEr))
        }
    }

    useEffect(() => {
        if (userInfo) {
            nav(redirect || '/')
        }
    }, [nav, redirect, userInfo])

    return (
        <Container className="small-container">
            <Helmet>
                <title>Войти</title>
            </Helmet>
            <h1 className='my-2'>Войти</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='mb-3' controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required onChange={(e) => SetEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className='mb-3' controlId='password'>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" required onChange={(e) => SetPassword(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <div className='mb-3'>
                        <Button disabled={isLoading} type='submit'>
                            Войти
                        </Button>
                        {isLoading && <Loading />}
                    </div>
                    <div className='mb-3'>
                        Нет аккаунта? {' '}
                        <Link to={`/signup?redirect=${redirect}`}>Зарегистрироваться</Link>
                    </div>
                </Form.Group>
            </Form>
        </Container>
    )
}