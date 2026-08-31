import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaArrowLeft,
  FaShieldAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { forgotPassword } from "../services/authService";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter your email");
    }

    try {
      setLoading(true);

      const response = await forgotPassword({
        email,
      });

      toast.success(response.message);

      navigate("/verify-reset-otp", {
        state: {
          email,
        },
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to send OTP"
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

        {/* Card */}
        <div className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-[0_20px_70px_rgba(0,0,0,0.08)]">

          {/* Header */}
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

            {/* Icon */}
            <div className="mx-auto mt-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-red-400 ring-1 ring-white/10">
              <FaLock className="text-xl" />
            </div>

            <h1 className="mt-5 text-2xl font-black tracking-tight text-white sm:text-3xl">
              Forgot your password?
            </h1>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-400">
              No worries. Enter your registered email and we'll
              send you a secure OTP to reset your password.
            </p>

          </div>

          {/* Form section */}
          <div className="px-5 py-7 sm:px-8 sm:py-8">

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}
              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  Registered email address
                </label>

                <div className="group relative">

                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-600">
                    <FaEnvelope className="text-sm" />
                  </div>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    autoComplete="email"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
                  />

                </div>

              </div>

              {/* Information box */}
              <div className="rounded-xl border border-red-100 bg-red-50/60 p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-red-600 shadow-sm">
                    <FaShieldAlt className="text-xs" />
                  </div>

                  <div>

                    <p className="text-xs font-black text-gray-800">
                      Secure password recovery
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-gray-500">
                      We'll send a one-time verification code
                      to your registered email address.
                    </p>

                  </div>

                </div>

              </div>

              {/* Submit */}
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
                    ? "Sending OTP..."
                    : "Send Verification OTP"}
                </span>

              </button>

            </form>

            {/* Back to login */}
            <div className="mt-7 border-t border-gray-100 pt-6">

              <Link
                to="/login"
                className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-black text-gray-700 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <FaArrowLeft className="text-xs transition-transform group-hover:-translate-x-1" />

                Back to Login
              </Link>

            </div>

            {/* Help text */}
            <p className="mt-6 text-center text-[11px] leading-5 text-gray-400">
              Make sure you enter the same email address you
              used when creating your ForeverMeet account.
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

export default ForgotPassword;