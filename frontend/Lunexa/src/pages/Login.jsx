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
        if (passwordError) {
            alert("Please correct the password issue before proceeding.");
            return;
        }

        setIsSubmitting(true);
        setLoginError("");

        try {
            const response = await axios.post(
                "/api/v1/users/login",
                { email: formData.email, password: formData.password },
                { withCredentials: true }
            );
            console.log("Login Successful:", response.data);
            alert("Login successful!");
            login(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            navigate("/");
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            setLoginError(error.response?.data?.message || "Something went wrong!");
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
                            className="w-full px-4 py-2 text-gray-900 bg-white border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-9 right-3 text-gray-600 focus:outline-none hover:text-pink-600"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {passwordError && <p className="text-red-600 text-sm mt-1">{passwordError}</p>}
                    </div>
                    {formError && <p className="text-red-600 text-sm mt-2 text-center">{formError}</p>}
                    {loginError && <p className="text-red-600 text-sm mt-2 text-center">{loginError}</p>}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full px-4 py-2 mt-4 text-white bg-pink-500 rounded-lg shadow-lg hover:bg-pink-600 ${isSubmitting ? "cursor-not-allowed opacity-50" : "hover:scale-105 transform transition"}`}
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-pink-600">
                    Don't have an account? <a href="/signup" className="text-pink-500 hover:underline">Register</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
