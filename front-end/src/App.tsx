import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import {useContext, useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import { Store } from './Store';

function App() {
  const {state: {mode}, dispatch} = useContext(Store);
  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode);
  }, [mode]);

  const switchHandlerTheme = () => {
    dispatch({type: 'SWITCH_MODE'})
  }
  return (
    <div className='d-flex flex-column vh-100'>
      <header>
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand>AMAZONCHIK-TS</Navbar.Brand>
          </Container>
          <Nav>
            <Button variant={mode} onClick={switchHandlerTheme}>
              <i className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}></i>
            </Button>
            <Nav.Link href='/cart'>Cart</Nav.Link>
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
