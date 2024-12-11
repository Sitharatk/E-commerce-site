import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Component/Footer";
import Navbar from "../Component/Navbar";


function MainLayout() {
  const location=useLocation()

  const hide=location.pathname==='/login' || location.pathname === '/signup';
    return (
      <>
       {!hide && <Navbar />}
      <Outlet />
      {!hide && <Footer />}

      </>
    );
  }
  
  export default MainLayout;