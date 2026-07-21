import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await registerUser(form);

      alert(res.message);

      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#110D0B] flex items-center justify-center px-6">
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl bg-[#1B1512] grid md:grid-cols-2">
        {/* Left */}

        <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-[#42362F] to-[#B89D82] text-white">
          <h1 className="text-5xl font-bold mb-6">EVENTCANVAS</h1>

          <p className="text-lg leading-8 text-white/90">
            Create your account and manage quotations, orders and projects in
            one place.
          </p>

          <div className="mt-12 h-1 w-28 bg-white rounded-full"></div>
        </div>

        {/* Right */}

        <div className="p-10 md:p-14">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>

          <p className="text-gray-400 mb-10">Join EventCanvas today.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#2A211D] border border-[#42362F] px-5 py-4 text-white outline-none focus:border-[#B89D82]"
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#2A211D] border border-[#42362F] px-5 py-4 text-white outline-none focus:border-[#B89D82]"
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#2A211D] border border-[#42362F] px-5 py-4 text-white outline-none focus:border-[#B89D82]"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#2A211D] border border-[#42362F] px-5 py-4 text-white outline-none focus:border-[#B89D82]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-4 font-semibold text-white transition hover:scale-[1.02]"
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

          <button className="w-full rounded-xl border border-gray-600 py-4 text-white hover:bg-white/5 transition">
            Continue with Google
          </button>

          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">Already have an account?</p>

            <Link
              to="/login"
              className="inline-block rounded-xl px-8 py-3 font-semibold transition hover:scale-105"
              style={{
                backgroundColor: "#B89D82",
                color: "#110D0B",
              }}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
