import { useEffect } from "react";

function Contact() {
  useEffect(() => {
    window.scrollTo({ top: 80, behavior: "smooth" });
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {/* Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-3xl h-auto bg-white shadow-2xl rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="lg:w-1/2 w-full">
          <img
            src="https://i.pinimg.com/736x/0d/80/c2/0d80c2a37da53a4fa3c3de04ba13a492.jpg"
            alt="Contact Us"
            className="w-full max-w-3xl h-auto object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="lg:w-1/2 w-full p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Get in Touch
          </h2>
          <form>
            {/* Name Field */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-600 font-medium text-sm mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-gray-400 focus:outline-none"
                placeholder="Your Name"
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-600 font-medium text-sm mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-gray-400 focus:outline-none"
                placeholder="Your Email"
                required
              />
            </div>

            {/* Message Field */}
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-600 font-medium text-sm mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-gray-400 focus:outline-none"
                rows="3"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-2 rounded-md shadow-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 transition"
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
