import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Home() {
  const [data,setData]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:5000/products")
    .then((response)=>setData(response.data))
    .catch(err=>console.log(err))
  },[])
  useEffect(()=>{
console.log(data);
  },[data])
  return (
    <div>Home</div>
  )
}

export default Home