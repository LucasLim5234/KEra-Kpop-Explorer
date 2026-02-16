import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useAuth from "../contexts/AuthContext";

export default function UserLayout() {
    const navigate = useNavigate();
    const { setAuthUser } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            setAuthUser(null);
            navigate("/login");
        } catch (err) {
            console.error("Logout failed:", err.response?.data || err.message);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar role="user" onClickLogout={handleLogout} />

            <main className="container mt-4 flex-fill">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
