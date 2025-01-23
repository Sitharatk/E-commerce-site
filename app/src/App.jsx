import { Routes,Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './App.css'
import Signup from './Pages/Signup'
import Login from './Pages/Login';
import Home from './Pages/Home'
import Product from './Pages/Product';
import AboutUs from './Pages/AboutUs';
import Contact from './Pages/Contact';
import Cart from './Pages/Cart';
import Collections from './Pages/Collections';
import Catogory from './Pages/Catogory';
import Payment from './Pages/Payment';
import UserData from './Pages/UserData';
import Orders from './Pages/Orders';
import { useContext } from 'react';
import { UserContext } from './Context/UserContext';
import MainLayout from './Layout/MainLayout';
import AdminLayout from './Layout/AdminLayout';
import NotFound from './Pages/NotFound';
import Dashboard from './Admin/Pages/Dashboard';
import User from './Admin/Pages/User';
import ProductManagment from './Admin/Pages/ProductManagment';
import Edit from './Admin/Pages/Edit';
import AddProduct from './Admin/Pages/AddProduct';
import Usersdetails from './Admin/Pages/Usersdetails';
import Sucess from './Pages/Sucess';
import Cancel from './Pages/Cancel';
import Adminlogin from './Admin/Components/Adminlogin';
import OrderMangament from './Admin/Pages/OrderMangament';
import OrderSucessCOD from './Pages/OrderSucessCOD';
import Wishlist from './Pages/WishList.jsx';


function App() {

const {currentUser} =useContext(UserContext )

return (
  <>
    <ToastContainer />
    <Routes>
     
      <Route element={<MainLayout/>}>
        <Route path='/login' element={<Login />} />
        <Route path='/adminlogin' element={<Adminlogin/>}/>
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/collections' element={<Collections />} />
        <Route path='/catogory/:category' element={<Catogory />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
   
        
        {currentUser? (
          <>
            <Route path='/cart' element={<Cart />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/userdata' element={<UserData />} />
            <Route path='/ordersuccess' element={<OrderSucessCOD/>}/>
            <Route path='/wishlist'element={<Wishlist/>}/>
            <Route path='/success/:sessionId'element={<Sucess/>}/>
            <Route path='/cancel' element={<Cancel/>}/>
          </>
        ):(<Route path='/*' element={<NotFound/>}/>
        )}
      </Route>
     
      {currentUser && currentUser.isAdmin ? (
  <Route element={<AdminLayout />}>
    <Route path='/dashboard' element={<Dashboard />} />
    <Route path="/productmanagment" element={<ProductManagment />} />
    <Route path="/user" element={<User />} />
    <Route path="/edit/:id" element={<Edit />} />
    <Route path="/addproduct" element={<AddProduct />} />
    <Route path='/ordermanagment'element={<OrderMangament/>}/>

    <Route path="/usersdetails/:id" element={<Usersdetails />} />
  </Route>
      ) : (
        <Route path='/*' element={<NotFound/>}/>
      )}

      </Routes>
    </>
  );
}


export default App;