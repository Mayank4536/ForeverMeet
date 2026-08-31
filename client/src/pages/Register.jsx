import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await registerUser(formData);

      toast.success(res.message || "OTP Sent Successfully");

      navigate("/verify-otp", {
        state: {
          email: formData.email,
        },
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f7f8] px-4 py-8 sm:px-6 lg:px-8">

      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-red-100/60 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-red-100/50 blur-3xl" />

        <div className="absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-gray-200/40 blur-3xl" />
      </div>

      {/* Main container */}
      <div className="relative z-10 w-full max-w-md">

        {/* Register card */}
        <div className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-[0_20px_70px_rgba(0,0,0,0.08)]">

          {/* Brand header */}
          <div className="border-b border-gray-100 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 px-6 py-8 text-center sm:px-8">

            {/* Logo */}
            <Link
              to="/"
              className="mx-auto flex w-fit cursor-pointer items-center gap-2 transition-opacity hover:opacity-90"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-lg font-black text-white shadow-lg shadow-red-600/20">
                F
              </div>

              <span className="text-2xl font-black tracking-tight text-white">
                Forever<span className="text-red-500">Meet</span>
              </span>
            </Link>

            <h1 className="mt-7 text-2xl font-black tracking-tight text-white sm:text-3xl">
              Create your account
            </h1>

            <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-gray-400">
              Join ForeverMeet and create your professional profile.
            </p>
          </div>

          {/* Form area */}
          <div className="px-5 py-7 sm:px-8 sm:py-8">

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  Full name
                </label>

                <div className="group relative">

                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-600">
                    <FaUser className="text-sm" />
                  </div>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
                    required
                  />

                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  Email address
                </label>

                <div className="group relative">

                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-600">
                    <FaEnvelope className="text-sm" />
                  </div>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
                    required
                  />

                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  Password
                </label>

                <div className="group relative">

                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-600">
                    <FaLock className="text-sm" />
                  </div>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-12 text-sm font-medium text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>

                </div>
              </div>

              {/* Information */}
              <div className="rounded-xl border border-red-100 bg-red-50/60 p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-red-600 shadow-sm">
                    <FaEnvelope className="text-xs" />
                  </div>

                  <div>
                    <p className="text-xs font-black text-gray-800">
                      Email verification required
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-gray-500">
                      After registration, we will send a verification
                      OTP to your email address.
                    </p>
                  </div>

                </div>

              </div>

              {/* Register button */}
              <button
                type="submit"
                disabled={loading}
                className={`group relative flex w-full items-center justify-center overflow-hidden rounded-xl px-4 py-3.5 text-sm font-black text-white shadow-lg transition-all duration-300 ${
                  loading
                    ? "cursor-not-allowed bg-gray-400"
                    : "cursor-pointer bg-red-600 shadow-red-600/20 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/20 active:translate-y-0"
                }`}
              >

                {!loading && (
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                )}

                <span className="relative">
                  {loading
                    ? "Creating account..."
                    : "Create ForeverMeet Account"}
                </span>

              </button>

            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">

              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Already registered?
              </span>

              <div className="h-px flex-1 bg-gray-200" />

            </div>

            {/* Login */}
            <Link
              to="/login"
              className="flex w-full cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-black text-gray-800 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              Sign in to your account
            </Link>

            {/* Terms notice */}
            <p className="mt-6 text-center text-[11px] leading-5 text-gray-400">
              By creating an account, you acknowledge that you have
              read and agree to our{" "}
              <Link
                to="/terms"
                className="cursor-pointer font-bold text-gray-600 transition hover:text-red-600"
              >
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy-policy"
                className="cursor-pointer font-bold text-gray-600 transition hover:text-red-600"
              >
                Privacy Policy
              </Link>
              .
            </p>

          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">

          <div className="flex items-center justify-center gap-4 text-xs font-medium text-gray-500">

            <Link
              to="/privacy-policy"
              className="cursor-pointer transition hover:text-red-600"
            >
              Privacy Policy
            </Link>

            <span className="h-1 w-1 rounded-full bg-gray-300" />

            <Link
              to="/terms"
              className="cursor-pointer transition hover:text-red-600"
            >
              Terms
            </Link>

            <span className="h-1 w-1 rounded-full bg-gray-300" />

            <Link
              to="/contact"
              className="cursor-pointer transition hover:text-red-600"
            >
              Contact
            </Link>

          </div>

          <p className="mt-3 text-[11px] font-medium text-gray-400">
            © {new Date().getFullYear()} ForeverMeet. All rights reserved.
          </p>

        </div>

      </div>
    </div>
  );
}

export default Register;