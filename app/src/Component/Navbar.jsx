import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart, faUser,faBars,faHeart, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { useState,useContext} from "react";
import { NavLink,Link } from 'react-router-dom';
import { cartContext } from './../Context/CartContext';
import { UserContext } from "../Context/UserContext";
import { shopContext } from "../Context/shopContext";

function Navbar() {
  const [visible, setVisible] = useState(false);
  const { cartItems } = useContext(cartContext);
  const { currentUser } = useContext(UserContext);
  const { products } = useContext(shopContext);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handlechange = (value) => {
    setSearch(value);
    const filresults = products.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filresults);
  };

  return (
    <div className="h-24 bg-[#f5f5f5] flex justify-between items-center relative sm:px-9 px-3 font-roboto">
      <div className="flex items-center sm:space-x-4 space-x-2">
        <NavLink to="/">
          <i className="bx bxs-pyramid text-3xl sm:text-5xl text-black-500"></i>
        </NavLink>
        <NavLink to="/">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">VINATALIA</h1>
        </NavLink>
      </div>
      <ul className="hidden sm:flex sm:gap-5">
        <NavLink to="/">
          <li className="font-semibold">HOME</li>
        </NavLink>
        <NavLink to="/collections/">
          <li className="font-semibold">COLLECTIONS</li>
        </NavLink>
        <NavLink to="/aboutus">
          <li className="font-semibold">ABOUT US</li>
        </NavLink>
        <NavLink to="/contact">
          <li className="font-semibold">CONTACT US</li>
        </NavLink>
      </ul>
      <div className="sm:space-x-7 space-x-4 flex items-center ">
        <div className="relative  hidden sm:block">
          <input
            className="w-40 h-12 px-4 py-2 pr-10 border border-gray-300 rounded-lg shadow-md focus:outline-none"
            placeholder="Search..."
            onChange={(e) => handlechange(e.target.value)}
          />
          <FontAwesomeIcon
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 sm:text-xl text-md cursor-pointer"
            icon={faSearch}
          />
          {search && results.length > 0 && (
            <div className="absolute bg-white w-full z-10 shadow-lg rounded-lg">
              {results.map((item) => (
                <Link key={item.id} to={`/product/${item.id}`}>
                  <div className="p-2 border-gray-200 hover:bg-gray-100 cursor-pointer">
                    {item.name}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        {currentUser ? (
          <>
            <div className="relative">
              <Link to="/cart">
                <FontAwesomeIcon className="sm:text-xl text-md" icon={faShoppingCart} />
              </Link>
              <div className="absolute -top-2 -right-3 w-5 h-5 flex items-center justify-center rounded-full bg-red-600 text-white text-xs">
                {cartCount}
              </div>
            </div>
            <Link to="/wishlist">
              <FontAwesomeIcon className="cursor-pointer text-xl sm:mb-3 mt-1" icon={faHeart} />
            </Link>
            <Link to="/userdata">
              <FontAwesomeIcon className="sm:text-xl text-md" icon={faUser} />
            </Link>
          </>
        ) : (
          <Link to="/login">
            <button className="w-36 bg-slate-300 text-black py-2 rounded-md transition duration-300 ease-in-out hover:bg-slate-500 hover:text-white">
              Login
            </button>
          </Link>
        )}
        <button onClick={() => setVisible(true)}>
          <FontAwesomeIcon className="sm:text-xl text-md sm:hidden" icon={faBars} />
        </button>
      </div>
      <div className={`${visible ? "bg-white sm:hidden w-screen h-[40vh] absolute top-0 right-0" : "hidden"}`}>
        <div className="flex items-center justify-between">
          <h1 className="text-xl p-4 font-bold text-gray-800">VINTALIA</h1>
          <button onClick={() => setVisible(false)}>
            <FontAwesomeIcon className="me-7" icon={faWindowClose} />
          </button>
        </div>
        <ul className="space-y-6 p-5">
          <NavLink to="/">
            <li className="font-semibold">HOME</li>
          </NavLink>
          <NavLink to="/collections">
            <li className="font-semibold">COLLECTIONS</li>
          </NavLink>
          <NavLink to="/aboutus">
            <li className="font-semibold">ABOUT US</li>
          </NavLink>
          <NavLink to="/contact">
            <li className="font-semibold">CONTACT US</li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
