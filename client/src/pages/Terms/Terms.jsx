import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Terms() {
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll(
      "section[data-section]"
    );

    const handleScroll = () => {
      let currentSection = "introduction";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= 180) {
          currentSection = section.dataset.section;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const sections = [
    {
      id: "introduction",
      number: "01",
      title: "Introduction",
    },
    {
      id: "eligibility",
      number: "02",
      title: "Eligibility",
    },
    {
      id: "accounts",
      number: "03",
      title: "Accounts & Registration",
    },
    {
      id: "listings",
      number: "04",
      title: "Listings & Profiles",
    },
    {
      id: "content",
      number: "05",
      title: "User Content",
    },
    {
      id: "verification",
      number: "06",
      title: "Verification",
    },
    {
      id: "communication",
      number: "07",
      title: "Communication",
    },
    {
      id: "credits",
      number: "08",
      title: "Credits & Payments",
    },
    {
      id: "prohibited",
      number: "09",
      title: "Prohibited Activities",
    },
    {
      id: "intellectual",
      number: "10",
      title: "Intellectual Property",
    },
    {
      id: "privacy",
      number: "11",
      title: "Privacy",
    },
    {
      id: "third-party",
      number: "12",
      title: "Third-Party Services",
    },
    {
      id: "availability",
      number: "13",
      title: "Platform Availability",
    },
    {
      id: "termination",
      number: "14",
      title: "Suspension & Termination",
    },
    {
      id: "disclaimer",
      number: "15",
      title: "Disclaimer",
    },
    {
      id: "liability",
      number: "16",
      title: "Limitation of Liability",
    },
    {
      id: "indemnification",
      number: "17",
      title: "Indemnification",
    },
    {
      id: "changes",
      number: "18",
      title: "Changes to Terms",
    },
    {
      id: "governing-law",
      number: "19",
      title: "Governing Law",
    },
    {
      id: "contact",
      number: "20",
      title: "Contact Us",
    },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (!element) return;

    const offset = 120;

    const top =
      element.getBoundingClientRect().top +
      window.scrollY -
      offset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });

    setActiveSection(id);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-gray-900">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-gray-200 bg-gray-950">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-red-600/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-red-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          {/* Breadcrumb */}

          <div className="mb-8 flex items-center gap-2 text-sm font-semibold text-gray-400">
            <Link
              to="/"
              className="cursor-pointer transition hover:text-white"
            >
              Home
            </Link>

            <span>/</span>

            <span className="text-gray-200">
              Terms & Conditions
            </span>
          </div>

          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-wider text-gray-300 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-red-500" />

            Legal Information
          </div>

          {/* Heading */}

          <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Terms &
            <span className="text-red-500">
              {" "}
              Conditions
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            These Terms & Conditions explain the rules,
            responsibilities and conditions that apply when
            using ForeverMeet and its professional profile
            listing services.
          </p>

          {/* Meta */}

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                Effective date
              </p>

              <p className="mt-1 text-sm font-bold text-white">
                August 2026
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                Platform
              </p>

              <p className="mt-1 text-sm font-bold text-white">
                ForeverMeet
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          IMPORTANT NOTICE
      ===================================================== */}

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 rounded-2xl border border-red-100 bg-red-50 p-5 sm:flex-row sm:items-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-black text-white">
              !
            </div>

            <div>
              <h2 className="text-sm font-black text-red-900">
                Please read these terms carefully
              </h2>

              <p className="mt-1 text-sm leading-6 text-red-800/80">
                By creating an account, publishing a profile,
                purchasing credits or using any part of
                ForeverMeet, you acknowledge that you have
                read, understood and agreed to these Terms &
                Conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[270px_minmax(0,1fr)]">
          {/* =================================================
              TABLE OF CONTENTS
          ================================================= */}

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
                  On this page
                </p>

                <h2 className="mt-1 text-lg font-black text-gray-950">
                  Contents
                </h2>
              </div>

              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() =>
                      scrollToSection(section.id)
                    }
                    className={`group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-bold transition ${
                      activeSection === section.id
                        ? "bg-red-50 text-red-600"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-950"
                    }`}
                  >
                    <span
                      className={`w-6 text-[10px] font-black ${
                        activeSection === section.id
                          ? "text-red-500"
                          : "text-gray-300"
                      }`}
                    >
                      {section.number}
                    </span>

                    <span className="truncate">
                      {section.title}
                    </span>
                  </button>
                ))}
              </nav>

              <div className="mt-6 border-t border-gray-100 pt-5">
                <p className="text-xs leading-5 text-gray-500">
                  Questions about these terms?
                </p>

                <Link
                  to="/contact"
                  className="mt-2 inline-flex cursor-pointer text-xs font-black text-gray-950 transition hover:text-red-600"
                >
                  Contact ForeverMeet →
                </Link>
              </div>
            </div>
          </aside>

          {/* =================================================
              DOCUMENT
          ================================================= */}

          <article className="min-w-0 rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div className="p-5 sm:p-8 lg:p-12">
              {/* =================================================
                  INTRODUCTION
              ================================================= */}

              <LegalSection
                id="introduction"
                number="01"
                title="Introduction"
              >
                <p>
                  Welcome to ForeverMeet. ForeverMeet is a
                  professional online platform designed to
                  allow users and professionals to create,
                  discover and manage profile listings for
                  modelling, creative, promotional and related
                  professional opportunities.
                </p>

                <p>
                  These Terms & Conditions ("Terms") form a
                  legally binding agreement between you and
                  ForeverMeet ("ForeverMeet", "we", "us" or
                  "our") regarding your access to and use of
                  our website, applications, features,
                  services and related functionality.
                </p>

                <p>
                  If you do not agree with these Terms, you
                  should not create an account or use the
                  ForeverMeet platform.
                </p>
              </LegalSection>

              {/* =================================================
                  ELIGIBILITY
              ================================================= */}

              <LegalSection
                id="eligibility"
                number="02"
                title="Eligibility"
              >
                <p>
                  You must satisfy the applicable legal
                  requirements to use ForeverMeet.
                </p>

                <ul>
                  <li>
                    You must be legally permitted to use
                    online services in your jurisdiction.
                  </li>

                  <li>
                    You must provide truthful and accurate
                    information when creating an account.
                  </li>

                  <li>
                    You must not create an account using
                    another person's identity without
                    authorization.
                  </li>

                  <li>
                    You are responsible for ensuring that
                    your use of ForeverMeet complies with
                    applicable laws.
                  </li>
                </ul>
              </LegalSection>

              {/* =================================================
                  ACCOUNTS
              ================================================= */}

              <LegalSection
                id="accounts"
                number="03"
                title="Accounts & Registration"
              >
                <p>
                  Certain ForeverMeet features may require
                  registration. When registering, you agree
                  to provide information that is complete,
                  accurate and current.
                </p>

                <p>
                  You are responsible for maintaining the
                  confidentiality of your account credentials
                  and for activities performed through your
                  account.
                </p>

                <div className="my-6 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <h3 className="text-sm font-black text-gray-950">
                    Account security
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    If you believe that your account has been
                    accessed without authorization, you should
                    contact ForeverMeet as soon as reasonably
                    possible.
                  </p>
                </div>

                <p>
                  We may suspend or restrict accounts where
                  we reasonably believe that the account has
                  been used in violation of these Terms or
                  applicable law.
                </p>
              </LegalSection>

              {/* =================================================
                  LISTINGS
              ================================================= */}

              <LegalSection
                id="listings"
                number="04"
                title="Listings & Profiles"
              >
                <p>
                  ForeverMeet allows eligible users to publish
                  professional profile listings containing
                  information such as names, descriptions,
                  professional categories, locations, images,
                  services and other profile information.
                </p>

                <p>
                  You are solely responsible for ensuring that
                  the information contained in your listing is
                  accurate, lawful and does not misleadingly
                  represent another person or business.
                </p>

                <ul>
                  <li>
                    Profile information should be accurate and
                    kept reasonably up to date.
                  </li>

                  <li>
                    Images should represent the person or
                    professional service described by the
                    listing.
                  </li>

                  <li>
                    You must have the necessary rights and
                    permissions to publish uploaded images
                    and other content.
                  </li>

                  <li>
                    Listings must comply with applicable laws
                    and these Terms.
                  </li>
                </ul>

                <p>
                  ForeverMeet may review, moderate, approve,
                  reject, edit or remove listings where
                  reasonably necessary to maintain platform
                  quality, safety and compliance.
                </p>
              </LegalSection>

              {/* =================================================
                  CONTENT
              ================================================= */}

              <LegalSection
                id="content"
                number="05"
                title="User Content"
              >
                <p>
                  "User Content" means text, photographs,
                  profile information, descriptions and other
                  materials submitted or published by users.
                </p>

                <p>
                  You retain ownership of content that you
                  lawfully own. However, by submitting content
                  to ForeverMeet, you grant us a limited,
                  non-exclusive permission to host, display,
                  reproduce and technically process that
                  content as necessary to operate and promote
                  the platform.
                </p>

                <p>
                  You represent that you have the necessary
                  rights to submit the content and that your
                  content does not unlawfully infringe the
                  rights of another person.
                </p>
              </LegalSection>

              {/* =================================================
                  VERIFICATION
              ================================================= */}

              <LegalSection
                id="verification"
                number="06"
                title="Verification"
              >
                <p>
                  ForeverMeet may provide verification
                  features intended to help users identify
                  profiles that have completed a particular
                  verification process.
                </p>

                <p>
                  A verification indicator does not constitute
                  a guarantee, endorsement or certification of
                  every statement made by a profile owner.
                </p>

                <p>
                  Verification may be withdrawn if information
                  becomes inaccurate, circumstances change or
                  the account no longer satisfies applicable
                  verification requirements.
                </p>
              </LegalSection>

              {/* =================================================
                  COMMUNICATION
              ================================================= */}

              <LegalSection
                id="communication"
                number="07"
                title="Communication"
              >
                <p>
                  ForeverMeet may provide contact functionality
                  that allows users to communicate with profile
                  owners.
                </p>

                <p>
                  Users are responsible for their own
                  communications, interactions and arrangements
                  with other users.
                </p>

                <div className="my-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <h3 className="text-sm font-black text-amber-900">
                    Important
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-amber-800">
                    ForeverMeet does not automatically become
                    a party to private arrangements, agreements
                    or transactions between users.
                  </p>
                </div>
              </LegalSection>

              {/* =================================================
                  CREDITS
              ================================================= */}

              <LegalSection
                id="credits"
                number="08"
                title="Credits & Payments"
              >
                <p>
                  Certain platform features may require the
                  purchase or use of ForeverMeet credits.
                </p>

                <p>
                  Credits may be used for eligible platform
                  functionality, including applicable profile
                  listing or promotional features.
                </p>

                <ul>
                  <li>
                    Credits are platform units and are not
                    intended to function as cash or a bank
                    balance.
                  </li>

                  <li>
                    Credit balances may be subject to
                    platform rules and expiration policies
                    where clearly communicated.
                  </li>

                  <li>
                    Users should review the applicable price
                    and credit requirement before completing
                    a purchase.
                  </li>

                  <li>
                    Payment processing may be performed by
                    third-party payment providers.
                  </li>
                </ul>

                <p>
                  Refund eligibility, where available, will be
                  determined according to the applicable
                  purchase terms and applicable law.
                </p>
              </LegalSection>

              {/* =================================================
                  PROHIBITED
              ================================================= */}

              <LegalSection
                id="prohibited"
                number="09"
                title="Prohibited Activities"
              >
                <p>
                  You may not use ForeverMeet to engage in
                  unlawful, deceptive, abusive or harmful
                  activities.
                </p>

                <ul>
                  <li>
                    Creating fake or misleading profiles.
                  </li>

                  <li>
                    Impersonating another individual or
                    organization.
                  </li>

                  <li>
                    Uploading content that you do not have
                    permission to use.
                  </li>

                  <li>
                    Attempting to gain unauthorized access to
                    accounts, systems or data.
                  </li>

                  <li>
                    Using automated methods to abuse or
                    overload the platform.
                  </li>

                  <li>
                    Publishing fraudulent, deceptive or
                    unlawful information.
                  </li>

                  <li>
                    Using the platform to facilitate illegal
                    activities.
                  </li>

                  <li>
                    Attempting to manipulate rankings,
                    verification indicators or platform
                    systems.
                  </li>

                  <li>
                    Harassing, threatening or abusing other
                    users.
                  </li>
                </ul>

                <p>
                  ForeverMeet may remove content or restrict
                  accounts that violate these requirements.
                </p>
              </LegalSection>

              {/* =================================================
                  INTELLECTUAL PROPERTY
              ================================================= */}

              <LegalSection
                id="intellectual"
                number="10"
                title="Intellectual Property"
              >
                <p>
                  The ForeverMeet website, branding, logos,
                  design elements, software, interface,
                  graphics and original platform materials are
                  protected by applicable intellectual property
                  laws.
                </p>

                <p>
                  Except where expressly permitted, you may not
                  copy, reproduce, modify, distribute, sell or
                  commercially exploit ForeverMeet's platform
                  materials without appropriate authorization.
                </p>
              </LegalSection>

              {/* =================================================
                  PRIVACY
              ================================================= */}

              <LegalSection
                id="privacy"
                number="11"
                title="Privacy"
              >
                <p>
                  Your use of ForeverMeet is also subject to
                  our Privacy Policy, which explains how we
                  collect, use, store and process information.
                </p>

                <Link
                  to="/privacy-policy"
                  className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gray-950 px-4 py-3 text-sm font-black text-white transition hover:bg-red-600"
                >
                  Read Privacy Policy
                  <span>→</span>
                </Link>
              </LegalSection>

              {/* =================================================
                  THIRD PARTY
              ================================================= */}

              <LegalSection
                id="third-party"
                number="12"
                title="Third-Party Services"
              >
                <p>
                  ForeverMeet may integrate with third-party
                  services such as payment providers, analytics
                  services, hosting providers or communication
                  services.
                </p>

                <p>
                  Third-party services may operate under their
                  own terms and privacy policies. ForeverMeet
                  is not responsible for policies or practices
                  that are exclusively controlled by those
                  third parties.
                </p>
              </LegalSection>

              {/* =================================================
                  AVAILABILITY
              ================================================= */}

              <LegalSection
                id="availability"
                number="13"
                title="Platform Availability"
              >
                <p>
                  We aim to keep ForeverMeet reliable and
                  accessible, but we do not guarantee that the
                  platform will always be available without
                  interruption.
                </p>

                <p>
                  Maintenance, technical issues, updates,
                  security events or circumstances outside our
                  reasonable control may temporarily affect
                  availability.
                </p>
              </LegalSection>

              {/* =================================================
                  TERMINATION
              ================================================= */}

              <LegalSection
                id="termination"
                number="14"
                title="Suspension & Termination"
              >
                <p>
                  You may stop using ForeverMeet at any time.
                </p>

                <p>
                  We may suspend, restrict or terminate access
                  to accounts or listings where reasonably
                  necessary to protect users, the platform or
                  comply with applicable law.
                </p>

                <p>
                  Where appropriate, we may provide notice or
                  an opportunity to resolve an issue before
                  taking action.
                </p>
              </LegalSection>

              {/* =================================================
                  DISCLAIMER
              ================================================= */}

              <LegalSection
                id="disclaimer"
                number="15"
                title="Disclaimer"
              >
                <p>
                  ForeverMeet provides an online platform for
                  professional profile discovery and related
                  services.
                </p>

                <p>
                  We do not guarantee the accuracy, reliability,
                  qualifications, availability or conduct of
                  every user or profile listed on the platform.
                </p>

                <p>
                  Users should independently evaluate
                  information and exercise appropriate care
                  before entering into arrangements with other
                  users.
                </p>
              </LegalSection>

              {/* =================================================
                  LIABILITY
              ================================================= */}

              <LegalSection
                id="liability"
                number="16"
                title="Limitation of Liability"
              >
                <p>
                  To the maximum extent permitted by applicable
                  law, ForeverMeet will not be responsible for
                  indirect, incidental, special, consequential
                  or punitive losses arising from your use of
                  the platform.
                </p>

                <p>
                  Nothing in these Terms is intended to exclude
                  liability that cannot lawfully be excluded or
                  limited under applicable law.
                </p>
              </LegalSection>

              {/* =================================================
                  INDEMNIFICATION
              ================================================= */}

              <LegalSection
                id="indemnification"
                number="17"
                title="Indemnification"
              >
                <p>
                  To the extent permitted by applicable law,
                  you agree to be responsible for claims,
                  losses, liabilities and reasonable expenses
                  arising from your violation of these Terms,
                  misuse of the platform or unlawful User
                  Content.
                </p>
              </LegalSection>

              {/* =================================================
                  CHANGES
              ================================================= */}

              <LegalSection
                id="changes"
                number="18"
                title="Changes to These Terms"
              >
                <p>
                  We may update these Terms from time to time
                  to reflect changes to the platform,
                  applicable laws, security requirements or
                  business practices.
                </p>

                <p>
                  Updated Terms will be published on this page
                  with an updated effective date where
                  appropriate.
                </p>

                <p>
                  Your continued use of ForeverMeet after
                  updated Terms become effective may constitute
                  acceptance of the updated Terms, subject to
                  applicable law.
                </p>
              </LegalSection>

              {/* =================================================
                  GOVERNING LAW
              ================================================= */}

              <LegalSection
                id="governing-law"
                number="19"
                title="Governing Law"
              >
                <p>
                  These Terms will be interpreted and applied
                  in accordance with applicable laws and
                  regulations.
                </p>

                <p>
                  Where legally applicable, disputes relating
                  to the platform or these Terms will be subject
                  to the jurisdiction of the appropriate courts
                  having authority over the relevant matter.
                </p>
              </LegalSection>

              {/* =================================================
                  CONTACT
              ================================================= */}

              <LegalSection
                id="contact"
                number="20"
                title="Contact Us"
              >
                <p>
                  If you have questions, concerns or requests
                  regarding these Terms & Conditions, you can
                  contact the ForeverMeet support team.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Link
                    to="/contact"
                    className="group cursor-pointer rounded-2xl border border-gray-200 bg-gray-50 p-5 transition hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">
                        ✉
                      </span>

                      <span className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-red-600">
                        →
                      </span>
                    </div>

                    <h3 className="mt-4 text-sm font-black text-gray-950">
                      Contact Support
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Get help with your account or
                      platform-related questions.
                    </p>
                  </Link>

                  <Link
                    to="/privacy-policy"
                    className="group cursor-pointer rounded-2xl border border-gray-200 bg-gray-50 p-5 transition hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">
                        🔒
                      </span>

                      <span className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-red-600">
                        →
                      </span>
                    </div>

                    <h3 className="mt-4 text-sm font-black text-gray-950">
                      Privacy Policy
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Learn how ForeverMeet handles personal
                      information.
                    </p>
                  </Link>
                </div>
              </LegalSection>

              {/* =================================================
                  FINAL NOTICE
              ================================================= */}

              <div className="mt-12 rounded-3xl border border-gray-200 bg-gray-950 p-6 text-white sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400">
                      ForeverMeet
                    </p>

                    <h2 className="mt-2 text-xl font-black sm:text-2xl">
                      Thank you for using our platform.
                    </h2>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-gray-400">
                      Please use ForeverMeet responsibly and
                      respect the rights, privacy and safety of
                      other members of our community.
                    </p>
                  </div>

                  <Link
                    to="/"
                    className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-black text-gray-950 transition hover:bg-red-600 hover:text-white"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>

              {/* Last updated */}

              <div className="mt-8 border-t border-gray-100 pt-6">
                <p className="text-xs font-medium text-gray-400">
                  Last updated: August 2026
                </p>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}

/* ============================================================
   LEGAL SECTION
============================================================ */

function LegalSection({
  id,
  number,
  title,
  children,
}) {
  return (
    <section
      id={id}
      data-section={id}
      className="scroll-mt-28 border-b border-gray-100 py-8 first:pt-0 last:border-b-0"
    >
      <div className="flex gap-4">
        {/* Number */}

        <div className="hidden shrink-0 sm:block">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-[10px] font-black text-red-600">
            {number}
          </div>
        </div>

        {/* Content */}

        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-black tracking-tight text-gray-950 sm:text-2xl">
            {title}
          </h2>

          <div className="mt-3 h-1 w-10 rounded-full bg-red-600" />

          <div className="legal-content mt-5 text-sm leading-7 text-gray-600 sm:text-[15px]">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Terms;