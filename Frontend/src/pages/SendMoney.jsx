import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Button } from "../components/Button"; // ✅ Make sure this path is correct

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);

  const handleTransfer = async () => {
    if (!amount || Number(amount) <= 0) {
      setStatus("❌ Please enter a valid amount");
      return;
    }

    try {
      setIsTransferring(true);
      const res = await axios.post(
        "https://paytm-backend-rmep.onrender.com/api/v1/account/transfer",
        {
          to: id,
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      setStatus("✅ Transfer successful");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      console.error("Transfer error:", err?.response?.data || err.message);
      setStatus("❌ Transfer failed");
    } finally {
      setIsTransferring(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-2xl shadow-lg p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Send Money</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">to another Paytm user</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-[#00b9f5] flex items-center justify-center animate-bounce">
            <span className="text-2xl text-white font-semibold">
              {name?.[0]?.toUpperCase()}
            </span>
          </div>
          <h3 className="text-xl font-medium">{name}</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1"
            >
              Amount (in ₹)
            </label>
            <input
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              type="number"
              id="amount"
              min="1"
              placeholder="Enter amount"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b9f5] dark:focus:ring-blue-400"
            />
          </div>

          <Button
            label={isTransferring ? "Transferring..." : "Initiate Transfer"}
            onClick={handleTransfer}
            disabled={isTransferring}
          />

          {status && (
            <p
              className={`text-center text-sm font-medium ${
                status.startsWith("✅") ? "text-green-600" : "text-red-500"
              }`}
            >
              {status}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
