import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import Chatbot from "./pages/Chatbot";
import { EducationTour, FAQAndMyths, Quiz } from "./pages/Education"; // Import Education components

import Donation from "./pages/Donation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/products/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
          <Route path="/chatbot" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
          <Route path="/education" element={<ProtectedRoute><EducationTour /></ProtectedRoute>} />
                    <Route path="/education/faq-myths" element={<ProtectedRoute><FAQAndMyths /></ProtectedRoute>} />
                    <Route path="/education/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/donation" element={<ProtectedRoute><Donation /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;