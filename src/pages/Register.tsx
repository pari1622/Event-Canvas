import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      console.log("Before API");

      const res = await registerUser(form);

      console.log("After API");
      console.log(res);

      if (res.token && res.user) {
        login(res.token, res.user);
        navigate("/", { replace: true });
        return;
      }

      alert(res.message || "Registration Successful");

      navigate("/login", {
        replace: true,
        state: {
          message: "Registration successful. Please login.",
        },
      });
    } catch (err: any) {
      console.error("REGISTER ERROR");
      console.error(err);
      console.error(err?.response);
      console.error(err?.response?.data);

      alert(
        err?.response?.data?.message || err?.message || "Registration Failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#110D0B] px-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-[#1B1512] shadow-2xl md:grid-cols-2">
        <div className="hidden flex-col justify-center bg-gradient-to-br from-[#42362F] to-[#B89D82] p-12 text-white md:flex">
          <h1 className="mb-6 text-5xl font-bold">EVENTCANVAS</h1>

          <p className="text-lg leading-8 text-white/90">
            Create your account
            <br />
            and manage quotations,
            <br />
            orders and projects
            <br />
            in one place.
          </p>

          <div className="mt-12 h-1 w-28 rounded-full bg-white"></div>
        </div>

        <div className="p-10 md:p-14">
          <h2 className="mb-2 text-3xl font-bold text-white">Create Account</h2>

          <p className="mb-10 text-gray-400">Join EventCanvas today.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              required
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#42362F] bg-[#2A211D] px-5 py-4 text-white outline-none focus:border-[#B89D82]"
            />

            <input
              required
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#42362F] bg-[#2A211D] px-5 py-4 text-white outline-none focus:border-[#B89D82]"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#42362F] bg-[#2A211D] px-5 py-4 text-white outline-none focus:border-[#B89D82]"
            />

            <input
              required
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#42362F] bg-[#2A211D] px-5 py-4 text-white outline-none focus:border-[#B89D82]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-4 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                backgroundColor: "#42362F",
              }}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-700"></div>

            <span className="px-4 text-gray-500">OR</span>

            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          <Link
            to="/login"
            className="block w-full rounded-xl py-4 text-center font-semibold transition hover:scale-[1.02]"
            style={{
              backgroundColor: "#B89D82",
              color: "#110D0B",
            }}
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
