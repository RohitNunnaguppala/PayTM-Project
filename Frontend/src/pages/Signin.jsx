import { useState } from "react";
import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import paytmLogo from "../assets/paytm-logo.png";
import illustration from "../assets/mobile-payments.svg";
import { Eye, EyeOff } from "lucide-react";

export const Signin = () => {
  const [email, setEmail] = useState("");        // ✅ renamed from username to email
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      console.log("Signing in with:", email, password);
      const response = await axios.post(
        "https://paytm-backend-rmep.onrender.com/api/v1/user/signin",
        {
          email,
          password
        }
      );

      console.log("Sign-in response:", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Sign-in error:", err.response?.data || err); // More detailed error logging
    setErrorMsg(err.response?.data?.message || "Incorrect email or password. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-200 h-screen flex justify-center items-center">

      <div className="flex w-[90%] max-w-4xl rounded-lg shadow-lg overflow-hidden">
  
        {/* Left Side - Branding / Info */}
        <div className="bg-blue-600 text-white flex flex-col justify-center items-center w-1/2 p-8">
          <h1 className="text-4xl font-bold mb-4">PayTM</h1>
          <p className="text-lg text-center">Fast, safe and secure payments at your fingertips.</p>
          <img
            src={illustration}
             alt="Secure Payment Illustration"
            className="w-4/5 mt-8 animate-fadeInSlow"
          />

        </div>
  
        {/* Right Side - Signin Card */}
        <div className="bg-white w-1/2 p-8 flex flex-col justify-center">
        <img
          src={paytmLogo}
          alt="PayTM Logo"
          className="w-28 mb-4 self-center animate-fadeIn"
        />

          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
  
          <InputBox
            label="Email"
            placeholder="rohit@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            label="Password"
            placeholder="123456"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
  
          {errorMsg && (
            <div className="text-red-500 text-sm mt-2">{errorMsg}</div>
          )}
  
          <div className="pt-4">
            <Button label={"Sign in"} onClick={handleSignin} />
          </div>
  
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
  
      </div>
    </div>
  );
  
};
