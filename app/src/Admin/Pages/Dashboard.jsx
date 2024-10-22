import React from 'react'

function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     
        <div className="bg-white p-4 rounded border-2 border-gray-500">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-2xl font-bold">1,250</p>
        </div>

        <div className="bg-white p-4 rounded border-2 border-gray-500">
          <h2 className="text-xl font-semibold">Total Sales</h2>
          <p className="text-2xl font-bold">$15,000</p>
        </div>

        <div className="bg-white p-4 rounded border-2 border-gray-500">
          <h2 className="text-xl font-semibold">New Orders</h2>
          <p className="text-2xl font-bold">300</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Graph</h2>
        <div className="bg-white p-4 rounded border-2 border-gray-500 w-full h-72">
          
        </div>
      </div>
    </div>
  );
}
export default Dashboard