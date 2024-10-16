import { Routes,Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
import Collections from './Pages/Collections';
import Catogory from './Pages/Catogory';
import Payment from './Pages/Payment';
import UserData from './Pages/UserData';
import Orders from './Pages/Orders';
function App() {


  return (
    <>
    <ToastContainer />
    <Navbar/>
    <Routes>
     <Route path='/login' element={<Login/>}/>
     <Route path='/signup' element={<Signup/>}/>
     <Route path='/' element={<Home/>}/>
    
    <Route path='/product/:id' element={<Product />} />
    <Route path='/collections' element={<Collections/>}/>
    <Route path='/catogory/:category' element={<Catogory/>}/>
    <Route path='/aboutus' element={<AboutUs/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/payment' element={<Payment/>}/>
    <Route path='/userdata' element={<UserData/>}/>
    <Route path='/orders' element={<Orders/>}/>

    </Routes>
    <Footer/>
    
    </>
  )
}

export default App
