import { useState } from "react";
import { csrf, login, loadUser } from "../../api/auth";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../contexts/AuthContext";
import Popup from "../../components/Popup";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();
  const [popup, setPopup] = useState({ show: false, message: "", type: "error" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await csrf();
      await login(email, password);
      const user = await loadUser();

      if (!user) {
        navigate("/login");
        return;
      }
      
      setAuthUser(user);
      navigate(user.role === "admin" ? "/admin" : "/user/idol-index");
      setError("");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed. Please check your credentials.";
      setPopup({ show: true, message: msg, type: "error" });
      setError(msg);
    }
  };

  return (
    <>
      <div className="auth-form-header">
        <h2>Sign In</h2>
        <p>Login to your account</p>
      </div>
      <form onSubmit={submit} className="auth-card">
        <input className="form-control mb-2" placeholder="Email" required onChange={e => setEmail(e.target.value)} />
        <input type="password" className="form-control mb-2" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
        {error && <small className="text-dark">{error}</small>}
        <button className="btn btn-dark w-100 mt-3">Login</button>

        <div className="text-center mt-2">
          <Link to="/forgot-password">Forgot password?</Link><br />
          <Link to="/register">No account? Create one</Link>
        </div>
      </form>
      <Popup show={popup.show} message={popup.message} type={popup.type} onClose={() => setPopup({ ...popup, show: false })} />
    </>
  );
}
