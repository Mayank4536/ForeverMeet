import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { resetPassword } from "../services/authService";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const otp = location.state?.otp;

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password || !formData.confirmPassword) {
      return toast.error("Please fill all fields");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const response = await resetPassword({
        email,
        otp,
        newPassword: formData.password,
      });

      toast.success(response.message);

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10 relative overflow-hidden">

      {/* Background Decorations */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-60" />

      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-60" />

      <div className="relative w-full max-w-5xl">

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-[0_20px_70px_rgba(15,23,42,0.10)] overflow-hidden border border-slate-200">

          <div className="grid md:grid-cols-2">

            {/* =========================
                LEFT INFORMATION PANEL
            ========================== */}
            <div className="hidden md:flex bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white p-10 lg:p-12 flex-col justify-between relative overflow-hidden">

              {/* Decorative Circles */}
              <div className="absolute -top-20 -right-20 w-60 h-60 border border-white/10 rounded-full" />

              <div className="absolute -bottom-28 -left-28 w-72 h-72 border border-white/10 rounded-full" />

              <div className="relative z-10">

                {/* Logo / Brand */}
                <div className="flex items-center gap-3 mb-12">

                  <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <FaShieldAlt className="text-xl" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold tracking-tight">
                      ForeverMeet
                    </h2>

                    <p className="text-xs text-blue-100">
                      Professional Profiles
                    </p>
                  </div>

                </div>

                <div className="max-w-sm">

                  <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-3 py-1.5 rounded-full text-xs font-medium mb-5">
                    <FaLock className="text-[11px]" />
                    Secure Account Recovery
                  </span>

                  <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                    Create a new password
                    <span className="block text-blue-100">
                      and secure your account.
                    </span>
                  </h2>

                  <p className="mt-5 text-blue-100 leading-7 text-sm lg:text-base">
                    Choose a strong password to protect your
                    ForeverMeet account and keep your profile
                    information secure.
                  </p>

                </div>

                {/* Security Features */}
                <div className="mt-10 space-y-4">

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <FaCheckCircle className="text-sm" />
                    </div>

                    <span className="text-sm text-blue-50">
                      Secure password recovery
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <FaCheckCircle className="text-sm" />
                    </div>

                    <span className="text-sm text-blue-50">
                      Your account remains protected
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <FaCheckCircle className="text-sm" />
                    </div>

                    <span className="text-sm text-blue-50">
                      Private and secure authentication
                    </span>
                  </div>

                </div>

              </div>

              <div className="relative z-10 mt-10 pt-6 border-t border-white/10">
                <p className="text-xs text-blue-100">
                  Your security matters to us.
                </p>
              </div>

            </div>

            {/* =========================
                RIGHT FORM PANEL
            ========================== */}
            <div className="p-7 sm:p-9 lg:p-12">

              {/* Mobile Brand */}
              <div className="md:hidden flex items-center gap-3 mb-8">

                <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <FaShieldAlt />
                </div>

                <div>
                  <h2 className="font-bold text-xl text-slate-900">
                    ForeverMeet
                  </h2>

                  <p className="text-xs text-slate-500">
                    Secure account recovery
                  </p>
                </div>

              </div>

              {/* Header */}
              <div className="mb-8">

                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                  <FaLock className="text-xl" />
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                  Reset Password
                </h1>

                <p className="mt-3 text-sm sm:text-base text-slate-500 leading-6">
                  Create a new password for your account.
                  Make sure it is strong and easy for you to
                  remember.
                </p>

              </div>

              {/* Email Information */}
              {email && (
                <div className="mb-7 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3.5">

                  <p className="text-xs font-medium text-slate-500 mb-1">
                    Account
                  </p>

                  <p className="text-sm font-semibold text-slate-800 break-all">
                    {email}
                  </p>

                </div>
              )}

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* New Password */}
                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    New Password
                  </label>

                  <div className="relative">

                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <FaLock className="text-sm" />
                    </div>

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      placeholder="Enter your new password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-12 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition cursor-pointer"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>

                  </div>

                </div>

                {/* Confirm Password */}
                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Confirm Password
                  </label>

                  <div className="relative">

                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <FaLock className="text-sm" />
                    </div>

                    <input
                      type={
                        showConfirm
                          ? "text"
                          : "password"
                      }
                      name="confirmPassword"
                      placeholder="Confirm your new password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-12 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirm(!showConfirm)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition cursor-pointer"
                      aria-label={
                        showConfirm
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showConfirm ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>

                  </div>

                </div>

                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <div
                    className={`flex items-center gap-2 text-xs font-medium ${
                      formData.password ===
                      formData.confirmPassword
                        ? "text-emerald-600"
                        : "text-red-500"
                    }`}
                  >

                    <span
                      className={`w-2 h-2 rounded-full ${
                        formData.password ===
                        formData.confirmPassword
                          ? "bg-emerald-500"
                          : "bg-red-500"
                      }`}
                    />

                    {formData.password ===
                    formData.confirmPassword
                      ? "Passwords match"
                      : "Passwords do not match"}

                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 text-white rounded-xl font-semibold text-sm shadow-lg shadow-blue-600/20 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">

                      <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />

                      Updating Password...

                    </span>
                  ) : (
                    "Reset Password"
                  )}
                </button>

              </form>

              {/* Security Note */}
              <div className="mt-7 flex gap-3 rounded-xl bg-blue-50 border border-blue-100 p-4">

                <FaShieldAlt className="text-blue-600 mt-0.5 flex-shrink-0" />

                <p className="text-xs leading-5 text-blue-800">
                  Your new password will be used to protect
                  your ForeverMeet account. Never share your
                  password or OTP with anyone.
                </p>

              </div>

              {/* Back to Login */}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="mt-7 mx-auto flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition cursor-pointer"
              >
                <FaArrowLeft className="text-xs" />
                Back to Login
              </button>

              {/* Footer */}
              <p className="text-center text-xs text-slate-400 mt-8">
                © {new Date().getFullYear()} ForeverMeet.
                All rights reserved.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ResetPassword;