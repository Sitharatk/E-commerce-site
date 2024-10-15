import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
function Footer() {
  return (
    <div className="bg-slate-100 sm:h-56 h-auto p-5 flex sm:flex-row flex-col items-center justify-evenly ">
       <div className="flex-col mb-5 sm:mb-0  mt-5">
        <div className="flex sm:space-x-4 space-x-2 ">
        <i className="bx bxs-pyramid text-3xl sm:text-5xl text-black-500"></i>
        <h1 className=" text-xl sm:text-2xl font-bold text-gray-800">FASHION</h1>
        </div>
        <div className=" flex  justify-between gap-8 p-6 ">
          <FontAwesomeIcon icon={faInstagram}   className="text-2xl" />
          <FontAwesomeIcon icon={faFacebook}   className="text-2xl"/>
          <FontAwesomeIcon icon={faTwitter}  className="text-2xl"/> 
       </div>
       
      </div>

      <div className="text-center sm:text-left mb-5 sm:mb-0">
      <h1 className="font-bold text-lg sm:text-xl mb-3">SHOP</h1>
        <p className="font-semibold"> Shop Women</p>
        <p className="font-semibold"> Shop men</p>
        <p className="font-semibold"> Sunglasses</p>


      </div >
      <div className="text-center sm:text-left mb-5 sm:mb-0">
        <h1 className="font-bold text-lg sm:text-xl mb-3">ABOUT</h1>
        <p className="font-semibold"> Our shop </p>
        <p className="font-semibold"> Our Materials</p>
        <p className="font-semibold"> Our Value</p>
        <p className="font-semibold"> Sustainability</p>

      </div >
      <div className="text-center sm:text-left">
        <h1 className="font-bold text-lg sm:text-xl mb-3">NEED HELP?</h1>
        <p className="font-semibold"> FAQs </p>
        <p className="font-semibold"> Shipping & Returns</p>
        <p className="font-semibold"> Size Chart</p>
        <p className="font-semibold"> Contact Us</p>

      </div >


    </div>
  )
}

export default Footer