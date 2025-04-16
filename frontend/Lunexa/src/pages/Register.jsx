import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
    });

    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
    const [formError, setFormError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormError("");

        if (name === "password" && value.length < 5) {
            setPasswordError("Password must be at least 5 characters long!");
        } else {
            setPasswordError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password || !formData.address) {
            setFormError("All fields are required.");
            return;
        }

        if (formData.password.length < 5) {
            setPasswordError("Password must be at least 5 characters long!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/v1/users/register", {
                fullname: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                address: formData.address,
            }, { withCredentials: true });

            alert("Registration successful!");
            navigate("/buyer-dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 text-gray-800">
            <div className="w-full max-w-md p-10 bg-white rounded-3xl shadow-2xl border border-pink-300">
                <h2 className="text-4xl font-bold text-center text-pink-600 mb-6">Create an Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-pink-700">Name</label>
                        <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"/>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-pink-700">Email</label>
                        <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"/>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-pink-700">Password</label>
                        <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"/>
                        {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-pink-700">Phone</label>
                        <input type="text" name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"/>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-pink-700">Address</label>
                        <textarea name="address" placeholder="Enter your address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none" rows="3"/>
                    </div>
                    {formError && <p className="text-red-500 text-sm mt-2 text-center">{formError}</p>}
                    <button type="submit" className="w-full px-4 py-3 mt-6 text-lg font-semibold uppercase bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600 transition">Register</button>
                </form>
                <p className="mt-6 text-sm text-center text-pink-700">Already have an account? <a href="/login" className="text-pink-600 font-semibold hover:underline">Login</a></p>
            </div>
        </div>
    );
};

export default Register;
