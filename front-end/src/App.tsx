import { Navbar, Container, Nav } from 'react-bootstrap';

import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div className='d-flex flex-column vh-100'>
      <header>
        <Navbar bg="dark" variant='dark' expand="lg">
          <Container>
            <Navbar.Brand>AMAZONCHIK-TS</Navbar.Brand>
          </Container>
          <Nav>
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
