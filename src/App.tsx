import { Navbar, Container, Nav, NavDropdown, } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Store } from './Store';
import { ToastContainer } from 'react-toastify';
import { LinkContainer } from 'react-router-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { FormControl, Button, Form, InputGroup } from 'react-bootstrap';
import Icon from '../public/images/icons.png';
import axios from 'axios';
import { CardStore } from './mobx-store/card-store';
import { observer } from 'mobx-react-lite';
import Search from './components/Search';
import { MobXContext } from './mobx-store/mobx-context'

const App = observer(() => {
  const appStore = useContext(MobXContext)
  const { state: { mode, cart, userInfo }, dispatch } = useContext(Store);
  const [searchItem, setSearchItem] = useState('');
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState(false);


  

  const switchHandlerTheme = () => {
    dispatch({ type: 'SWITCH_MODE' })
  }

  const signOutHandler = () => {
    dispatch({ type: 'SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shipAddress')
    localStorage.removeItem('payMethod')
    window.location.href = '/signin'
  }

  
    //Отправка при нажатии запроса для получение данных массива с товарами
    const handleSearch = async () => {
        try {
        const res = await axios.get('http://localhost:4000/api/products', {
            params: {
                search: searchItem,
            },
        });
        sessionStorage.setItem('searchItem', JSON.stringify(res.data));
        appStore.setSearchCards(res.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        if (appStore.searchCards.length !== 0) {
        const filtered = appStore.searchCards.filter((item) => {
          setSearch(true)
            return item.name.includes(searchItem);
        })
        appStore.setFilteredCards(filtered);
        
    }
    }, [appStore.searchCards]);

    useEffect(() => {
        document.body.setAttribute('data-bs-theme', mode);
    }, [mode]);
  return (
    <MobXContext.Provider value={appStore}>
    <div className='d-flex flex-column vh-100'>
      <ToastContainer position='bottom-center' limit={1} />
      <header>
        <Navbar expand="lg" className='d-flex flex-column align-items-stretch p-2 pb-0 mb-3' variant='dark' bg='dark'>
          <div className='d-flex justify-content-between align-items-center'>
            <LinkContainer to='/'><Navbar.Brand className='header-link' onClick={() => setSearch(false)}>AMAZONCHIK-TS</Navbar.Brand></LinkContainer>
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
            <Navbar.Collapse>
              <Nav className='w-100 justify-content-end'>
                <Link to="#" className='nav-link header-link' onClick={switchHandlerTheme}>
                  <i className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}></i>{" "}
                  {mode === 'light' ? 'Light' : 'Dark'}
                </Link>
                {userInfo ?
                  (
                    <NavDropdown className='header-link' title={`Привет, ${userInfo?.name}`}>
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>Профиль</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/orderhistory'>
                        <NavDropdown.Item>История Заказов</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link className='dropdown-item' to='#signout' onClick={signOutHandler}>Выйти</Link>
                    </NavDropdown>
                  )
                  :
                  (
                    <NavDropdown className='header-link' title={`Привет, Зайди`}>
                      <LinkContainer to='/signin'>
                        <NavDropdown.Item>Войти</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )
                }
                <Link to={"/orderhistory"} className='nav-link header-link'>История Заказов</Link>
                <Link to="/cart" className='nav-link header-link p-0'>
                  {
                    <span className='cart-badge' style={cart.cartItems.reduce((a, c) => a + c.quantity, 0) > 9 ? { right: '1.3%' } : { right: '1.55%' }}>
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)

                      }
                    </span>
                  }
                  <span className='p-2 header-link'><img src={Icon} /></span>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </div>
          <div className='sub-header'>
            <div className='d-flex'>
              <Link to={'#'} className='nav-link header-link p-2'>
                <i className='fas fa-bars p-1'></i>Все
              </Link>
              {["В моде сегодня", "Популярное", "Распродажа"].map((x) => (
                <Link to={`/search?tag=${x}`} key={x} className='nav-link header-link p-2 px-2'>{x}</Link>
              ))}
            </div>
          </div>
        </Navbar>
      </header>
      <main>
        <Container className='mt-3'>
          {search ? (
            <Search />
          ) : (
            <Outlet />
          )}
          {/* <Outlet /> */}
        </Container>
      </main>
      <footer>
        <div className='text-center'>All Right!</div>
      </footer>
    </div>
    </MobXContext.Provider>
  )
})

export default App
