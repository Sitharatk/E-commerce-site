import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
function Footer() {
  return (
    <div className="bg-slate-400 h-56  flex items-center justify-evenly">
       <div className="flex items-center sm:space-x-4 space-x-2">
        <i className="bx bxs-pyramid text-3xl sm:text-5xl text-black-500"></i>
        <h1 className=" text-xl sm:text-2xl font-bold text-gray-800">FASHION</h1>
        
        <FontAwesomeIcon icon={faInstagram} />
       
      </div>
      <div className="">
        <h1 className="font-bold text-xl mb-3">SHOP</h1>
        <p className="font-semibold"> Shop Women</p>
        <p className="font-semibold"> Shop men</p>
        <p className="font-semibold"> Sunglasses</p>


      </div >
      <div className="">
        <h1 className="font-bold text-xl  mb-3">ABOUT</h1>
        <p className="font-semibold"> Our shop </p>
        <p className="font-semibold"> Our Materials</p>
        <p className="font-semibold"> Our Value</p>
        <p className="font-semibold"> Sustainability</p>

      </div >
      <div className="">
        <h1 className="font-bold text-xl  mb-3">NEED HELP?</h1>
        <p className="font-semibold"> FAQs </p>
        <p className="font-semibold"> Shipping & Returns</p>
        <p className="font-semibold"> Size Chart</p>
        <p className="font-semibold"> Contact Us</p>

      </div >


    </div>
  )
}

export default Footer