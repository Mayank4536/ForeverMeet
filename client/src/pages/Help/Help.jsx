import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaSearch,
  FaUserPlus,
  FaUserCircle,
  FaListAlt,
  FaWallet,
  FaCrown,
  FaShieldAlt,
  FaLock,
  FaChevronDown,
  FaArrowRight,
  FaQuestionCircle,
  FaEnvelope,
  FaHeadset,
  FaCheckCircle,
} from "react-icons/fa";

function Help() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    {
      name: "Getting Started",
      icon: FaUserPlus,
      description: "Learn how to create and use your ForeverMeet account.",
    },
    {
      name: "Account & Verification",
      icon: FaUserCircle,
      description: "Manage your account, email verification and profile.",
    },
    {
      name: "Listings",
      icon: FaListAlt,
      description: "Create, edit and manage your professional listings.",
    },
    {
      name: "Wallet & Credits",
      icon: FaWallet,
      description: "Understand credits, purchases and listing charges.",
    },
    {
      name: "Premium",
      icon: FaCrown,
      description: "Learn about premium and featured profile visibility.",
    },
    {
      name: "Safety & Security",
      icon: FaShieldAlt,
      description: "Stay safe and learn how to report suspicious activity.",
    },
  ];

  const faqs = [
    {
      id: 1,
      category: "Getting Started",
      question: "What is ForeverMeet?",
      answer:
        "ForeverMeet is a professional directory platform designed to help people discover models and other creative professionals across cities in India. Users can browse professional profiles, explore categories and discover listings by location.",
    },
    {
      id: 2,
      category: "Getting Started",
      question: "How do I create a ForeverMeet account?",
      answer:
        "Click Register from the navigation menu and enter your name, email address and password. Complete the email verification process to activate your account.",
    },
    {
      id: 3,
      category: "Account & Verification",
      question: "Why do I need to verify my email?",
      answer:
        "Email verification helps protect your account and confirms that you have access to the email address associated with your ForeverMeet account.",
    },
    {
      id: 4,
      category: "Account & Verification",
      question: "I forgot my password. What should I do?",
      answer:
        "Go to the Login page and select Forgot Password. Enter your registered email address and follow the OTP verification and password reset process.",
    },
    {
      id: 5,
      category: "Listings",
      question: "How can I create a profile listing?",
      answer:
        "After logging into your account, select Post Profile from the navigation menu or choose Post New Profile from your account menu. Complete the listing information and submit it for review.",
    },
    {
      id: 6,
      category: "Listings",
      question: "Can I edit my listing after publishing it?",
      answer:
        "Yes. You can manage your listings from My Listings. From there you can update the information associated with your profile listing.",
    },
    {
      id: 7,
      category: "Listings",
      question: "Why is my listing not visible immediately?",
      answer:
        "Listings may require review before they become publicly visible. This helps us maintain a professional and trustworthy directory.",
    },
    {
      id: 8,
      category: "Wallet & Credits",
      question: "What are ForeverMeet credits?",
      answer:
        "Credits are used for certain platform actions such as creating listings or accessing premium promotional features. Your available balance can be viewed from the Wallet section.",
    },
    {
      id: 9,
      category: "Wallet & Credits",
      question: "Where can I see my credit balance?",
      answer:
        "When you are logged in, your current credit balance is displayed in the navigation bar and can also be viewed from the Wallet & Credits page.",
    },
    {
      id: 10,
      category: "Premium",
      question: "What is a premium profile?",
      answer:
        "Premium profiles receive additional visibility and promotional placement compared with standard profiles. Premium features are designed to help professional listings stand out.",
    },
    {
      id: 11,
      category: "Safety & Security",
      question: "How can I report a suspicious profile?",
      answer:
        "If you believe a listing contains misleading, inappropriate or suspicious information, use the Report a Profile option or contact ForeverMeet support with the relevant profile details.",
    },
    {
      id: 12,
      category: "Safety & Security",
      question: "How can I keep my account secure?",
      answer:
        "Use a strong, unique password, never share your OTP or password with anyone, and avoid giving account credentials to people claiming to represent ForeverMeet.",
    },
  ];

  const filteredFaqs = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "All" ||
        faq.category === activeCategory;

      const matchesSearch =
        !searchValue ||
        faq.question.toLowerCase().includes(searchValue) ||
        faq.answer.toLowerCase().includes(searchValue) ||
        faq.category.toLowerCase().includes(searchValue);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);

    setTimeout(() => {
      document
        .getElementById("faq-section")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  const toggleFaq = (id) => {
    setOpenFaq((current) =>
      current === id ? null : id
    );
  };

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-gray-900">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-gray-950">

        {/* Background decoration */}

        <div className="pointer-events-none absolute inset-0">

          <div
            className="
              absolute
              -left-32
              -top-32
              h-96
              w-96
              rounded-full
              bg-red-600/20
              blur-[120px]
            "
          />

          <div
            className="
              absolute
              -right-32
              top-20
              h-96
              w-96
              rounded-full
              bg-pink-600/10
              blur-[120px]
            "
          />

          <div
            className="
              absolute
              bottom-0
              left-1/2
              h-72
              w-72
              -translate-x-1/2
              rounded-full
              bg-red-500/10
              blur-[100px]
            "
          />

        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">

          {/* Small label */}

          <div className="flex justify-center">

            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/5
                px-4
                py-2
                text-xs
                font-bold
                uppercase
                tracking-[0.15em]
                text-red-400
              "
            >
              <FaQuestionCircle />

              ForeverMeet Support
            </span>

          </div>

          {/* Heading */}

          <div className="mx-auto mt-6 max-w-3xl text-center">

            <h1
              className="
                text-4xl
                font-black
                tracking-tight
                text-white
                sm:text-5xl
                lg:text-6xl
              "
            >
              How can we help?
            </h1>

            <p
              className="
                mx-auto
                mt-5
                max-w-2xl
                text-base
                leading-7
                text-gray-400
                sm:text-lg
              "
            >
              Find answers about your account, professional
              listings, credits, premium features and staying
              safe on ForeverMeet.
            </p>

          </div>

          {/* Search */}

          <div className="mx-auto mt-9 max-w-2xl">

            <div
              className="
                flex
                items-center
                overflow-hidden
                rounded-2xl
                bg-white
                p-2
                shadow-2xl
                shadow-black/30
              "
            >

              <FaSearch className="ml-4 shrink-0 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search for answers..."
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  px-4
                  py-4
                  text-sm
                  font-medium
                  text-gray-900
                  outline-none
                  placeholder:text-gray-400
                  sm:text-base
                "
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="
                    mr-2
                    rounded-lg
                    px-3
                    py-2
                    text-xs
                    font-bold
                    text-gray-500
                    transition
                    hover:bg-gray-100
                    hover:text-gray-900
                  "
                >
                  Clear
                </button>
              )}

            </div>

            <p className="mt-3 text-center text-xs text-gray-500">
              Try searching for "credits", "listing", "password"
              or "verification"
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          QUICK INTRO
      ===================================================== */}

      <section className="border-b border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-xs font-black uppercase tracking-[0.15em] text-red-600">
                Help Center
              </p>

              <h2 className="mt-1 text-xl font-black text-gray-950">
                Find the right answer quickly
              </h2>

            </div>

            <Link
              to="/contact"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-gray-950
                px-5
                py-3
                text-sm
                font-black
                text-white
                transition
                hover:bg-red-600
              "
            >
              <FaHeadset />

              Contact Support

              <FaArrowRight className="text-xs" />
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          CATEGORIES
      ===================================================== */}

      <section className="py-14 sm:py-16">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center">

            <p className="text-xs font-black uppercase tracking-[0.16em] text-red-600">
              Browse Topics
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950">
              What can we help you with?
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500">
              Choose a topic below to find answers related to
              your ForeverMeet account and professional profile.
            </p>

          </div>

          <div
            className="
              mt-9
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >

            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() =>
                    handleCategoryClick(category.name)
                  }
                  className="
                    group
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    p-5
                    text-left
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-red-200
                    hover:shadow-xl
                    hover:shadow-red-100/50
                  "
                >

                  <div className="flex items-start justify-between">

                    <span
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        bg-red-50
                        text-red-600
                        transition
                        group-hover:bg-red-600
                        group-hover:text-white
                      "
                    >
                      <Icon />
                    </span>

                    <FaArrowRight
                      className="
                        mt-2
                        text-xs
                        text-gray-300
                        transition
                        group-hover:translate-x-1
                        group-hover:text-red-600
                      "
                    />

                  </div>

                  <h3 className="mt-5 text-base font-black text-gray-950">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {category.description}
                  </p>

                </button>
              );
            })}

          </div>

        </div>

      </section>

      {/* =====================================================
          FAQ
      ===================================================== */}

      <section
        id="faq-section"
        className="scroll-mt-24 border-t border-gray-200 bg-white py-14 sm:py-16"
      >

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          <div className="text-center">

            <p className="text-xs font-black uppercase tracking-[0.16em] text-red-600">
              Frequently Asked Questions
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950">
              Popular questions
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
              Browse answers to the most common questions
              about using ForeverMeet.
            </p>

          </div>

          {/* Category filter */}

          <div className="mt-8 flex flex-wrap justify-center gap-2">

            {["All", ...categories.map((item) => item.name)].map(
              (category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`
                    rounded-full
                    border
                    px-4
                    py-2
                    text-xs
                    font-bold
                    transition
                    ${
                      activeCategory === category
                        ? "border-red-600 bg-red-600 text-white"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    }
                  `}
                >
                  {category}
                </button>
              )
            )}

          </div>

          {/* Results */}

          <div className="mt-8 space-y-3">

            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = openFaq === faq.id;

                return (
                  <div
                    key={faq.id}
                    className={`
                      overflow-hidden
                      rounded-2xl
                      border
                      bg-white
                      transition-all
                      duration-200
                      ${
                        isOpen
                          ? "border-red-200 shadow-lg shadow-red-100/40"
                          : "border-gray-200"
                      }
                    `}
                  >

                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      className="
                        flex
                        w-full
                        items-center
                        justify-between
                        gap-5
                        px-5
                        py-5
                        text-left
                        sm:px-6
                      "
                    >

                      <div className="min-w-0">

                        <span className="text-[10px] font-bold uppercase tracking-wider text-red-500">
                          {faq.category}
                        </span>

                        <h3 className="mt-1 text-sm font-black leading-6 text-gray-900 sm:text-base">
                          {faq.question}
                        </h3>

                      </div>

                      <span
                        className={`
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          transition
                          ${
                            isOpen
                              ? "bg-red-600 text-white"
                              : "bg-gray-100 text-gray-500"
                          }
                        `}
                      >
                        <FaChevronDown
                          className={`
                            text-xs
                            transition-transform
                            duration-200
                            ${
                              isOpen
                                ? "rotate-180"
                                : ""
                            }
                          `}
                        />
                      </span>

                    </button>

                    {isOpen && (
                      <div className="border-t border-gray-100 px-5 pb-5 pt-4 sm:px-6">

                        <p className="text-sm leading-7 text-gray-500">
                          {faq.answer}
                        </p>

                      </div>
                    )}

                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">

                <FaSearch className="mx-auto text-2xl text-gray-300" />

                <h3 className="mt-4 text-base font-black text-gray-900">
                  No results found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Try a different search term or browse another
                  help category.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                  className="
                    mt-5
                    rounded-xl
                    bg-red-600
                    px-5
                    py-2.5
                    text-sm
                    font-black
                    text-white
                    transition
                    hover:bg-red-700
                  "
                >
                  View All Questions
                </button>

              </div>
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          SAFETY CALLOUT
      ===================================================== */}

      <section className="bg-gray-50 py-14">

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              bg-gray-950
              px-6
              py-10
              shadow-2xl
              sm:px-10
              sm:py-12
            "
          >

            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-60
                w-60
                rounded-full
                bg-red-600/20
                blur-[80px]
              "
            />

            <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-start gap-4">

                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-red-600
                    text-white
                  "
                >
                  <FaShieldAlt />
                </div>

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-red-400">
                    Safety First
                  </p>

                  <h2 className="mt-1 text-xl font-black text-white">
                    Keep your account and information safe
                  </h2>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-gray-400">
                    Never share your password or OTP with anyone.
                    Be careful when communicating with people
                    outside the platform and report suspicious
                    activity.
                  </p>

                </div>

              </div>

              <Link
                to="/safety"
                className="
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-5
                  py-3
                  text-sm
                  font-black
                  text-gray-950
                  transition
                  hover:bg-red-600
                  hover:text-white
                "
              >
                Safety Guidelines

                <FaArrowRight className="text-xs" />
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CONTACT SUPPORT
      ===================================================== */}

      <section className="bg-white py-16">

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <div className="text-center">

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-red-50
                text-red-600
              "
            >
              <FaHeadset className="text-xl" />
            </div>

            <h2 className="mt-5 text-3xl font-black text-gray-950">
              Still need help?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
              Can't find the answer you're looking for?
              Our support team can help you with account,
              listing and platform-related questions.
            </p>

          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* EMAIL */}

            <a
              href="mailto:support@forevermeet.com"
              className="
                group
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                transition-all
                hover:-translate-y-1
                hover:border-red-200
                hover:shadow-xl
              "
            >

              <div className="flex items-center gap-4">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-gray-100
                    text-gray-600
                    transition
                    group-hover:bg-red-50
                    group-hover:text-red-600
                  "
                >
                  <FaEnvelope />
                </div>

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Email Support
                  </p>

                  <p className="mt-1 text-sm font-black text-gray-900">
                    support@forevermeet.com
                  </p>

                </div>

              </div>

              <div className="mt-5 flex items-center gap-2 text-xs font-bold text-red-600">
                Send us an email

                <FaArrowRight className="text-[9px] transition group-hover:translate-x-1" />
              </div>

            </a>

            {/* CONTACT */}

            <Link
              to="/contact"
              className="
                group
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                transition-all
                hover:-translate-y-1
                hover:border-red-200
                hover:shadow-xl
              "
            >

              <div className="flex items-center gap-4">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-gray-100
                    text-gray-600
                    transition
                    group-hover:bg-red-50
                    group-hover:text-red-600
                  "
                >
                  <FaQuestionCircle />
                </div>

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Contact Us
                  </p>

                  <p className="mt-1 text-sm font-black text-gray-900">
                    Send a support request
                  </p>

                </div>

              </div>

              <div className="mt-5 flex items-center gap-2 text-xs font-bold text-red-600">
                Contact ForeverMeet

                <FaArrowRight className="text-[9px] transition group-hover:translate-x-1" />
              </div>

            </Link>

          </div>

          {/* TRUST NOTE */}

          <div className="mt-8 flex justify-center">

            <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-xs font-bold text-green-700">

              <FaCheckCircle />

              Professional support for ForeverMeet users

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="bg-gray-950">

        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">

          <FaLock className="mx-auto text-2xl text-red-500" />

          <h2 className="mt-4 text-2xl font-black text-white">
            Ready to explore ForeverMeet?
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500">
            Discover professional profiles and creative talent
            across cities in India.
          </p>

          <Link
            to="/listings"
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-red-600
              px-6
              py-3
              text-sm
              font-black
              text-white
              shadow-lg
              shadow-red-600/20
              transition
              hover:bg-red-700
              hover:shadow-xl
            "
          >
            Browse Profiles

            <FaArrowRight className="text-xs" />
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Help;