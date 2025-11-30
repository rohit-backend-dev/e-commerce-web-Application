import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import API from "../api/api.js";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [mode, setMode] = useState("login"); // login | signup | forgot
  const [step, setStep] = useState("form"); // form | verify | reset
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    newPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validatePassword = (password) =>
    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=!]).{6,}$/.test(password);

  // ---------------- Form Submit ----------------
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      if (mode === "signup") {
        if (!validatePassword(form.password)) {
          setMessage(
            "Password must include letters, numbers, and special characters."
          );
          setLoading(false);
          return;
        }
        await API.post("/auth/signup", form);
        setMessage("✅ Signup successful! OTP sent to your email.");
        setStep("verify");
      } else if (mode === "login") {
        await API.post("/auth/login/send-otp", null, {
          params: { email: form.email },
        });
        setMessage("✅ OTP sent to your registered email.");
        setStep("verify");
      } else if (mode === "forgot") {
        await API.post("/auth/forgot-password/send-otp", null, {
          params: { email: form.email },
        });
        setMessage("✅ OTP sent to reset password.");
        setStep("verify");
      }
    } catch (err) {
      setMessage(err.response?.data || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- OTP Verification ----------------
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      if (mode === "signup") {
        const res = await API.post("/auth/signup/verify", null, {
          params: { email: form.email, otp },
        });
        login(res.data);
        navigate("/");
      } else if (mode === "login") {
        const res = await API.post("/auth/login/verify-otp", null, {
          params: { email: form.email, otp },
        });
        login(res.data);
        navigate("/");
      } else if (mode === "forgot") {
        await API.post("/auth/forgot-password/verify", null, {
          params: { email: form.email, otp },
        });
        setStep("reset");
        setMessage("✅ OTP verified! Enter your new password.");
      }
    } catch (err) {
      setMessage(err.response?.data || "Invalid OTP");
    } finally {
      setLoading(false);
      setOtp("");
    }
  };

  // ---------------- Reset Password ----------------
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      await API.post("/auth/forgot-password/reset", null, {
        params: { email: form.email, otp, newPassword: form.newPassword },
      });
      setMessage("✅ Password reset successful! Login now.");
      setMode("login");
      setStep("form");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        password: "",
        newPassword: "",
      });
    } catch (err) {
      setMessage(err.response?.data || "Failed to reset password");
    } finally {
      setLoading(false);
      setOtp("");
    }
  };

  // ---------------- Mode Switch ----------------
  const switchMode = (newMode) => {
    setMode(newMode);
    setStep("form");
    setOtp("");
    setMessage("");
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      password: "",
      newPassword: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <form
        onSubmit={
          step === "form"
            ? handleFormSubmit
            : step === "verify"
            ? handleOtpVerify
            : handleResetPassword
        }
        className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">
          {mode === "login"
            ? "Login"
            : mode === "signup"
            ? "Sign Up"
            : "Forgot Password"}
        </h2>

        {/* Form Inputs */}
        {step === "form" && (
          <>
            {mode === "signup" && (
              <>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                  className="w-full px-4 py-3 border rounded-lg"
                />
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                  className="w-full px-4 py-3 border rounded-lg"
                />
                <input
                  type="text"
                  name="mobileNumber"
                  value={form.mobileNumber}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  required
                  className="w-full px-4 py-3 border rounded-lg"
                />
              </>
            )}
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-4 py-3 border rounded-lg"
            />
            {(mode === "signup" || mode === "login") && (
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="w-full px-4 py-3 border rounded-lg"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
            )}
            {mode === "forgot" && (
              <p className="text-sm text-gray-500">
                We will send an OTP to your email
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3 rounded-lg"
            >
              {loading
                ? "Processing..."
                : mode === "login"
                ? "Send OTP"
                : mode === "signup"
                ? "Sign Up"
                : "Send OTP"}
            </button>
          </>
        )}

        {/* OTP Verification */}
        {step === "verify" && (
          <>
            <h3 className="text-center">Enter OTP sent to your email</h3>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="OTP"
              required
              className="w-full px-4 py-3 border rounded-lg"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-3 rounded-lg"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {/* Password Reset */}
        {step === "reset" && (
          <>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="New Password"
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-3 rounded-lg"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}

        {/* Switch Mode Links */}
        <div className="flex justify-between text-sm mt-2">
          {mode !== "signup" && (
            <p
              className="cursor-pointer text-blue-600"
              onClick={() => switchMode("forgot")}
            >
              Forgot Password?
            </p>
          )}
          <p
            className="cursor-pointer text-blue-600"
            onClick={() => switchMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Sign Up" : "Login"}
          </p>
        </div>

        {/* Messages */}
        {message && (
          <p
            className={`text-center mt-2 ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
