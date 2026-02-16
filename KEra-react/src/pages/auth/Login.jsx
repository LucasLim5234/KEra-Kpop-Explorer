import { useState } from "react";
import { csrf, login, loadUser } from "../../api/auth";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();

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
    } catch (err) {
      console.error("Login failed: ", err);
      // optional: show error to user
    }
  };

  return (
    <>
      <div className="auth-form-header">
        <h2>Sign In</h2>
        <p>Login to your account</p>
      </div>
      <form onSubmit={submit} className="auth-card">
        <input className="form-control mb-2" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" className="form-control mb-2" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button className="btn btn-dark w-100 mt-3">Login</button>

        <div className="text-center mt-2">
          <Link to="/forgot-password">Forgot password?</Link><br />
          <Link to="/register">No account? Create one</Link>
        </div>
      </form>
    </>
  );
}
