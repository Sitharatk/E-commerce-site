import { Routes,Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Signup from './Pages/Signup'
import Login from './Pages/Login';
import Home from './Pages/Home'
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import Product from './Pages/Product';
import AboutUs from './Pages/AboutUs';
import Contact from './Pages/Contact';
import Cart from './Pages/Cart';
function App() {


  return (
    <>
    <Navbar/>
    <Routes>
     <Route path='/login' element={<Login/>}/>
     <Route path='/signup' element={<Signup/>}/>
     <Route path='/' element={<Home/>}/>
    <Route path='/product' element={<Product/>}>
      <Route path=':productId' element={<Product/>}/>
    </Route>
    <Route path='/aboutus' element={<AboutUs/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/cart' element={<Cart/>}/>

    </Routes>
    <Footer/>
    
    </>
  )
}

export default App
