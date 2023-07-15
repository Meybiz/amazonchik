
<<<<<<< HEAD:src/components/Search.tsx
import { CardStore } from '../mobx-store/card-store';
import { observer } from 'mobx-react-lite';
import { CardItems } from '../types/CardType';
import { toast } from 'react-toastify';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Ratings from './Ratings';
import { convertProdItem } from '../utils';
import { Store } from '../Store';
import { useContext, useEffect } from 'react';
import { MobXContext } from '../mobx-store/mobx-context';
import { Product }  from '../types/Product';

const Search = observer(({product}: {product: Product}) => {
    const useStore = useContext(MobXContext)
    const { dispatch} = useContext(Store);
    const addToCartHandler = (item: CardItems) => {
        const existItem = useStore.searchCards.find((x) => x._id === item._id)
        const quantity = existItem ? existItem.quantity + 1 : 1
        if (useStore.filteredCards[0].countInStock < quantity) {
            alert('Sorry. Product is out')
            return
        } 
        dispatch({
            type: 'ADD_TO_CART',
            payload: {...item, quantity},
        })
        toast.success('Товар добавлен в корзину')
    }

    useEffect(()=>{
    }, [useStore.filteredCards])
     const filter = useStore.filteredCards.slice()
    console.log(filter)
    return (
        <>
    {useStore.filteredCards.length !== 0 ? (

        
        <Card>
        <Link to={`/product/${useStore.filteredCards[0].slug}`}>
            <img className='card-img-top' src={useStore.filteredCards[0].image} alt={useStore.filteredCards[0].name} />
        </Link>
        <Card.Body>
            <Link to={`/product/${useStore.filteredCards[0].slug}`}>
                <Card.Title>{useStore.filteredCards[0].name}</Card.Title>
            </Link>
        </Card.Body>
        <Ratings ratings={useStore.filteredCards[0].rating} numReview={useStore.filteredCards[0].numReviews} captions='' />
        <Card.Text>${useStore.filteredCards[0].price}</Card.Text>
        {useStore.filteredCards[0].countInStock === 0 ? (
            <Button variant='light' className='out' disabled>
                Нет в наличии
            </Button>
        ) : (
            <Button variant='primary' className='add' onClick={() => addToCartHandler(convertProdItem(product))}>Добавить в Корзину</Button>
        )
    }
    </Card>
    
    ) : (
        <div>Не удалось найти</div>
    )}
    </>
    )
})

export default Search;
=======
import { useState } from 'react';
import { FormControl, Button, Form, InputGroup } from 'react-bootstrap';
export default function Search() {
    const [searchItem, setSearchItem] = useState('');
    //Отправка при нажатии запроса для получение данных массива с товарами
    const handleSearch = async () => {
        try {
        const res = await fetch('http://localhost:4000/api/products', {
            method: 'GET',
        });
        console.log(res);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <Form className='flex-grow-1 d-flex me-auto'>
                <InputGroup>
            <FormControl type="search"
                value={searchItem}
                name='q' id='q' placeholder='Поиск...' aria-label='search' aria-describedby='button-search'
                onChange={(e) => setSearchItem(e.target.value)}>
            </FormControl>
            <Button variant='outline-primary' type='button' id='button-search' onClick={handleSearch}>
                <i className='fa fa-search'></i>
            </Button>
            </InputGroup>
            </Form>
        </div>
    )
}
>>>>>>> 09553905dbf76c56aac6924253135ecde3c8111a:front-end/src/components/Search.tsx
