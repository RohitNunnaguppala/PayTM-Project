import { useEffect, useState } from "react";
import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://paytm-backend-rmep.onrender.com/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setBalance(response.data.balance);
    } catch (err) {
      console.error("Error fetching balance:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 text-black dark:text-white transition-colors duration-300">
      <Appbar />
      <div className="m-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-center">Welcome to Your Dashboard</h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-6 transition-all hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Your Account Summary</h2>
          {loading ? (
            <p className="text-gray-500 dark:text-gray-400">Fetching balance...</p>
          ) : (
            <Balance value={balance.toLocaleString()} />
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-all hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Send Money to Users</h2>
          <Users onTransfer={fetchBalance} />
        </div>
      </div>
    </div>
  );
};
