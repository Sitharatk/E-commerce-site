

function Contact() {
  

  return (
    <div className="flex flex-col items-center justify-center min-h-80  bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full mt-8 max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
      <form >
        <div className="mb-4 ">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none "
            placeholder="Name" required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none "
            placeholder=" Email" required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Message:</label>
          <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none "rows="4"
            placeholder="Your message" required
          />
        </div>

        <div className="text-center">
          <button  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none ">
            Send Message
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
