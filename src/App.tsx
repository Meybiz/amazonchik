import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { sampleProd } from './data';

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
          <Row>
            {
              sampleProd.map((prod) => (
                <Col key={prod.slug} sm={6} md={4} lg={3}>
                  <img src={prod.image} alt={prod.name} className='product-image' />
                  <h2>{prod.name}</h2>
                  <p>${prod.price}</p>
                </Col>
              )
              )
            }
          </Row>
        </Container>
      </main>
      <footer>
        <div className='text-center'>All Right!</div>
      </footer>
    </div>
  )
}

export default App
