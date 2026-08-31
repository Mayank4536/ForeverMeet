import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaArrowRight,
  FaBolt,
  FaBriefcase,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaCrown,
  FaHeart,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaStar,
  FaUser,
  FaWhatsapp,
  FaGem,
  FaShieldAlt,
  FaFire,
  FaCamera,
} from "react-icons/fa";

/* ===============================================================
   PREMIUM PAGE
=============================================================== */

function Premium() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadListings = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/listings"
        );

        if (!response.ok) {
          throw new Error("Unable to load listings.");
        }

        const data = await response.json();

        /*
          Supports common API response structures:

          {
            data: [...]
          }

          {
            listings: [...]
          }

          [...]
        */
        const result = Array.isArray(data)
          ? data
          : data?.data ||
            data?.listings ||
            data?.results ||
            [];

        if (mounted) {
          setListings(Array.isArray(result) ? result : []);
        }
      } catch (err) {
        console.error("Premium listings error:", err);

        if (mounted) {
          setError(
            "Unable to load premium profiles right now."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadListings();

    return () => {
      mounted = false;
    };
  }, []);

  /* =============================================================
     ONLY FEATURED / TRENDING / PREMIUM
  ============================================================= */

  const premiumListings = useMemo(() => {
    const filtered = listings.filter(
      (listing) =>
        listing?.isFeatured === true ||
        listing?.isTrending === true ||
        listing?.isPremium === true
    );

    /*
      Priority:

      1. Homepage Highlight / Featured
      2. Top / Trending
      3. Premium
    */

    return [...filtered].sort((a, b) => {
      const priorityA = getPriority(a);
      const priorityB = getPriority(b);

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      return (
        new Date(b?.createdAt || 0) -
        new Date(a?.createdAt || 0)
      );
    });
  }, [listings]);

  const homepageHighlights = premiumListings.filter(
    (listing) => listing?.isFeatured === true
  );

  const topProfiles = premiumListings.filter(
    (listing) =>
      listing?.isTrending === true &&
      listing?.isFeatured !== true
  );

  const premiumProfiles = premiumListings.filter(
    (listing) =>
      listing?.isPremium === true &&
      listing?.isFeatured !== true &&
      listing?.isTrending !== true
  );

  return (
    <main className="min-h-screen bg-[#f8f9fc] text-slate-900">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-48 top-20 h-[420px] w-[420px] rounded-full bg-rose-100/60 blur-[120px]" />

        <div className="absolute -right-48 top-[30%] h-[500px] w-[500px] rounded-full bg-violet-100/50 blur-[130px]" />

        <div className="absolute bottom-0 left-[35%] h-[380px] w-[380px] rounded-full bg-orange-100/30 blur-[120px]" />
      </div>

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-violet-50/60" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          {/* Breadcrumb */}

          <div className="mb-7 flex items-center gap-2 text-xs font-medium text-slate-400">
            <Link
              to="/"
              className="transition hover:text-rose-600"
            >
              Home
            </Link>

            <span>/</span>

            <span className="text-slate-600">
              Premium Profiles
            </span>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_390px]">
            {/* LEFT */}

            <div>
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-amber-200
                  bg-amber-50
                  px-3.5
                  py-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-amber-700
                "
              >
                <FaCrown />
                Premium Directory
              </div>

              <h1
                className="
                  mt-5
                  max-w-3xl
                  text-4xl
                  font-bold
                  leading-[1.08]
                  tracking-tight
                  text-slate-950
                  sm:text-5xl
                  lg:text-[58px]
                "
              >
                Discover our
                <span className="text-rose-600">
                  {" "}
                  premium
                </span>{" "}
                profiles.
              </h1>

              <p
                className="
                  mt-5
                  max-w-2xl
                  text-base
                  leading-7
                  text-slate-500
                  sm:text-lg
                "
              >
                Explore highlighted, top and premium
                professional model profiles from cities across
                India.
              </p>

              {/* Priority chips */}

              <div className="mt-7 flex flex-wrap gap-2.5">
                <PriorityChip
                  icon={FaBolt}
                  label="Homepage Highlights"
                  color="rose"
                />

                <PriorityChip
                  icon={FaFire}
                  label="Top Profiles"
                  color="orange"
                />

                <PriorityChip
                  icon={FaGem}
                  label="Premium Profiles"
                  color="violet"
                />
              </div>
            </div>

            {/* RIGHT HERO CARD */}

            <div className="relative hidden lg:block">
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-slate-200
                  bg-white
                  p-6
                  shadow-[0_25px_80px_rgba(15,23,42,0.10)]
                "
              >
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-rose-100 blur-3xl" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        from-amber-100
                        to-orange-50
                        text-amber-600
                      "
                    >
                      <FaCrown />
                    </div>

                    <span
                      className="
                        rounded-full
                        bg-emerald-50
                        px-3
                        py-1.5
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wide
                        text-emerald-600
                      "
                    >
                      Featured First
                    </span>
                  </div>

                  <h2 className="mt-6 text-xl font-bold text-slate-950">
                    Premium discovery
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Homepage highlights appear first, followed by
                    top profiles and then premium profiles.
                  </p>

                  <div className="mt-6 grid grid-cols-3 gap-2">
                    <HeroStat
                      value={homepageHighlights.length}
                      label="Highlights"
                    />

                    <HeroStat
                      value={topProfiles.length}
                      label="Top"
                    />

                    <HeroStat
                      value={premiumProfiles.length}
                      label="Premium"
                    />
                  </div>
                </div>
              </div>

              <div
                className="
                  absolute
                  -bottom-5
                  -left-5
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3
                  shadow-xl
                "
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                  <FaShieldAlt className="text-sm" />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Professional
                  </p>

                  <p className="text-xs font-semibold text-slate-800">
                    Curated profile visibility
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <section className="relative mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Loading */}

        {loading && <PremiumLoading />}

        {/* Error */}

        {!loading && error && (
          <div className="rounded-3xl border border-red-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <FaShieldAlt />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-slate-900">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {error}
            </p>
          </div>
        )}

        {/* Empty */}

        {!loading &&
          !error &&
          premiumListings.length === 0 && (
            <EmptyPremium />
          )}

        {/* =======================================================
            HOMEPAGE HIGHLIGHTS
        ======================================================= */}

        {!loading &&
          homepageHighlights.length > 0 && (
            <ProfileSection
              eyebrow="01 · Homepage Priority"
              title="Homepage Highlights"
              description="Our highest-priority profiles appear here first."
              icon={FaBolt}
              iconClass="bg-rose-50 text-rose-600"
              listings={homepageHighlights}
              badgeType="highlight"
            />
          )}

        {/* =======================================================
            TOP PROFILES
        ======================================================= */}

        {!loading && topProfiles.length > 0 && (
          <ProfileSection
            eyebrow="02 · Top Priority"
            title="Top Profiles"
            description="Popular profiles with enhanced visibility."
            icon={FaFire}
            iconClass="bg-orange-50 text-orange-600"
            listings={topProfiles}
            badgeType="top"
          />
        )}

        {/* =======================================================
            PREMIUM
        ======================================================= */}

        {!loading && premiumProfiles.length > 0 && (
          <ProfileSection
            eyebrow="03 · Premium"
            title="Premium Profiles"
            description="Premium professional profiles from across India."
            icon={FaGem}
            iconClass="bg-violet-50 text-violet-600"
            listings={premiumProfiles}
            badgeType="premium"
          />
        )}
      </section>
    </main>
  );
}

/* ===============================================================
   PRIORITY
=============================================================== */

function getPriority(listing) {
  if (listing?.isFeatured === true) {
    return 1;
  }

  if (listing?.isTrending === true) {
    return 2;
  }

  if (listing?.isPremium === true) {
    return 3;
  }

  return 99;
}

/* ===============================================================
   PROFILE SECTION
=============================================================== */

function ProfileSection({
  eyebrow,
  title,
  description,
  icon: Icon,
  iconClass,
  listings,
  badgeType,
}) {
  return (
    <section className="mb-12 last:mb-0">
      {/* Section heading */}

      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconClass}`}
            >
              <Icon className="text-sm" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              {eyebrow}
            </span>
          </div>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            {title}
          </h2>

          <p className="mt-1.5 text-sm text-slate-500">
            {description}
          </p>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-500 shadow-sm sm:flex">
          <FaCheckCircle className="text-emerald-500" />
          {listings.length}{" "}
          {listings.length === 1 ? "Profile" : "Profiles"}
        </div>
      </div>

      {/* Cards */}

      <div className="space-y-5">
        {listings.map((listing) => (
          <PremiumProfileCard
            key={listing?._id || listing?.id}
            listing={listing}
            badgeType={badgeType}
          />
        ))}
      </div>
    </section>
  );
}

/* ===============================================================
   PREMIUM PROFILE CARD
=============================================================== */

function PremiumProfileCard({
  listing,
  badgeType,
}) {
  const images = getListingImages(listing);

  const [currentImage, setCurrentImage] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  /*
    Automatic image slider
  */

  useEffect(() => {
    if (images.length <= 1) {
      return undefined;
    }

    const timer = setInterval(() => {
      setCurrentImage((previous) =>
        previous >= images.length - 1
          ? 0
          : previous + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [images.length]);

  useEffect(() => {
    setImageLoaded(false);
  }, [currentImage]);

  const title =
    listing?.title ||
    "Professional Model Profile";

  const name =
    listing?.name ||
    listing?.user?.name ||
    "Professional Model";

  const age = listing?.age;

  const city = listing?.city || "India";

  const state = listing?.state || "";

  const category =
    listing?.category ||
    "Model";

  const description =
    listing?.description ||
    listing?.bio ||
    "Professional profile available for bookings and collaborations.";

  const phone =
    listing?.phone ||
    listing?.contactNumber ||
    "";

  const whatsapp =
    listing?.whatsapp ||
    listing?.whatsappNumber ||
    phone;

  const verified =
    listing?.isVerified === true;

  const priority =
    badgeType === "highlight"
      ? "Homepage Highlight"
      : badgeType === "top"
      ? "Top Profile"
      : "Premium";

  const profileId =
    listing?._id ||
    listing?.id;

  const profileLink = profileId
    ? `/listings/${profileId}`
    : "/listings";

  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[25px]
        border
        border-slate-200
        bg-white
        shadow-[0_12px_35px_rgba(15,23,42,0.06)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-rose-200
        hover:shadow-[0_22px_55px_rgba(15,23,42,0.11)]
      "
    >
      {/* Top gradient line */}

      <div className="absolute inset-x-0 top-0 z-30 h-1 bg-gradient-to-r from-rose-500 via-red-500 to-violet-500" />

      <div className="grid min-h-[370px] grid-cols-[39%_61%] sm:min-h-[410px] md:grid-cols-[300px_1fr]">
        {/* =======================================================
            IMAGE AREA
        ======================================================= */}

        <div className="relative min-h-[370px] overflow-hidden bg-slate-900 sm:min-h-[410px]">
          {/* Blurred background */}

          <img
            src={images[currentImage]}
            alt=""
            aria-hidden="true"
            className="
              absolute
              inset-0
              h-full
              w-full
              scale-110
              object-cover
              opacity-30
              blur-xl
            "
          />

          {/* Main image */}

          <div className="absolute inset-0 flex items-center justify-center">
            {!imageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-slate-800" />
            )}

            <img
              src={images[currentImage]}
              alt={title}
              onLoad={() => setImageLoaded(true)}
              onError={(event) => {
                event.currentTarget.src =
                  getFallbackImage();
              }}
              className={`
                relative
                z-10
                h-full
                w-full
                object-cover
                object-center
                transition-all
                duration-700
                ${
                  imageLoaded
                    ? "scale-100 opacity-100"
                    : "scale-[1.03] opacity-0"
                }
                group-hover:scale-[1.025]
              `}
            />
          </div>

          {/* Dark gradient */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-20
              bg-gradient-to-t
              from-black/70
              via-black/5
              to-black/20
            "
          />

          {/* Priority badge */}

          <div className="absolute left-3 top-4 z-30">
            <PriorityBadge type={badgeType} />
          </div>

          {/* Verified */}

          {verified && (
            <div className="absolute right-3 top-4 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/90 text-blue-600 shadow-lg backdrop-blur">
              <FaCheckCircle className="text-sm" />
            </div>
          )}

          {/* Slider controls */}

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() =>
                  setCurrentImage((previous) =>
                    previous === 0
                      ? images.length - 1
                      : previous - 1
                  )
                }
                className="
                  absolute
                  left-2
                  top-1/2
                  z-30
                  flex
                  h-9
                  w-9
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-black/45
                  text-white
                  backdrop-blur
                  transition
                  hover:bg-black/70
                  active:scale-90
                "
                aria-label="Previous image"
              >
                <FaChevronLeft className="text-xs" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setCurrentImage((previous) =>
                    previous >= images.length - 1
                      ? 0
                      : previous + 1
                  )
                }
                className="
                  absolute
                  right-2
                  top-1/2
                  z-30
                  flex
                  h-9
                  w-9
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-black/45
                  text-white
                  backdrop-blur
                  transition
                  hover:bg-black/70
                  active:scale-90
                "
                aria-label="Next image"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </>
          )}

          {/* Image counter */}

          <div className="absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between">
            <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-2.5 py-1.5 text-[10px] font-semibold text-white backdrop-blur">
              <FaCamera className="text-[9px]" />

              {images.length}
            </div>

            {/* Dots */}

            {images.length > 1 && (
              <div className="flex max-w-[65%] items-center gap-1 overflow-hidden rounded-full bg-black/35 px-2.5 py-2 backdrop-blur">
                {images.slice(0, 7).map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() =>
                      setCurrentImage(index)
                    }
                    className={`
                      h-1.5
                      rounded-full
                      transition-all
                      ${
                        currentImage === index
                          ? "w-5 bg-white"
                          : "w-1.5 bg-white/50"
                      }
                    `}
                    aria-label={`Show image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* =======================================================
            CONTENT AREA
        ======================================================= */}

        <div className="relative flex min-w-0 flex-col p-4 sm:p-6 md:p-7">
          {/* Priority small label */}

          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <span className="truncate text-[10px] font-bold uppercase tracking-[0.16em] text-rose-600">
                {priority}
              </span>

              {verified && (
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-[9px] font-semibold text-blue-600">
                  <FaCheckCircle />
                  Verified
                </span>
              )}
            </div>

            <button
              type="button"
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-slate-200
                bg-white
                text-slate-400
                transition
                hover:border-rose-200
                hover:bg-rose-50
                hover:text-rose-500
              "
              aria-label="Add to favorites"
            >
              <FaHeart className="text-sm" />
            </button>
          </div>

          {/* Title */}

          <Link
            to={profileLink}
            className="
              mt-3
              line-clamp-2
              text-[17px]
              font-bold
              leading-[1.25]
              text-slate-950
              transition
              hover:text-rose-600
              sm:text-xl
            "
          >
            {title}
          </Link>

          {/* Name */}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-slate-800">
              {name}
            </span>

            {verified && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-[9px] text-blue-600">
                <FaCheckCircle />
              </span>
            )}

            {age && (
              <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-500">
                {age} Years
              </span>
            )}
          </div>

          {/* Highlight strip */}

          <div
            className="
              mt-4
              rounded-xl
              border
              border-rose-100
              bg-gradient-to-r
              from-rose-50
              via-white
              to-violet-50
              px-3
              py-2.5
            "
          >
            <div className="flex items-center gap-2">
              <FaStar className="shrink-0 text-xs text-amber-400" />

              <p className="line-clamp-2 text-[11px] font-semibold leading-5 text-slate-600">
                Professional profile available for
                bookings, collaborations and modelling
                opportunities.
              </p>
            </div>
          </div>

          {/* Description */}

          <p className="mt-4 line-clamp-3 text-xs leading-5 text-slate-500 sm:text-sm">
            {description}
          </p>

          {/* Information */}

          <div className="mt-4 space-y-2.5">
            {age && (
              <InfoRow
                icon={FaUser}
                value={`${age} Years`}
              />
            )}

            <InfoRow
              icon={FaMapMarkerAlt}
              value={
                <>
                  <span className="font-semibold text-slate-800">
                    {city}
                  </span>

                  {state && (
                    <>
                      <span className="mx-1 text-slate-300">
                        /
                      </span>

                      <span>{state}</span>
                    </>
                  )}
                </>
              }
            />

            <InfoRow
              icon={FaBriefcase}
              value={category}
            />
          </div>

          {/* Bottom */}

          <div className="mt-auto pt-5">
            <div className="mb-3 flex items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-medium text-slate-400">
                  Starting from
                </p>

                <p className="mt-0.5 text-lg font-bold text-rose-600">
                  {formatPrice(listing?.price)}
                </p>
              </div>

              <span className="rounded-full border border-rose-100 bg-rose-50 px-3 py-1.5 text-[10px] font-semibold text-rose-600">
                {category}
              </span>
            </div>

            {/* Action buttons */}

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={
                  whatsapp
                    ? `https://wa.me/${normalizePhone(
                        whatsapp
                      )}`
                    : undefined
                }
                target="_blank"
                rel="noreferrer"
                className="
                  flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#0aae52]
                  text-xs
                  font-bold
                  text-white
                  shadow-lg
                  shadow-emerald-500/10
                  transition-all
                  hover:-translate-y-0.5
                  hover:bg-[#079447]
                  active:translate-y-0
                "
              >
                <FaWhatsapp className="text-base" />
                <span>WhatsApp</span>
              </a>

              <a
                href={
                  phone
                    ? `tel:${phone}`
                    : undefined
                }
                className="
                  flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-slate-950
                  text-xs
                  font-bold
                  text-white
                  shadow-lg
                  shadow-slate-950/10
                  transition-all
                  hover:-translate-y-0.5
                  hover:bg-rose-600
                  active:translate-y-0
                "
              >
                <FaPhoneAlt className="text-xs" />
                <span>Call</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ===============================================================
   PRIORITY BADGE
=============================================================== */

function PriorityBadge({ type }) {
  if (type === "highlight") {
    return (
      <div
        className="
          flex
          items-center
          gap-1.5
          rounded-full
          border
          border-white/20
          bg-gradient-to-r
          from-rose-600
          to-red-500
          px-3
          py-1.5
          text-[9px]
          font-bold
          uppercase
          tracking-wide
          text-white
          shadow-lg
          shadow-red-900/20
        "
      >
        <FaBolt />
        Highlight
      </div>
    );
  }

  if (type === "top") {
    return (
      <div
        className="
          flex
          items-center
          gap-1.5
          rounded-full
          border
          border-white/20
          bg-gradient-to-r
          from-orange-500
          to-amber-500
          px-3
          py-1.5
          text-[9px]
          font-bold
          uppercase
          tracking-wide
          text-white
          shadow-lg
        "
      >
        <FaFire />
        Top
      </div>
    );
  }

  return (
    <div
      className="
        flex
        items-center
        gap-1.5
        rounded-full
        border
        border-white/20
        bg-gradient-to-r
        from-violet-600
        to-fuchsia-500
        px-3
        py-1.5
        text-[9px]
        font-bold
        uppercase
        tracking-wide
        text-white
        shadow-lg
      "
    >
      <FaCrown />
      Premium
    </div>
  );
}

/* ===============================================================
   INFO ROW
=============================================================== */

function InfoRow({ icon: Icon, value }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 text-xs text-slate-500">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
        <Icon className="text-[10px]" />
      </div>

      <div className="min-w-0 truncate">
        {value}
      </div>
    </div>
  );
}

/* ===============================================================
   PRIORITY CHIP
=============================================================== */

function PriorityChip({
  icon: Icon,
  label,
  color,
}) {
  const classes = {
    rose:
      "border-rose-100 bg-rose-50 text-rose-600",
    orange:
      "border-orange-100 bg-orange-50 text-orange-600",
    violet:
      "border-violet-100 bg-violet-50 text-violet-600",
  };

  return (
    <div
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        px-3.5
        py-2
        text-xs
        font-semibold
        ${classes[color]}
      `}
    >
      <Icon className="text-[10px]" />

      {label}
    </div>
  );
}

/* ===============================================================
   HERO STAT
=============================================================== */

function HeroStat({ value, label }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-center">
      <p className="text-xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
    </div>
  );
}

/* ===============================================================
   LOADING
=============================================================== */

function PremiumLoading() {
  return (
    <div className="space-y-5">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="
            overflow-hidden
            rounded-[25px]
            border
            border-slate-200
            bg-white
          "
        >
          <div className="grid min-h-[370px] grid-cols-[39%_61%] md:grid-cols-[300px_1fr]">
            <div className="animate-pulse bg-slate-200" />

            <div className="space-y-4 p-5 sm:p-7">
              <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

              <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200" />

              <div className="h-16 w-full animate-pulse rounded-xl bg-slate-100" />

              <div className="space-y-3">
                <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />

                <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />

                <div className="h-4 w-1/3 animate-pulse rounded bg-slate-100" />
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="h-11 animate-pulse rounded-xl bg-slate-100" />

                <div className="h-11 animate-pulse rounded-xl bg-slate-100" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ===============================================================
   EMPTY
=============================================================== */

function EmptyPremium() {
  return (
    <div className="rounded-[30px] border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
        <FaCrown className="text-xl" />
      </div>

      <h2 className="mt-5 text-2xl font-bold text-slate-950">
        Premium profiles are coming soon
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        There are currently no homepage highlights, top
        profiles or premium profiles available.
      </p>

      <Link
        to="/listings"
        className="
          mt-7
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-slate-950
          px-5
          py-3
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-rose-600
        "
      >
        Browse all profiles
        <FaArrowRight className="text-xs" />
      </Link>
    </div>
  );
}

/* ===============================================================
   IMAGE HELPERS
=============================================================== */

function getListingImages(listing) {
  const source =
    listing?.images ||
    listing?.photos ||
    listing?.profileImages ||
    [];

  if (!Array.isArray(source) || source.length === 0) {
    return [getFallbackImage()];
  }

  const validImages = source
    .map((image) => {
      if (typeof image === "string") {
        return image;
      }

      if (typeof image === "object") {
        return (
          image?.url ||
          image?.secure_url ||
          image?.path ||
          image?.src ||
          ""
        );
      }

      return "";
    })
    .filter(Boolean);

  return validImages.length > 0
    ? validImages
    : [getFallbackImage()];
}

function getFallbackImage() {
  return "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80";
}

/* ===============================================================
   PRICE
=============================================================== */

function formatPrice(price) {
  if (
    price === undefined ||
    price === null ||
    price === ""
  ) {
    return "Contact";
  }

  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return String(price);
  }

  return `₹${numericPrice.toLocaleString("en-IN")}`;
}

/* ===============================================================
   PHONE
=============================================================== */

function normalizePhone(phone) {
  if (!phone) {
    return "";
  }

  let cleaned = String(phone).replace(/\D/g, "");

  /*
    India number support.
  */

  if (
    cleaned.length === 10 &&
    !cleaned.startsWith("91")
  ) {
    cleaned = `91${cleaned}`;
  }

  return cleaned;
}

export default Premium;