import { useState } from "react";
import { Link } from "react-router-dom";

function Disclaimer() {
  const [activeSection, setActiveSection] = useState("general");

  const sections = [
    {
      id: "general",
      number: "01",
      title: "General Disclaimer",
    },
    {
      id: "platform",
      number: "02",
      title: "Platform Purpose",
    },
    {
      id: "user-content",
      number: "03",
      title: "User-Submitted Content",
    },
    {
      id: "accuracy",
      number: "04",
      title: "Information Accuracy",
    },
    {
      id: "third-party",
      number: "05",
      title: "Third-Party Services",
    },
    {
      id: "availability",
      number: "06",
      title: "Website Availability",
    },
    {
      id: "external-links",
      number: "07",
      title: "External Links",
    },
    {
      id: "liability",
      number: "08",
      title: "Limitation of Liability",
    },
    {
      id: "changes",
      number: "09",
      title: "Changes to Disclaimer",
    },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f7f8] text-gray-900">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-gray-200 bg-white">
        {/* Background decoration */}

        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-50 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-gray-100 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          {/* Breadcrumb */}

          <div className="mb-8 flex items-center gap-2 text-sm font-semibold text-gray-500">
            <Link
              to="/"
              className="cursor-pointer transition-colors hover:text-red-600"
            >
              Home
            </Link>

            <span className="text-gray-300">/</span>

            <span className="text-gray-900">
              Disclaimer
            </span>
          </div>

          <div className="grid items-end gap-10 lg:grid-cols-[1fr_360px]">
            {/* Heading */}

            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-red-600">
                <span className="h-2 w-2 rounded-full bg-red-600" />

                Legal Information
              </div>

              <h1 className="max-w-4xl text-4xl font-black tracking-[-0.04em] text-gray-950 sm:text-5xl lg:text-6xl">
                Disclaimer
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-gray-600 sm:text-lg">
                Important information about the use of ForeverMeet,
                our platform, user-submitted content, and the
                limitations that apply when using our services.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm font-semibold text-gray-500">
                <span className="rounded-full bg-gray-100 px-4 py-2">
                  Last updated: August 2026
                </span>

                <span className="rounded-full bg-gray-100 px-4 py-2">
                  Version 1.0
                </span>
              </div>
            </div>

            {/* Notice Card */}

            <div className="rounded-3xl border border-gray-200 bg-gray-950 p-6 text-white shadow-xl shadow-gray-200/50">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-600 text-lg font-black">
                  !
                </div>

                <div>
                  <p className="text-sm font-black">
                    Please read carefully
                  </p>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    By accessing or using ForeverMeet, you
                    acknowledge that you have read and understood
                    this disclaimer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[270px_1fr]">
          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="px-3 pb-4 pt-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  On this page
                </p>

                <p className="mt-1 text-sm font-bold text-gray-900">
                  Disclaimer sections
                </p>
              </div>

              <nav className="space-y-1">
                {sections.map((section) => {
                  const isActive =
                    activeSection === section.id;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() =>
                        scrollToSection(section.id)
                      }
                      className={`group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 ${
                        isActive
                          ? "bg-red-50 text-red-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
                      }`}
                    >
                      <span
                        className={`text-[10px] font-black ${
                          isActive
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      >
                        {section.number}
                      </span>

                      <span className="text-xs font-bold leading-5">
                        {section.title}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Contact */}

              <div className="mt-5 border-t border-gray-100 pt-5">
                <Link
                  to="/contact"
                  className="flex cursor-pointer items-center justify-between rounded-xl bg-gray-50 px-4 py-3 text-xs font-black text-gray-800 transition hover:bg-gray-950 hover:text-white"
                >
                  <span>Questions?</span>

                  <span>→</span>
                </Link>
              </div>
            </div>
          </aside>

          {/* =================================================
              CONTENT
          ================================================= */}

          <article className="min-w-0">
            {/* INTRO */}

            <div className="mb-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="flex items-start gap-4">
                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-950 text-white sm:flex">
                  <span className="text-lg font-black">
                    FM
                  </span>
                </div>

                <div>
                  <p className="text-sm font-black uppercase tracking-wider text-red-600">
                    Important notice
                  </p>

                  <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                    This Disclaimer explains the general limitations
                    and responsibilities associated with using the
                    ForeverMeet website and services. Please read it
                    together with our Privacy Policy and Terms &
                    Conditions.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      to="/privacy-policy"
                      className="cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-black text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                      Privacy Policy
                    </Link>

                    <Link
                      to="/terms"
                      className="cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-black text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                      Terms & Conditions
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 01 */}

            <LegalSection
              id="general"
              number="01"
              title="General Disclaimer"
            >
              <p>
                The information and services provided through
                ForeverMeet are made available on an "as is" and
                "as available" basis. While we aim to provide a
                reliable and useful platform, we do not guarantee
                that every part of the website will always be
                complete, accurate, current, uninterrupted, or
                error-free.
              </p>

              <p>
                Your use of ForeverMeet is voluntary and at your
                own discretion. You are responsible for evaluating
                information and making appropriate decisions based
                on your individual circumstances.
              </p>
            </LegalSection>

            {/* SECTION 02 */}

            <LegalSection
              id="platform"
              number="02"
              title="Platform Purpose"
            >
              <p>
                ForeverMeet is an online platform designed to help
                users discover, promote, and connect with
                professional modelling profiles and related
                promotional listings.
              </p>

              <p>
                ForeverMeet acts as a platform provider and does
                not necessarily create, independently verify, or
                endorse every profile, statement, image, service,
                or other piece of information published by users.
              </p>

              <div className="my-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <p className="text-xs font-black uppercase tracking-wider text-blue-700">
                  Platform notice
                </p>

                <p className="mt-2 text-sm leading-6 text-blue-900">
                  A profile appearing on ForeverMeet should not
                  automatically be interpreted as an endorsement,
                  recommendation, certification, or guarantee by
                  ForeverMeet.
                </p>
              </div>
            </LegalSection>

            {/* SECTION 03 */}

            <LegalSection
              id="user-content"
              number="03"
              title="User-Submitted Content"
            >
              <p>
                Users may submit profile information, descriptions,
                photographs, contact information, promotional
                material, and other content to the platform.
              </p>

              <p>
                Users are responsible for ensuring that the content
                they submit is truthful, lawful, appropriate, and
                does not infringe the rights of another person or
                organization.
              </p>

              <p>
                ForeverMeet does not guarantee the accuracy,
                authenticity, completeness, or reliability of
                user-submitted information.
              </p>

              <ul>
                <li>
                  Users should independently evaluate profiles
                  before relying on information provided by them.
                </li>

                <li>
                  Users should avoid sharing sensitive personal
                  information unnecessarily.
                </li>

                <li>
                  Users should report suspicious, misleading, or
                  inappropriate content to ForeverMeet.
                </li>
              </ul>
            </LegalSection>

            {/* SECTION 04 */}

            <LegalSection
              id="accuracy"
              number="04"
              title="Information Accuracy"
            >
              <p>
                We make reasonable efforts to maintain useful and
                accurate information on the platform. However,
                information may occasionally become outdated,
                incomplete, or inaccurate.
              </p>

              <p>
                Profile information such as age, location, height,
                professional experience, services, photographs,
                availability, contact information, or other
                attributes may be supplied or updated by users.
              </p>

              <p>
                ForeverMeet does not represent or warrant that all
                such information is accurate or continuously
                updated.
              </p>
            </LegalSection>

            {/* SECTION 05 */}

            <LegalSection
              id="third-party"
              number="05"
              title="Third-Party Services"
            >
              <p>
                Certain functionality of ForeverMeet may rely on
                third-party services, technologies, payment
                providers, communication services, hosting
                providers, analytics tools, or other external
                platforms.
              </p>

              <p>
                Third-party services operate according to their own
                terms, policies, and practices. ForeverMeet is not
                responsible for the independent operation,
                availability, security, or policies of third-party
                services.
              </p>
            </LegalSection>

            {/* SECTION 06 */}

            <LegalSection
              id="availability"
              number="06"
              title="Website Availability"
            >
              <p>
                We work to keep ForeverMeet available and
                operational, but we cannot guarantee uninterrupted
                access to the website or every feature.
              </p>

              <p>
                Temporary interruptions may occur because of
                maintenance, upgrades, technical problems,
                infrastructure failures, network issues, security
                events, or circumstances outside our reasonable
                control.
              </p>

              <div className="my-6 rounded-2xl border border-amber-100 bg-amber-50 p-5">
                <p className="text-xs font-black uppercase tracking-wider text-amber-700">
                  Availability notice
                </p>

                <p className="mt-2 text-sm leading-6 text-amber-900">
                  We do not guarantee that ForeverMeet will be
                  available at every time or from every device,
                  network, or geographical location.
                </p>
              </div>
            </LegalSection>

            {/* SECTION 07 */}

            <LegalSection
              id="external-links"
              number="07"
              title="External Links"
            >
              <p>
                ForeverMeet may contain links to external websites,
                applications, social platforms, or other third-party
                resources.
              </p>

              <p>
                These links may be provided for convenience or
                informational purposes. We do not control the
                content, security, availability, or privacy
                practices of external websites.
              </p>

              <p>
                Accessing external websites is at your own risk,
                and you should review their applicable policies
                before providing personal information or using
                their services.
              </p>
            </LegalSection>

            {/* SECTION 08 */}

            <LegalSection
              id="liability"
              number="08"
              title="Limitation of Liability"
            >
              <p>
                To the maximum extent permitted by applicable law,
                ForeverMeet and its owners, operators, employees,
                representatives, and service providers will not be
                responsible for losses or damages arising from or
                related to your use of the platform, reliance on
                user-submitted information, interactions with other
                users, or access to third-party services.
              </p>

              <p>
                This includes, where legally permitted, direct,
                indirect, incidental, consequential, or other
                losses resulting from the use or inability to use
                the platform.
              </p>

              <p>
                Nothing in this Disclaimer is intended to exclude or
                limit liability where such exclusion or limitation
                is prohibited by applicable law.
              </p>
            </LegalSection>

            {/* SECTION 09 */}

            <LegalSection
              id="changes"
              number="09"
              title="Changes to This Disclaimer"
            >
              <p>
                We may update or modify this Disclaimer from time
                to time to reflect changes to our services,
                platform features, operational practices, or
                applicable legal requirements.
              </p>

              <p>
                When changes are made, the updated version will be
                published on this page together with the applicable
                "Last Updated" date.
              </p>

              <p>
                Your continued use of ForeverMeet after an updated
                Disclaimer becomes available may constitute
                acknowledgement of the updated terms, to the extent
                permitted by applicable law.
              </p>
            </LegalSection>

            {/* =================================================
                REPORT CONTENT
            ================================================= */}

            <section className="mt-8 rounded-3xl border border-red-100 bg-red-50 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-600 text-white">
                  <span className="font-black">
                    !
                  </span>
                </div>

                <div>
                  <h2 className="text-lg font-black text-gray-950">
                    See something that needs attention?
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    If you believe a profile, image, listing, or
                    other content violates our policies or appears
                    misleading, please contact our team so that it
                    can be reviewed.
                  </p>

                  <Link
                    to="/contact"
                    className="mt-5 inline-flex cursor-pointer items-center rounded-xl bg-gray-950 px-5 py-3 text-sm font-black text-white transition hover:bg-red-600"
                  >
                    Contact ForeverMeet
                    <span className="ml-2">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </section>

            {/* =================================================
                FOOTER LEGAL LINKS
            ================================================= */}

            <div className="mt-10 border-t border-gray-200 pt-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-black text-gray-950">
                    ForeverMeet Legal
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Please review our policies before using the
                    platform.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    to="/privacy-policy"
                    className="cursor-pointer rounded-lg px-3 py-2 text-xs font-bold text-gray-500 transition hover:bg-gray-100 hover:text-gray-950"
                  >
                    Privacy
                  </Link>

                  <Link
                    to="/terms"
                    className="cursor-pointer rounded-lg px-3 py-2 text-xs font-bold text-gray-500 transition hover:bg-gray-100 hover:text-gray-950"
                  >
                    Terms
                  </Link>

                  <Link
                    to="/disclaimer"
                    className="cursor-pointer rounded-lg bg-gray-100 px-3 py-2 text-xs font-bold text-gray-950"
                  >
                    Disclaimer
                  </Link>

                  <Link
                    to="/contact"
                    className="cursor-pointer rounded-lg px-3 py-2 text-xs font-bold text-gray-500 transition hover:bg-gray-100 hover:text-gray-950"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   LEGAL SECTION COMPONENT
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
      className="mb-6 scroll-mt-24 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10"
    >
      <div className="flex gap-5">
        {/* Number */}

        <div className="hidden shrink-0 sm:block">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-950 text-xs font-black text-white">
            {number}
          </div>
        </div>

        {/* Content */}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black text-red-600 sm:hidden">
              {number}
            </span>

            <h2 className="text-xl font-black tracking-tight text-gray-950 sm:text-2xl">
              {title}
            </h2>
          </div>

          <div className="mt-5 space-y-5 text-sm leading-7 text-gray-600 sm:text-[15px]">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Disclaimer;