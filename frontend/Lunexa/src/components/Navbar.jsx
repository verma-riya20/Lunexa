import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-around">
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/products">Products</Link>
          <Link to="/chatbot">Chatbot</Link>
          <Link to="/education">Education</Link>
          <Link to="/donation">Donation</Link>
          <button onClick={logout} className="bg-red-500 p-2 rounded">Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}
export default Navbar;