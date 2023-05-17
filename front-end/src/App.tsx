import { Navbar, Container, Nav, Button, Badge, NavDropdown, Form, InputGroup, FormControl } from 'react-bootstrap';
import {useContext, useEffect} from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Store } from './Store';
import { ToastContainer } from 'react-toastify';
import { LinkContainer } from 'react-router-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const {state: {mode, cart, userInfo}, dispatch} = useContext(Store);
  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode);
  }, [mode]);

  const switchHandlerTheme = () => {
    dispatch({type: 'SWITCH_MODE'})
  }

  const signOutHandler = () => {
    dispatch({type: 'SIGNOUT'})
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shipAddress')
    localStorage.removeItem('payMethod')
    window.location.href = '/signin'
  }
  return (
    <div className='d-flex flex-column vh-100'>
      <ToastContainer position='bottom-center' limit={1}/>
      <header>
        <Navbar expand="lg" className='d-flex flex-column align-items-stretch p-2 pb-0 mb-3' variant='dark' bg='dark'>
          <div className='d-flex justify-content-between align-items-center'>
            <LinkContainer to='/'><Navbar.Brand className='header-link'>AMAZONCHIK-TS</Navbar.Brand></LinkContainer>

            <Form className='flex-grow-1 d-flex me-auto'>
              <InputGroup>
                <FormControl type="text" name='q' id='q' placeholder='Поиск...' aria-label='search' aria-describedby='button-search'></FormControl>
                <Button variant='outline-primary' type='submit' id='button-search'>
                  <i className='fa fa-search'></i>
                </Button>
              </InputGroup>
            </Form>
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
                  <span className='cart-badge'>
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </span>
                }
                <span>Корзина</span>
              </Link>
              </Nav>
            </Navbar.Collapse>
          </div>
          <div className='sub-header'>
            <div className='d-flex'>
              <Link to={'#'} className='nav-link header-link p-2'>
                <i className='fas fa-bars'></i>Все
              </Link>
              {["В моде сегодня", "Популярное", "Распродажа"].map((x)=> (
                <Link to={`/search?tag=${x}`} key={x} className='nav-link header-link p-2 px-3'>{x}</Link>
              ))}
            </div>
          </div>
          
        </Navbar>
      </header>
      <main>
        <Container className='mt-3'>
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className='text-center'>All Right!</div>
      </footer>
    </div>
  )
}

export default App
