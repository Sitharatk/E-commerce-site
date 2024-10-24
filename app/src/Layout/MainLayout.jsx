import { Outlet } from "react-router-dom";
import Footer from "../Component/Footer";
import Navbar from "../Component/Navbar";


function MainLayout() {
    return (
      <>
        <Navbar/>
       <Outlet/>
        <Footer/>
      </>
    );
  }
  
  export default MainLayout;