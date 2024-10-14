import { Routes,Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Signup from './Pages/Signup'
import Login from './Pages/Login';
import Home from './Pages/Home'
function App() {


  return (
    <>
    <Routes>
     <Route path='/login' element={<Login/>}/>
     <Route path='/signup' element={<Signup/>}/>
     <Route path='/' element={<Home/>}/>
    
    </Routes>
    </>
  )
}

export default App
