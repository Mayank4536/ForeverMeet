import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaCheck,
  FaEnvelope,
  FaLock,
  FaShieldAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { verifyOTP, resendOTP } from "../services/authService";

function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const inputRefs = useRef([]);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  // Focus the first OTP input when the page loads
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Update individual OTP boxes
  const handleOtpChange = (value, index) => {
    const numericValue = value.replace(/\D/g, "");

    if (!numericValue) {
      const updatedOtp = [...otp];
      updatedOtp[index] = "";
      setOtp(updatedOtp);
      return;
    }

    const updatedOtp = [...otp];

    // Handle pasted/multiple digits
    if (numericValue.length > 1) {
      const digits = numericValue.slice(0, 6).split("");

      digits.forEach((digit, digitIndex) => {
        if (index + digitIndex < 6) {
          updatedOtp[index + digitIndex] = digit;
        }
      });

      setOtp(updatedOtp);

      const nextIndex = Math.min(index + digits.length, 5);
      inputRefs.current[nextIndex]?.focus();

      return;
    }

    updatedOtp[index] = numericValue.charAt(0);
    setOtp(updatedOtp);

    // Move to next box automatically
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const updatedOtp = [...otp];
        updatedOtp[index] = "";
        setOtp(updatedOtp);
        return;
      }

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();

        const updatedOtp = [...otp];
        updatedOtp[index - 1] = "";
        setOtp(updatedOtp);
      }
    }

    // Move between OTP boxes with arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();

    const pastedText = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedText) return;

    const digits = pastedText.split("");

    const updatedOtp = ["", "", "", "", "", ""];

    digits.forEach((digit, index) => {
      updatedOtp[index] = digit;
    });

    setOtp(updatedOtp);

    const nextIndex = Math.min(pastedText.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  // Verify OTP
  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpValue = otp.join("");

    if (!otpValue) {
      return toast.error("Please enter OTP");
    }

    if (otpValue.length !== 6) {
      return toast.error("Please enter the complete 6-digit OTP");
    }

    try {
      setLoading(true);

      const response = await verifyOTP({
        email,
        otp: otpValue,
      });

      toast.success(response.message);

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "OTP Verification Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    try {
      setResending(true);

      const response = await resendOTP({
        email,
      });

      toast.success(response.message);

      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to resend OTP"
      );
    } finally {
      setResending(false);
    }
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <div className="min-h-screen bg-[#f5f7fb] relative overflow-hidden">

      {/* =========================================================
          BACKGROUND DECORATION
      ========================================================== */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-sky-100/30 blur-3xl" />

      </div>

      {/* =========================================================
          PAGE
      ========================================================== */}

      <div className="relative min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">

        <div className="w-full max-w-6xl">

          {/* =====================================================
              MAIN AUTH CARD
          ====================================================== */}

          <div className="overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_25px_80px_rgba(15,23,42,0.12)]">

            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">

              {/* =================================================
                  LEFT BRAND PANEL
              ================================================== */}

              <div className="relative hidden lg:flex overflow-hidden bg-[#0b1736] p-12 xl:p-16 text-white">

                {/* Decorative shapes */}

                <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border border-white/10" />

                <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full border border-white/10" />

                <div className="absolute right-20 top-28 h-16 w-16 rounded-full bg-blue-400/10" />

                <div className="absolute bottom-32 right-12 h-28 w-28 rounded-full bg-indigo-400/10 blur-xl" />

                <div className="relative z-10 flex h-full w-full flex-col">

                  {/* Logo */}

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#0b1736] shadow-lg">

                      <span className="text-xl font-extrabold">
                        F
                      </span>

                    </div>

                    <div>

                      <p className="text-lg font-bold tracking-tight">
                        ForeverMeet
                      </p>

                      <p className="text-[11px] text-slate-400">
                        Connect. Discover. Grow.
                      </p>

                    </div>

                  </div>

                  {/* Main content */}

                  <div className="my-auto py-16">

                    <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2">

                      <FaShieldAlt className="text-blue-300 text-xs" />

                      <span className="text-xs font-medium text-blue-100">
                        Secure Account Verification
                      </span>

                    </div>

                    <h1 className="max-w-md text-4xl font-bold leading-[1.15] xl:text-5xl">

                      One final step to

                      <span className="block text-blue-300">
                        get started.
                      </span>

                    </h1>

                    <p className="mt-6 max-w-md text-sm leading-7 text-slate-300">

                      Verify your email address to protect your
                      account and continue using your ForeverMeet
                      account securely.

                    </p>

                    {/* Verification steps */}

                    <div className="mt-10 space-y-5">

                      <div className="flex items-start gap-4">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-400/10">

                          <FaEnvelope className="text-sm text-blue-300" />

                        </div>

                        <div>

                          <p className="text-sm font-semibold">
                            Check your inbox
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-400">
                            We've sent a six-digit verification code
                            to your email.
                          </p>

                        </div>

                      </div>

                      <div className="flex items-start gap-4">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-400/10">

                          <FaLock className="text-sm text-blue-300" />

                        </div>

                        <div>

                          <p className="text-sm font-semibold">
                            Enter your code
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-400">
                            Enter the OTP exactly as received.
                          </p>

                        </div>

                      </div>

                      <div className="flex items-start gap-4">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-400/10">

                          <FaCheck className="text-sm text-blue-300" />

                        </div>

                        <div>

                          <p className="text-sm font-semibold">
                            You're verified
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-400">
                            Your account will be ready to use.
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* Footer */}

                  <div className="border-t border-white/10 pt-6">

                    <div className="flex items-center gap-3">

                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10">

                        <FaShieldAlt className="text-xs text-emerald-300" />

                      </div>

                      <p className="text-xs leading-5 text-slate-400">

                        Your verification information is securely
                        processed and protected.

                      </p>

                    </div>

                  </div>

                </div>

              </div>

              {/* =================================================
                  RIGHT VERIFICATION PANEL
              ================================================== */}

              <div className="px-5 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-14 xl:px-20">

                {/* Mobile Logo */}

                <div className="mb-10 flex justify-center lg:hidden">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b1736] text-white">

                      <span className="font-bold">
                        F
                      </span>

                    </div>

                    <div>

                      <p className="font-bold text-slate-900">
                        ForeverMeet
                      </p>

                      <p className="text-[10px] text-slate-400">
                        Connect. Discover. Grow.
                      </p>

                    </div>

                  </div>

                </div>

                {/* Top icon */}

                <div className="flex justify-center lg:justify-start">

                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">

                    <div className="absolute inset-0 rounded-2xl bg-blue-100/50 animate-pulse" />

                    <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">

                      <FaShieldAlt className="text-xl text-blue-600" />

                    </div>

                  </div>

                </div>

                {/* Heading */}

                <div className="mt-7 text-center lg:text-left">

                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">

                    Account Verification

                  </p>

                  <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">

                    Verify your email

                  </h2>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 lg:mx-0">

                    Enter the six-digit code we sent to your
                    email address to continue.

                  </p>

                </div>

                {/* Email card */}

                <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">

                      <FaEnvelope className="text-sm text-blue-600" />

                    </div>

                    <div className="min-w-0">

                      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">

                        Verification code sent to

                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-slate-700">

                        {email || "Your registered email"}

                      </p>

                    </div>

                  </div>

                </div>

                {/* =================================================
                    OTP FORM
                ================================================== */}

                <form
                  onSubmit={handleSubmit}
                  className="mt-8"
                >

                  <div className="flex items-center justify-between">

                    <label className="text-sm font-semibold text-slate-800">

                      Verification code

                    </label>

                    <span className="text-xs text-slate-400">

                      6 digits

                    </span>

                  </div>

                  {/* OTP Boxes */}

                  <div
                    className="mt-4 flex justify-between gap-2 sm:gap-3"
                    onPaste={handlePaste}
                  >

                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(element) => {
                          inputRefs.current[index] = element;
                        }}
                        type="text"
                        inputMode="numeric"
                        autoComplete={
                          index === 0
                            ? "one-time-code"
                            : "off"
                        }
                        maxLength={1}
                        value={digit}
                        onChange={(e) =>
                          handleOtpChange(
                            e.target.value,
                            index
                          )
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(e, index)
                        }
                        className={`h-14 w-full max-w-[58px] rounded-xl border text-center text-xl font-bold outline-none transition-all duration-200 sm:h-16 sm:max-w-[64px] sm:text-2xl ${
                          digit
                            ? "border-blue-500 bg-blue-50/40 text-slate-900 shadow-sm shadow-blue-100"
                            : "border-slate-200 bg-slate-50 text-slate-900"
                        } focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10`}
                        aria-label={`OTP digit ${index + 1}`}
                      />
                    ))}

                  </div>

                  {/* OTP status */}

                  <div className="mt-4 flex min-h-5 items-center justify-center lg:justify-start">

                    {isComplete ? (
                      <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">

                        <FaCheck />

                        Verification code complete

                      </div>
                    ) : (
                      <p className="text-xs text-slate-400">

                        You can paste your complete 6-digit code

                      </p>
                    )}

                  </div>

                  {/* Security box */}

                  <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">

                    <div className="flex items-start gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">

                        <FaLock className="text-xs text-blue-600" />

                      </div>

                      <div>

                        <p className="text-xs font-bold text-slate-700">

                          Keep your OTP private

                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">

                          Never share this verification code with
                          anyone. ForeverMeet support will never
                          ask for your OTP.

                        </p>

                      </div>

                    </div>

                  </div>

                  {/* Submit */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#0b1736] px-5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:bg-blue-700 hover:shadow-blue-600/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {loading ? (
                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                        Verifying code...

                      </>
                    ) : (
                      <>
                        Verify & Continue

                        <FaArrowRight className="text-xs" />

                      </>
                    )}

                  </button>

                </form>

                {/* =================================================
                    RESEND
                ================================================== */}

                <div className="mt-7 text-center">

                  <p className="text-sm text-slate-500">

                    Didn't receive the code?

                  </p>

                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={resending}
                    className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                  >

                    {resending ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />

                        Sending new code...

                      </>
                    ) : (
                      "Resend verification code"
                    )}

                  </button>

                </div>

                {/* Bottom divider */}

                <div className="mt-9 border-t border-slate-100 pt-6">

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">

                    <FaShieldAlt className="text-emerald-500" />

                    <span>
                      Secure verification powered by ForeverMeet
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Page footer */}

          <p className="mt-6 text-center text-xs text-slate-400">

            © {new Date().getFullYear()} ForeverMeet. All rights reserved.

          </p>

        </div>

      </div>

    </div>
  );
}

export default VerifyOTP;