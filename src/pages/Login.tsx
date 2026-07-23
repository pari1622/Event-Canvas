import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser, googleLogin } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  console.log("CLIENT_ID =", import.meta.env.VITE_GOOGLE_CLIENT_ID);

  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = (location.state as { from?: string })?.from || "/";
  const message = (location.state as { message?: string })?.message;

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await loginUser({
        email,
        password,
      });

      login(res.token, res.user);

      navigate(redirectTo, { replace: true });
    } catch (err: any) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credential: string) => {
    try {
      setLoading(true);

      const res = await googleLogin(credential);

      login(res.token, res.user);

      navigate(redirectTo, { replace: true });
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Google Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#110D0B] flex items-center justify-center px-6">
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl bg-[#1B1512] grid md:grid-cols-2">
        <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-[#42362F] to-[#B89D82] text-white">
          <h1 className="text-5xl font-bold mb-6">EVENTCANVAS</h1>

          <p className="text-lg leading-8 text-white/90">
            Printing.
            <br />
            Branding.
            <br />
            Merchandise.
            <br />
            Event Management.
          </p>

          <div className="mt-12 h-1 w-28 bg-white rounded-full"></div>
        </div>

        <div className="p-10 md:p-14">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>

          <p className="text-gray-400 mb-8">Login to continue.</p>

          {message && (
            <div className="mb-6 rounded-xl border border-[#B89D82] bg-[#2A211D] px-4 py-3 text-sm text-[#F5E7D3]">
              {message}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-xl bg-[#2A211D] border border-[#42362F] px-5 py-4 text-white outline-none focus:border-[#B89D82]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-xl bg-[#2A211D] border border-[#42362F] px-5 py-4 text-white outline-none focus:border-[#B89D82]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-4 font-semibold text-white transition hover:scale-[1.02] disabled:opacity-60"
              style={{ backgroundColor: "#42362F" }}
            >
              {loading ? "Signing In..." : "Login"}
            </button>
          </form>

          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-700"></div>

            <span className="px-4 text-gray-500">OR</span>

            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              theme="filled_black"
              shape="pill"
              size="large"
              width="350"
              useOneTap={false}
              auto_select={false}
              ux_mode="popup"
              onSuccess={(credentialResponse) => {
                console.log("Google Success", credentialResponse);

                if (!credentialResponse.credential) {
                  alert("Google Login Failed");
                  return;
                }

                handleGoogleLogin(credentialResponse.credential);
              }}
              onError={() => {
                console.error("Google Login Error");
                alert("Google Login Failed");
              }}
            />
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <Link
              to="/register"
              className="text-center rounded-xl py-4 font-semibold transition hover:scale-[1.02]"
              style={{
                backgroundColor: "#B89D82",
                color: "#110D0B",
              }}
            >
              Register New User
            </Link>

            <Link
              to="/forgot-password"
              className="text-center text-[#B89D82] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
