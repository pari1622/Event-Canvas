import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendOTP } from "../services/authService";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await sendOTP(email);

      alert(res.message);

      navigate("/verify-otp", {
        state: { email },
      });
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#110D0B] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-[#1B1512] rounded-3xl p-10 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-2">Forgot Password</h1>

        <p className="text-gray-400 mb-8">
          Enter your registered email to receive an OTP.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full rounded-xl bg-[#2A211D] border border-[#42362F] px-5 py-4 text-white outline-none focus:border-[#B89D82]"
          />

          <button
            disabled={loading}
            className="w-full rounded-xl py-4 font-semibold text-white"
            style={{ background: "#42362F" }}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link to="/login" className="text-[#B89D82]">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
