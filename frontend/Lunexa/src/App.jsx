import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import Chatbot from "./pages/Chatbot";
import EducationPage from "./pages/Education"; // Import Education components
import Quiz from "./pages/Quiz";
import ProductDetails from "./pages/ProductDetail";
import Donation from "./pages/Donation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import CategoryPage from "./pages/Category";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/education/:category" element={<CategoryPage />} />
          <Route path="/education/quiz" element={<Quiz />} />
          <Route path="/donation" element={<Donation />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;