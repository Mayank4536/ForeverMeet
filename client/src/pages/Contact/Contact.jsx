import { useState } from "react";
import { Link } from "react-router-dom";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    // Frontend demo submission.
    // Connect this to your backend API later.
    await new Promise((resolve) => {
      setTimeout(resolve, 900);
    });

    setIsSubmitting(false);
    setIsSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="min-h-screen bg-[#f6f7f9] text-gray-900">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden border-b border-gray-200 bg-white">

        {/* Decorative background */}

        <div className="pointer-events-none absolute -left-32 -top-40 h-[420px] w-[420px] rounded-full bg-red-100/70 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 top-20 h-[380px] w-[380px] rounded-full bg-gray-100 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8 lg:pb-24">

          {/* Breadcrumb */}

          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
            <Link
              to="/"
              className="cursor-pointer transition hover:text-red-600"
            >
              Home
            </Link>

            <span>/</span>

            <span className="font-bold text-gray-700">
              Contact
            </span>
          </div>

          <div className="mt-12 grid items-end gap-10 lg:grid-cols-[1fr_auto]">

            <div className="max-w-3xl">

              <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3.5 py-2">
                <span className="flex h-2 w-2 rounded-full bg-red-600" />

                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-red-600">
                  Contact ForeverMeet
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-[-0.04em] text-gray-950 sm:text-5xl lg:text-6xl">
                We're here to{" "}
                <span className="text-red-600">
                  help.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
                Have a question about your account, profile, verification,
                listings or the ForeverMeet platform? Send us a message and
                our support team will help you find the right answer.
              </p>

            </div>

            {/* Response card */}

            <div className="hidden rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm sm:block lg:w-72">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                  <span className="text-lg">
                    ✓
                  </span>
                </div>

                <div>
                  <p className="text-sm font-black text-gray-950">
                    Support available
                  </p>

                  <p className="mt-0.5 text-xs font-medium text-gray-500">
                    Monday – Saturday
                  </p>
                </div>

              </div>

              <div className="mt-4 border-t border-gray-200 pt-4">

                <p className="text-xs font-bold leading-5 text-gray-500">
                  We aim to respond to support enquiries as soon as
                  possible.
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT OPTIONS
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

        <div className="grid gap-4 md:grid-cols-3">

          <ContactCard
            icon="✉"
            eyebrow="Email support"
            title="support@forevermeet.com"
            description="For account questions, profile assistance and general support."
            href="mailto:support@forevermeet.com"
          />

          <ContactCard
            icon="☎"
            eyebrow="Phone support"
            title="+91 99999 99999"
            description="For urgent account and platform-related assistance."
            href="tel:+919999999999"
          />

          <ContactCard
            icon="◉"
            eyebrow="Operating region"
            title="India"
            description="ForeverMeet is built for professional profiles and businesses across India."
          />

        </div>
      </section>

      {/* =====================================================
          MAIN CONTACT AREA
      ====================================================== */}

      <section
        id="contact-form"
        className="scroll-mt-24 mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24"
      >

        <div className="grid overflow-hidden rounded-[30px] border border-gray-200 bg-white shadow-sm lg:grid-cols-[0.72fr_1.28fr]">

          {/* =================================================
              LEFT PANEL
          ================================================== */}

          <div className="relative overflow-hidden bg-gray-950 p-7 text-white sm:p-9 lg:p-10">

            {/* Decorative circles */}

            <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-red-600/10 blur-3xl" />

            <div className="relative">

              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-red-500">
                Get in touch
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                Tell us what
                <br />
                you need.
              </h2>

              <p className="mt-5 text-sm leading-7 text-gray-400">
                Our support team can help with account questions,
                listings, verification, technical problems and general
                platform enquiries.
              </p>

              {/* Support topics */}

              <div className="mt-9 space-y-6">

                <SupportItem
                  number="01"
                  title="Account & access"
                  text="Help with registration, login, account settings or password issues."
                />

                <SupportItem
                  number="02"
                  title="Profile & listings"
                  text="Questions about creating, editing or managing your professional profile."
                />

                <SupportItem
                  number="03"
                  title="Verification"
                  text="Need assistance with profile verification or account information?"
                />

                <SupportItem
                  number="04"
                  title="Technical support"
                  text="Report a problem or something that isn't working correctly."
                />

              </div>

              {/* Contact details */}

              <div className="mt-10 border-t border-white/10 pt-7">

                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-500">
                  Support email
                </p>

                <a
                  href="mailto:support@forevermeet.com"
                  className="mt-2 inline-block cursor-pointer text-sm font-bold text-white transition hover:text-red-400"
                >
                  support@forevermeet.com
                </a>

              </div>

            </div>
          </div>

          {/* =================================================
              FORM
          ================================================== */}

          <div className="p-6 sm:p-9 lg:p-10">

            <div className="max-w-2xl">

              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
                Send an enquiry
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
                How can we help?
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Please provide a few details so our team can understand
                your request.
              </p>

            </div>

            {/* Success */}

            {isSubmitted && (
              <div className="mt-7 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-black text-white">
                  ✓
                </div>

                <div>
                  <p className="text-sm font-black text-green-800">
                    Thank you for contacting us.
                  </p>

                  <p className="mt-1 text-xs leading-5 text-green-700">
                    Your message has been received. Our team will
                    review your enquiry and get back to you.
                  </p>
                </div>

              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* Name / Email */}

              <div className="grid gap-5 sm:grid-cols-2">

                <InputField
                  label="Full name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />

                <InputField
                  label="Email address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />

              </div>

              {/* Subject */}

              <div>

                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-black text-gray-800"
                >
                  Enquiry type
                </label>

                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-semibold text-gray-800 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                >
                  <option value="">
                    Select an option
                  </option>

                  <option value="account">
                    Account & login
                  </option>

                  <option value="profile">
                    Profile / listing
                  </option>

                  <option value="verification">
                    Verification
                  </option>

                  <option value="technical">
                    Technical problem
                  </option>

                  <option value="business">
                    Business enquiry
                  </option>

                  <option value="other">
                    Something else
                  </option>
                </select>

              </div>

              {/* Message */}

              <div>

                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-black text-gray-800"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={7}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Please describe your question or issue..."
                  className="w-full cursor-text resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-medium leading-6 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                />

                <p className="mt-2 text-right text-[11px] font-medium text-gray-400">
                  Please don't include passwords or sensitive account information.
                </p>

              </div>

              {/* Submit */}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`group flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 text-sm font-black text-white shadow-lg transition duration-300 ${
                  isSubmitting
                    ? "cursor-not-allowed bg-gray-400"
                    : "cursor-pointer bg-gray-950 hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-red-600/20"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                    Sending...
                  </>
                ) : (
                  <>
                    Send message

                    <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}
              </button>

              <p className="text-center text-xs leading-5 text-gray-400">
                We respect your privacy and only use your information
                to respond to your enquiry.
              </p>

            </form>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY CONTACT US
      ====================================================== */}

      <section className="border-y border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">

            <div>

              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
                Support you can rely on
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
                A better way to get help.
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-gray-500">
                We want contacting ForeverMeet to be simple, clear and
                straightforward. Choose the option that works best for you.
              </p>

            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              <FeatureCard
                icon="01"
                title="Clear communication"
                text="Tell us exactly what you need and we'll help guide you in the right direction."
              />

              <FeatureCard
                icon="02"
                title="Account assistance"
                text="Get help with common account, profile and listing-related questions."
              />

              <FeatureCard
                icon="03"
                title="Professional support"
                text="Our platform is designed around professional profiles and businesses."
              />

              <FeatureCard
                icon="04"
                title="Privacy focused"
                text="Avoid sharing passwords or sensitive information when contacting support."
              />

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ====================================================== */}

      <section className="bg-[#f6f7f9]">

        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-20">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
              Before you contact us
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
              Frequently asked questions
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              You may find the answer you're looking for here.
            </p>

          </div>

          <div className="mt-10 space-y-3">

            <FaqItem
              question="How do I create a ForeverMeet profile?"
              answer="Create your account first and then follow the profile creation process to add your professional information and listing details."
            />

            <FaqItem
              question="Can I edit my profile after publishing it?"
              answer="Yes. Your profile information can be updated when changes are required. Keep your information accurate and up to date."
            />

            <FaqItem
              question="What should I do if I cannot access my account?"
              answer="First try the password recovery process. If you're still unable to access your account, contact our support team using the form above."
            />

            <FaqItem
              question="How can I report a technical problem?"
              answer="Select 'Technical problem' from the enquiry type and describe what happened. Screenshots or relevant details can help our team investigate."
            />

            <FaqItem
              question="Can I contact ForeverMeet about a business enquiry?"
              answer="Yes. Select 'Business enquiry' from the contact form and provide some information about your proposal."
            />

          </div>

        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="bg-gray-950">

        <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-xl text-white shadow-lg shadow-red-600/20">
            ?
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Still need help?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-400">
            Don't worry. Send us your question and we'll do our best
            to point you in the right direction.
          </p>

          <a
            href="#contact-form"
            className="mt-7 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-black text-white transition duration-300 hover:-translate-y-0.5 hover:bg-red-700"
          >
            Contact support

            <span>
              →
            </span>
          </a>

        </div>
      </section>

    </main>
  );
}

/* ============================================================
   CONTACT CARD
============================================================ */

function ContactCard({
  icon,
  eyebrow,
  title,
  description,
  href,
}) {
  const content = (
    <>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-lg text-red-600 transition duration-300 group-hover:bg-red-600 group-hover:text-white">
        {icon}
      </div>

      <p className="mt-5 text-[10px] font-black uppercase tracking-[0.16em] text-gray-400">
        {eyebrow}
      </p>

      <h3 className="mt-2 break-words text-lg font-black text-gray-950">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        {description}
      </p>

      {href && (
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-black text-red-600">
          Contact now
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="group cursor-pointer rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">
      {content}
    </div>
  );
}

/* ============================================================
   SUPPORT ITEM
============================================================ */

function SupportItem({
  number,
  title,
  text,
}) {
  return (
    <div className="flex gap-4">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[10px] font-black text-red-500">
        {number}
      </div>

      <div>
        <h3 className="text-sm font-black text-white">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-gray-500">
          {text}
        </p>
      </div>

    </div>
  );
}

/* ============================================================
   INPUT FIELD
============================================================ */

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="mb-2 block text-sm font-black text-gray-800"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={name}
        className="w-full cursor-text rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
      />

    </div>
  );
}

/* ============================================================
   FEATURE CARD
============================================================ */

function FeatureCard({
  icon,
  title,
  text,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 transition duration-300 hover:border-red-200 hover:bg-white hover:shadow-md">

      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[10px] font-black text-red-600 shadow-sm">
        {icon}
      </div>

      <h3 className="mt-4 text-sm font-black text-gray-950">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-gray-500">
        {text}
      </p>

    </div>
  );
}

/* ============================================================
   FAQ
============================================================ */

function FaqItem({
  question,
  answer,
}) {
  return (
    <details className="group rounded-2xl border border-gray-200 bg-white transition duration-300 hover:border-red-200">

      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-5 sm:p-6">

        <span className="text-sm font-black leading-6 text-gray-900">
          {question}
        </span>

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition duration-300 group-open:rotate-45 group-open:bg-red-600 group-open:text-white">
          +
        </span>

      </summary>

      <div className="px-5 pb-5 sm:px-6 sm:pb-6">

        <div className="border-t border-gray-100 pt-4">

          <p className="text-sm leading-6 text-gray-500">
            {answer}
          </p>

        </div>

      </div>

    </details>
  );
}

export default Contact;