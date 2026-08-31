import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  FaShieldAlt,
  FaFlag,
  FaUser,
  FaExclamationTriangle,
  FaEnvelope,
  FaArrowRight,
  FaCheckCircle,
  FaLock,
  FaChevronDown,
  FaLifeRing,
  FaInfoCircle,
  FaCamera,
  FaPaperclip,
  FaSearch,
  FaBan,
  FaUserSecret,
  FaComments,
  FaCheck,
  FaClock,
  FaHeadset,
} from "react-icons/fa";

function Report() {
  const [formData, setFormData] = useState({
    profileUrl: "",
    reason: "",
    name: "",
    email: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const reasons = [
    {
      value: "fake-profile",
      label: "Fake or misleading profile",
      description: "The profile contains false or misleading information.",
      icon: FaUserSecret,
    },
    {
      value: "inappropriate-content",
      label: "Inappropriate content",
      description: "Content that does not follow our platform guidelines.",
      icon: FaBan,
    },
    {
      value: "harassment",
      label: "Harassment or abusive behaviour",
      description: "Threatening, abusive or unwanted behaviour.",
      icon: FaComments,
    },
    {
      value: "spam",
      label: "Spam or promotional abuse",
      description: "Repeated unwanted or misleading promotional activity.",
      icon: FaExclamationTriangle,
    },
    {
      value: "impersonation",
      label: "Impersonation",
      description: "Someone is pretending to be another person.",
      icon: FaUserSecret,
    },
    {
      value: "copyright",
      label: "Copyright or image misuse",
      description: "Images or content appear to be used without permission.",
      icon: FaCamera,
    },
    {
      value: "other",
      label: "Something else",
      description: "Another issue that requires our attention.",
      icon: FaInfoCircle,
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.profileUrl.trim()) {
      toast.error("Please enter the profile URL.");
      return;
    }

    if (!formData.reason) {
      toast.error("Please select a reason for your report.");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    if (formData.description.trim().length < 20) {
      toast.error(
        "Please provide at least 20 characters describing the issue."
      );
      return;
    }

    try {
      setLoading(true);

      /*
        Backend API will be connected here later.

        Example:

        await submitReport(formData);
      */

      await new Promise((resolve) => setTimeout(resolve, 900));

      setSubmitted(true);

      toast.success("Your report has been submitted successfully.");
    } catch (error) {
      console.error("Report submission error:", error);

      toast.error("Unable to submit your report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      profileUrl: "",
      reason: "",
      name: "",
      email: "",
      description: "",
    });

    setSubmitted(false);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#f5f7fb] text-gray-900">
        {/* Background */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-emerald-100/50 blur-[100px]" />

          <div className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-blue-100/50 blur-[120px]" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-4xl items-center px-4 py-12 sm:px-6 lg:px-8">
          <section className="w-full overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.10)]">
            {/* Top line */}
            <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500" />

            <div className="px-6 py-14 text-center sm:px-12 sm:py-20">
              {/* Success icon */}
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20">
                  <FaCheckCircle className="text-3xl text-white" />
                </div>
              </div>

              <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600">
                <FaShieldAlt />
                Report received
              </div>

              <h1 className="mx-auto mt-5 max-w-2xl text-3xl font-black tracking-tight text-gray-950 sm:text-5xl">
                Thank you for helping keep ForeverMeet safe.
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
                Your report has been successfully received. Our team will
                review the information and take appropriate action when
                necessary.
              </p>

              {/* Status */}
              <div className="mx-auto mt-9 max-w-xl rounded-2xl border border-gray-200 bg-gray-50 p-5 text-left">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <FaClock />
                  </div>

                  <div>
                    <p className="text-sm font-black text-gray-900">
                      What happens next?
                    </p>

                    <p className="mt-1.5 text-xs leading-5 text-gray-500">
                      Our Trust & Safety team will review the information you
                      submitted. If additional information is required, we may
                      contact you using the email address provided.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust row */}
              <div className="mx-auto mt-6 grid max-w-xl gap-3 sm:grid-cols-3">
                <SuccessMini
                  icon={FaLock}
                  title="Private"
                  text="Confidential"
                />

                <SuccessMini
                  icon={FaShieldAlt}
                  title="Reviewed"
                  text="By our team"
                />

                <SuccessMini
                  icon={FaCheck}
                  title="Received"
                  text="Successfully"
                />
              </div>

              {/* Actions */}
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-gray-950
                    px-7
                    py-3.5
                    text-sm
                    font-black
                    text-white
                    shadow-lg
                    transition
                    hover:bg-red-600
                  "
                >
                  Back to Home
                  <FaArrowRight className="text-xs" />
                </Link>

                <button
                  type="button"
                  onClick={handleReset}
                  className="
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    px-7
                    py-3.5
                    text-sm
                    font-bold
                    text-gray-700
                    transition
                    hover:border-red-200
                    hover:bg-red-50
                    hover:text-red-600
                  "
                >
                  Submit another report
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-gray-900">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-56 top-0 h-[550px] w-[550px] rounded-full bg-red-100/40 blur-[130px]" />

        <div className="absolute -right-56 top-[30%] h-[600px] w-[600px] rounded-full bg-blue-100/40 blur-[140px]" />
      </div>

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden border-b border-gray-200 bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/80 via-white to-blue-50/60" />

        <div className="absolute right-0 top-0 h-full w-[40%] bg-gradient-to-l from-white/0 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
          {/* Breadcrumb */}

          <div className="mb-8 flex items-center gap-2 text-xs font-semibold text-gray-400">
            <Link
              to="/"
              className="transition hover:text-red-600"
            >
              Home
            </Link>

            <span>/</span>

            <span className="text-gray-600">
              Report a Profile
            </span>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_420px]">
            {/* Hero Content */}

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.17em] text-red-600">
                <FaShieldAlt />
                Trust & Safety
              </div>

              <h1
                className="
                  mt-5
                  max-w-4xl
                  text-4xl
                  font-black
                  leading-[1.05]
                  tracking-tight
                  text-gray-950
                  sm:text-5xl
                  lg:text-[62px]
                "
              >
                Help us keep
                <span className="text-red-600">
                  {" "}
                  ForeverMeet
                </span>{" "}
                safe.
              </h1>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-500 sm:text-lg sm:leading-8">
                If you've found a profile or content that violates our
                community standards, let us know. Your report helps us
                maintain a professional, trustworthy and respectful platform.
              </p>

              {/* Trust badges */}

              <div className="mt-8 flex flex-wrap gap-3">
                <TrustBadge
                  icon={FaLock}
                  text="Confidential"
                  color="emerald"
                />

                <TrustBadge
                  icon={FaShieldAlt}
                  text="Safety reviewed"
                  color="blue"
                />

                <TrustBadge
                  icon={FaHeadset}
                  text="Support available"
                  color="purple"
                />
              </div>
            </div>

            {/* Hero Card */}

            <div className="relative">
              <div className="rounded-[30px] border border-gray-200 bg-white p-6 shadow-[0_25px_80px_rgba(15,23,42,0.10)] sm:p-7">
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                    <FaFlag className="text-xl" />
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Safety
                  </span>
                </div>

                <h2 className="mt-7 text-2xl font-black tracking-tight text-gray-950">
                  Reporting matters.
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  A simple report can help our team identify problems and
                  protect the wider ForeverMeet community.
                </p>

                <div className="mt-7 space-y-3">
                  <ProcessStep
                    number="01"
                    icon={FaSearch}
                    title="Identify"
                    text="Share the profile URL"
                  />

                  <ProcessStep
                    number="02"
                    icon={FaFlag}
                    title="Report"
                    text="Tell us what happened"
                  />

                  <ProcessStep
                    number="03"
                    icon={FaCheckCircle}
                    title="Review"
                    text="Our team assesses the report"
                  />
                </div>
              </div>

              {/* Floating card */}

              <div className="absolute -bottom-5 -left-4 hidden items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-xl sm:flex">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <FaLock className="text-sm" />
                </div>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400">
                    Privacy
                  </p>

                  <p className="mt-0.5 text-xs font-bold text-gray-800">
                    Your report is handled confidentially
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MAIN SECTION
      ========================================================= */}

      <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_370px] lg:items-start">
          {/* =====================================================
              FORM
          ===================================================== */}

          <div className="overflow-hidden rounded-[30px] border border-gray-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.07)]">
            {/* Form top */}

            <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 via-white to-white px-6 py-6 sm:px-9 sm:py-7">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <FaFlag />
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-600">
                    Submit a report
                  </p>

                  <h2 className="mt-1 text-xl font-black tracking-tight text-gray-950 sm:text-2xl">
                    Tell us what happened
                  </h2>

                  <p className="mt-1.5 max-w-xl text-xs leading-5 text-gray-500 sm:text-sm">
                    Provide accurate information so our team can understand
                    and investigate the issue.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="px-6 py-7 sm:px-9 sm:py-9"
            >
              {/* Profile URL */}

              <FormField
                label="Profile URL"
                required
                helper="Paste the URL of the profile you want our team to review."
                icon={FaUser}
              >
                <div className="relative">
                  <input
                    type="url"
                    name="profileUrl"
                    value={formData.profileUrl}
                    onChange={handleChange}
                    placeholder="https://forevermeet.com/listing/..."
                    className="form-input pr-12"
                  />

                  <div className="pointer-events-none absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-gray-50 text-gray-400">
                    <FaSearch className="text-xs" />
                  </div>
                </div>
              </FormField>

              {/* Reason */}

              <FormField
                label="Reason for reporting"
                required
                helper="Choose the option that best describes the issue."
                icon={FaExclamationTriangle}
              >
                <div className="relative">
                  <select
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className="form-input appearance-none pr-12"
                  >
                    <option value="">Select a reason</option>

                    {reasons.map((reason) => (
                      <option
                        key={reason.value}
                        value={reason.value}
                      >
                        {reason.label}
                      </option>
                    ))}
                  </select>

                  <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400" />
                </div>
              </FormField>

              {/* Name / Email */}

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label="Your name"
                  helper="Optional"
                  icon={FaUser}
                >
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="form-input"
                  />
                </FormField>

                <FormField
                  label="Email address"
                  required
                  helper="We'll contact you only if more information is needed."
                  icon={FaEnvelope}
                >
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="form-input"
                  />
                </FormField>
              </div>

              {/* Description */}

              <FormField
                label="Describe the issue"
                required
                helper="Be specific and avoid including passwords, OTPs, payment details or other sensitive information."
                icon={FaInfoCircle}
              >
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={7}
                  placeholder="Tell us what you noticed, what happened and why you believe the profile should be reviewed..."
                  className="form-input resize-none py-3.5"
                />

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">
                    Minimum 20 characters
                  </span>

                  <span
                    className={`text-[10px] font-semibold ${
                      formData.description.length > 0 &&
                      formData.description.length < 20
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  >
                    {formData.description.length} characters
                  </span>
                </div>
              </FormField>

              {/* Attachment */}

              <div className="mt-7 rounded-2xl border border-dashed border-gray-300 bg-gray-50/70 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm">
                    <FaCamera />
                  </div>

                  <div>
                    <p className="text-sm font-black text-gray-800">
                      Supporting evidence
                      <span className="ml-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                        Optional
                      </span>
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Screenshots can help our team understand the situation
                      more quickly.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  disabled
                  className="
                    mt-4
                    inline-flex
                    cursor-not-allowed
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    px-4
                    py-2.5
                    text-xs
                    font-bold
                    text-gray-400
                  "
                >
                  <FaPaperclip />
                  Attachment upload coming soon
                </button>
              </div>

              {/* Privacy */}

              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <FaLock className="text-xs" />
                  </div>

                  <div>
                    <p className="text-xs font-black text-gray-800">
                      Your report is handled confidentially
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-gray-500">
                      Only provide information that is necessary for us to
                      review your report. Never share passwords, OTPs, payment
                      details or account credentials.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit */}

              <button
                type="submit"
                disabled={loading}
                className="
                  mt-7
                  flex
                  h-14
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-gray-950
                  text-sm
                  font-black
                  text-white
                  shadow-lg
                  shadow-gray-950/10
                  transition-all
                  duration-200
                  hover:bg-red-600
                  hover:shadow-red-600/20
                  active:scale-[0.99]
                  disabled:cursor-not-allowed
                  disabled:bg-gray-400
                "
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                    Sending report...
                  </>
                ) : (
                  <>
                    Submit report
                    <FaArrowRight className="text-xs" />
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-[10px] leading-5 text-gray-400">
                By submitting this report, you confirm that the information
                provided is accurate to the best of your knowledge.
              </p>
            </form>
          </div>

          {/* =====================================================
              SIDEBAR
          ===================================================== */}

          <aside className="space-y-5">
            {/* Report categories */}

            <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <FaFlag />
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-red-600">
                    When to report
                  </p>

                  <h3 className="mt-0.5 text-lg font-black tracking-tight text-gray-950">
                    What can you report?
                  </h3>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <ReportCategory
                  icon={FaUserSecret}
                  title="Fake profiles"
                  text="False, misleading or suspicious profile information."
                />

                <ReportCategory
                  icon={FaBan}
                  title="Inappropriate content"
                  text="Content that doesn't follow our platform standards."
                />

                <ReportCategory
                  icon={FaComments}
                  title="Harassment"
                  text="Threatening, abusive or unwanted behaviour."
                />

                <ReportCategory
                  icon={FaUser}
                  title="Impersonation"
                  text="Someone pretending to be another person."
                />
              </div>
            </div>

            {/* Before submitting */}

            <div className="overflow-hidden rounded-[28px] bg-gray-950 p-6 text-white shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-red-400">
                <FaInfoCircle />
              </div>

              <p className="mt-5 text-[10px] font-black uppercase tracking-[0.16em] text-gray-500">
                Important
              </p>

              <h3 className="mt-1 text-xl font-black">
                Before you submit
              </h3>

              <ul className="mt-5 space-y-4">
                <ChecklistItem text="Make sure the profile URL is correct." />

                <ChecklistItem text="Select the closest reporting reason." />

                <ChecklistItem text="Describe the issue clearly and honestly." />

                <ChecklistItem text="Do not include passwords, OTPs or payment information." />
              </ul>
            </div>

            {/* Help */}

            <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FaLifeRing />
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-600">
                    Need assistance?
                  </p>

                  <h3 className="mt-0.5 text-lg font-black tracking-tight text-gray-950">
                    We're here to help
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-xs leading-6 text-gray-500">
                Not sure whether something should be reported? Explore our
                Help Center, Safety Guidelines and FAQs before submitting a
                report.
              </p>

              <div className="mt-5 space-y-2">
                <SidebarLink
                  to="/help"
                  label="Help Center"
                  icon={FaLifeRing}
                />

                <SidebarLink
                  to="/safety"
                  label="Safety Guidelines"
                  icon={FaShieldAlt}
                />

                <SidebarLink
                  to="/faq"
                  label="Frequently Asked Questions"
                  icon={FaInfoCircle}
                />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* =========================================================
          TRUST SECTION
      ========================================================= */}

      <section className="relative border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
          <div className="mb-7 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
              Our commitment
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
              Built around trust and safety
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-gray-500 sm:text-sm">
              We want ForeverMeet to remain a professional environment where
              users can discover and connect with confidence.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <TrustCard
              icon={FaShieldAlt}
              title="Safety first"
              text="We work continuously to maintain a professional community."
            />

            <TrustCard
              icon={FaLock}
              title="Privacy focused"
              text="Only provide information that is necessary for your report."
            />

            <TrustCard
              icon={FaCheckCircle}
              title="Responsible review"
              text="Reports are assessed carefully before appropriate action is taken."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

/* ===============================================================
   FORM FIELD
=============================================================== */

function FormField({
  label,
  required = false,
  helper,
  icon: Icon,
  children,
}) {
  return (
    <div className="mb-6">
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm font-black text-gray-800">
          <Icon className="text-xs text-gray-400" />

          {label}

          {required && (
            <span className="text-red-500">*</span>
          )}
        </label>

        {helper === "Optional" && (
          <span className="rounded-full bg-gray-100 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-gray-400">
            Optional
          </span>
        )}
      </div>

      {children}

      {helper && helper !== "Optional" && (
        <p className="mt-2 text-[11px] leading-5 text-gray-400">
          {helper}
        </p>
      )}
    </div>
  );
}

/* ===============================================================
   PROCESS STEP
=============================================================== */

function ProcessStep({
  number,
  icon: Icon,
  title,
  text,
}) {
  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50/80 p-3 transition hover:border-red-100 hover:bg-red-50/30">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm transition group-hover:text-red-600">
        <Icon className="text-xs" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-black tracking-wider text-red-500">
            {number}
          </span>

          <p className="text-xs font-black text-gray-800">
            {title}
          </p>
        </div>

        <p className="mt-0.5 text-[10px] text-gray-400">
          {text}
        </p>
      </div>

      <FaArrowRight className="mr-1 text-[9px] text-gray-300 transition group-hover:translate-x-1 group-hover:text-red-500" />
    </div>
  );
}

/* ===============================================================
   TRUST BADGE
=============================================================== */

function TrustBadge({
  icon: Icon,
  text,
  color,
}) {
  const styles = {
    emerald:
      "border-emerald-100 bg-emerald-50 text-emerald-600",
    blue:
      "border-blue-100 bg-blue-50 text-blue-600",
    purple:
      "border-purple-100 bg-purple-50 text-purple-600",
  };

  return (
    <div
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        px-4
        py-2.5
        text-xs
        font-bold
        ${styles[color]}
      `}
    >
      <Icon className="text-xs" />

      {text}
    </div>
  );
}

/* ===============================================================
   REPORT CATEGORY
=============================================================== */

function ReportCategory({
  icon: Icon,
  title,
  text,
}) {
  return (
    <div className="group rounded-2xl border border-gray-100 bg-gray-50/60 p-4 transition-all duration-200 hover:border-red-100 hover:bg-red-50/40">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-red-500 shadow-sm transition group-hover:bg-red-500 group-hover:text-white">
          <Icon className="text-xs" />
        </div>

        <div>
          <p className="text-xs font-black text-gray-800">
            {title}
          </p>

          <p className="mt-1 text-[10px] leading-5 text-gray-500">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ===============================================================
   CHECKLIST
=============================================================== */

function ChecklistItem({ text }) {
  return (
    <li className="flex items-start gap-2.5">
      <FaCheckCircle className="mt-0.5 shrink-0 text-xs text-emerald-400" />

      <span className="text-[11px] leading-5 text-gray-400">
        {text}
      </span>
    </li>
  );
}

/* ===============================================================
   SIDEBAR LINK
=============================================================== */

function SidebarLink({
  to,
  label,
  icon: Icon,
}) {
  return (
    <Link
      to={to}
      className="
        group
        flex
        items-center
        justify-between
        rounded-xl
        border
        border-gray-200
        bg-white
        px-4
        py-3
        text-xs
        font-bold
        text-gray-700
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-red-200
        hover:bg-red-50
        hover:text-red-600
      "
    >
      <span className="flex items-center gap-2.5">
        <Icon className="text-[11px] text-gray-400 transition group-hover:text-red-500" />

        {label}
      </span>

      <FaArrowRight className="text-[9px] text-gray-300 transition group-hover:translate-x-1 group-hover:text-red-500" />
    </Link>
  );
}

/* ===============================================================
   SUCCESS MINI
=============================================================== */

function SuccessMini({
  icon: Icon,
  title,
  text,
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-3">
      <Icon className="mx-auto text-xs text-emerald-500" />

      <p className="mt-1 text-[10px] font-black text-gray-800">
        {title}
      </p>

      <p className="text-[9px] text-gray-400">
        {text}
      </p>
    </div>
  );
}

/* ===============================================================
   TRUST CARD
=============================================================== */

function TrustCard({
  icon: Icon,
  title,
  text,
}) {
  return (
    <div className="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-gray-50/70 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-red-100 hover:bg-white hover:shadow-md">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-red-600 shadow-sm transition group-hover:bg-red-500 group-hover:text-white">
        <Icon className="text-sm" />
      </div>

      <div>
        <h3 className="text-sm font-black text-gray-900">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-gray-500">
          {text}
        </p>
      </div>
    </div>
  );
}

export default Report;