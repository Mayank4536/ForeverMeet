import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../services/authService";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaCheckCircle,
  FaKey,
} from "react-icons/fa";

function ChangePassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toast.error("All fields are required");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      toast.success(res.message);

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="light"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-10 sm:px-6 lg:px-8">

        <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center justify-center">

          <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-[0_25px_80px_rgba(15,23,42,0.12)] lg:grid-cols-[0.9fr_1.1fr]">

            {/* LEFT INFORMATION PANEL */}

            <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-indigo-900 p-10 text-white lg:flex lg:flex-col lg:justify-between">

              {/* Decorative circles */}

              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10" />

              <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-white/10" />

              <div className="relative z-10">

                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl backdrop-blur-sm">
                  <FaShieldAlt />
                </div>

                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Account Security
                </p>

                <h2 className="max-w-sm text-4xl font-bold leading-tight">
                  Keep your ForeverMeet account secure.
                </h2>

                <p className="mt-5 max-w-md text-sm leading-7 text-blue-100">
                  Regularly updating your password helps protect your account
                  and keeps your personal information safer.
                </p>

              </div>

              <div className="relative z-10 mt-10 space-y-5">

                <div className="flex items-start gap-4">

                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <FaCheckCircle className="text-sm" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Use a strong password
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-blue-100">
                      Choose a password that is difficult for others to guess.
                    </p>
                  </div>

                </div>

                <div className="flex items-start gap-4">

                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <FaKey className="text-sm" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Keep it private
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-blue-100">
                      Never share your password with anyone.
                    </p>
                  </div>

                </div>

                <div className="flex items-start gap-4">

                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <FaShieldAlt className="text-sm" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Protect your account
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-blue-100">
                      Updating your credentials can help maintain account
                      security.
                    </p>
                  </div>

                </div>

              </div>

              <div className="relative z-10 mt-10 border-t border-white/10 pt-5">

                <p className="text-xs leading-5 text-blue-200">
                  Your security matters to us. Make sure your new password is
                  unique and memorable.
                </p>

              </div>

            </div>

            {/* RIGHT FORM */}

            <div className="p-6 sm:p-10 lg:p-12">

              {/* Mobile Header */}

              <div className="mb-8 text-center lg:hidden">

                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow-lg shadow-blue-600/20">
                  <FaShieldAlt />
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                  Account Security
                </p>

              </div>

              {/* Heading */}

              <div className="mb-8">

                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Change Password
                </h1>

                <p className="mt-3 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
                  Update your password to keep your ForeverMeet account
                  protected.
                </p>

              </div>

              {/* Security Notice */}

              <div className="mb-7 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">

                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <FaShieldAlt />
                </div>

                <div>

                  <p className="text-sm font-semibold text-slate-800">
                    Security reminder
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Never share your password with anyone. ForeverMeet will
                    never ask you to reveal your password.
                  </p>

                </div>

              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* CURRENT PASSWORD */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Current Password
                  </label>

                  <div className="group flex items-center rounded-xl border border-slate-200 bg-slate-50 transition-all duration-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">

                    <div className="pl-4 text-slate-400 transition-colors group-focus-within:text-blue-600">
                      <FaLock />
                    </div>

                    <input
                      type={showCurrent ? "text" : "password"}
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      placeholder="Enter your current password"
                      className="min-w-0 flex-1 bg-transparent px-4 py-4 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                    />

                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="mr-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      aria-label={
                        showCurrent
                          ? "Hide current password"
                          : "Show current password"
                      }
                    >
                      {showCurrent ? <FaEyeSlash /> : <FaEye />}
                    </button>

                  </div>

                </div>

                {/* NEW PASSWORD */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    New Password
                  </label>

                  <div className="group flex items-center rounded-xl border border-slate-200 bg-slate-50 transition-all duration-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">

                    <div className="pl-4 text-slate-400 transition-colors group-focus-within:text-blue-600">
                      <FaLock />
                    </div>

                    <input
                      type={showNew ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="Enter your new password"
                      className="min-w-0 flex-1 bg-transparent px-4 py-4 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                    />

                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="mr-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      aria-label={
                        showNew
                          ? "Hide new password"
                          : "Show new password"
                      }
                    >
                      {showNew ? <FaEyeSlash /> : <FaEye />}
                    </button>

                  </div>

                  {/* Password requirement */}

                  <div className="mt-2 flex items-center gap-2">

                    <div
                      className={`h-1.5 flex-1 rounded-full ${
                        formData.newPassword.length >= 6
                          ? "bg-blue-500"
                          : "bg-slate-200"
                      }`}
                    />

                    <span className="text-xs text-slate-400">
                      Minimum 6 characters
                    </span>

                  </div>

                </div>

                {/* CONFIRM PASSWORD */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Confirm New Password
                  </label>

                  <div className="group flex items-center rounded-xl border border-slate-200 bg-slate-50 transition-all duration-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">

                    <div className="pl-4 text-slate-400 transition-colors group-focus-within:text-blue-600">
                      <FaLock />
                    </div>

                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your new password"
                      className="min-w-0 flex-1 bg-transparent px-4 py-4 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="mr-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      aria-label={
                        showConfirm
                          ? "Hide confirmation password"
                          : "Show confirmation password"
                      }
                    >
                      {showConfirm ? <FaEyeSlash /> : <FaEye />}
                    </button>

                  </div>

                  {/* Password match indicator */}

                  {formData.confirmPassword && (
                    <div className="mt-2 flex items-center gap-2">

                      <span
                        className={`text-xs font-medium ${
                          formData.newPassword ===
                          formData.confirmPassword
                            ? "text-emerald-600"
                            : "text-red-500"
                        }`}
                      >
                        {formData.newPassword ===
                        formData.confirmPassword
                          ? "Passwords match"
                          : "Passwords do not match"}
                      </span>

                    </div>
                  )}

                </div>

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-600/25 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >

                  {loading ? (
                    <span className="flex items-center gap-3">

                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Updating Password...

                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <FaShieldAlt />
                      Change Password
                    </span>
                  )}

                </button>

              </form>

              {/* Bottom Security Text */}

              <div className="mt-8 border-t border-slate-100 pt-6">

                <div className="flex items-center justify-center gap-2 text-xs text-slate-400">

                  <FaLock className="text-slate-300" />

                  <span>
                    Your password is securely protected.
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default ChangePassword;