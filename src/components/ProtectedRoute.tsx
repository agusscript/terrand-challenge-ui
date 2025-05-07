import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthProvider } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuthProvider();
  const location = useLocation();

  if (!isAuthenticated) {
    toast.error("Para acceder a esta página debes iniciar sesión");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
