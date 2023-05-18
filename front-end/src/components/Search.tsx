
import { useState } from 'react';
import { FormControl, Button, Form, InputGroup } from 'react-bootstrap';
export default function Search({ onSearch }: any) {
    const [searchItem, setSearchItem] = useState('');

    const searchHandler = () => {
        onSearch(searchItem);
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
            <Button variant='outline-primary' type='submit' id='button-search' onClick={searchHandler}>
                <i className='fa fa-search'></i>
            </Button>
            </InputGroup>
            </Form>
        </div>
    )
}
