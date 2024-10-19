import { useContext, useState } from "react";
import { shopContext } from "../Context/shopContext";
import { Link } from "react-router-dom";


function Search() {

    const {products}= useContext(shopContext)
    const [search,setSearch]=useState("")
    const[results,setResults]=useState([])

    const handlechange=(value)=>{
      setSearch(value)

      const filresults = products.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filresults);
    }
   
  return (
  
    <div className="flex justify-center mt-4 min-h-96 mb-16">
       
      <div className="relative w-auto">
        <input 
          className="w-full h-12 px-4 py-2 pr-10 border border-gray-300 rounded-lg shadow-md focus:outline-none "
          placeholder="Search..." onChange={(e)=>handlechange(e.target.value)}
        />
      <div  className="">
        {
            results.map((item)=>{
                return <Link key={item.id} to={`/product/${item.id}`}><div key={item.id} className="p-2  mb-1 ">{item.name}</div></Link>
            })
        }

      </div>
      </div>
    </div>
  );
}

export default Search;

