import { Outlet } from "react-router-dom";
import "../styles/auth.css";
import authBg from "../assets/images/authBg.jpg";
import appLogo from "../assets/images/appLogo.png";

export default function AuthLayout() {
  return (
    <div className="auth-container">
      <div
        className="auth-left"
        style={{ backgroundImage: `url(${authBg})` }}
      >
        <div className="auth-left-text">
          <img className="auth-title" src={appLogo} alt="KEra logo" />
          <p className="auth-subtitle">your K-pop Era awaits</p>
        </div>
      </div>
      <div className="auth-right">
        <Outlet />
      </div>
    </div>
  );
}
