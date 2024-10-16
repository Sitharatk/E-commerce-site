import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import ShopProvider from './Context/shopContext.jsx'
import CartProvider from './Context/CartContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ShopProvider>
      <CartProvider>
        <App />
     </CartProvider>
    </ShopProvider>
     </BrowserRouter>
  </StrictMode>,
)
