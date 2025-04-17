import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError("");
    if (name === "password") {
      setPasswordError(value.length >= 5 ? "" : "Password must be at least 5 characters long.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setFormError("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    setLoginError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Full response:", response.data);

      if (response.data.success && response.data.data?.user && response.data.data?.tokens) {
        const { user, tokens } = response.data.data;

        // ✅ use your context login method properly
        const result = login(user, tokens.accessToken);

        if (result.success) {
          navigate("/"); // or navigate("/") if homepage is your dashboard
        }
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setLoginError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-200 text-gray-900">
      <div className="w-full max-w-md p-10 bg-white rounded-2xl shadow-2xl border border-pink-300">
        <h2 className="text-3xl font-bold text-center text-pink-600">Login</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-pink-600">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-gray-900 bg-white border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block mb-2 text-sm font-medium text-pink-600">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="5"
              className="w-full px-4 py-2 text-gray-900 bg-white border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-9 right-3 text-gray-600 focus:outline-none hover:text-pink-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {passwordError && <p className="text-red-600 text-sm mt-1">{passwordError}</p>}
          </div>
          {formError && <p className="text-red-600 text-sm mt-2 text-center">{formError}</p>}
          {loginError && (
            <div className="text-red-600 text-sm mt-2 text-center bg-red-50 p-2 rounded">
              {loginError}
              <br />
              <button
                onClick={() => console.log("Current form data:", formData)}
                className="text-xs underline mt-1"
              >
                Click to view debug info in console
              </button>
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-2 mt-4 text-white bg-pink-500 rounded-lg shadow-lg hover:bg-pink-600 transition ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : "Login"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-pink-600">
          Don't have an account? <a href="/register" className="text-pink-500 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
