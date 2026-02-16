import { useState } from "react";
import { csrf, forgotPassword } from "../../api/auth";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await csrf();
    await forgotPassword(email);
    alert("Reset link has been sent to your email!");
  };

  return (
    <>
      <div className="auth-form-header">
        <h2>Forgot Password</h2>
        <p>Enter your email and we'll send you a link to reset your password</p>
      </div>
      <form onSubmit={submit} className="auth-card">
        <input className="form-control mb-2" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <button className="btn btn-dark w-100 mt-3">Send Reset Link</button>
        <div className="text-center mt-2">
          <Link to="/login">Remember your password? Back to login</Link><br />
        </div>
      </form>
    </>
  );
}
