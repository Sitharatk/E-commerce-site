import { useEffect } from "react";

function Contact() {
  useEffect(() => {
    window.scrollTo({ top: 80, behavior: "smooth" });
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
  
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-3xl h-auto bg-white shadow-2xl rounded-lg overflow-hidden">
     
        <div className="lg:w-1/2 w-full">
          <img
            src="https://i.pinimg.com/736x/0d/80/c2/0d80c2a37da53a4fa3c3de04ba13a492.jpg"
            alt="Contact Us"
            className="w-full max-w-3xl h-auto object-cover"
          />
        </div>

        <div className="lg:w-1/2 w-full p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-[#522815]  text-center mb-4">
            Get in Touch
          </h2>
          <form>
          
            <div className="mb-4">
             
              <input
                id="name"
                type="text"
                className="w-full px-3  placeholder-[#c5b4ac] py-2 border border-[#c5b4ac]  rounded-md shadow-sm focus:ring-2 focus:ring-[#522815] focus:outline-none"
                placeholder="Your Name "
                required
              />
            </div>

      
            <div className="mb-4">
              
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 border placeholder-[#c5b4ac] border-[#c5b4ac]  rounded-md shadow-sm focus:ring-2 focus:ring-[#522815]  focus:outline-none"
                placeholder="Your Email"
                required
              />
            </div>

   
            <div className="mb-4">
             
              <textarea
                id="message"
                className="w-full px-3 py-2 border placeholder-[#c5b4ac] border-[#c5b4ac] rounded-md shadow-sm focus:ring-2 focus:ring-[#522815] focus:outline-none"
                rows="3"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>

          
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-[#522815]  text-white py-2 rounded-md shadow-md hover:bg-[#bb9c8e] focus:ring-2 focus:ring-[#522815] transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
