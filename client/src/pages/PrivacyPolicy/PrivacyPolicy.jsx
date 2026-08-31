import { useState } from "react";
import { Link } from "react-router-dom";

function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    {
      id: "overview",
      label: "Overview",
    },
    {
      id: "information",
      label: "Information We Collect",
    },
    {
      id: "usage",
      label: "How We Use Information",
    },
    {
      id: "sharing",
      label: "Information Sharing",
    },
    {
      id: "cookies",
      label: "Cookies & Technologies",
    },
    {
      id: "security",
      label: "Data Security",
    },
    {
      id: "retention",
      label: "Data Retention",
    },
    {
      id: "rights",
      label: "Your Privacy Rights",
    },
    {
      id: "children",
      label: "Children's Privacy",
    },
    {
      id: "changes",
      label: "Policy Changes",
    },
    {
      id: "contact",
      label: "Contact Us",
    },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);

    const element = document.getElementById(id);

    if (element) {
      const offset = 110;

      const position =
        element.getBoundingClientRect().top +
        window.scrollY -
        offset;

      window.scrollTo({
        top: position,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-gray-900">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-gray-200 bg-white">
        {/* Decorative background */}

        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-100/60 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-gray-100 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          {/* Breadcrumb */}

          <div className="mb-7 flex flex-wrap items-center gap-2 text-sm font-semibold text-gray-500">
            <Link
              to="/"
              className="transition hover:text-red-600"
            >
              Home
            </Link>

            <span className="text-gray-300">
              /
            </span>

            <span className="text-gray-900">
              Privacy Policy
            </span>
          </div>

          {/* Hero content */}

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-red-600">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
                ✓
              </span>

              Privacy & Data Protection
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              Privacy Policy
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              Your privacy matters to us. This Privacy Policy
              explains how ForeverMeet collects, uses, protects,
              and manages information when you use our platform.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Last updated
                </p>

                <p className="mt-1 text-sm font-black text-gray-900">
                  June 2026
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Applies to
                </p>

                <p className="mt-1 text-sm font-black text-gray-900">
                  ForeverMeet.com
                </p>
              </div>

              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-green-600">
                  Privacy first
                </p>

                <p className="mt-1 text-sm font-black text-green-700">
                  Responsible data practices
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          IMPORTANT NOTICE
      ===================================================== */}

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:flex-row sm:items-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white">
              i
            </div>

            <div>
              <h2 className="text-sm font-black text-blue-950">
                Please read this policy carefully
              </h2>

              <p className="mt-1 text-sm leading-6 text-blue-800">
                By using ForeverMeet, you acknowledge that you
                have read and understood this Privacy Policy.
                This policy should be read together with our
                Terms & Conditions and other applicable policies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[270px_minmax(0,1fr)]">
          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="lg:block">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="px-3 pb-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">
                    On this page
                  </p>

                  <p className="mt-1 text-sm font-black text-gray-950">
                    Privacy Policy
                  </p>
                </div>

                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() =>
                        scrollToSection(section.id)
                      }
                      className={`group flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                        activeSection === section.id
                          ? "bg-red-50 text-red-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
                      }`}
                    >
                      <span
                        className={`mr-3 h-1.5 w-1.5 shrink-0 rounded-full transition ${
                          activeSection === section.id
                            ? "bg-red-600"
                            : "bg-gray-300 group-hover:bg-gray-500"
                        }`}
                      />

                      {section.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Help card */}

              <div className="mt-4 rounded-3xl bg-gray-950 p-5 text-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lg">
                  ?
                </div>

                <h3 className="mt-4 text-base font-black">
                  Have a privacy question?
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  If you have questions about your information,
                  our team is available to help.
                </p>

                <Link
                  to="/contact"
                  className="mt-4 inline-flex items-center text-sm font-black text-white transition hover:text-red-400"
                >
                  Contact us
                  <span className="ml-2">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </aside>

          {/* =================================================
              POLICY CONTENT
          ================================================= */}

          <article className="min-w-0 rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div className="p-5 sm:p-8 lg:p-10">
              {/* =================================================
                  OVERVIEW
              ================================================= */}

              <PolicySection
                id="overview"
                number="01"
                title="Overview"
              >
                <p>
                  ForeverMeet is a professional profile and
                  business promotion platform designed to help
                  users discover and promote professional profiles,
                  services, and opportunities.
                </p>

                <p>
                  We understand that information submitted to an
                  online platform can be personal and important.
                  Our goal is to handle information responsibly,
                  transparently, and only for legitimate purposes
                  connected with operating and improving
                  ForeverMeet.
                </p>

                <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <p className="text-sm font-black text-gray-900">
                    Our privacy approach
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <PrivacyPrinciple
                      title="Transparency"
                      description="We explain what information we collect and why."
                    />

                    <PrivacyPrinciple
                      title="Security"
                      description="We use reasonable safeguards to protect information."
                    />

                    <PrivacyPrinciple
                      title="Control"
                      description="We provide ways to manage your information."
                    />
                  </div>
                </div>
              </PolicySection>

              {/* =================================================
                  INFORMATION
              ================================================= */}

              <PolicySection
                id="information"
                number="02"
                title="Information We Collect"
              >
                <p>
                  Depending on how you use ForeverMeet, we may
                  collect different categories of information.
                </p>

                <InfoGroup
                  title="Information you provide"
                  items={[
                    "Name and profile information",
                    "Email address",
                    "Phone number and WhatsApp number when provided",
                    "City, state, and other location information",
                    "Profile descriptions, biographies, and professional information",
                    "Profile photographs and other uploaded media",
                    "Languages, skills, services, and other listing details",
                    "Information submitted when contacting our support team",
                  ]}
                />

                <InfoGroup
                  title="Account information"
                  items={[
                    "Login credentials and authentication information",
                    "Email verification information",
                    "Account preferences",
                    "Account status and security-related information",
                  ]}
                />

                <InfoGroup
                  title="Automatically collected information"
                  items={[
                    "IP address",
                    "Browser and device information",
                    "Operating system information",
                    "Pages and features accessed",
                    "Approximate usage and interaction information",
                    "Technical logs and diagnostic information",
                  ]}
                />

                <InfoGroup
                  title="Transaction information"
                  items={[
                    "Credit purchases and account transactions",
                    "Payment-related status information",
                    "Transaction identifiers and records",
                  ]}
                />

                <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <p className="text-sm font-black text-amber-900">
                    Payment information
                  </p>

                  <p className="mt-2 text-sm leading-6 text-amber-800">
                    Where payments are processed through a
                    third-party payment provider, payment card
                    details may be handled directly by that
                    provider according to its own privacy and
                    security policies. ForeverMeet may receive
                    transaction status or reference information
                    necessary to maintain your account.
                  </p>
                </div>
              </PolicySection>

              {/* =================================================
                  USAGE
              ================================================= */}

              <PolicySection
                id="usage"
                number="03"
                title="How We Use Information"
              >
                <p>
                  We use information for legitimate business,
                  operational, security, and service-related
                  purposes.
                </p>

                <InfoGroup
                  title="Providing our services"
                  items={[
                    "Create and manage user accounts",
                    "Publish and display professional listings",
                    "Provide search and discovery features",
                    "Display similar or related profiles",
                    "Process account credits and transactions",
                    "Provide customer support",
                  ]}
                />

                <InfoGroup
                  title="Safety and security"
                  items={[
                    "Verify accounts and submitted information",
                    "Detect suspicious activity",
                    "Prevent fraud and abuse",
                    "Protect our platform and users",
                    "Investigate violations of our policies",
                  ]}
                />

                <InfoGroup
                  title="Improving ForeverMeet"
                  items={[
                    "Understand how users interact with the platform",
                    "Improve website performance",
                    "Develop new features",
                    "Fix technical problems",
                    "Improve usability and reliability",
                  ]}
                />

                <InfoGroup
                  title="Communications"
                  items={[
                    "Send account-related notifications",
                    "Send verification messages",
                    "Respond to support requests",
                    "Provide important service updates",
                    "Send promotional communications where permitted",
                  ]}
                />
              </PolicySection>

              {/* =================================================
                  SHARING
              ================================================= */}

              <PolicySection
                id="sharing"
                number="04"
                title="Information Sharing"
              >
                <p>
                  We do not sell your personal information as a
                  business model. Information may be shared only
                  when reasonably necessary to provide services,
                  protect users, comply with legal obligations, or
                  operate the platform.
                </p>

                <InfoGroup
                  title="Public profile information"
                  items={[
                    "Information intentionally included in a public listing may be visible to other visitors.",
                    "Profile names, descriptions, photographs, city, professional details, and other published information may be publicly accessible.",
                    "Users should avoid publishing information they do not want publicly displayed.",
                  ]}
                />

                <InfoGroup
                  title="Service providers"
                  items={[
                    "Cloud hosting providers",
                    "Image and media storage providers",
                    "Email and communication providers",
                    "Payment processing providers",
                    "Analytics and technical service providers",
                    "Security and infrastructure providers",
                  ]}
                />

                <InfoGroup
                  title="Legal and safety requirements"
                  items={[
                    "When required by applicable law",
                    "When responding to valid legal requests",
                    "When necessary to protect users or the platform",
                    "To investigate fraud, abuse, or security incidents",
                    "To enforce our Terms and policies",
                  ]}
                />

                <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-5">
                  <p className="text-sm font-black text-red-900">
                    Important
                  </p>

                  <p className="mt-2 text-sm leading-6 text-red-800">
                    Any information that you intentionally publish
                    as part of a public profile should be considered
                    publicly accessible. Please review your listing
                    carefully before publishing it.
                  </p>
                </div>
              </PolicySection>

              {/* =================================================
                  COOKIES
              ================================================= */}

              <PolicySection
                id="cookies"
                number="05"
                title="Cookies & Similar Technologies"
              >
                <p>
                  ForeverMeet may use cookies, local storage, and
                  similar technologies to operate the website,
                  remember preferences, improve functionality, and
                  understand website usage.
                </p>

                <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200">
                  <div className="grid grid-cols-[1fr_2fr] border-b border-gray-200 bg-gray-50 px-4 py-3 text-xs font-black uppercase tracking-wider text-gray-500">
                    <span>Type</span>
                    <span>Purpose</span>
                  </div>

                  <CookieRow
                    type="Essential"
                    purpose="Required for core website functionality, authentication, security, and account access."
                  />

                  <CookieRow
                    type="Preferences"
                    purpose="Helps remember selected preferences and improve your experience."
                  />

                  <CookieRow
                    type="Analytics"
                    purpose="May help us understand traffic, performance, and how features are used."
                  />
                </div>

                <p className="mt-5">
                  You can control cookies through your browser
                  settings. Disabling certain cookies may affect
                  some website functionality.
                </p>
              </PolicySection>

              {/* =================================================
                  SECURITY
              ================================================= */}

              <PolicySection
                id="security"
                number="06"
                title="Data Security"
              >
                <p>
                  We take reasonable technical and organizational
                  measures to protect information against
                  unauthorized access, alteration, disclosure, or
                  destruction.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <SecurityCard
                    title="Account protection"
                    description="Authentication and access controls are used to help protect user accounts."
                  />

                  <SecurityCard
                    title="Encrypted connections"
                    description="Secure HTTPS connections may be used to protect information transmitted between your browser and our services."
                  />

                  <SecurityCard
                    title="Infrastructure security"
                    description="We use reputable infrastructure and service providers and apply reasonable security practices."
                  />

                  <SecurityCard
                    title="Monitoring"
                    description="Security and technical events may be monitored to identify suspicious activity and system problems."
                  />
                </div>

                <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                  <p className="text-sm font-black text-blue-950">
                    No system is completely secure
                  </p>

                  <p className="mt-2 text-sm leading-6 text-blue-800">
                    Although we work to protect information,
                    no internet transmission or electronic storage
                    system can be guaranteed to be completely
                    secure.
                  </p>
                </div>
              </PolicySection>

              {/* =================================================
                  RETENTION
              ================================================= */}

              <PolicySection
                id="retention"
                number="07"
                title="Data Retention"
              >
                <p>
                  We retain information for as long as reasonably
                  necessary to provide our services, maintain
                  accounts, satisfy legal or regulatory
                  requirements, resolve disputes, prevent abuse,
                  and enforce our agreements.
                </p>

                <p>
                  When information is no longer required for a
                  legitimate purpose, we may delete, anonymize, or
                  securely dispose of it in accordance with our
                  operational practices.
                </p>

                <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <p className="text-sm font-black text-gray-900">
                    Account deletion
                  </p>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    If you request deletion of your account, some
                    information may need to be retained where
                    required for legal, security, fraud prevention,
                    accounting, or legitimate business purposes.
                  </p>
                </div>
              </PolicySection>

              {/* =================================================
                  RIGHTS
              ================================================= */}

              <PolicySection
                id="rights"
                number="08"
                title="Your Privacy Rights"
              >
                <p>
                  Depending on applicable law and your location,
                  you may have rights regarding the personal
                  information associated with your account.
                </p>

                <InfoGroup
                  title="Possible privacy rights"
                  items={[
                    "Request access to personal information we hold about you",
                    "Request correction of inaccurate information",
                    "Request deletion of certain information",
                    "Request information about how your data is used",
                    "Object to or restrict certain processing where applicable",
                    "Withdraw consent where processing is based on consent",
                    "Request a copy of certain information in a portable format where applicable",
                  ]}
                />

                <p>
                  To exercise a privacy right, please contact us
                  using the contact information provided at the
                  end of this policy. We may need to verify your
                  identity before processing certain requests.
                </p>

                <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5">
                  <p className="text-sm font-black text-green-900">
                    We aim to respond responsibly
                  </p>

                  <p className="mt-2 text-sm leading-6 text-green-800">
                    Privacy requests are reviewed according to
                    applicable legal requirements and our ability
                    to verify the request securely.
                  </p>
                </div>
              </PolicySection>

              {/* =================================================
                  CHILDREN
              ================================================= */}

              <PolicySection
                id="children"
                number="09"
                title="Children's Privacy"
              >
                <p>
                  ForeverMeet is intended for adults and
                  professional users. Our platform is not designed
                  for children.
                </p>

                <p>
                  We do not knowingly request or intentionally
                  collect personal information from children
                  through features intended for adult users.
                </p>

                <p>
                  If you believe a child has provided personal
                  information to us, please contact our team so
                  that we can review the situation and take
                  appropriate action.
                </p>
              </PolicySection>

              {/* =================================================
                  CHANGES
              ================================================= */}

              <PolicySection
                id="changes"
                number="10"
                title="Changes to This Privacy Policy"
              >
                <p>
                  We may update this Privacy Policy from time to
                  time to reflect changes in our services,
                  technology, legal requirements, or privacy
                  practices.
                </p>

                <p>
                  When changes are made, the updated version will
                  be published on this page along with a revised
                  "Last updated" date.
                </p>

                <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <p className="text-sm font-black text-gray-900">
                    We recommend checking this page periodically
                  </p>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Your continued use of ForeverMeet after an
                    updated policy becomes effective may be subject
                    to the revised policy, to the extent permitted
                    by applicable law.
                  </p>
                </div>
              </PolicySection>

              {/* =================================================
                  CONTACT
              ================================================= */}

              <PolicySection
                id="contact"
                number="11"
                title="Contact Us"
              >
                <p>
                  If you have questions, concerns, or requests
                  regarding this Privacy Policy or the handling of
                  your personal information, please contact the
                  ForeverMeet team.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <ContactCard
                    icon="@"
                    title="Email"
                    value="privacy@forevermeet.com"
                    href="mailto:privacy@forevermeet.com"
                  />

                  <ContactCard
                    icon="?"
                    title="Support"
                    value="Contact our support team"
                    href="/contact"
                  />
                </div>

                <div className="mt-6 rounded-2xl bg-gray-950 p-6 text-white">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-gray-500">
                    ForeverMeet
                  </p>

                  <h3 className="mt-2 text-xl font-black">
                    We value your trust.
                  </h3>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
                    Protecting personal information is an ongoing
                    responsibility. We are committed to improving
                    the security, transparency, and reliability of
                    our platform.
                  </p>
                </div>
              </PolicySection>

              {/* =================================================
                  RELATED LINKS
              ================================================= */}

              <div className="mt-10 border-t border-gray-200 pt-8">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-gray-400">
                  Related information
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    to="/terms"
                    className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-black text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    Terms & Conditions
                  </Link>

                  <Link
                    to="/contact"
                    className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-black text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    Contact Support
                  </Link>

                  <Link
                    to="/"
                    className="rounded-xl bg-gray-950 px-4 py-3 text-sm font-black text-white transition hover:bg-red-600"
                  >
                    Back to ForeverMeet
                  </Link>
                </div>
              </div>

              {/* Disclaimer */}

              <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <p className="text-xs leading-5 text-gray-500">
                  <strong className="font-black text-gray-700">
                    Important:
                  </strong>{" "}
                  This Privacy Policy is a general website
                  privacy-policy template for ForeverMeet and
                  should be reviewed and adapted to your actual
                  business operations, data-processing practices,
                  service providers, and applicable laws before
                  being used as a final legal document.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* =====================================================
          FOOTER CTA
      ===================================================== */}

      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 rounded-3xl bg-red-600 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-red-100">
                Need assistance?
              </p>

              <h2 className="mt-2 text-2xl font-black text-white">
                Have a privacy-related question?
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-red-100">
                Our support team can help you understand account,
                privacy, and information-related questions.
              </p>
            </div>

            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-5 py-3.5 text-sm font-black text-red-600 shadow-lg transition hover:bg-gray-950 hover:text-white"
            >
              Contact Us
              <span className="ml-2">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   POLICY SECTION
============================================================ */

function PolicySection({
  id,
  number,
  title,
  children,
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-b border-gray-100 py-8 first:pt-2 last:border-b-0 sm:py-10"
    >
      <div className="flex items-start gap-4">
        <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-xs font-black text-white sm:flex">
          {number}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 sm:hidden">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-950 text-[10px] font-black text-white">
              {number}
            </span>

            <span className="h-px flex-1 bg-gray-100" />
          </div>

          <h2 className="mt-3 text-2xl font-black tracking-tight text-gray-950 sm:mt-0 sm:text-3xl">
            {title}
          </h2>

          <div className="mt-2 h-1 w-10 rounded-full bg-red-600" />

          <div className="mt-6 space-y-5 text-sm leading-7 text-gray-600 sm:text-[15px]">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PRIVACY PRINCIPLE
============================================================ */

function PrivacyPrinciple({
  title,
  description,
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="text-sm font-black text-gray-900">
        {title}
      </p>

      <p className="mt-1.5 text-xs leading-5 text-gray-500">
        {description}
      </p>
    </div>
  );
}

/* ============================================================
   INFO GROUP
============================================================ */

function InfoGroup({ title, items }) {
  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white">
      <div className="border-b border-gray-100 bg-gray-50 px-5 py-4">
        <h3 className="text-sm font-black text-gray-950">
          {title}
        </h3>
      </div>

      <div className="p-5">
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm leading-6 text-gray-600"
            >
              <span className="mt-2 flex h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />

              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ============================================================
   COOKIE ROW
============================================================ */

function CookieRow({ type, purpose }) {
  return (
    <div className="grid grid-cols-[1fr_2fr] border-b border-gray-100 px-4 py-4 last:border-b-0">
      <div className="text-sm font-black text-gray-900">
        {type}
      </div>

      <div className="text-sm leading-6 text-gray-600">
        {purpose}
      </div>
    </div>
  );
}

/* ============================================================
   SECURITY CARD
============================================================ */

function SecurityCard({
  title,
  description,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-sm font-black text-green-600">
        ✓
      </div>

      <h3 className="mt-4 text-sm font-black text-gray-950">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        {description}
      </p>
    </div>
  );
}

/* ============================================================
   CONTACT CARD
============================================================ */

function ContactCard({
  icon,
  title,
  value,
  href,
}) {
  return (
    <a
      href={href}
      className="group rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-sm font-black text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-bold text-gray-400">
            {title}
          </p>

          <p className="mt-1 truncate text-sm font-black text-gray-900 group-hover:text-red-600">
            {value}
          </p>
        </div>
      </div>
    </a>
  );
}

export default PrivacyPolicy;