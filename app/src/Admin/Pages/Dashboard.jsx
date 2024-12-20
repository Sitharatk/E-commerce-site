import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axiosInstance from "./../../../utlities/axiosInstance";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSales, setSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/admin/users");
        setTotalUsers(response.data.data.length);

        const response1 = await axiosInstance.get("/admin/total/revenue");
        setSales(response1.data.totalRevenue);

        const response2 = await axiosInstance.get("/admin/total");
        setTotalOrders(response2.data.totalorderedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Dummy data for the graph
  const data = {
    labels: ["Users", "Sales", "Orders"],
    datasets: [
      {
        label: "Statistics",
        data: [totalUsers, totalSales, totalOrders],
        backgroundColor: ["#4CAF50", "#2196F3", "#FFC107"],
        borderColor: ["#388E3C", "#1976D2", "#FFA000"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows chart to resize within the parent container
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Overview Statistics",
      },
    },
  };

  return (
    <div className="p-6 ml-64">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded border-2 border-gray-500">
          <h2 className="text-xl font-semibold">
            Total Users: <span className="text-2xl ml-3 font-semibold">{totalUsers}</span>
          </h2>
        </div>

        <div className="bg-white p-4 rounded border-2 border-gray-500">
          <h2 className="text-xl font-semibold">
            Total Sales: <span className="text-2xl ml-3 font-semibold">${totalSales}</span>
          </h2>
        </div>

        <div className="bg-white p-4 rounded border-2 border-gray-500">
          <h2 className="text-xl font-semibold">
            Total Orders: <span className="text-2xl font-semibold ml-3">{totalOrders}</span>
          </h2>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Graph</h2>
        <div className="bg-white p-4 rounded border-2 border-gray-500 w-full h-72">
          <div className="h-full">
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
