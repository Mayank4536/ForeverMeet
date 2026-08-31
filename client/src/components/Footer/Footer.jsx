import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaArrowRight,
  FaChevronRight,
  FaCheck,
  FaBullhorn,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  const popularCities = [
    { name: "Pune", slug: "pune" },
    { name: "Mumbai", slug: "mumbai" },
    { name: "Bangalore", slug: "bangalore" },
    { name: "Hyderabad", slug: "hyderabad" },
    { name: "Delhi", slug: "delhi" },
    { name: "Kolkata", slug: "kolkata" },
    { name: "Ranchi", slug: "ranchi" },
    { name: "Bhopal", slug: "bhopal" },
    { name: "Surat", slug: "surat" },
  ];

  const categories = [
    { name: "Models", slug: "models" },
    { name: "Fashion Models", slug: "fashion-models" },
    { name: "Photographers", slug: "photographers" },
    { name: "Makeup Artists", slug: "makeup-artists" },
    { name: "Fitness Models", slug: "fitness-models" },
    { name: "Influencers", slug: "influencers" },
  ];

  const platformLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Browse Models",
      path: "/listings",
    },
    {
      name: "Browse Cities",
      path: "/cities",
    },
    {
      name: "Post Your Profile",
      path: "/create-listing",
    },
    {
      name: "About ForeverMeet",
      path: "/about",
    },
    {
      name: "Contact Us",
      path: "/contact",
    },
  ];

  const supportLinks = [
    {
      name: "Help Center",
      path: "/help",
    },
    {
      name: "Safety Guidelines",
      path: "/safety",
    },
    {
      name: "Frequently Asked Questions",
      path: "/faq",
    },
    {
      name: "Report a Profile",
      path: "/report",
    },
    {
      name: "Privacy Policy",
      path: "/privacy-policy",
    },
    {
      name: "Terms & Conditions",
      path: "/terms",
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: FaFacebookF,
      href: "#",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      href: "#",
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      href: "#",
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      href: "#",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      href: "#",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#070b14] text-slate-300">
      {/* =========================================================
          BACKGROUND DECORATION
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            -left-40
            top-20
            h-80
            w-80
            rounded-full
            bg-pink-600/10
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            -right-40
            top-[420px]
            h-96
            w-96
            rounded-full
            bg-purple-600/10
            blur-[140px]
          "
        />
      </div>

      {/* =========================================================
          MAIN FOOTER
      ========================================================= */}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="
            grid
            grid-cols-1
            gap-12
            py-14
            sm:grid-cols-2
            lg:grid-cols-12
            lg:gap-10
            lg:py-16
          "
        >
          {/* =====================================================
              BRAND
          ===================================================== */}

          <div className="sm:col-span-2 lg:col-span-4">
            <Link
              to="/"
              className="
                group
                inline-flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  relative
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-2xl
                  bg-gradient-to-br
                  from-pink-500
                  via-rose-500
                  to-purple-600
                  shadow-lg
                  shadow-pink-500/20
                  transition-all
                  duration-300
                  group-hover:scale-105
                  group-hover:shadow-pink-500/30
                "
              >
                <span className="absolute inset-0 bg-white/10" />

                <span className="relative text-xl font-black text-white">
                  F
                </span>
              </div>

              <div>
                <h2
                  className="
                    text-2xl
                    font-black
                    tracking-tight
                    text-white
                  "
                >
                  Forever<span className="text-pink-500">Meet</span>
                </h2>

                <p
                  className="
                    mt-0.5
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.24em]
                    text-slate-500
                  "
                >
                  Professional Model Directory
                </p>
              </div>
            </Link>

            {/* DESCRIPTION */}

            <p
              className="
                mt-6
                max-w-md
                text-sm
                leading-7
                text-slate-400
              "
            >
              ForeverMeet is a professional model directory platform
              designed to help discover modelling talent, creative
              professionals and promotional profiles across cities
              in India.
            </p>

            {/* STATS */}

            <div
              className="
                mt-7
                grid
                max-w-md
                grid-cols-3
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.025]
              "
            >
              <div
                className="
                  border-r
                  border-white/[0.08]
                  px-3
                  py-4
                  text-center
                "
              >
                <p className="text-lg font-black text-white">
                  9+
                </p>

                <p
                  className="
                    mt-1
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-wide
                    text-slate-500
                  "
                >
                  Cities
                </p>
              </div>

              <div
                className="
                  border-r
                  border-white/[0.08]
                  px-3
                  py-4
                  text-center
                "
              >
                <p className="text-lg font-black text-white">
                  24/7
                </p>

                <p
                  className="
                    mt-1
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-wide
                    text-slate-500
                  "
                >
                  Access
                </p>
              </div>

              <div className="px-3 py-4 text-center">
                <p className="text-lg font-black text-white">
                  India
                </p>

                <p
                  className="
                    mt-1
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-wide
                    text-slate-500
                  "
                >
                  Platform
                </p>
              </div>
            </div>

            {/* SOCIAL */}

            <div className="mt-7">
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-slate-500
                "
              >
                Follow ForeverMeet
              </p>

              <div className="mt-3 flex gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      aria-label={social.name}
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/[0.08]
                        bg-white/[0.025]
                        text-slate-400
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-pink-500/50
                        hover:bg-pink-500
                        hover:text-white
                        hover:shadow-lg
                        hover:shadow-pink-500/20
                      "
                    >
                      <Icon className="text-sm" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* =====================================================
              PLATFORM
          ===================================================== */}

          <div className="lg:col-span-2">
            <FooterHeading title="Platform" />

            {/* -----------------------------------------------------
                POST YOUR ADS - HIGHLIGHTED CTA
            ----------------------------------------------------- */}

            <Link
              to="/create-listing"
              className="
                group
                mt-5
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-pink-500/30
                bg-gradient-to-r
                from-pink-500/15
                to-purple-500/10
                px-3
                py-2.5
                shadow-lg
                shadow-pink-500/5
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-pink-500/60
                hover:from-pink-500/25
                hover:to-purple-500/20
                hover:shadow-pink-500/15
              "
            >
              <span
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-pink-500
                  text-white
                  shadow-md
                  shadow-pink-500/20
                  transition
                  duration-300
                  group-hover:scale-105
                "
              >
                <FaBullhorn className="text-xs" />
              </span>

              <span className="min-w-0">
                <span
                  className="
                    block
                    text-[11px]
                    font-black
                    uppercase
                    tracking-wide
                    text-pink-400
                  "
                >
                  Post Your Ads
                </span>

                <span
                  className="
                    mt-0.5
                    block
                    text-[9px]
                    font-medium
                    text-slate-500
                  "
                >
                  Promote your profile
                </span>
              </span>
            </Link>

            {/* NORMAL PLATFORM LINKS */}

            <div className="mt-5 space-y-3.5">
              {platformLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-slate-400
                    transition-all
                    duration-200
                    hover:translate-x-1
                    hover:text-pink-400
                  "
                >
                  <FaChevronRight
                    className="
                      text-[7px]
                      text-slate-700
                      transition
                      duration-200
                      group-hover:text-pink-500
                    "
                  />

                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* =====================================================
              POPULAR CITIES
          ===================================================== */}

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between">
              <FooterHeading title="Popular Cities" />

              <Link
                to="/cities"
                className="
                  inline-flex
                  items-center
                  gap-1
                  text-[10px]
                  font-bold
                  text-pink-500
                  transition
                  hover:text-pink-400
                "
              >
                View all

                <FaArrowRight className="text-[8px]" />
              </Link>
            </div>

            <div
              className="
                mt-5
                grid
                grid-cols-2
                gap-x-6
                gap-y-3
              "
            >
              {popularCities.map((city) => (
                <Link
                  key={city.slug}
                  to={`/cities/${city.slug}`}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-slate-400
                    transition-all
                    duration-200
                    hover:translate-x-1
                    hover:text-pink-400
                  "
                >
                  <span
                    className="
                      h-1
                      w-1
                      shrink-0
                      rounded-full
                      bg-slate-700
                      transition
                      group-hover:bg-pink-500
                    "
                  />

                  {city.name}
                </Link>
              ))}
            </div>
          </div>

          {/* =====================================================
              SUPPORT
          ===================================================== */}

          <div className="lg:col-span-3">
            <FooterHeading title="Support & Information" />

            <FooterLinks links={supportLinks} />
          </div>
        </div>

        {/* =========================================================
            DISCOVERY SECTION
        ========================================================= */}

        <section
          className="
            border-t
            border-white/[0.07]
            py-10
          "
        >
          <div
            className="
              flex
              flex-col
              gap-6
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-pink-500
                  "
                />

                <h3 className="text-sm font-bold text-white">
                  Explore Professional Categories
                </h3>
              </div>

              <p
                className="
                  mt-2
                  text-xs
                  leading-5
                  text-slate-500
                "
              >
                Find professionals by category and discover new
                opportunities on ForeverMeet.
              </p>
            </div>

            <div
              className="
                flex
                flex-wrap
                gap-2
                lg:max-w-3xl
                lg:justify-end
              "
            >
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-white/[0.08]
                    bg-white/[0.025]
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-slate-400
                    transition-all
                    duration-200
                    hover:border-pink-500/40
                    hover:bg-pink-500/10
                    hover:text-pink-400
                  "
                >
                  <FaCheck className="text-[8px] text-slate-600" />

                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            CONTACT PANEL
        ========================================================= */}

        <section className="pb-10">
          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-white/[0.08]
              bg-gradient-to-br
              from-white/[0.05]
              via-white/[0.025]
              to-pink-500/[0.04]
            "
          >
            {/* Background Glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-24
                -top-24
                h-64
                w-64
                rounded-full
                bg-pink-500/10
                blur-[90px]
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -bottom-28
                left-1/3
                h-52
                w-52
                rounded-full
                bg-purple-500/10
                blur-[80px]
              "
            />

            <div
              className="
                relative
                grid
                grid-cols-1
                divide-y
                divide-white/[0.07]
                md:grid-cols-3
                md:divide-x
                md:divide-y-0
              "
            >
              {/* LOCATION */}

              <ContactItem
                icon={FaMapMarkerAlt}
                label="Location"
                value="India"
              />

              {/* EMAIL */}

              <ContactItem
                icon={FaEnvelope}
                label="Email"
                value="support@forevermeet.com"
                href="mailto:support@forevermeet.com"
              />

              {/* PHONE */}

              <ContactItem
                icon={FaPhoneAlt}
                label="Support"
                value="+91 99999 99999"
                href="tel:+919999999999"
              />
            </div>
          </div>
        </section>

        {/* =========================================================
            FINAL FOOTER
        ========================================================= */}

        <div className="border-t border-white/[0.07]">
          <div
            className="
              flex
              flex-col
              gap-5
              py-7
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* COPYRIGHT */}

            <div className="text-center sm:text-left">
              <p className="text-xs text-slate-500">
                © {currentYear}{" "}

                <span className="font-semibold text-slate-300">
                  ForeverMeet
                </span>

                . All rights reserved.
              </p>

              <p className="mt-1.5 text-[10px] text-slate-600">
                A professional model directory platform in India.
              </p>
            </div>

            {/* LEGAL */}

            <div
              className="
                flex
                flex-wrap
                items-center
                justify-center
                gap-x-5
                gap-y-2
              "
            >
              <FooterBottomLink
                to="/privacy-policy"
                label="Privacy Policy"
              />

              <span
                className="
                  hidden
                  h-3
                  w-px
                  bg-white/[0.08]
                  sm:block
                "
              />

              <FooterBottomLink
                to="/terms"
                label="Terms & Conditions"
              />

              <span
                className="
                  hidden
                  h-3
                  w-px
                  bg-white/[0.08]
                  sm:block
                "
              />

              <FooterBottomLink
                to="/disclaimer"
                label="Disclaimer"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ===============================================================
   FOOTER HEADING
=============================================================== */

function FooterHeading({ title }) {
  return (
    <h3
      className="
        text-[11px]
        font-black
        uppercase
        tracking-[0.18em]
        text-white
      "
    >
      {title}
    </h3>
  );
}

/* ===============================================================
   FOOTER LINKS
=============================================================== */

function FooterLinks({ links }) {
  return (
    <div className="mt-5 space-y-3.5">
      {links.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className="
            group
            flex
            items-center
            gap-2
            text-sm
            text-slate-400
            transition-all
            duration-200
            hover:translate-x-1
            hover:text-pink-400
          "
        >
          <FaChevronRight
            className="
              text-[7px]
              text-slate-700
              transition
              duration-200
              group-hover:text-pink-500
            "
          />

          {item.name}
        </Link>
      ))}
    </div>
  );
}

/* ===============================================================
   CONTACT ITEM
=============================================================== */

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
}) {
  const content = (
    <>
      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-pink-500/10
          text-pink-400
          transition
          group-hover:bg-pink-500
          group-hover:text-white
        "
      >
        <Icon className="text-sm" />
      </div>

      <div className="min-w-0">
        <p
          className="
            text-[9px]
            font-bold
            uppercase
            tracking-[0.18em]
            text-slate-600
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            truncate
            text-sm
            font-semibold
            text-slate-200
            transition
            group-hover:text-white
          "
        >
          {value}
        </p>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="
          group
          flex
          items-center
          gap-4
          px-5
          py-5
          transition
          hover:bg-white/[0.02]
          sm:px-6
        "
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className="
        group
        flex
        items-center
        gap-4
        px-5
        py-5
        transition
        hover:bg-white/[0.02]
        sm:px-6
      "
    >
      {content}
    </div>
  );
}

/* ===============================================================
   BOTTOM LEGAL LINK
=============================================================== */

function FooterBottomLink({ to, label }) {
  return (
    <Link
      to={to}
      className="
        text-xs
        text-slate-500
        transition
        hover:text-pink-400
      "
    >
      {label}
    </Link>
  );
}

export default Footer;