import { Link } from "react-router-dom";

import {
  FaArrowRight,
  FaCamera,
  FaChevronRight,
  FaDumbbell,
  FaFire,
  FaInstagram,
  FaMagic,
  FaMicrophone,
  FaPaintBrush,
  FaSearch,
  FaShieldAlt,
  FaStar,
  FaTshirt,
  FaUserTie,
  FaUsers,
  FaVideo,
} from "react-icons/fa";

function Categories() {
  const categories = [
    {
      name: "Models",
      slug: "models",
      description:
        "Discover professional modelling talent for portfolios, fashion, campaigns and creative projects.",
      icon: FaUsers,
      tag: "Most Popular",
      number: "01",
      featured: true,
    },
    {
      name: "Fashion Models",
      slug: "fashion-models",
      description:
        "Explore fashion professionals suitable for catalogues, campaigns, editorial shoots and brands.",
      icon: FaTshirt,
      tag: "Fashion",
      number: "02",
    },
    {
      name: "Photographers",
      slug: "photographers",
      description:
        "Connect with photographers for portfolios, fashion shoots, commercial projects and creative work.",
      icon: FaCamera,
      tag: "Creative",
      number: "03",
    },
    {
      name: "Makeup Artists",
      slug: "makeup-artists",
      description:
        "Find beauty professionals for fashion shoots, portfolios, events and professional productions.",
      icon: FaMagic,
      tag: "Beauty",
      number: "04",
    },
    {
      name: "Fitness Models",
      slug: "fitness-models",
      description:
        "Discover fitness and wellness talent for sports campaigns, lifestyle brands and promotional work.",
      icon: FaDumbbell,
      tag: "Fitness",
      number: "05",
    },
    {
      name: "Influencers",
      slug: "influencers",
      description:
        "Explore digital creators and influencers for campaigns, collaborations and brand promotions.",
      icon: FaInstagram,
      tag: "Creators",
      number: "06",
    },
    {
      name: "Video Professionals",
      slug: "video-professionals",
      description:
        "Find professionals for video production, promotional content, social media and creative campaigns.",
      icon: FaVideo,
      tag: "Production",
      number: "07",
    },
    {
      name: "Artists",
      slug: "artists",
      description:
        "Discover creative artists and professionals available for different projects and collaborations.",
      icon: FaPaintBrush,
      tag: "Creative",
      number: "08",
    },
    {
      name: "Hosts & Presenters",
      slug: "hosts-presenters",
      description:
        "Find confident hosts and presenters for events, promotional campaigns and media projects.",
      icon: FaMicrophone,
      tag: "Media",
      number: "09",
    },
    {
      name: "Brand Professionals",
      slug: "brand-professionals",
      description:
        "Explore professionals for promotional activities, campaigns, events and brand collaborations.",
      icon: FaUserTie,
      tag: "Business",
      number: "10",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f7f9] text-gray-900">

      {/* =========================================================
          GLOBAL BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-60 top-0 h-[600px] w-[600px] rounded-full bg-rose-300/20 blur-[150px]" />

        <div className="absolute -right-60 top-[30%] h-[650px] w-[650px] rounded-full bg-purple-300/15 blur-[160px]" />

        <div className="absolute bottom-0 left-[25%] h-[500px] w-[500px] rounded-full bg-blue-200/10 blur-[150px]" />
      </div>

      {/* =========================================================
          PREMIUM HERO
      ========================================================= */}

      <section className="relative z-10 overflow-hidden border-b border-gray-200 bg-white">

        {/* Hero background */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(244,63,94,0.08),transparent_32%),radial-gradient(circle_at_90%_80%,rgba(124,58,237,0.07),transparent_32%)]" />

        {/* Decorative lines */}

        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute left-[8%] top-20 h-px w-32 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />

          <div className="absolute right-[12%] top-40 h-px w-40 bg-gradient-to-r from-transparent via-purple-300 to-transparent" />

          <div className="absolute bottom-20 left-[30%] h-px w-48 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8 lg:pb-24">

          {/* Breadcrumb */}

          <div className="mb-12 flex items-center gap-2 text-xs font-medium text-gray-400">
            <Link
              to="/"
              className="transition hover:text-rose-600"
            >
              Home
            </Link>

            <FaChevronRight className="text-[7px] text-gray-300" />

            <span className="text-gray-600">
              Categories
            </span>
          </div>

          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_430px]">

            {/* =====================================================
                HERO CONTENT
            ===================================================== */}

            <div>

              {/* Label */}

              <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-rose-600 shadow-sm">
                <FaStar className="text-[9px]" />

                ForeverMeet Directory
              </div>

              {/* Heading */}

              <h1 className="mt-6 max-w-4xl text-5xl font-extrabold tracking-[-0.04em] text-gray-950 sm:text-6xl lg:text-[72px] lg:leading-[0.98]">
                Explore
                <br />

                <span className="bg-gradient-to-r from-rose-600 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  professional
                </span>

                <br />

                categories.
              </h1>

              {/* Description */}

              <p className="mt-7 max-w-2xl text-base leading-8 text-gray-500 sm:text-lg">
                Discover models, photographers, creators, beauty
                professionals and other creative talent through
                carefully organized categories on ForeverMeet.
              </p>

              {/* Actions */}

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                <Link
                  to="/listings"
                  className="
                    group
                    inline-flex
                    items-center
                    justify-center
                    gap-3
                    rounded-2xl
                    bg-gray-950
                    px-6
                    py-4
                    text-sm
                    font-bold
                    text-white
                    shadow-xl
                    shadow-gray-950/15
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-rose-600
                    hover:shadow-rose-600/25
                  "
                >
                  Explore profiles

                  <FaArrowRight className="text-[10px] transition group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/create-listing"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    px-6
                    py-4
                    text-sm
                    font-semibold
                    text-gray-700
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-rose-200
                    hover:bg-rose-50
                    hover:text-rose-600
                  "
                >
                  Create your profile
                </Link>

              </div>

              {/* Trust row */}

              <div className="mt-10 flex flex-wrap items-center gap-5 text-xs text-gray-500">

                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <FaShieldAlt className="text-[10px]" />
                  </span>

                  Professional directory
                </div>

                <div className="hidden h-5 w-px bg-gray-200 sm:block" />

                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                    <FaStar className="text-[10px]" />
                  </span>

                  Multiple categories
                </div>

                <div className="hidden h-5 w-px bg-gray-200 sm:block" />

                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                    <FaUsers className="text-[10px]" />
                  </span>

                  India-wide discovery
                </div>

              </div>
            </div>

            {/* =====================================================
                PREMIUM VISUAL CARD
            ===================================================== */}

            <div className="relative">

              {/* Glow */}

              <div className="absolute -inset-6 rounded-[50px] bg-gradient-to-br from-rose-500/10 via-transparent to-purple-500/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-[34px] border border-gray-200 bg-gray-950 p-6 shadow-[0_35px_100px_rgba(15,23,42,0.18)] sm:p-7">

                {/* Glow */}

                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-rose-500/20 blur-[90px]" />

                <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-purple-500/20 blur-[90px]" />

                <div className="relative">

                  {/* Top */}

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                        Discover talent
                      </p>

                      <h2 className="mt-2 text-2xl font-bold text-white">
                        Browse categories
                      </h2>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-rose-400">
                      <FaSearch />
                    </div>

                  </div>

                  {/* Search style box */}

                  <div className="mt-7 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3.5">
                    <FaSearch className="text-xs text-gray-500" />

                    <span className="text-xs text-gray-500">
                      Search a category...
                    </span>

                    <span className="ml-auto rounded-lg border border-white/10 px-2 py-1 text-[9px] text-gray-600">
                      Explore
                    </span>
                  </div>

                  {/* Featured category */}

                  <Link
                    to="/category/models"
                    className="group mt-5 block overflow-hidden rounded-2xl border border-rose-500/20 bg-gradient-to-br from-rose-500/15 to-purple-500/10 p-4 transition hover:border-rose-500/40"
                  >
                    <div className="flex items-center gap-4">

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500 text-white shadow-lg shadow-rose-500/20">
                        <FaUsers />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-white">
                            Models
                          </p>

                          <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-rose-300">
                            Popular
                          </span>
                        </div>

                        <p className="mt-1 text-[10px] text-gray-500">
                          Explore professional modelling profiles
                        </p>
                      </div>

                      <FaArrowRight className="text-xs text-gray-600 transition group-hover:translate-x-1 group-hover:text-rose-400" />

                    </div>
                  </Link>

                  {/* Mini category grid */}

                  <div className="mt-4 grid grid-cols-2 gap-3">

                    {categories.slice(1, 5).map((category) => {
                      const Icon = category.icon;

                      return (
                        <Link
                          key={category.slug}
                          to={`/category/${category.slug}`}
                          className="group rounded-2xl border border-white/[0.08] bg-white/[0.035] p-3 transition hover:border-white/15 hover:bg-white/[0.07]"
                        >
                          <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-gray-400 transition group-hover:bg-rose-500/10 group-hover:text-rose-400">
                              <Icon className="text-xs" />
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-[11px] font-semibold text-gray-300">
                                {category.name}
                              </p>

                              <p className="mt-0.5 text-[9px] text-gray-600">
                                {category.tag}
                              </p>
                            </div>

                          </div>
                        </Link>
                      );
                    })}

                  </div>

                  {/* Bottom */}

                  <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-5">

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-gray-600">
                        Categories
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-300">
                        10+ professional fields
                      </p>
                    </div>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-500">
                      <FaArrowRight className="text-[9px]" />
                    </span>

                  </div>

                </div>
              </div>

              {/* Floating badge */}

              <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-xl sm:flex">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <FaShieldAlt className="text-sm" />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wide text-gray-400">
                    Directory
                  </p>

                  <p className="text-xs font-semibold text-gray-800">
                    Built for professionals
                  </p>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CATEGORY DIRECTORY
      ========================================================= */}

      <section className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">

        {/* Section heading */}

        <div className="flex flex-col gap-6 border-b border-gray-200 pb-8 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-600">
                Category directory
              </span>
            </div>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
              Find your category
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
              Explore our professional categories and discover
              profiles that match your requirements.
            </p>

          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            All categories available
          </div>

        </div>

        {/* Category cards */}

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {categories.map((category, index) => (
            <PremiumCategoryCard
              key={category.slug}
              category={category}
              index={index}
            />
          ))}

        </div>
      </section>

      {/* =========================================================
          DISCOVER BY CITY
      ========================================================= */}

      <section className="relative border-y border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8">

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-500">
                <FaSearch className="text-rose-500" />

                City discovery
              </div>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
                Looking for professionals
                <br className="hidden sm:block" />
                <span className="text-rose-600">
                  {" "}
                  near you?
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
                Browse profiles by city and discover professionals
                available in locations across India.
              </p>

            </div>

            <Link
              to="/cities"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-gray-950
                px-7
                py-4
                text-sm
                font-bold
                text-white
                shadow-lg
                transition
                hover:bg-rose-600
              "
            >
              Browse cities

              <FaArrowRight className="text-[10px] transition group-hover:translate-x-1" />
            </Link>

          </div>

        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}

      <section className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">

        <div className="text-center">

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-600">
            Simple discovery
          </p>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
            Find the right professional
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500">
            A simple way to explore professional profiles on
            ForeverMeet.
          </p>

        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">

          <StepCard
            number="01"
            title="Select a category"
            text="Choose the professional category that matches what you are looking for."
          />

          <StepCard
            number="02"
            title="Explore profiles"
            text="Review professional profiles and find people who match your requirements."
          />

          <StepCard
            number="03"
            title="Connect"
            text="Get in touch with the professional and discuss your project directly."
          />

        </div>

      </section>

      {/* =========================================================
          PREMIUM CTA
      ========================================================= */}

      <section className="relative overflow-hidden bg-gray-950">

        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-rose-600/15 blur-[120px]" />

        <div className="absolute -bottom-40 right-0 h-[450px] w-[450px] rounded-full bg-purple-600/15 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">

            <div>

              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-rose-400">

                <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />

                Grow your presence

              </div>

              <h2 className="mt-5 max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready to showcase your professional profile?
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
                Create your ForeverMeet profile and make it easier
                for clients, brands and creative professionals to
                discover your work.
              </p>

            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">

              <Link
                to="/create-listing"
                className="
                  group
                  inline-flex
                  min-w-[210px]
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  bg-rose-600
                  px-6
                  py-4
                  text-sm
                  font-bold
                  text-white
                  shadow-xl
                  shadow-rose-600/20
                  transition
                  hover:bg-rose-500
                "
              >
                Post your profile

                <FaArrowRight className="text-[10px] transition group-hover:translate-x-1" />
              </Link>

              <Link
                to="/listings"
                className="
                  inline-flex
                  min-w-[210px]
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  px-6
                  py-4
                  text-sm
                  font-semibold
                  text-gray-300
                  transition
                  hover:bg-white/10
                  hover:text-white
                "
              >
                Browse profiles
              </Link>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

/* ===============================================================
   PREMIUM CATEGORY CARD
=============================================================== */

function PremiumCategoryCard({
  category,
  index,
}) {
  const Icon = category.icon;

  return (
    <Link
      to={`/category/${category.slug}`}
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-gray-200
        bg-white
        p-6
        shadow-[0_8px_35px_rgba(15,23,42,0.04)]
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-rose-200
        hover:shadow-[0_25px_70px_rgba(15,23,42,0.10)]
      "
    >

      {/* Top glow */}

      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-rose-100/0 blur-3xl transition duration-500 group-hover:bg-rose-100/80" />

      {/* Number */}

      <div className="absolute right-6 top-5">
        <span className="text-[11px] font-bold tracking-wider text-gray-200 transition group-hover:text-rose-200">
          {category.number}
        </span>
      </div>

      {/* Icon */}

      <div className="relative flex items-center justify-between">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-600 transition-all duration-300 group-hover:bg-rose-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-rose-600/20">
          <Icon className="text-lg" />
        </div>

        <span className="rounded-full border border-gray-100 bg-gray-50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-gray-400 transition group-hover:border-rose-100 group-hover:bg-rose-50 group-hover:text-rose-500">
          {category.tag}
        </span>

      </div>

      {/* Content */}

      <div className="relative mt-7">

        <h3 className="text-xl font-bold tracking-tight text-gray-950 transition group-hover:text-rose-600">
          {category.name}
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          {category.description}
        </p>

      </div>

      {/* Footer */}

      <div className="relative mt-7 flex items-center justify-between border-t border-gray-100 pt-5">

        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
          Explore category
        </span>

        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all duration-300 group-hover:bg-rose-600 group-hover:text-white">
          <FaArrowRight className="text-[9px] transition group-hover:translate-x-0.5" />
        </span>

      </div>

    </Link>
  );
}

/* ===============================================================
   STEP CARD
=============================================================== */

function StepCard({
  number,
  title,
  text,
}) {
  return (
    <div className="group relative overflow-hidden rounded-[26px] border border-gray-200 bg-white p-7 shadow-[0_8px_35px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]">

      <div className="flex items-center justify-between">

        <span className="text-4xl font-extrabold tracking-tight text-gray-100 transition group-hover:text-rose-100">
          {number}
        </span>

        <div className="h-2 w-2 rounded-full bg-rose-500" />

      </div>

      <h3 className="mt-7 text-lg font-bold text-gray-950">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        {text}
      </p>

    </div>
  );
}

export default Categories;