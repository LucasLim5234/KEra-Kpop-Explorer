import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { resetPassword } from "../../api/auth";

export default function ResetPassword() {
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email");

  const [form, setForm] = useState({
    token,
    email,
    password: "",
    password_confirmation: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await resetPassword(form);
    navigate("/login", { replace: true });
  };

  return (
    <>
      <div className="auth-form-header">
        <h2>Reset Password</h2>
        <p>Create a new password</p>
      </div>
      <form onSubmit={submit} className="auth-card">

        <input
          type="password"
          className="form-control mb-2"
          placeholder="New Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Confirm Password"
          onChange={e => setForm({ ...form, password_confirmation: e.target.value })}
        />

        <button className="btn btn-success w-100 mt-3">
          Reset Password
        </button>
      </form>
    </>
  );
}
