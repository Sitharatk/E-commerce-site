


function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-6">Page Not Found</p>
      {/* <Link to={'/'} ><p className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
        Go Back Home</p>
      </Link> */}
    </div>
  );
}

export default NotFound;