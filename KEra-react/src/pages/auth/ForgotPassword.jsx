import { useState } from "react";
import { csrf, forgotPassword } from "../../api/auth";
import { Link } from "react-router-dom";
import Popup from "../../components/Popup";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [popup, setPopup] = useState({ show: false, message: "", type: "info" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await csrf();
      await forgotPassword(email);
      setPopup({ show: true, message: "Reset link has been sent to your email!", type: "success" });
      setError("");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to send reset link.";
      setPopup({ show: true, message: msg, type: "error" });
      setError(msg);
    }
  };

  return (
    <>
      <div className="auth-form-header">
        <h2>Forgot Password</h2>
        <p>Enter your email and we'll send you a link to reset your password</p>
      </div>
      <form onSubmit={submit} className="auth-card">
        <input className="form-control mb-2" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        {error && <small className="text-danger">{error}</small>}
        <button className="btn btn-dark w-100 mt-3">Send Reset Link</button>
        <div className="text-center mt-2">
          <Link to="/login">Remember your password? Back to login</Link><br />
        </div>
      </form>
      <Popup show={popup.show} message={popup.message} type={popup.type} onClose={() => setPopup({ ...popup, show: false })} />
    </>
  );
}
