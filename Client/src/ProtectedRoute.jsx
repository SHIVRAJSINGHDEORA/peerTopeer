import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthContext";
import { Spinner } from "./components/ui/spinner";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
