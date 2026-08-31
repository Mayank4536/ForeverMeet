import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaLock,
  FaShieldAlt,
} from "react-icons/fa";
import { verifyResetOTP } from "../services/authService";

function VerifyResetOTP() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      return toast.error("Please enter OTP");
    }

    try {
      setLoading(true);

      const response = await verifyResetOTP({
        email,
        otp,
      });

      toast.success(response.message);

      navigate("/reset-password", {
        state: {
          email,
          otp,
        },
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 6) {
      setOtp(value);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f9fc] relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-3xl" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-blue-100/40" />

      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-[460px]">

          {/* Brand */}
          <div className="flex justify-center mb-7">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/20">

                <FaShieldAlt className="text-white text-lg" />

              </div>

              <div>

                <p className="text-xl font-bold tracking-tight text-slate-900">
                  ForeverMeet
                </p>

                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 font-medium">
                  Secure Account
                </p>

              </div>

            </div>

          </div>

          {/* Main card */}
          <section className="bg-white rounded-[28px] border border-slate-200/80 shadow-[0_25px_80px_rgba(15,23,42,0.10)] overflow-hidden">

            {/* Top gradient */}
            <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500" />

            <div className="px-6 sm:px-10 py-9 sm:py-10">

              {/* Security icon */}
              <div className="flex justify-center mb-7">

                <div className="relative">

                  <div className="w-[76px] h-[76px] rounded-[22px] bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center">

                    <FaLock className="text-blue-600 text-[27px]" />

                  </div>

                  <div className="absolute -right-2 -bottom-2 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center">

                    <FaCheckCircle className="text-emerald-500 text-sm" />

                  </div>

                </div>

              </div>

              {/* Heading */}
              <div className="text-center">

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                  Password Recovery
                </p>

                <h1 className="mt-2 text-[28px] sm:text-[32px] font-bold tracking-tight text-slate-900">
                  Verify your code
                </h1>

                <p className="mt-3 max-w-sm mx-auto text-sm leading-6 text-slate-500">
                  Enter the six-digit verification code sent to
                  your email address to continue securely.
                </p>

              </div>

              {/* Email information */}
              <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4">

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">

                    <FaShieldAlt className="text-blue-600 text-sm" />

                  </div>

                  <div className="min-w-0">

                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Verification email
                    </p>

                    <p className="mt-0.5 text-sm font-semibold text-slate-700 truncate">
                      {email || "Registered email address"}
                    </p>

                  </div>

                  <div className="ml-auto flex-shrink-0">

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-600">

                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />

                      SENT

                    </span>

                  </div>

                </div>

              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="mt-8"
              >

                <div className="flex items-center justify-between mb-3">

                  <label
                    htmlFor="otp"
                    className="text-sm font-bold text-slate-700"
                  >
                    Verification code
                  </label>

                  <span className="text-xs font-medium text-slate-400">
                    {otp.length}/6 digits
                  </span>

                </div>

                {/* OTP input */}
                <div className="relative">

                  <input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={otp}
                    onChange={handleOtpChange}
                    placeholder="••••••"
                    className="
                      w-full
                      h-[72px]
                      rounded-2xl
                      border
                      border-slate-200
                      bg-slate-50
                      text-center
                      text-[30px]
                      font-bold
                      tracking-[0.55em]
                      text-slate-900
                      placeholder:text-slate-300
                      placeholder:tracking-[0.35em]
                      outline-none
                      transition-all
                      duration-200
                      focus:bg-white
                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-500/10
                    "
                  />

                </div>

                {/* Progress */}
                <div className="mt-3">

                  <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
                      style={{
                        width: `${(otp.length / 6) * 100}%`,
                      }}
                    />

                  </div>

                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    mt-7
                    w-full
                    h-[56px]
                    rounded-2xl
                    bg-slate-900
                    hover:bg-blue-600
                    disabled:bg-slate-400
                    disabled:cursor-not-allowed
                    text-white
                    font-semibold
                    shadow-lg
                    shadow-slate-900/10
                    hover:shadow-blue-600/20
                    transition-all
                    duration-200
                    cursor-pointer
                  "
                >

                  {loading ? (
                    <span className="flex items-center justify-center gap-3">

                      <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />

                      Verifying securely...

                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">

                      Verify & Continue

                      <span className="text-blue-300">
                        →
                      </span>

                    </span>
                  )}

                </button>

              </form>

              {/* Security note */}
              <div className="mt-7 flex gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">

                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-white border border-blue-100 flex items-center justify-center">

                  <FaLock className="text-blue-600 text-xs" />

                </div>

                <div>

                  <p className="text-xs font-bold text-slate-700">
                    Your account is protected
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-slate-500">
                    Never share your verification code with
                    anyone. ForeverMeet will never ask you to
                    share your OTP.
                  </p>

                </div>

              </div>

              {/* Back button */}
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="
                  mt-7
                  mx-auto
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-slate-500
                  hover:text-blue-600
                  transition-colors
                  cursor-pointer
                "
              >

                <FaArrowLeft className="text-[11px]" />

                Back to Forgot Password

              </button>

            </div>

          </section>

          {/* Footer */}
          <div className="mt-6 text-center">

            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} ForeverMeet
            </p>

            <div className="mt-1 flex items-center justify-center gap-2 text-[10px] text-slate-400">

              <span>Secure authentication</span>

              <span>•</span>

              <span>Privacy protected</span>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default VerifyResetOTP;