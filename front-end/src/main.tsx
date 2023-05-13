import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Products from './pages/Products';
// import axios from 'axios';
import { HelmetProvider } from 'react-helmet-async';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { StoreProv } from './Store.tsx';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage.tsx';
import Regpage from './pages/Regpage.tsx';
import ShipPage from './pages/ShipPage.tsx';
import ShipAddress from './pages/ShipAddress';
import ProtectRoute from './components/ProtectRoute.tsx';
import PlaceOrderPAge from './pages/PlaceOrderPAge.tsx';
// axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '/';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Home />} />
      <Route path='product/:slug' element={<Products />} />
      <Route path='cart' element={<CartPage />}></Route>
      <Route path='signin' element={<LoginPage />}></Route>
      <Route path='signup' element={<Regpage />}></Route>
      <Route path='' element={<ProtectRoute />}>
        <Route path='shipping' element={<ShipPage />}></Route>
        <Route path='payment' element={<ShipAddress />}></Route>
        <Route path='placeorder' element={<PlaceOrderPAge />}></Route>
      </Route>
      
    </Route>
  )
);
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StoreProv>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </HelmetProvider>
    </StoreProv>
  </React.StrictMode>,
)
