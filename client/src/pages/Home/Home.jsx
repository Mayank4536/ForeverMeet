import {
  FaArrowRight,
  FaSearch,
  FaMapMarkerAlt,
  FaBullhorn,
  FaStar,
  FaCheckCircle,
  FaShieldAlt,
  FaUsers,
  FaCamera,
  FaChevronRight,
  FaRocket,
  FaUserPlus,
  FaHeart,
  FaCrown,
  FaInstagram,
  FaPlay,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");

  /* =========================================================
     SCROLL ANIMATION
  ========================================================= */

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  /* =========================================================
     POPULAR CATEGORIES
  ========================================================= */

  const categories = [
    {
      name: "Models",
      slug: "models",
      description: "Discover professional models",
      icon: FaUsers,
      count: "250+ Profiles",
    },
    {
      name: "Fashion Models",
      slug: "fashion-models",
      description: "Fashion & runway talent",
      icon: FaCamera,
      count: "180+ Profiles",
    },
    {
      name: "Photographers",
      slug: "photographers",
      description: "Creative photographers",
      icon: FaCamera,
      count: "120+ Profiles",
    },
    {
      name: "Makeup Artists",
      slug: "makeup-artists",
      description: "Professional makeup artists",
      icon: FaStar,
      count: "90+ Profiles",
    },
    {
      name: "Fitness Models",
      slug: "fitness-models",
      description: "Fitness & lifestyle talent",
      icon: FaHeart,
      count: "110+ Profiles",
    },
    {
      name: "Influencers",
      slug: "influencers",
      description: "Social media creators",
      icon: FaRocket,
      count: "150+ Profiles",
    },
  ];

  /* =========================================================
     POPULAR CITIES
  ========================================================= */

  const cities = [
    {
      name: "Pune",
      slug: "pune",
      profiles: "320+ Profiles",
    },
    {
      name: "Mumbai",
      slug: "mumbai",
      profiles: "450+ Profiles",
    },
    {
      name: "Bangalore",
      slug: "bangalore",
      profiles: "380+ Profiles",
    },
    {
      name: "Hyderabad",
      slug: "hyderabad",
      profiles: "240+ Profiles",
    },
    {
      name: "Delhi",
      slug: "delhi",
      profiles: "410+ Profiles",
    },
    {
      name: "Kolkata",
      slug: "kolkata",
      profiles: "180+ Profiles",
    },
    {
      name: "Ranchi",
      slug: "ranchi",
      profiles: "100+ Profiles",
    },
    {
      name: "Bhopal",
      slug: "bhopal",
      profiles: "130+ Profiles",
    },
    {
      name: "Surat",
      slug: "surat",
      profiles: "160+ Profiles",
    },
  ];

  /* =========================================================
     FEATURED PROFILES
  ========================================================= */

  const featuredProfiles = [
    {
      id: "1",
      name: "Aarohi",
      city: "Pune",
      category: "Fashion Model",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
      verified: true,
      premium: true,
    },
    {
      id: "2",
      name: "Ananya",
      city: "Mumbai",
      category: "Professional Model",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80",
      verified: true,
      premium: true,
    },
    {
      id: "3",
      name: "Meera",
      city: "Bangalore",
      category: "Fitness Model",
      image:
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=80",
      verified: true,
      premium: false,
    },
    {
      id: "4",
      name: "Riya",
      city: "Delhi",
      category: "Fashion Model",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80",
      verified: true,
      premium: true,
    },
  ];

  /* =========================================================
     TRENDING PROFILES
  ========================================================= */

  const trendingProfiles = [
    {
      id: "5",
      name: "Kiara",
      city: "Hyderabad",
      category: "Model",
      image:
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=700&q=80",
      verified: true,
    },
    {
      id: "6",
      name: "Sara",
      city: "Mumbai",
      category: "Influencer",
      image:
        "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=700&q=80",
      verified: true,
    },
    {
      id: "7",
      name: "Nisha",
      city: "Pune",
      category: "Fashion Model",
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=80",
      verified: true,
    },
    {
      id: "8",
      name: "Ishita",
      city: "Delhi",
      category: "Fitness Model",
      image:
        "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=700&q=80",
      verified: true,
    },
  ];

  /* =========================================================
     HERO FLOATING IMAGES
  ========================================================= */

  const floatingImages = [
    {
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      className: "hero-float hero-float-one",
    },
    {
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
      className: "hero-float hero-float-two",
    },
    {
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=300&q=80",
      className: "hero-float hero-float-three",
    },
    {
      image:
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
      className: "hero-float hero-float-four",
    },
  ];

  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (city) {
      params.set("city", city);
    }

    if (category) {
      params.set("category", category);
    }

    const query = params.toString();

    navigate(query ? `/listings?${query}` : "/listings");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#070b14] text-slate-300">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="hero-section relative overflow-hidden">

        {/* Animated Background */}

        <div className="hero-grid absolute inset-0" />

        <div className="hero-orb hero-orb-pink" />
        <div className="hero-orb hero-orb-purple" />
        <div className="hero-orb hero-orb-blue" />

        {/* Floating Images */}

        {floatingImages.map((item, index) => (
          <div
            key={index}
            className={item.className}
          >
            <img
              src={item.image}
              alt="Professional talent"
            />
          </div>
        ))}

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-7xl
            px-4
            pb-20
            pt-16
            sm:px-6
            sm:pb-24
            sm:pt-20
            lg:px-8
            lg:pb-28
            lg:pt-24
          "
        >

          {/* Badge */}

          <div className="flex justify-center hero-fade-in">

            <div
              className="
                hero-badge
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-pink-500/20
                bg-pink-500/5
                px-4
                py-2
                text-xs
                font-semibold
                text-pink-400
              "
            >

              <span className="live-dot" />

              India's Professional Talent Directory

            </div>

          </div>

          {/* Heading */}

          <div className="mx-auto mt-7 max-w-4xl text-center">

            <h1
              className="
                hero-title
                text-4xl
                font-black
                leading-[1.05]
                tracking-tight
                text-white
                sm:text-5xl
                lg:text-7xl
              "
            >

              Discover Professional

              <span className="hero-gradient-text block">
                Talent Across India
              </span>

            </h1>

            <p
              className="
                hero-description
                mx-auto
                mt-6
                max-w-2xl
                text-sm
                leading-7
                text-slate-400
                sm:text-base
              "
            >
              Find models, photographers, makeup artists, influencers
              and creative professionals in cities across India.
            </p>

          </div>

          {/* Hero Stats */}

          <div
            className="
              mt-8
              flex
              flex-wrap
              justify-center
              gap-6
              text-center
            "
          >

            <HeroStat number="1,500+" text="Profiles" />
            <HeroStat number="9+" text="Cities" />
            <HeroStat number="100%" text="Professional" />

          </div>

          {/* SEARCH */}

          <form
            onSubmit={handleSearch}
            className="mx-auto mt-10 max-w-5xl"
          >

            <div className="search-container">

              <div
                className="
                  grid
                  grid-cols-1
                  gap-2
                  md:grid-cols-[1.5fr_1fr_1fr_auto]
                "
              >

                {/* Search */}

                <div className="search-field">

                  <FaSearch className="shrink-0 text-sm text-slate-500" />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search models, professionals..."
                  />

                </div>

                {/* City */}

                <div className="search-field">

                  <FaMapMarkerAlt className="shrink-0 text-sm text-pink-500" />

                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >

                    <option value="">
                      All Cities
                    </option>

                    {cities.map((item) => (
                      <option
                        key={item.slug}
                        value={item.slug}
                      >
                        {item.name}
                      </option>
                    ))}

                  </select>

                </div>

                {/* Category */}

                <div className="search-field">

                  <FaUsers className="shrink-0 text-sm text-purple-400" />

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >

                    <option value="">
                      All Categories
                    </option>

                    {categories.map((item) => (
                      <option
                        key={item.slug}
                        value={item.slug}
                      >
                        {item.name}
                      </option>
                    ))}

                  </select>

                </div>

                {/* Search Button */}

                <button
                  type="submit"
                  className="search-button"
                >
                  <FaSearch className="text-xs" />
                  Search
                </button>

              </div>

            </div>

          </form>

          {/* HERO ACTIONS */}

          <div
            className="
              mt-6
              flex
              flex-col
              items-center
              justify-center
              gap-3
              sm:flex-row
            "
          >

            <Link
              to="/create-listing"
              className="primary-action"
            >

              <FaBullhorn />

              Post Your Ads

              <FaArrowRight className="text-[9px]" />

            </Link>

            <Link
              to="/listings"
              className="secondary-action"
            >

              Browse All Profiles

              <FaArrowRight className="text-[9px]" />

            </Link>

          </div>

          {/* Scroll Indicator */}

          <div className="scroll-indicator">

            <span />

            Scroll to explore

          </div>

        </div>

      </section>

      {/* =========================================================
          TRUST BAR
      ========================================================= */}

      <section className="border-y border-white/[0.06] bg-white/[0.015]">

        <div
          className="
            mx-auto
            grid
            max-w-7xl
            grid-cols-2
            px-4
            sm:px-6
            lg:grid-cols-4
            lg:px-8
          "
        >

          <TrustItem
            icon={FaCheckCircle}
            title="Verified Profiles"
            text="Trusted professionals"
          />

          <TrustItem
            icon={FaShieldAlt}
            title="Professional"
            text="Built for talent"
          />

          <TrustItem
            icon={FaMapMarkerAlt}
            title="9+ Cities"
            text="Across India"
          />

          <TrustItem
            icon={FaUsers}
            title="Growing Network"
            text="New profiles daily"
          />

        </div>

      </section>

      {/* =========================================================
          CATEGORIES
      ========================================================= */}

      <section className="py-16 sm:py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="reveal">

            <SectionHeading
              eyebrow="Explore"
              title="Browse Professional Categories"
              description="Discover talented professionals across different creative categories."
              linkText="View all categories"
              linkTo="/categories"
            />

          </div>

          <div
            className="
              mt-10
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >

            {categories.map((category, index) => {

              const Icon = category.icon;

              return (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className={`category-card reveal reveal-delay-${index + 1}`}
                >

                  <div className="category-glow" />

                  <div className="relative z-10">

                    <div className="category-icon">
                      <Icon />
                    </div>

                    <h3 className="mt-5 text-base font-bold text-white">
                      {category.name}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {category.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between">

                      <span className="text-[10px] font-semibold text-slate-600">
                        {category.count}
                      </span>

                      <FaChevronRight className="category-arrow" />

                    </div>

                  </div>

                </Link>
              );
            })}

          </div>

        </div>

      </section>

      {/* =========================================================
          FEATURED PROFILES
      ========================================================= */}

      <section className="border-y border-white/[0.06] bg-white/[0.012] py-16 sm:py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="reveal">

            <SectionHeading
              eyebrow="Featured"
              title="Featured Profiles"
              description="Discover selected professional profiles from our growing network."
              linkText="View all profiles"
              linkTo="/listings"
            />

          </div>

          <div
            className="
              mt-10
              grid
              grid-cols-2
              gap-3
              sm:grid-cols-2
              sm:gap-5
              lg:grid-cols-4
            "
          >

            {featuredProfiles.map((profile, index) => (
              <div
                key={profile.id}
                className={`reveal reveal-delay-${index + 1}`}
              >

                <ProfileCard profile={profile} />

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =========================================================
          CITIES
      ========================================================= */}

      <section className="py-16 sm:py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="reveal">

            <SectionHeading
              eyebrow="Locations"
              title="Popular Cities"
              description="Explore professional profiles in major cities across India."
              linkText="Browse all cities"
              linkTo="/cities"
            />

          </div>

          <div
            className="
              mt-10
              grid
              grid-cols-2
              gap-3
              sm:grid-cols-3
              lg:grid-cols-5
            "
          >

            {cities.map((city, index) => (
              <Link
                key={city.slug}
                to={`/cities/${city.slug}`}
                className={`city-card reveal reveal-delay-${(index % 5) + 1}`}
              >

                <div className="city-icon">

                  <FaMapMarkerAlt className="text-sm" />

                </div>

                <h3 className="mt-4 text-sm font-bold text-white">
                  {city.name}
                </h3>

                <p className="mt-1 text-[10px] text-slate-600">
                  {city.profiles}
                </p>

                <FaArrowRight className="city-arrow" />

              </Link>
            ))}

          </div>

        </div>

      </section>

      {/* =========================================================
          TRENDING
      ========================================================= */}

      <section className="border-y border-white/[0.06] bg-white/[0.012] py-16 sm:py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="reveal">

            <SectionHeading
              eyebrow="Trending"
              title="Trending Profiles"
              description="Profiles getting attention from visitors across ForeverMeet."
              linkText="Explore more"
              linkTo="/listings?sort=trending"
            />

          </div>

          <div
            className="
              mt-10
              grid
              grid-cols-2
              gap-3
              sm:grid-cols-2
              sm:gap-5
              lg:grid-cols-4
            "
          >

            {trendingProfiles.map((profile, index) => (
              <div
                key={profile.id}
                className={`reveal reveal-delay-${index + 1}`}
              >

                <ProfileCard
                  profile={profile}
                  trending
                />

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =========================================================
          WHY FOREVERMEET
      ========================================================= */}

      <section className="py-16 sm:py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            <div className="reveal">

              <span className="section-eyebrow">
                Why ForeverMeet
              </span>

              <h2
                className="
                  mt-4
                  text-3xl
                  font-black
                  tracking-tight
                  text-white
                  sm:text-4xl
                "
              >

                A professional place

                <span className="block text-pink-400">
                  to showcase talent.
                </span>

              </h2>

              <p
                className="
                  mt-5
                  max-w-xl
                  text-sm
                  leading-7
                  text-slate-500
                "
              >
                ForeverMeet helps models and creative professionals
                build visibility, discover opportunities and connect
                with people looking for professional talent.
              </p>

              <Link
                to="/about"
                className="learn-more"
              >

                Learn more about ForeverMeet

                <FaArrowRight className="text-[9px]" />

              </Link>

            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              <div className="reveal reveal-delay-1">
                <FeatureBox
                  icon={FaShieldAlt}
                  title="Professional Profiles"
                  text="Profiles are designed to present professional information clearly."
                />
              </div>

              <div className="reveal reveal-delay-2">
                <FeatureBox
                  icon={FaCheckCircle}
                  title="Verified Accounts"
                  text="Email verification helps maintain a more trusted platform."
                />
              </div>

              <div className="reveal reveal-delay-3">
                <FeatureBox
                  icon={FaMapMarkerAlt}
                  title="City Based Discovery"
                  text="Find talent by city and explore professionals near you."
                />
              </div>

              <div className="reveal reveal-delay-4">
                <FeatureBox
                  icon={FaCrown}
                  title="Premium Visibility"
                  text="Featured profiles can receive additional visibility."
                />
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}

      <section className="border-y border-white/[0.06] bg-white/[0.012] py-16 sm:py-20">

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          <div className="reveal text-center">

            <span className="section-eyebrow">
              Simple Process
            </span>

            <h2
              className="
                mt-3
                text-2xl
                font-black
                text-white
                sm:text-3xl
              "
            >
              Get started in three steps
            </h2>

          </div>

          <div
            className="
              mt-12
              grid
              gap-5
              md:grid-cols-3
            "
          >

            <div className="reveal reveal-delay-1">
              <StepCard
                number="01"
                icon={FaUserPlus}
                title="Create Your Profile"
                text="Register your account and create your professional profile."
              />
            </div>

            <div className="reveal reveal-delay-2">
              <StepCard
                number="02"
                icon={FaBullhorn}
                title="Post Your Ads"
                text="Add your profile information, category, city and images."
              />
            </div>

            <div className="reveal reveal-delay-3">
              <StepCard
                number="03"
                icon={FaRocket}
                title="Get Discovered"
                text="Let people discover your professional profile across India."
              />
            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section className="final-cta-section relative overflow-hidden py-20 sm:py-24">

        <div className="cta-orb" />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-4xl
            px-4
            text-center
            sm:px-6
          "
        >

          <div className="cta-box reveal">

            <div className="cta-icon">

              <FaBullhorn />

            </div>

            <h2
              className="
                mt-6
                text-3xl
                font-black
                tracking-tight
                text-white
                sm:text-4xl
              "
            >
              Ready to showcase your talent?
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-xl
                text-sm
                leading-6
                text-slate-500
              "
            >
              Create your professional profile and make it easier
              for people across India to discover you.
            </p>

            <div
              className="
                mt-8
                flex
                flex-col
                justify-center
                gap-3
                sm:flex-row
              "
            >

              <Link
                to="/create-listing"
                className="primary-action"
              >

                <FaBullhorn />

                Post Your Ads

                <FaArrowRight className="text-[10px]" />

              </Link>

              <Link
                to="/listings"
                className="secondary-action"
              >

                Browse Profiles

              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

/* ===============================================================
   HERO STAT
=============================================================== */

function HeroStat({ number, text }) {
  return (
    <div className="hero-stat">

      <strong>{number}</strong>

      <span>{text}</span>

    </div>
  );
}

/* ===============================================================
   SECTION HEADING
=============================================================== */

function SectionHeading({
  eyebrow,
  title,
  description,
  linkText,
  linkTo,
}) {
  return (
    <div
      className="
        flex
        flex-col
        gap-5
        sm:flex-row
        sm:items-end
        sm:justify-between
      "
    >

      <div>

        <span className="section-eyebrow">
          {eyebrow}
        </span>

        <h2
          className="
            mt-2
            text-2xl
            font-black
            tracking-tight
            text-white
            sm:text-3xl
          "
        >
          {title}
        </h2>

        <p
          className="
            mt-2
            max-w-2xl
            text-xs
            leading-6
            text-slate-500
          "
        >
          {description}
        </p>

      </div>

      {linkText && linkTo && (
        <Link
          to={linkTo}
          className="learn-more"
        >

          {linkText}

          <FaArrowRight className="text-[9px]" />

        </Link>
      )}

    </div>
  );
}

/* ===============================================================
   TRUST ITEM
=============================================================== */

function TrustItem({
  icon: Icon,
  title,
  text,
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        border-white/[0.06]
        px-3
        py-5
        sm:px-5
        lg:border-r
        lg:py-6
        lg:last:border-r-0
      "
    >

      <div className="trust-icon">

        <Icon className="text-xs" />

      </div>

      <div className="min-w-0">

        <p className="text-xs font-bold text-white">
          {title}
        </p>

        <p className="mt-0.5 truncate text-[10px] text-slate-600">
          {text}
        </p>

      </div>

    </div>
  );
}

/* ===============================================================
   PROFILE CARD
=============================================================== */

function ProfileCard({
  profile,
  trending = false,
}) {
  const citySlug = profile.city
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  return (
    <Link
      to={`/cities/${citySlug}`}
      className="
        profile-card
        group
        block
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.07]
        bg-[#0b101b]
      "
    >

      {/* IMAGE */}

      <div className="relative aspect-[4/5] overflow-hidden">

        <img
          src={profile.image}
          alt={`${profile.name} - ${profile.category}`}
          className="profile-image"
          loading="lazy"
        />

        <div className="profile-image-overlay" />

        {/* Image shine */}

        <div className="profile-shine" />

        {/* Premium */}

        {profile.premium && (
          <div className="premium-badge">

            <FaCrown />

            Premium

          </div>
        )}

        {/* Trending */}

        {trending && (
          <div className="trending-badge">

            <span />

            Trending

          </div>
        )}

        {/* Profile Info */}

        <div className="absolute bottom-3 left-3 right-3">

          <div className="flex items-center gap-1.5">

            <h3 className="text-sm font-black text-white">
              {profile.name}
            </h3>

            {profile.verified && (
              <FaCheckCircle className="text-[11px] text-blue-400" />
            )}

          </div>

          <div
            className="
              mt-1
              flex
              items-center
              gap-1.5
              text-[10px]
              text-slate-300
            "
          >

            <FaMapMarkerAlt className="text-[8px] text-pink-400" />

            {profile.city}

          </div>

        </div>

      </div>

      {/* CARD FOOTER */}

      <div className="px-3 py-3">

        <div className="flex items-center justify-between">

          <span className="text-[10px] font-medium text-slate-500">
            {profile.category}
          </span>

          <FaArrowRight className="profile-arrow" />

        </div>

      </div>

    </Link>
  );
}

/* ===============================================================
   FEATURE BOX
=============================================================== */

function FeatureBox({
  icon: Icon,
  title,
  text,
}) {
  return (
    <div className="feature-box">

      <div className="feature-icon">

        <Icon className="text-sm" />

      </div>

      <h3 className="mt-4 text-sm font-bold text-white">
        {title}
      </h3>

      <p
        className="
          mt-2
          text-xs
          leading-5
          text-slate-600
        "
      >
        {text}
      </p>

    </div>
  );
}

/* ===============================================================
   STEP CARD
=============================================================== */

function StepCard({
  number,
  icon: Icon,
  title,
  text,
}) {
  return (
    <div className="step-card">

      <span className="step-number">
        {number}
      </span>

      <div className="step-icon">

        <Icon />

      </div>

      <h3 className="mt-5 text-sm font-bold text-white">
        {title}
      </h3>

      <p
        className="
          mx-auto
          mt-2
          max-w-xs
          text-xs
          leading-5
          text-slate-600
        "
      >
        {text}
      </p>

    </div>
  );
}

export default Home;