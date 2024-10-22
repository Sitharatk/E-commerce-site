import { Link} from 'react-router-dom';
function Sidebar() {
  return (
    <div className="w-64 h-auto bg-slate-700 text-white flex flex-col p-6">
      <div className="flex items-center mb-8">
        <i className="bx bxs-pyramid text-3xl sm:text-5xl text-white mr-3"></i>
        <p className="text-2xl font-bold">Admin Hub</p>
      </div>
      <hr className="border-gray-500 mb-6" />

      <div className="flex flex-col space-y-7">
        
       <Link to='/dashboard'> <button className="text-left text-lg hover:bg-slate-600 p-2 rounded transition duration-300">Dashboard</button></Link> 
       <Link to='/user' ><button className="text-left text-lg hover:bg-slate-600 p-2 rounded transition duration-300">User Management</button></Link> 
       <Link to='/productmanagment' > <button className="text-left text-lg hover:bg-slate-600 p-2 rounded transition duration-300">Product Management</button></Link> 
        <button className="w-full  font-semibold text-black text-center text-lg bg-slate-200 hover:bg-black hover:text-white p-2 rounded transition duration-300 ">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;

