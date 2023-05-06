import { Navbar, Container, Nav, Button, Badge } from 'react-bootstrap';
import {useContext, useEffect} from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Store } from './Store';
import { ToastContainer } from 'react-toastify';
import { LinkContainer } from 'react-router-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const {state: {mode, cart}, dispatch} = useContext(Store);
  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode);
  }, [mode]);

  const switchHandlerTheme = () => {
    dispatch({type: 'SWITCH_MODE'})
  }
  return (
    <div className='d-flex flex-column vh-100'>
      <ToastContainer position='bottom-center' limit={1}/>
      <header>
        <Navbar expand="lg">
          <Container>
            <LinkContainer to='/'><Navbar.Brand>AMAZONCHIK-TS</Navbar.Brand></LinkContainer>
          </Container>
          <Nav>
            <Button variant={mode} onClick={switchHandlerTheme}>
              <i className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}></i>
            </Button>
            <Link to='/cart' className='nav-link'>Корзина
            {
              cart.cartItems.length > 0 && (
                <Badge pill bg='danger'>
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )
            }</Link>
            <Nav.Link href='/signin'>Войти</Nav.Link>
          </Nav>
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
