import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTrashAlt,
  FaExclamationTriangle,
  FaLock,
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { deleteAccount } from "../services/authService";

function DeleteAccount() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Show custom confirmation modal
  const [showConfirm, setShowConfirm] = useState(false);

  // User must type DELETE
  const [confirmText, setConfirmText] = useState("");

  const handleDelete = async () => {
    if (!password.trim()) {
      toast.error("Please enter your password.");
      return;
    }

    if (confirmText.trim() !== "DELETE") {
      toast.error("Type DELETE to continue.");
      return;
    }

    try {
      setLoading(true);

      const res = await deleteAccount(password);

      toast.success(res.message || "Account deleted successfully.");

      localStorage.removeItem("token");

      navigate("/register");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to delete account."
      );
    } finally {
      setLoading(false);
      setShowConfirm(false);
      setConfirmText("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Decorative Background */}

      <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

      {/* Main Content */}

      <div className="relative min-h-screen flex items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-3xl">
          {/* Top Brand */}

          <div className="text-center mb-7">
            <div className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
                <FaShieldAlt />
              </div>

              <span className="text-xl font-bold text-slate-900">
                Forever<span className="text-blue-600">Meet</span>
              </span>
            </div>
          </div>

          {/* Main Card */}

          <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_20px_70px_rgba(15,23,42,0.10)] overflow-hidden">
            {/* Header */}

            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 px-6 py-10 sm:px-10 sm:py-12 text-white overflow-hidden">
              {/* Header Decorative Circle */}

              <div className="absolute -right-16 -top-20 w-64 h-64 rounded-full border-[40px] border-white/5" />

              <div className="absolute right-16 bottom-[-80px] w-48 h-48 rounded-full bg-red-500/10 blur-2xl" />

              <div className="relative flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-red-500/15 border border-red-400/20 flex items-center justify-center shadow-lg">
                  <FaTrashAlt className="text-3xl text-red-400" />
                </div>

                <div className="mt-6">
                  <p className="text-red-300 text-sm font-semibold uppercase tracking-[0.18em]">
                    Account Security
                  </p>

                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2">
                    Delete Account
                  </h1>

                  <p className="text-slate-300 mt-3 max-w-xl leading-7">
                    We're sorry to see you go. Please review the information
                    below before permanently deleting your ForeverMeet account.
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}

            <div className="p-6 sm:p-10">
              {/* Warning Box */}

              <div className="rounded-2xl border border-red-200 bg-red-50/70 overflow-hidden">
                <div className="px-5 py-4 border-b border-red-200 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                    <FaExclamationTriangle className="text-red-600" />
                  </div>

                  <div>
                    <h2 className="font-bold text-red-800">
                      Before you continue
                    </h2>

                    <p className="text-sm text-red-600 mt-0.5">
                      This action cannot be reversed.
                    </p>
                  </div>
                </div>

                <div className="p-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <WarningItem>
                      Your ForeverMeet account will be permanently deleted.
                    </WarningItem>

                    <WarningItem>
                      All your listings will be removed.
                    </WarningItem>

                    <WarningItem>
                      Any remaining wallet credits will be lost.
                    </WarningItem>

                    <WarningItem>
                      Purchased credits are non-refundable.
                    </WarningItem>
                  </div>
                </div>
              </div>

              {/* Password Section */}

              <div className="mt-9">
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-slate-900">
                    Confirm your identity
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Enter your current password to continue.
                  </p>
                </div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Current Password
                </label>

                <div
                  className={`group flex items-center rounded-xl border bg-white transition-all ${
                    password
                      ? "border-slate-300"
                      : "border-slate-200"
                  } focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-500/10`}
                >
                  <div className="pl-4 text-slate-400 group-focus-within:text-red-500 transition-colors">
                    <FaLock />
                  </div>

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your current password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-4 bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="mr-3 w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
                  <FaShieldAlt className="text-blue-500" />

                  <span>
                    Your password is required to verify that it's really you.
                  </span>
                </div>
              </div>

              {/* Buttons */}

              <div className="grid sm:grid-cols-2 gap-3 mt-9">
                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="group w-full rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 py-4 px-5 font-semibold flex items-center justify-center gap-3 transition-all cursor-pointer"
                >
                  <FaArrowLeft className="text-slate-400 group-hover:-translate-x-1 transition-transform" />

                  Back to Profile
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!password.trim()) {
                      return toast.error("Please enter your password.");
                    }

                    setShowConfirm(true);
                  }}
                  className="w-full rounded-xl bg-red-600 hover:bg-red-700 text-white py-4 px-5 font-semibold flex items-center justify-center gap-3 shadow-lg shadow-red-600/20 hover:shadow-red-600/30 transition-all cursor-pointer"
                >
                  <FaTrashAlt />

                  Delete Account
                </button>
              </div>

              {/* Security Note */}

              <div className="mt-7 flex items-start gap-3 rounded-xl bg-slate-50 border border-slate-100 p-4">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                  <FaShieldAlt className="text-blue-600 text-sm" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Your account security matters
                  </p>

                  <p className="text-xs text-slate-500 mt-1 leading-5">
                    If you didn't intend to delete your account, simply return
                    to your profile and continue using ForeverMeet normally.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}

          <p className="text-center text-xs text-slate-400 mt-6">
            © {new Date().getFullYear()} ForeverMeet. Please make sure you
            understand the consequences before continuing.
          </p>
        </div>
      </div>

      {/* Confirmation Modal */}

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
          {/* Overlay */}

          <div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
            onClick={() => {
              if (!loading) {
                setShowConfirm(false);
                setConfirmText("");
              }
            }}
          />

          {/* Modal */}

          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.25)] overflow-hidden animate-[fadeIn_.2s_ease-out]">
            {/* Modal Header */}

            <div className="px-6 pt-7 sm:px-8 sm:pt-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                    <FaTrashAlt className="text-red-600 text-xl" />
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-5">
                    Confirm account deletion
                  </h2>

                  <p className="text-slate-500 mt-2 leading-6">
                    This is the final confirmation. Once deleted, your account
                    and associated data cannot be recovered.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Warning */}

            <div className="mx-6 sm:mx-8 mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
              <div className="flex items-start gap-3">
                <FaExclamationTriangle className="text-red-600 mt-0.5 shrink-0" />

                <div>
                  <p className="text-sm font-bold text-red-800">
                    Permanent action
                  </p>

                  <p className="text-xs text-red-700 mt-1 leading-5">
                    Your profile, listings and available wallet credits will be
                    permanently removed.
                  </p>
                </div>
              </div>
            </div>

            {/* Confirmation Input */}

            <div className="px-6 sm:px-8 mt-6">
              <label className="block text-sm font-semibold text-slate-700">
                Type{" "}
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-red-100 text-red-700 font-bold text-xs tracking-wide mx-1">
                  DELETE
                </span>{" "}
                to confirm
              </label>

              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type DELETE here"
                autoFocus
                className="w-full mt-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all"
              />

              {confirmText.length > 0 &&
                confirmText.trim() !== "DELETE" && (
                  <p className="text-xs text-red-600 mt-2">
                    Please type DELETE exactly as shown above.
                  </p>
                )}

              {confirmText.trim() === "DELETE" && (
                <p className="flex items-center gap-2 text-xs text-green-600 mt-2">
                  <FaCheckCircle />
                  Confirmation text accepted.
                </p>
              )}
            </div>

            {/* Modal Buttons */}

            <div className="px-6 sm:px-8 py-7 flex flex-col-reverse sm:flex-row gap-3">
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setShowConfirm(false);
                  setConfirmText("");
                }}
                className="flex-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 py-3.5 font-semibold transition cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={handleDelete}
                className="flex-1 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-3.5 font-semibold transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-600/20"
              >
                <FaTrashAlt />

                {loading ? "Deleting..." : "Permanently Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Small reusable warning item */

function WarningItem({ children }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0">
        <FaCheckCircle className="text-red-500 text-[10px]" />
      </div>

      <p className="text-sm text-slate-700 leading-5">
        {children}
      </p>
    </div>
  );
}

export default DeleteAccount;