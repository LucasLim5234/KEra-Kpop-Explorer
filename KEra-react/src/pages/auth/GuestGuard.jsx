import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../contexts/AuthContext";

export default function GuestGuard({ children }) {
  const { authUser } = useAuth();

  if (authUser === undefined) {
    return (
      <div className="d-flex justify-content-center align-items-center gap-3" style={{ minHeight: "60vh" }}>
        <div className="spinner-grow text-primary" role="status"></div>
        <div className="spinner-grow text-primary" role="status"></div>
        <div className="spinner-grow text-primary" role="status"></div>
      </div>
    );
  }

  if (authUser) {
    return (
      <Navigate to={authUser.role === "admin" ? "/admin" : "/user/idol-index"} replace />
    );
  }

  return <Outlet />;
}
