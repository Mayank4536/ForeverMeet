import { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaUserCheck,
  FaLock,
  FaFlag,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowRight,
  FaChevronDown,
  FaEye,
  FaBan,
  FaCamera,
  FaIdCard,
  FaComments,
  FaGlobeAsia,
  FaUserShield,
} from "react-icons/fa";

function Safety() {
  const [openFaq, setOpenFaq] = useState(null);

  const safetyCards = [
    {
      icon: FaUserCheck,
      title: "Keep your profile authentic",
      description:
        "Use accurate information and genuine photos when creating a professional profile. Misleading information can affect trust across the platform.",
    },
    {
      icon: FaLock,
      title: "Protect your personal information",
      description:
        "Avoid publicly sharing passwords, OTPs, financial information, private documents or other sensitive information.",
    },
    {
      icon: FaComments,
      title: "Communicate respectfully",
      description:
        "Keep conversations professional and respectful. Do not harass, threaten, pressure or discriminate against another person.",
    },
    {
      icon: FaFlag,
      title: "Report suspicious activity",
      description:
        "If you find a profile or activity that appears misleading, abusive or unsafe, report it so it can be reviewed.",
    },
    {
      icon: FaEye,
      title: "Review before you trust",
      description:
        "Take time to review profile information and use your own judgement before communicating or making arrangements outside the platform.",
    },
    {
      icon: FaBan,
      title: "Zero tolerance for abuse",
      description:
        "Profiles involved in prohibited, fraudulent, threatening or abusive behaviour may be restricted or removed.",
    },
  ];

  const userTips = [
    {
      number: "01",
      icon: FaIdCard,
      title: "Check profile information",
      text: "Look carefully at the profile name, description, category, city and other available information before contacting someone.",
    },
    {
      number: "02",
      icon: FaCamera,
      title: "Be careful with photos",
      text: "Do not assume that an image alone proves someone's identity. Avoid sharing private or sensitive photographs with strangers.",
    },
    {
      number: "03",
      icon: FaComments,
      title: "Keep communication professional",
      text: "If a conversation becomes threatening, inappropriate or uncomfortable, stop communicating and consider reporting the profile.",
    },
    {
      number: "04",
      icon: FaExclamationTriangle,
      title: "Watch for suspicious requests",
      text: "Be cautious if someone pressures you for money, passwords, OTPs, banking details or urgent payments.",
    },
  ];

  const profileRules = [
    "Use genuine and appropriate profile information.",
    "Do not impersonate another individual or organisation.",
    "Do not upload content that you do not have permission to use.",
    "Do not publish another person's private information.",
    "Do not use threatening, abusive or discriminatory language.",
    "Do not create profiles for fraudulent or misleading purposes.",
    "Keep contact and financial information secure.",
    "Follow ForeverMeet's Terms & Conditions and applicable laws.",
  ];

  const faqs = [
    {
      question: "What should I do if I find a suspicious profile?",
      answer:
        "Do not engage further if you feel uncomfortable. Use the Report a Profile option to send the profile details to the ForeverMeet team for review.",
    },
    {
      question: "Should I share my OTP with another person?",
      answer:
        "No. Never share your OTP, password or account verification code with another person. ForeverMeet should not require you to disclose your private verification code.",
    },
    {
      question: "What if someone asks me for money?",
      answer:
        "Be cautious with unexpected payment requests. Never share banking passwords, OTPs or other financial credentials. If the request appears suspicious, stop communicating and report the profile.",
    },
    {
      question: "Can I report inappropriate content?",
      answer:
        "Yes. If you encounter content or behaviour that violates platform rules, use the reporting option or contact the ForeverMeet support team.",
    },
    {
      question: "What happens after I submit a report?",
      answer:
        "The reported information can be reviewed by the platform team. Depending on the circumstances, appropriate action may include contacting the account owner, restricting activity or removing content.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#070b14]">

        {/* Background decoration */}

        <div className="pointer-events-none absolute inset-0">

          <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-pink-600/15 blur-[110px]" />

          <div className="absolute -right-32 top-20 h-[460px] w-[460px] rounded-full bg-purple-600/15 blur-[130px]" />

          <div className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-red-500/5 blur-[120px]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:28px_28px] opacity-30" />

        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}

          <div className="pt-7">

            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">

              <Link
                to="/"
                className="transition hover:text-pink-400"
              >
                Home
              </Link>

              <span>/</span>

              <span className="text-slate-300">
                Safety
              </span>

            </div>

          </div>

          {/* Hero content */}

          <div className="grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-20 lg:py-24">

            {/* Left */}

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/10 px-3.5 py-2">

                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-white">
                  <FaShieldAlt className="text-[9px]" />
                </span>

                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-pink-300">
                  Safety Center
                </span>

              </div>

              <h1 className="mt-6 max-w-2xl text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[58px]">
                Your safety comes
                <span className="text-pink-500"> first.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
                ForeverMeet is designed to help professionals discover
                modelling and creative opportunities in a more trusted,
                respectful and responsible environment.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <Link
                  to="/report"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-pink-500 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-pink-500/20 transition hover:-translate-y-0.5 hover:bg-pink-600"
                >
                  <FaFlag className="text-xs" />

                  Report a Profile
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-bold text-white transition hover:border-white/20 hover:bg-white/10"
                >
                  Contact Support

                  <FaArrowRight className="text-[10px]" />
                </Link>

              </div>

            </div>

            {/* Right safety card */}

            <div className="relative">

              <div className="absolute -inset-5 rounded-[34px] bg-gradient-to-br from-pink-500/10 to-purple-500/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.055] p-5 shadow-2xl backdrop-blur-xl sm:p-7">

                <div className="flex items-center gap-4 border-b border-white/10 pb-5">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/20">

                    <FaShieldAlt className="text-xl text-white" />

                  </div>

                  <div>

                    <p className="text-xs font-bold uppercase tracking-wider text-pink-300">
                      ForeverMeet
                    </p>

                    <h2 className="mt-1 text-lg font-black text-white">
                      Safety by design
                    </h2>

                  </div>

                  <div className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10">
                    <FaCheckCircle className="text-sm text-emerald-400" />
                  </div>

                </div>

                <div className="mt-6 space-y-3">

                  {[
                    "Protect your account",
                    "Respect other professionals",
                    "Verify information carefully",
                    "Report suspicious behaviour",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                        <FaCheckCircle className="text-xs text-emerald-400" />
                      </span>

                      <span className="text-sm font-medium text-slate-300">
                        {item}
                      </span>
                    </div>
                  ))}

                </div>

                <div className="mt-5 rounded-2xl border border-amber-400/10 bg-amber-400/5 p-4">

                  <div className="flex gap-3">

                    <FaExclamationTriangle className="mt-0.5 shrink-0 text-sm text-amber-400" />

                    <p className="text-xs leading-5 text-slate-400">
                      Never share your password, OTP, banking credentials
                      or other sensitive account information with anyone.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          SAFETY INTRO
      ========================================================= */}

      <section className="bg-white py-14 sm:py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">

            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-500">
              Stay protected
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Simple habits make a safer experience
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
              Whether you are browsing profiles or promoting your own
              professional profile, a few simple precautions can help
              you use ForeverMeet more confidently.
            </p>

          </div>


          {/* Cards */}

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {safetyCards.map((card) => {

              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-pink-200 hover:shadow-xl hover:shadow-slate-900/5"
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50 text-pink-500 transition group-hover:bg-pink-500 group-hover:text-white">
                    <Icon />
                  </div>

                  <h3 className="mt-5 text-lg font-black text-slate-900">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {card.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </section>


      {/* =========================================================
          SAFETY CHECKLIST
      ========================================================= */}

      <section className="bg-[#f8fafc] py-14 sm:py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">

            {/* Left */}

            <div>

              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-500">
                Before you interact
              </span>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Take a moment to check
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500">
                Online profiles can help you discover professional
                opportunities, but you should always use your own
                judgement before sharing information or making
                arrangements with someone you have found online.
              </p>

              <div className="mt-8 space-y-4">

                {userTips.map((tip) => {

                  const Icon = tip.icon;

                  return (
                    <div
                      key={tip.number}
                      className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-pink-200 hover:shadow-md sm:p-5"
                    >

                      <div className="flex shrink-0 flex-col items-center">

                        <span className="text-[10px] font-black text-pink-500">
                          {tip.number}
                        </span>

                        <div className="mt-2 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-pink-50 group-hover:text-pink-500">
                          <Icon className="text-sm" />
                        </div>

                      </div>

                      <div>

                        <h3 className="text-sm font-black text-slate-900 sm:text-base">
                          {tip.title}
                        </h3>

                        <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
                          {tip.text}
                        </p>

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>


            {/* Right */}

            <div className="lg:sticky lg:top-28">

              <div className="overflow-hidden rounded-[30px] bg-[#070b14] shadow-2xl">

                <div className="relative p-6 sm:p-8">

                  <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-pink-500/10 blur-[80px]" />

                  <div className="relative">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400">
                        <FaUserShield />
                      </div>

                      <div>

                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-pink-400">
                          Profile standards
                        </p>

                        <h3 className="mt-1 text-xl font-black text-white">
                          Keep ForeverMeet trustworthy
                        </h3>

                      </div>

                    </div>

                    <p className="mt-5 text-sm leading-6 text-slate-400">
                      Everyone using the platform contributes to the
                      quality and trust of the community. Please follow
                      these basic profile standards.
                    </p>

                    <div className="mt-6 space-y-3">

                      {profileRules.map((rule) => (
                        <div
                          key={rule}
                          className="flex items-start gap-3"
                        >

                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                            <FaCheckCircle className="text-[10px] text-emerald-400" />
                          </span>

                          <p className="text-xs leading-5 text-slate-400">
                            {rule}
                          </p>

                        </div>
                      ))}

                    </div>

                    <Link
                      to="/terms"
                      className="mt-7 inline-flex items-center gap-2 text-xs font-bold text-pink-400 transition hover:text-pink-300"
                    >
                      Read Terms & Conditions

                      <FaArrowRight className="text-[9px]" />
                    </Link>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          ACCOUNT SECURITY
      ========================================================= */}

      <section className="bg-white py-14 sm:py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-gradient-to-br from-slate-50 to-white">

            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* Text */}

              <div className="p-7 sm:p-10 lg:p-14">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <FaLock />
                </div>

                <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
                  Account Security
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                  Protect your ForeverMeet account
                </h2>

                <p className="mt-4 text-sm leading-6 text-slate-500">
                  Your account contains information that should remain
                  private. Use a strong password and keep your login
                  credentials and verification codes confidential.
                </p>

                <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">

                  {[
                    "Use a strong password",
                    "Never share your OTP",
                    "Keep your email secure",
                    "Log out on shared devices",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3"
                    >
                      <FaCheckCircle className="shrink-0 text-xs text-emerald-500" />

                      <span className="text-xs font-semibold text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}

                </div>

              </div>


              {/* Visual */}

              <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-[#070b14] p-8">

                <div className="absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[90px]" />

                <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-pink-500/10 blur-[90px]" />

                <div className="relative w-full max-w-sm">

                  <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
                        <FaLock className="text-sm text-emerald-400" />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-white">
                          Account protected
                        </p>

                        <p className="mt-1 text-[10px] text-slate-500">
                          Keep your credentials private
                        </p>
                      </div>

                      <FaCheckCircle className="ml-auto text-sm text-emerald-400" />

                    </div>

                    <div className="mt-5 space-y-2">

                      <div className="h-3 w-full rounded-full bg-white/5" />
                      <div className="h-3 w-4/5 rounded-full bg-white/5" />
                      <div className="h-3 w-3/5 rounded-full bg-white/5" />

                    </div>

                    <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-black/10 px-3 py-3">

                      <span className="text-[10px] font-semibold text-slate-400">
                        Security status
                      </span>

                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[9px] font-bold text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        PROTECTED
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          REPORT SECTION
      ========================================================= */}

      <section className="bg-[#f8fafc] py-14 sm:py-20">

        <div className="mx-auto max-w-5xl px-4 sm:px-6">

          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-pink-600 via-rose-600 to-purple-700 p-7 text-center shadow-2xl shadow-pink-600/15 sm:p-12">

            <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-white/10 blur-[70px]" />

            <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-black/10 blur-[70px]" />

            <div className="relative">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur">
                <FaFlag className="text-lg" />
              </div>

              <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Something doesn't feel right?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-pink-100 sm:text-base">
                Trust your instincts. If you encounter suspicious,
                abusive, misleading or inappropriate behaviour, report
                it to our team.
              </p>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

                <Link
                  to="/report"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-pink-600 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50"
                >
                  Report a Profile

                  <FaArrowRight className="text-[10px]" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/15"
                >
                  <FaEnvelope className="text-xs" />

                  Contact Support
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          FAQ
      ========================================================= */}

      <section className="bg-white py-14 sm:py-20">

        <div className="mx-auto max-w-4xl px-4 sm:px-6">

          <div className="text-center">

            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-500">
              Safety FAQ
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Common safety questions
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500">
              Quick answers to common questions about staying safe
              while using ForeverMeet.
            </p>

          </div>

          <div className="mt-10 space-y-3">

            {faqs.map((faq, index) => {

              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-2xl border transition ${
                    isOpen
                      ? "border-pink-200 bg-pink-50/30"
                      : "border-slate-200 bg-white"
                  }`}
                >

                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="flex w-full cursor-pointer items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                  >

                    <span className="text-sm font-bold text-slate-800 sm:text-base">
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${
                        isOpen
                          ? "bg-pink-500 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <FaChevronDown
                        className={`text-[10px] transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>

                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6">

                      <div className="border-t border-slate-200/80 pt-4">

                        <p className="text-sm leading-6 text-slate-500">
                          {faq.answer}
                        </p>

                      </div>

                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </div>

      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section className="bg-[#070b14] py-14 sm:py-16">

        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-400">
            <FaGlobeAsia />
          </div>

          <h2 className="mt-5 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Help us keep ForeverMeet professional
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
            Treat other professionals with respect, protect your
            information and report behaviour that violates our
            platform rules.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-slate-900 transition hover:bg-slate-100"
            >
              Explore ForeverMeet

              <FaArrowRight className="text-[10px]" />
            </Link>

            <Link
              to="/help"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Visit Help Center
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Safety;