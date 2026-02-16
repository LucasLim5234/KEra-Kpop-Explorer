import { useState } from "react";
import { csrf, register, loadUser } from "../../api/auth";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../contexts/AuthContext";

export default function Register() {
  const { setAuthUser } = useAuth();
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await csrf();
      await register(form);
      const user = await loadUser();

      if (!user) {
        return;
      }

      setAuthUser(user);
      navigate(user.role === "admin" ? "/admin" : "/user/idol-index");
    } catch (err) {
      console.error("Registration failed:", err);
      // optionally show validation errors to the user
    }
  };


  return (
    <>
      <div className="auth-form-header">
        <h2>Sign Up</h2>
        <p>Create an account</p>
      </div>
      <form onSubmit={submit} className="auth-card">
        <input className="form-control mb-2" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="form-control mb-2" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" className="form-control mb-2" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <input type="password" className="form-control mb-2" placeholder="Confirm Password" onChange={e => setForm({ ...form, password_confirmation: e.target.value })} />
        <button className="btn btn-primary w-100 mt-3">Register</button>
        <div className="text-center mt-3">
          <Link to="/login">Already have an account? Sign in</Link>
        </div>
      </form>
    </>

  );
}
