import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import ShopProvider from './Context/shopContext.jsx'
import CartProvider from './Context/CartContext.jsx'
import UserProvider from './Context/UserContext.jsx'
import { WishlistProvider } from './Context/WishlistContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <UserProvider>
    <WishlistProvider>
    <BrowserRouter>
  
    <ShopProvider>
      <CartProvider>
        <App />
     </CartProvider>
    </ShopProvider>
   
     </BrowserRouter>
     </WishlistProvider>
     </UserProvider>
  </StrictMode>,
)
