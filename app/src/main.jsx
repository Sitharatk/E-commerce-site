import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import ShopProvider from './Context/shopContext.jsx'
import CartProvider from './Context/CartContext.jsx'
import UserProvider from './Context/UserContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <UserProvider>
    <ShopProvider>
      <CartProvider>
        <App />
     </CartProvider>
    </ShopProvider>
    </UserProvider>
     </BrowserRouter>
  </StrictMode>,
)
