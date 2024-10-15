import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart, faUser,faBars, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";


function Navbar() {
  const [visible,setVisible]=useState(false)
  return (
    <div className="h-24 bg-slate-50 flex justify-between items-center relative sm:px-9 px-3 ">
      <div className="flex items-center sm:space-x-4 space-x-2">
        <i className="bx bxs-pyramid text-3xl sm:text-5xl text-black-500"></i>
        <h1 className=" text-xl sm:text-2xl font-bold text-gray-800">FASHION</h1>
      </div>
      <ul className=" hidden sm:flex sm:gap-5">
        <li className="font-semibold">HOME</li>
        
        <li className="font-semibold">COLLECTIONS</li>
        <li className="font-semibold">ABOUT US</li>
        <li className="font-semibold">CONTACT US</li>
      </ul>
      <div className="sm:space-x-7 space-x-4">
        <FontAwesomeIcon className=" sm:text-xl text-md" icon={faSearch}/>
        <FontAwesomeIcon className=" sm:text-xl text-md" icon={faShoppingCart}/>
        <FontAwesomeIcon className=" sm:text-xl text-md" icon={faUser}/>
       <button onClick={()=>setVisible(true)}> <FontAwesomeIcon className=" sm:text-xl text-md sm:hidden" icon={faBars}/></button>
      </div>
      <div className={`${visible?"bg-white sm:hidden w-screen h-[40vh] absolute top-0 right-0 ":"hidden"}`}>
        <div className="flex items-center justify-between">
      <h1 className=" text-xl  p-4 font-bold text-gray-800">FASHION</h1>
      <button onClick={()=>setVisible(false)}><FontAwesomeIcon className="me-7" icon={faWindowClose}/></button>
      </div>
      <ul className=" space-y-6 p-5">
        <li className="font-semibold">HOME</li>
          <li className="font-semibold">COLLECTIONS</li>
        <li className="font-semibold">ABOUT US</li>
        <li className="font-semibold">CONTACT US</li>
      </ul>
        </div>
    </div>
  );
}

export default Navbar;
