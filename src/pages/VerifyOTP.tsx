import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendOTP, verifyOTP } from "../services/authService";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert("Email not found. Please try again.");
      navigate("/forgot-password");
      return;
    }

    if (otp.length !== 6) {
      alert("OTP must be 6 digits.");
      return;
    }

    try {
      setLoading(true);

      await verifyOTP(email, otp);

      navigate("/reset-password", {
        state: {
          email,
          otp,
        },
      });
    } catch (err: any) {
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setResending(true);

      await sendOTP(email);

      alert("A new OTP has been sent.");

      setTimer(30);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleVerify}
        className="w-full max-w-md rounded-xl border p-8 shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-2">Verify OTP</h1>

        <p className="text-gray-600 mb-6">
          Enter the OTP sent to
          <br />
          <strong>{email}</strong>
        </p>

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          maxLength={6}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 mb-5"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white rounded-lg py-3 disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="mt-6 text-center">
          {timer > 0 ? (
            <p className="text-sm text-gray-500">
              Resend OTP in <span className="font-semibold">{timer}s</span>
            </p>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-2">
                Didn't receive the OTP?
              </p>

              <button
                type="button"
                onClick={handleResendOTP}
                disabled={resending}
                className="text-blue-600 font-semibold hover:underline disabled:opacity-50"
              >
                {resending ? "Sending..." : "Resend OTP"}
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default VerifyOTP;
