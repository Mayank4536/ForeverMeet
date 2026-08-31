import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaSearch,
  FaChevronDown,
  FaQuestionCircle,
  FaUserPlus,
  FaUserCircle,
  FaListAlt,
  FaWallet,
  FaCrown,
  FaShieldAlt,
  FaLock,
  FaHeart,
  FaFlag,
  FaEnvelope,
  FaArrowRight,
  FaCheckCircle,
  FaCreditCard,
  FaKey,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function FAQ() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openQuestions, setOpenQuestions] = useState([]);

  const categories = [
    {
      name: "All",
      icon: FaQuestionCircle,
      description: "All frequently asked questions",
    },
    {
      name: "Getting Started",
      icon: FaUserPlus,
      description: "Account and registration",
    },
    {
      name: "Account",
      icon: FaUserCircle,
      description: "Profile and account settings",
    },
    {
      name: "Listings",
      icon: FaListAlt,
      description: "Creating and managing profiles",
    },
    {
      name: "Credits & Payments",
      icon: FaWallet,
      description: "Wallet, credits and payments",
    },
    {
      name: "Premium",
      icon: FaCrown,
      description: "Premium profile features",
    },
    {
      name: "Safety & Security",
      icon: FaShieldAlt,
      description: "Safety, privacy and reporting",
    },
  ];

  const faqData = [
    {
      id: 1,
      category: "Getting Started",
      question: "What is ForeverMeet?",
      answer:
        "ForeverMeet is a professional model directory and promotional platform designed to help people discover modelling talent, creative professionals and promotional profiles across cities in India.",
      popular: true,
    },
    {
      id: 2,
      category: "Getting Started",
      question: "How do I create a ForeverMeet account?",
      answer:
        "Select Register from the website navigation and complete the registration form. After submitting your information, verify your email using the OTP sent to your registered email address.",
      popular: true,
    },
    {
      id: 3,
      category: "Getting Started",
      question: "Can I browse ForeverMeet without an account?",
      answer:
        "Yes. Public listings, cities, categories and other publicly available content can be browsed without creating an account. An account is required for features such as creating and managing your own listings.",
    },
    {
      id: 4,
      category: "Getting Started",
      question: "Why do I need to verify my email?",
      answer:
        "Email verification helps protect accounts from unauthorized registrations and ensures that important account messages can reach the correct email address.",
    },
    {
      id: 5,
      category: "Getting Started",
      question: "What should I do if I do not receive my OTP?",
      answer:
        "First check your spam or promotional email folders and make sure the email address is correct. If the OTP still does not arrive, use the resend OTP option and try again after a short period.",
    },

    {
      id: 6,
      category: "Account",
      question: "How do I log in to my account?",
      answer:
        "Select Login from the navigation menu and enter your registered email address and password. If your account requires verification, complete the requested verification step before continuing.",
      popular: true,
    },
    {
      id: 7,
      category: "Account",
      question: "I forgot my password. What should I do?",
      answer:
        "Select Forgot Password on the login page. Enter your registered email address, verify the reset OTP sent to you, and create a new password.",
      popular: true,
    },
    {
      id: 8,
      category: "Account",
      question: "Can I change my password?",
      answer:
        "Yes. When the password management feature is available in your account, you can change your password from your account settings. Always choose a strong password that you do not use elsewhere.",
    },
    {
      id: 9,
      category: "Account",
      question: "Can I update my profile information?",
      answer:
        "Yes. Your account profile can be managed from the My Profile section. Update your information and save the changes when finished.",
    },
    {
      id: 10,
      category: "Account",
      question: "How can I log out?",
      answer:
        "Open your account menu and select Logout. Your authentication session will be removed from the browser.",
    },

    {
      id: 11,
      category: "Listings",
      question: "How do I create a profile listing?",
      answer:
        "After signing in, select Post Profile or Post New Profile. Enter the required profile information, select the appropriate city and category, add your images and submit the listing.",
      popular: true,
    },
    {
      id: 12,
      category: "Listings",
      question: "Can I create more than one listing?",
      answer:
        "Yes. ForeverMeet is designed to support multiple professional profile listings under an account, subject to the applicable listing and credit requirements.",
    },
    {
      id: 13,
      category: "Listings",
      question: "Where can I manage my listings?",
      answer:
        "Open the account menu and select My Listings. From there you can view and manage listings associated with your account.",
    },
    {
      id: 14,
      category: "Listings",
      question: "Can I edit an existing listing?",
      answer:
        "Yes. Open My Listings, select the relevant listing and use the available editing option to update its information.",
    },
    {
      id: 15,
      category: "Listings",
      question: "Why is my listing not visible yet?",
      answer:
        "Listings may go through a moderation or approval process before becoming publicly visible. If your listing is still pending, please allow the review process to finish.",
      popular: true,
    },
    {
      id: 16,
      category: "Listings",
      question: "Can I delete my listing?",
      answer:
        "You can manage your listings from the My Listings section. If deletion is available for the listing, use the delete option and confirm the action.",
    },

    {
      id: 17,
      category: "Credits & Payments",
      question: "What are ForeverMeet credits?",
      answer:
        "Credits are the platform currency used for eligible actions such as creating or promoting listings according to the current ForeverMeet credit system.",
      popular: true,
    },
    {
      id: 18,
      category: "Credits & Payments",
      question: "Where can I see my credit balance?",
      answer:
        "Your available credit balance is shown in the Wallet section. When you are logged in, your balance may also appear directly in the website navigation.",
    },
    {
      id: 19,
      category: "Credits & Payments",
      question: "How do I purchase credits?",
      answer:
        "Open Wallet & Credits from your account menu and select an available credit package. The available payment options will be displayed during the purchase process.",
    },
    {
      id: 20,
      category: "Credits & Payments",
      question: "What happens if I don't have enough credits?",
      answer:
        "If an action requires more credits than are currently available in your wallet, you will need to add credits before completing that action.",
    },
    {
      id: 21,
      category: "Credits & Payments",
      question: "Can I see my credit transaction history?",
      answer:
        "The Wallet section is intended to provide information about your credit balance and applicable transactions. Available transaction history depends on the wallet features enabled for your account.",
    },

    {
      id: 22,
      category: "Premium",
      question: "What is a Premium profile?",
      answer:
        "A Premium profile is a listing that receives additional promotional visibility or features according to the Premium options offered by ForeverMeet.",
      popular: true,
    },
    {
      id: 23,
      category: "Premium",
      question: "How can I make my profile Premium?",
      answer:
        "Open the available Premium or promotional options associated with your account and select the feature or package you want to use. The required credits or payment will be shown before confirmation.",
    },
    {
      id: 24,
      category: "Premium",
      question: "What is a Featured profile?",
      answer:
        "A Featured profile is given additional promotional placement within eligible areas of the platform. Exact placement and duration depend on the feature selected.",
    },

    {
      id: 25,
      category: "Safety & Security",
      question: "Is ForeverMeet a professional modelling platform?",
      answer:
        "Yes. ForeverMeet is designed as a professional model directory and promotional platform. Users are expected to maintain professional, lawful and appropriate content.",
      popular: true,
    },
    {
      id: 26,
      category: "Safety & Security",
      question: "Should I share my password or OTP with anyone?",
      answer:
        "No. Never share your password, verification OTP, reset OTP or other authentication credentials with another person. Legitimate support should not require your private authentication codes.",
      popular: true,
    },
    {
      id: 27,
      category: "Safety & Security",
      question: "How do I report a profile?",
      answer:
        "If you believe a listing violates ForeverMeet's rules, use the Report a Profile option or contact support. Include the profile information and explain the reason for your report.",
    },
    {
      id: 28,
      category: "Safety & Security",
      question: "What should I do if I encounter suspicious activity?",
      answer:
        "Do not share passwords, OTPs or sensitive personal information. Stop the interaction if necessary and report the profile or activity to ForeverMeet support.",
    },
    {
      id: 29,
      category: "Safety & Security",
      question: "How does ForeverMeet handle reported profiles?",
      answer:
        "Reported profiles may be reviewed by the platform administration team. Content that violates applicable platform rules may be restricted, rejected or removed.",
    },
    {
      id: 30,
      category: "Safety & Security",
      question: "How can I contact ForeverMeet support?",
      answer:
        "Visit the Contact Us page and send your request to the support team. For account issues, provide useful information about the problem but never include your password or OTP.",
      popular: true,
    },
  ];

  const filteredFAQs = useMemo(() => {
    const value = search.trim().toLowerCase();

    return faqData.filter((faq) => {
      const categoryMatch =
        activeCategory === "All" ||
        faq.category === activeCategory;

      const searchMatch =
        !value ||
        faq.question.toLowerCase().includes(value) ||
        faq.answer.toLowerCase().includes(value) ||
        faq.category.toLowerCase().includes(value);

      return categoryMatch && searchMatch;
    });
  }, [search, activeCategory]);

  const popularFAQs = faqData.filter(
    (faq) => faq.popular
  );

  const toggleQuestion = (id) => {
    setOpenQuestions((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const selectCategory = (category) => {
    setActiveCategory(category);
    setOpenQuestions([]);
  };

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("All");
    setOpenQuestions([]);
  };

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-gray-900">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#0b0d12]">

        <div className="pointer-events-none absolute inset-0">

          <div className="absolute left-[-180px] top-[-180px] h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[130px]" />

          <div className="absolute right-[-180px] top-[40px] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[130px]" />

          <div className="absolute bottom-[-250px] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-red-600/5 blur-[120px]" />

        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}

          <div className="flex items-center gap-2 pt-7 text-xs font-medium text-gray-500">

            <Link
              to="/"
              className="transition hover:text-white"
            >
              Home
            </Link>

            <span>/</span>

            <span className="text-gray-300">
              FAQ
            </span>

          </div>

          <div className="mx-auto max-w-4xl py-16 text-center sm:py-20 lg:py-24">

            {/* Badge */}

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2">

              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600">

                <FaQuestionCircle className="text-[9px] text-white" />

              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-300">
                ForeverMeet Support
              </span>

            </div>

            {/* Heading */}

            <h1 className="mt-7 text-4xl font-black tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">

              Frequently Asked

              <span className="block text-red-500">
                Questions
              </span>

            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">

              Everything you need to know about your
              account, listings, credits, Premium features
              and staying safe on ForeverMeet.

            </p>

            {/* Search */}

            <div className="mx-auto mt-9 max-w-3xl">

              <div className="relative rounded-2xl border border-white/10 bg-white/[0.06] p-1.5 shadow-2xl backdrop-blur-xl">

                <div className="relative">

                  <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />

                  <input
                    type="search"
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setOpenQuestions([]);
                    }}
                    placeholder="Search questions, account, listings, credits..."
                    className="
                      h-14
                      w-full
                      rounded-xl
                      bg-white
                      pl-12
                      pr-12
                      text-sm
                      font-medium
                      text-gray-900
                      outline-none
                      placeholder:text-gray-400
                      sm:h-16
                      sm:text-base
                    "
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="
                        absolute
                        right-3
                        top-1/2
                        flex
                        h-9
                        w-9
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-lg
                        bg-gray-100
                        text-lg
                        text-gray-500
                        transition
                        hover:bg-red-50
                        hover:text-red-600
                      "
                    >
                      ×
                    </button>
                  )}

                </div>

              </div>

              <p className="mt-3 text-xs text-gray-600">
                Search across questions and answers
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-14">

          {/* =====================================================
              SIDEBAR
          ===================================================== */}

          <aside className="lg:sticky lg:top-28 lg:self-start">

            <div className="mb-4 flex items-center justify-between">

              <div>

                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-600">
                  Browse
                </p>

                <h2 className="mt-1 text-lg font-black text-gray-950">
                  Help Topics
                </h2>

              </div>

              <FaBars className="text-sm text-gray-300 lg:hidden" />

            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">

              {categories.map((category) => {

                const Icon = category.icon;

                const active =
                  activeCategory === category.name;

                return (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() =>
                      selectCategory(category.name)
                    }
                    className={`
                      group
                      flex
                      min-w-max
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-3
                      text-left
                      transition-all
                      duration-200
                      lg:min-w-0
                      ${
                        active
                          ? "bg-gray-950 text-white shadow-lg shadow-gray-950/10"
                          : "text-gray-600 hover:bg-white hover:text-gray-950 hover:shadow-sm"
                      }
                    `}
                  >

                    <span
                      className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        ${
                          active
                            ? "bg-red-600 text-white"
                            : "bg-gray-100 text-gray-500 group-hover:bg-red-50 group-hover:text-red-600"
                        }
                      `}
                    >
                      <Icon className="text-xs" />
                    </span>

                    <span className="min-w-0">

                      <span className="block text-xs font-bold">
                        {category.name}
                      </span>

                      <span
                        className={`
                          mt-0.5
                          hidden
                          text-[10px]
                          lg:block
                          ${
                            active
                              ? "text-gray-400"
                              : "text-gray-400"
                          }
                        `}
                      >
                        {category.description}
                      </span>

                    </span>

                  </button>
                );
              })}

            </div>

            {/* Sidebar contact card */}

            <div className="mt-6 hidden overflow-hidden rounded-2xl bg-gray-950 p-5 lg:block">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/15 text-red-400">

                <FaEnvelope />

              </div>

              <h3 className="mt-4 text-sm font-black text-white">
                Can't find an answer?
              </h3>

              <p className="mt-2 text-xs leading-5 text-gray-500">
                Our support team can help with account
                and platform questions.
              </p>

              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-red-400 transition hover:text-red-300"
              >
                Contact support

                <FaArrowRight className="text-[9px]" />

              </Link>

            </div>

          </aside>

          {/* =====================================================
              FAQ CONTENT
          ===================================================== */}

          <div className="min-w-0">

            {/* Popular questions */}

            {activeCategory === "All" &&
              !search && (
                <div className="mb-12">

                  <div className="flex items-end justify-between">

                    <div>

                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-600">
                        Most helpful
                      </p>

                      <h2 className="mt-1 text-2xl font-black tracking-tight text-gray-950">
                        Popular questions
                      </h2>

                    </div>

                    <span className="hidden text-xs font-semibold text-gray-400 sm:block">
                      Frequently asked by members
                    </span>

                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">

                    {popularFAQs
                      .slice(0, 6)
                      .map((faq) => (

                        <button
                          key={faq.id}
                          type="button"
                          onClick={() => {
                            setOpenQuestions((current) =>
                              current.includes(faq.id)
                                ? current
                                : [...current, faq.id]
                            );

                            setTimeout(() => {
                              document
                                .getElementById(
                                  `faq-${faq.id}`
                                )
                                ?.scrollIntoView({
                                  behavior: "smooth",
                                  block: "center",
                                });
                            }, 50);
                          }}
                          className="
                            group
                            flex
                            items-center
                            gap-3
                            rounded-2xl
                            border
                            border-gray-200
                            bg-white
                            p-4
                            text-left
                            shadow-sm
                            transition-all
                            duration-200
                            hover:-translate-y-0.5
                            hover:border-red-200
                            hover:shadow-md
                          "
                        >

                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">

                            <FaCheckCircle className="text-xs" />

                          </span>

                          <span className="min-w-0 flex-1">

                            <span className="block text-xs font-bold leading-5 text-gray-800">
                              {faq.question}
                            </span>

                            <span className="mt-1 block text-[10px] font-medium text-gray-400">
                              {faq.category}
                            </span>

                          </span>

                          <FaArrowRight className="shrink-0 text-[9px] text-gray-300 transition group-hover:translate-x-1 group-hover:text-red-500" />

                        </button>

                      ))}

                  </div>

                </div>
              )}

            {/* FAQ heading */}

            <div className="mb-6 flex flex-col gap-3 border-b border-gray-200 pb-5 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-600">
                  Knowledge Base
                </p>

                <h2 className="mt-1 text-2xl font-black tracking-tight text-gray-950">
                  {activeCategory === "All"
                    ? "All questions"
                    : activeCategory}
                </h2>

              </div>

              <div className="flex items-center gap-3">

                <span className="text-xs font-semibold text-gray-400">
                  {filteredFAQs.length}{" "}
                  {filteredFAQs.length === 1
                    ? "question"
                    : "questions"}
                </span>

                {(search ||
                  activeCategory !== "All") && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs font-bold text-red-600 hover:text-red-700"
                  >
                    Clear filters
                  </button>
                )}

              </div>

            </div>

            {/* Search state */}

            {search && (
              <div className="mb-5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">

                <div className="flex items-center gap-2">

                  <FaSearch className="text-xs text-blue-500" />

                  <p className="text-xs font-medium text-blue-700">

                    Showing results for{" "}

                    <span className="font-black">
                      "{search}"
                    </span>

                  </p>

                </div>

              </div>
            )}

            {/* FAQ accordion */}

            {filteredFAQs.length > 0 ? (

              <div className="space-y-3">

                {filteredFAQs.map((faq, index) => {

                  const isOpen =
                    openQuestions.includes(faq.id);

                  return (
                    <article
                      key={faq.id}
                      id={`faq-${faq.id}`}
                      className={`
                        overflow-hidden
                        rounded-2xl
                        border
                        bg-white
                        transition-all
                        duration-200
                        ${
                          isOpen
                            ? "border-red-200 shadow-lg shadow-red-500/5"
                            : "border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md"
                        }
                      `}
                    >

                      {/* Question button */}

                      <button
                        type="button"
                        onClick={() =>
                          toggleQuestion(faq.id)
                        }
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${faq.id}`}
                        className="
                          flex
                          min-h-[76px]
                          w-full
                          cursor-pointer
                          items-center
                          gap-4
                          px-4
                          py-4
                          text-left
                          outline-none
                          transition
                          focus-visible:ring-2
                          focus-visible:ring-inset
                          focus-visible:ring-red-500
                          sm:px-5
                        "
                      >

                        {/* Number */}

                        <span
                          className={`
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            text-[10px]
                            font-black
                            ${
                              isOpen
                                ? "bg-red-600 text-white"
                                : "bg-gray-100 text-gray-500"
                            }
                          `}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        {/* Question */}

                        <span className="min-w-0 flex-1">

                          <span
                            className={`
                              block
                              text-sm
                              font-bold
                              leading-6
                              transition
                              sm:text-[15px]
                              ${
                                isOpen
                                  ? "text-red-600"
                                  : "text-gray-800"
                              }
                            `}
                          >
                            {faq.question}
                          </span>

                          <span className="mt-1 block text-[9px] font-bold uppercase tracking-wider text-gray-400">
                            {faq.category}
                          </span>

                        </span>

                        {/* Chevron */}

                        <span
                          className={`
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            transition-all
                            duration-200
                            ${
                              isOpen
                                ? "rotate-180 bg-red-50 text-red-600"
                                : "bg-gray-50 text-gray-400"
                            }
                          `}
                        >
                          <FaChevronDown className="text-[10px]" />
                        </span>

                      </button>

                      {/* Answer */}

                      <div
                        id={`faq-answer-${faq.id}`}
                        className={`
                          grid
                          transition-all
                          duration-300
                          ${
                            isOpen
                              ? "grid-rows-[1fr]"
                              : "grid-rows-[0fr]"
                          }
                        `}
                      >

                        <div className="overflow-hidden">

                          <div className="border-t border-gray-100 px-4 pb-6 pt-5 sm:pl-[76px] sm:pr-12">

                            <div className="flex gap-3">

                              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500">

                                <FaCheckCircle className="text-[10px]" />

                              </span>

                              <p className="text-sm leading-7 text-gray-600">
                                {faq.answer}
                              </p>

                            </div>

                          </div>

                        </div>

                      </div>

                    </article>
                  );
                })}

              </div>

            ) : (

              /* =================================================
                 NO RESULTS
              ================================================= */

              <div className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">

                  <FaSearch className="text-xl" />

                </div>

                <h3 className="mt-5 text-xl font-black text-gray-950">
                  No matching questions
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                  Try using different keywords or browse
                  one of the help categories.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-gray-950
                    px-5
                    py-3
                    text-xs
                    font-black
                    text-white
                    transition
                    hover:bg-red-600
                  "
                >
                  Show all questions

                  <FaArrowRight className="text-[9px]" />

                </button>

              </div>
            )}

          </div>

        </div>

      </section>

      {/* =========================================================
          TRUST / SECURITY SECTION
      ========================================================= */}

      <section className="border-y border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

            <TrustCard
              icon={FaLock}
              title="Account Security"
              text="Protect your password, OTP and private account information."
            />

            <TrustCard
              icon={FaShieldAlt}
              title="Professional Platform"
              text="ForeverMeet is designed for professional modelling and promotional profiles."
            />

            <TrustCard
              icon={FaFlag}
              title="Report Concerns"
              text="Report suspicious or inappropriate profiles so they can be reviewed."
            />

          </div>

        </div>

      </section>

      {/* =========================================================
          SUPPORT CTA
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#0b0d12]">

        <div className="pointer-events-none absolute inset-0">

          <div className="absolute left-1/2 top-[-180px] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[120px]" />

        </div>

        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400">

            <FaEnvelope className="text-lg" />

          </div>

          <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-red-400">
            Need personal assistance?
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Still have questions?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-400">
            If you couldn't find the information you
            need, contact the ForeverMeet support team
            and we'll help you with your request.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

            <Link
              to="/contact"
              className="
                inline-flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-red-600
                px-6
                py-3.5
                text-sm
                font-black
                text-white
                shadow-lg
                shadow-red-600/20
                transition
                hover:bg-red-700
                sm:w-auto
              "
            >
              Contact Support

              <FaArrowRight className="text-[10px]" />

            </Link>

            <Link
              to="/safety"
              className="
                inline-flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-white/[0.04]
                px-6
                py-3.5
                text-sm
                font-bold
                text-gray-300
                transition
                hover:border-white/20
                hover:bg-white/[0.08]
                hover:text-white
                sm:w-auto
              "
            >
              Safety Guidelines

              <FaShieldAlt className="text-[10px]" />

            </Link>

          </div>

        </div>

      </section>

    </main>
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
    <div className="group rounded-2xl border border-gray-200 bg-gray-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm transition group-hover:bg-red-600 group-hover:text-white">

        <Icon className="text-sm" />

      </div>

      <h3 className="mt-5 text-sm font-black text-gray-950">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        {text}
      </p>

    </div>
  );
}

export default FAQ;