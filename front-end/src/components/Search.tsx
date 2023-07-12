
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
