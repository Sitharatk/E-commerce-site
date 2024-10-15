import { Routes,Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Signup from './Pages/Signup'
import Login from './Pages/Login';
import Home from './Pages/Home'
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
function App() {


  return (
    <>
    <Navbar/>
    <Routes>
     <Route path='/login' element={<Login/>}/>
     <Route path='/signup' element={<Signup/>}/>
     <Route path='/' element={<Home/>}/>
    
    </Routes>
    <Footer/>
    
    </>
  )
}

export default App
