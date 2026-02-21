import { useState } from "react";
import { csrf, register, loadUser } from "../../api/auth";
import { useNavigate, Link } from "react-router-dom";
import Popup from "../../components/Popup";
import useAuth from "../../contexts/AuthContext";

export default function Register() {
  const { setAuthUser } = useAuth();
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const [popup, setPopup] = useState({ show: false, message: "", type: "error" });
  const [error, setError] = useState({});

  const submit = async (e) => {
    e.preventDefault();
    try {
      await csrf();
      await register(form);
      const user = await loadUser();
      if (!user) {
        setPopup({ show: true, message: "Registration failed. Please try again.", type: "error" });
        return;
      }
      setAuthUser(user);
      navigate(user.role === "admin" ? "/admin" : "/user/idol-index");
      setError({});
    } catch (err) {
      const errors = err.response?.data?.errors || {};
      setError(errors);
      let msg = err.response?.data?.message || "Registration failed.";
      if (errors.email && errors.email[0]) msg = errors.email[0];
      else if (errors.password && errors.password[0]) msg = errors.password[0];
      else if (errors.name && errors.name[0]) msg = errors.name[0];
      setPopup({ show: true, message: msg, type: "error" });
    }
  };

  return (
    <>
      <div className="auth-form-header">
        <h2>Sign Up</h2>
        <p>Create an account</p>
      </div>
      <form onSubmit={submit} className="auth-card">
        <input className="form-control mb-2" placeholder="Name" required onChange={e => setForm({ ...form, name: e.target.value })} />
        {error.name && <small className="text-dark">{error.name[0]}</small>}
        <input className="form-control mb-2" placeholder="Email" required onChange={e => setForm({ ...form, email: e.target.value })} />
        {error.email && <small className="text-dark">{error.email[0]}</small>}
        <input type="password" className="form-control mb-2" placeholder="Password" required onChange={e => setForm({ ...form, password: e.target.value })} />
        {error.password && <small className="text-dark">{error.password[0]}</small>}
        <input type="password" className="form-control mb-2" placeholder="Confirm Password" required onChange={e => setForm({ ...form, password_confirmation: e.target.value })} />
        <button className="btn btn-primary w-100 mt-3">Register</button>
        <div className="text-center mt-3">
          <Link to="/login">Already have an account? Sign in</Link>
        </div>
      </form>
      <Popup show={popup.show} message={popup.message} type={popup.type} onClose={() => setPopup({ ...popup, show: false })} />
    </>
  );
}
