import { Navbar, Container, Nav, NavDropdown,} from 'react-bootstrap';
import {useContext, useEffect} from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Store } from './Store';
import { ToastContainer } from 'react-toastify';
import { LinkContainer } from 'react-router-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import Search from './components/Search';
import Icon from '../public/images/icons.png';
function App() {
  const {state: {mode, cart, userInfo}, dispatch} = useContext(Store);
  // const [searchResults, setSearchResults] = useState([]);

  // const handleSearch = async (searchItem: string) => {
  //   try {
  //     const res = await fetch(`/api/search/${searchItem}`)
  //     const searchRes = await res.json();

  //     setSearchResults(searchRes);
  //   }
  //   catch (err) {
  //     console.error(err);
  //   }
  // }

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
            <Search />
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
                  <span className='cart-badge' style={cart.cartItems.reduce((a, c) => a + c.quantity, 0) > 9 ? {right: '1.3%'} : {right: '1.55%'}}>
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
              {["В моде сегодня", "Популярное", "Распродажа"].map((x)=> (
                <Link to={`/search?tag=${x}`} key={x} className='nav-link header-link p-2 px-2'>{x}</Link>
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
