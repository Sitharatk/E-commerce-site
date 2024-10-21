import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart, faUser,faBars, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { useState,useContext} from "react";
import { NavLink,Link } from 'react-router-dom';
import { cartContext } from './../Context/CartContext';
import { UserContext } from "../Context/UserContext";



function Navbar() {
  const [visible,setVisible]=useState(false)
  const { cartItems } = useContext(cartContext);
  const {currentUser}=useContext(UserContext)

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
 
  return (
   <div className="h-24 bg-white flex justify-between items-center relative sm:px-9 px-3 ">
      <div className="flex items-center sm:space-x-4 space-x-2">
      <NavLink to="/" ><i className="bx bxs-pyramid text-3xl sm:text-5xl text-black-500"></i></NavLink>
        <NavLink to="/" ><h1 className=" text-xl sm:text-2xl font-bold text-gray-800">FASHION</h1></NavLink>
      </div>
      <ul className=" hidden sm:flex sm:gap-5">
       <NavLink to="/" ><li className="font-semibold  ">HOME</li></NavLink>
        <NavLink to="/collections/"><li className="font-semibold">COLLECTIONS</li></NavLink>
        <NavLink to="/aboutus"><li className="font-semibold">ABOUT US</li></NavLink>
        <NavLink to="/contact"><li className="font-semibold">CONTACT US</li></NavLink>
      </ul>
      <div className="sm:space-x-7 space-x-4 flex items-center">
    
      <Link to='/search'><FontAwesomeIcon className="sm:text-xl text-md" icon={faSearch}/></Link>
      
        {currentUser ? (
          <>
            <div className="relative">
              <Link to="/cart"><FontAwesomeIcon className="sm:text-xl text-md" icon={faShoppingCart} /></Link>
              <div className="absolute -top-2 -right-3 w-5 h-5 flex items-center justify-center rounded-full bg-red-600 text-white text-xs">
                {cartCount}
              </div>
            </div>
            <Link to="/userdata"><FontAwesomeIcon className="sm:text-xl text-md" icon={faUser} /></Link>
          </>
        ) : (
          <Link to="/login">
            <button className="w-36 bg-slate-300 text-black py-2 rounded-md transition duration-300 ease-in-out hover:bg-slate-500 hover:text-white">
              Login
            </button>
          </Link>
        )}
        <button onClick={()=>setVisible(true)}> <FontAwesomeIcon className=" sm:text-xl text-md sm:hidden" icon={faBars}/></button>
      </div>
      <div className={`${visible ? "bg-white sm:hidden w-screen h-[40vh] absolute top-0 right-0" : "hidden"}`}>

        <div className="flex items-center justify-between">
      <h1 className=" text-xl  p-4 font-bold text-gray-800">FASHION</h1>
      <button onClick={()=>setVisible(false)}><FontAwesomeIcon className="me-7" icon={faWindowClose}/></button>
      </div>
      <ul className=" space-y-6 p-5">
      <NavLink to="/" ><li className="font-semibold">HOME</li></NavLink>
      <NavLink to="/collections">  <li className="font-semibold">COLLECTIONS</li></NavLink>
      <NavLink to="/aboutus"><li className="font-semibold">ABOUT US</li></NavLink>
      <NavLink to="/contact"> <li className="font-semibold">CONTACT US</li></NavLink>
      </ul>
        </div>
    </div>
  );
}

export default Navbar;
