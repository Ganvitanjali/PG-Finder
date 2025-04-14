import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const [authState, setAuthState] = useState({ isLoggedin: false, role: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");

    if (id) {
      setAuthState({ isLoggedin: true, role });
    }
    setLoading(false);
  }, []);

  return { ...authState, loading };
};

const PrivateRoutes = () => {
  const auth = useAuth();

  if (auth.loading) {
    return <h1>Loading...</h1>; // Prevents redirection before auth state is set
  }

  if (!auth.isLoggedin) {
    alert("Please login first!"); // 🔹 Unauthorized access alert
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
