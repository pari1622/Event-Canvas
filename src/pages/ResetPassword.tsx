import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authService";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const otp = location.state?.otp || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !otp) {
      alert("Session expired. Please restart the process.");
      navigate("/forgot-password");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await resetPassword(email, otp, password);

      alert("Password reset successfully.");

      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleReset}
        className="w-full max-w-md rounded-xl border p-8 shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-6">Reset Password</h1>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 mb-4"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 mb-6"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white rounded-lg py-3"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
