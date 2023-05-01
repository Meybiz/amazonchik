import { Row, Col } from 'react-bootstrap';
import { sampleProd } from '../data';
import { Link } from 'react-router-dom';
import { Products } from './Products';
import { useReducer, useEffect } from 'react';
import { getError } from './../utils';
import { ApiEr } from '../types/ApiEr';
import axios from 'axios';
import Loading from '../components/Loading';
import Message from '../components/Message';
// import Loading from './../components/Loading';

type State = {
    products: Products[]
    loading: boolean
    error: string
}

type Action = 
    {type: 'FETCH_REQUEST'} 
    | 
    { 
        type: 'FETCH_SUCCESS'
        payload: Products[] 
    } 
    | 
    {type: 'FETCH_FAIL'; payload: string}

    const initialState: State = {
        products: [],
        loading: true,
        error: ''
    }

    const reducer = (state: State, action: Action) => {
        switch (action.type) {
            case 'FETCH_REQUEST':
                return { ...state, loading: true }
            case 'FETCH_SUCCESS':
                return { ...state, products: action.payload, loading: false }
            case 'FETCH_FAIL':
                return { ...state, error: action.payload, loading: false }
            default:
                return state
        }
    }


export default function Home() {
    const [{loading, error, products}, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, initialState)

    useEffect(() => {
        const fetchData = async () => {
            dispatch({type: 'FETCH_REQUEST'})
            try {
                const result = await axios.get('/api/products')
                dispatch({type: 'FETCH_SUCCESS', payload: result.data})
            } catch (err) {
                dispatch({type: 'FETCH_FAIL', payload: getError(err as ApiEr)})
            }
        }
        fetchData()
    }, [])
    return (
        loading ? (
            <Loading />
        ) : error ? (
            <Message variant='danger'>{error}</Message>
        ) :
        <Row>
            {
                sampleProd.map((prod) => (
                    <Col key={prod.slug} sm={6} md={4} lg={3}>
                        <Link to={'/product/' + prod.slug}>
                            <img src={prod.image} alt={prod.name} className='product-image' />
                            <h2>{prod.name}</h2>
                            <p>${prod.price}</p>
                        </Link>
                    </Col>
                )
                )
            }
        </Row>
    )
}
