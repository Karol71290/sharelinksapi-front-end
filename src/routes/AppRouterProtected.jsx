import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function AppRouterProtected() {
  const { isLoggedIn } = useAppContext();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export default AppRouterProtected;
