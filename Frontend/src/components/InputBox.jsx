import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Optional: use Heroicons or FontAwesome too

export const InputBox = ({ label, placeholder, onChange, type = "text" }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="text-left my-2 relative">
      <label className="text-sm font-medium">{label}</label>
      <input
        onChange={onChange}
        type={isPassword && !showPassword ? "password" : "text"}
        placeholder={placeholder}
        className={`w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          isPassword ? "pr-10" : ""
        }`}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-[35px] right-3 text-gray-500"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
};
