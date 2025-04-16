import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("User Auth State:", user);
  }, [user]);

  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
