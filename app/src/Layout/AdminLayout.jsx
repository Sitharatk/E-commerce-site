
import { Outlet } from 'react-router-dom';
import Sidebar from '../Admin/Components/Sidebar';


// eslint-disable-next-line react/prop-types
function AdminLayout() {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-6 ">
          <Outlet />
        </div>
      </div>
    );
}
  export default AdminLayout;