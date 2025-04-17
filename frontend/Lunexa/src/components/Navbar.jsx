import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  
  // Animation variants
  const item = {
    hidden: { y: -20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <motion.nav 
      initial="hidden"
      animate="show"
      variants={container}
      className="p-4 bg-gradient-to-r from-pink-200 to-pink-300 text-black shadow-md"
    >
      <div className="flex justify-around items-center max-w-6xl mx-auto">
        <motion.div variants={item}>
          <Link 
            to="/" 
            className="text-lg font-semibold hover:text-pink-700 transition-colors duration-300"
          >
            Home
          </Link>
        </motion.div>

        {user ? (
          <>
            <motion.div variants={item}>
              <Link 
                to="/products" 
                className="px-3 py-1 rounded-lg hover:bg-pink-400 hover:text-white transition-all duration-300"
              >
                Products
              </Link>
            </motion.div>
            
            <motion.div variants={item}>
              <Link 
                to="/chatbot" 
                className="px-3 py-1 rounded-lg hover:bg-pink-400 hover:text-white transition-all duration-300"
              >
                Chatbot
              </Link>
            </motion.div>
            
            <motion.div variants={item}>
              <Link 
                to="/education" 
                className="px-3 py-1 rounded-lg hover:bg-pink-400 hover:text-white transition-all duration-300"
              >
                Education
              </Link>
            </motion.div>
            
            <motion.div variants={item}>
              <Link 
                to="/donation" 
                className="px-3 py-1 rounded-lg hover:bg-pink-400 hover:text-white transition-all duration-300"
              >
                Donation
              </Link>
            </motion.div>
            
            <motion.div variants={item}>
              <button 
                onClick={logout} 
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg shadow hover:shadow-lg hover:from-pink-600 hover:to-red-600 transition-all duration-300"
              >
                Logout
              </button>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div variants={item}>
              <Link 
                to="/login" 
                className="px-4 py-2 bg-white text-pink-600 rounded-lg shadow hover:bg-pink-100 transition-all duration-300"
              >
                Login
              </Link>
            </motion.div>
            
            <motion.div variants={item}>
              <Link 
                to="/register" 
                className="px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 hover:shadow-md transition-all duration-300"
              >
                Register
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </motion.nav>
  );
}

export default Navbar;