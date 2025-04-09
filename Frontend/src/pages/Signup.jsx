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

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSignup = async () => {
    setErrorMsg("");

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) {
      setErrorMsg("All fields are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMsg("Enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      const msg = err?.response?.data?.message || "Signup failed. Please try again.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
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

        {/* Right Side - Signup Card */}
        <div className="bg-white w-1/2 p-8 flex flex-col justify-center">
          <img
            src={paytmLogo}
            alt="PayTM Logo"
            className="w-28 mb-4 self-center animate-fadeIn"
          />

          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />

          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Rohit"
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Nunnaguppala"
            label={"Last Name"}
          />
          <InputBox
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            label={"Email"}
            type="email"
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
            label={"Password"}
            type="password"
          />

          {errorMsg && (
            <div className="text-red-500 text-sm mt-2">{errorMsg}</div>
          )}

          <div className="pt-4">
            <Button
              onClick={handleSignup}
              label={loading ? "Signing up..." : "Sign up"}
              disabled={loading}
            />
          </div>

          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
