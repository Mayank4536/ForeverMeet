import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getListings } from "../../services/listingService";

const ITEMS_PER_PAGE = 10;

function CityListings() {
  const { city } = useParams();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const cityName = useMemo(() => {
    if (!city) {
      return "";
    }

    return city
      .split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");
  }, [city]);

  // =========================================================
  // SCROLL TO TOP
  // =========================================================

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [city]);

  // =========================================================
  // FETCH CITY LISTINGS
  // =========================================================

  useEffect(() => {
    const fetchCityListings = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getListings({
          city: cityName,
          page: 1,
          limit: 1000,
        });

        const listingData =
          data?.listings ||
          data?.data?.listings ||
          data?.data ||
          [];

        setListings(
          Array.isArray(listingData)
            ? listingData
            : []
        );
      } catch (err) {
        console.error("City listings error:", err);

        setError(
          err?.message ||
            `Unable to load ${cityName} model listings.`
        );

        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    if (cityName) {
      fetchCityListings();
    }
  }, [cityName]);

  // =========================================================
  // SORT NEWEST FIRST
  // =========================================================

  const sortedListings = useMemo(() => {
    return [...listings].sort((a, b) => {
      const dateA = new Date(
        a?.createdAt || a?.updatedAt || 0
      ).getTime();

      const dateB = new Date(
        b?.createdAt || b?.updatedAt || 0
      ).getTime();

      return dateB - dateA;
    });
  }, [listings]);

  // =========================================================
  // PAGINATION
  // =========================================================

  const totalPages = Math.ceil(
    sortedListings.length / ITEMS_PER_PAGE
  );

  const paginatedListings = useMemo(() => {
    const startIndex =
      (currentPage - 1) * ITEMS_PER_PAGE;

    return sortedListings.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [sortedListings, currentPage]);

  // =========================================================
  // RESET PAGE
  // =========================================================

  useEffect(() => {
    setCurrentPage(1);
  }, [city]);

  // =========================================================
  // IMAGE
  // =========================================================

  const getImage = (listing) => {
    if (
      Array.isArray(listing?.images) &&
      listing.images.length > 0
    ) {
      const firstImage = listing.images[0];

      if (typeof firstImage === "string") {
        return firstImage;
      }

      if (firstImage?.url) {
        return firstImage.url;
      }
    }

    return "https://via.placeholder.com/600x800?text=ForeverMeet";
  };

  // =========================================================
  // CHANGE PAGE
  // =========================================================

  const changePage = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // PAGE NUMBERS
  // =========================================================

  const pageNumbers = useMemo(() => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(
      2,
      currentPage - 1
    );

    const end = Math.min(
      totalPages - 1,
      currentPage + 1
    );

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8f8fa]">

      {/* =====================================================
          PROFESSIONAL ANIMATED BACKGROUND
      ===================================================== */}

      <style>
        {`
          @keyframes fmFadeUp {
            from {
              opacity: 0;
              transform: translateY(22px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fmFadeIn {
            from {
              opacity: 0;
            }

            to {
              opacity: 1;
            }
          }

          @keyframes fmFloat {
            0%,
            100% {
              transform: translate3d(0, 0, 0) scale(1);
            }

            50% {
              transform: translate3d(20px, -25px, 0) scale(1.05);
            }
          }

          @keyframes fmFloatReverse {
            0%,
            100% {
              transform: translate3d(0, 0, 0) scale(1);
            }

            50% {
              transform: translate3d(-25px, 20px, 0) scale(1.08);
            }
          }

          @keyframes fmShimmer {
            0% {
              transform: translateX(-120%);
            }

            100% {
              transform: translateX(120%);
            }
          }

          @keyframes fmCardIn {
            from {
              opacity: 0;
              transform: translateY(18px) scale(0.985);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes fmPulseGlow {
            0%,
            100% {
              box-shadow: 0 0 0 rgba(220, 38, 38, 0);
            }

            50% {
              box-shadow: 0 0 30px rgba(220, 38, 38, 0.12);
            }
          }

          @keyframes fmGradient {
            0% {
              background-position: 0% 50%;
            }

            50% {
              background-position: 100% 50%;
            }

            100% {
              background-position: 0% 50%;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              scroll-behavior: auto !important;
            }
          }
        `}
      </style>

      {/* BACKGROUND GRID */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.35]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(220, 38, 38, 0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(220, 38, 38, 0.035) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "55px 55px",
        }}
      />

      {/* TOP RED GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -left-32
          -top-40
          h-[430px]
          w-[430px]
          rounded-full
          bg-red-500/[0.08]
          blur-[110px]
        "
        style={{
          animation: "fmFloat 9s ease-in-out infinite",
        }}
      />

      {/* TOP PURPLE GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          top-20
          h-[500px]
          w-[500px]
          rounded-full
          bg-purple-500/[0.07]
          blur-[130px]
        "
        style={{
          animation:
            "fmFloatReverse 11s ease-in-out infinite",
        }}
      />

      {/* CENTER GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[500px]
          h-[450px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-pink-500/[0.035]
          blur-[130px]
        "
        style={{
          animation: "fmFloat 13s ease-in-out infinite",
        }}
      />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          border-b
          border-gray-200/80
          bg-white/90
          backdrop-blur-xl
        "
        style={{
          animation: "fmFadeIn 0.7s ease-out both",
        }}
      >

        {/* Header decorative gradient */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-red-500/40
            to-transparent
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            h-32
            w-64
            bg-gradient-to-bl
            from-red-500/[0.06]
            to-transparent
          "
        />

        <div className="relative mx-auto max-w-6xl px-3 py-5 sm:px-4 sm:py-7">

          <Link
            to="/cities"
            className="
              inline-flex
              items-center
              gap-1
              text-xs
              font-semibold
              text-gray-500
              transition-all
              duration-300
              hover:-translate-x-1
              hover:text-red-600
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15 19-7-7 7-7"
              />
            </svg>

            All Cities
          </Link>

          <p
            className="
              mt-4
              text-xs
              font-semibold
              text-red-600
            "
            style={{
              animation: "fmFadeUp 0.6s 0.1s ease-out both",
            }}
          >
            ForeverMeet
          </p>

          <h1
            className="
              mt-1
              text-2xl
              font-bold
              tracking-tight
              text-gray-900
              sm:text-3xl
            "
            style={{
              animation: "fmFadeUp 0.7s 0.18s ease-out both",
            }}
          >
            Models in {cityName}
          </h1>

          <p
            className="
              mt-1.5
              max-w-2xl
              text-sm
              leading-6
              text-gray-500
            "
            style={{
              animation: "fmFadeUp 0.7s 0.25s ease-out both",
            }}
          >
            Discover professional model profiles available
            in {cityName}, India.
          </p>

          {!loading && !error && (
            <div
              className="mt-3"
              style={{
                animation: "fmFadeUp 0.7s 0.32s ease-out both",
              }}
            >

              <span
                className="
                  inline-flex
                  items-center
                  rounded-full
                  border
                  border-gray-200
                  bg-gray-100
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-gray-700
                  shadow-sm
                  transition-all
                  duration-300
                  hover:border-red-200
                  hover:bg-red-50
                  hover:text-red-600
                "
              >
                {listings.length} Model Profiles
              </span>

            </div>
          )}

        </div>

      </section>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main
        className="
          relative
          mx-auto
          max-w-6xl
          px-2.5
          py-5
          sm:px-4
          sm:py-7
        "
      >

        {/* =====================================================
            DECORATIVE SECTION LABEL
        ===================================================== */}

        {!loading &&
          !error &&
          paginatedListings.length > 0 && (
            <div
              className="
                pointer-events-none
                absolute
                left-0
                top-0
                h-40
                w-40
                rounded-full
                bg-red-500/[0.025]
                blur-3xl
              "
            />
          )}

        {/* =====================================================
            LOADING
        ===================================================== */}

        {loading && (
          <div className="space-y-5">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="
                  relative
                  flex
                  min-h-[255px]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  shadow-sm
                "
              >

                {/* Animated shimmer */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    left-0
                    z-10
                    w-1/3
                    bg-gradient-to-r
                    from-transparent
                    via-white/50
                    to-transparent
                  "
                  style={{
                    animation:
                      "fmShimmer 1.6s ease-in-out infinite",
                  }}
                />

                <div
                  className="
                    w-[145px]
                    shrink-0
                    animate-pulse
                    bg-gray-200
                    sm:w-[175px]
                    md:w-[190px]
                  "
                />

                <div
                  className="
                    flex-1
                    space-y-3
                    p-3
                    sm:p-4
                  "
                >

                  <div className="h-5 w-4/5 animate-pulse rounded bg-gray-200" />

                  <div className="h-4 w-full animate-pulse rounded bg-gray-200" />

                  <div className="h-4 w-11/12 animate-pulse rounded bg-gray-200" />

                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />

                  <div className="mt-8 h-4 w-32 animate-pulse rounded bg-gray-200" />

                  <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />

                </div>

              </div>
            ))}

          </div>
        )}

        {/* =====================================================
            ERROR
        ===================================================== */}

        {!loading && error && (
          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-red-200
              bg-white
              px-5
              py-12
              text-center
              shadow-lg
              shadow-red-100/40
            "
            style={{
              animation: "fmFadeUp 0.6s ease-out both",
            }}
          >

            <div
              className="
                absolute
                left-1/2
                top-0
                h-1
                w-32
                -translate-x-1/2
                rounded-b-full
                bg-red-500
              "
            />

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-red-100
                text-xl
                font-bold
                text-red-600
              "
            >
              !
            </div>

            <h2 className="mt-4 text-lg font-semibold text-red-700">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>

          </div>
        )}

        {/* =====================================================
            NO LISTINGS
        ===================================================== */}

        {!loading &&
          !error &&
          listings.length === 0 && (
            <div
              className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                px-5
                py-16
                text-center
                shadow-lg
                shadow-gray-200/50
              "
              style={{
                animation: "fmFadeUp 0.7s ease-out both",
              }}
            >

              <div
                className="
                  absolute
                  left-1/2
                  top-0
                  h-1
                  w-24
                  -translate-x-1/2
                  rounded-b-full
                  bg-gradient-to-r
                  from-red-500
                  to-pink-500
                "
              />

              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-100
                  transition-all
                  duration-500
                  hover:scale-110
                  hover:bg-red-50
                "
              >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m20 20-3.5-3.5"
                  />
                </svg>

              </div>

              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                No model listings found
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                There are currently no public model profiles
                available in {cityName}.
              </p>

              <Link
                to="/cities"
                className="
                  mt-5
                  inline-flex
                  items-center
                  rounded-lg
                  bg-red-600
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-red-600/20
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-red-700
                  hover:shadow-red-600/30
                "
              >
                Browse Other Cities
              </Link>

            </div>
          )}

        {/* =====================================================
            LISTINGS
        ===================================================== */}

        {!loading &&
          !error &&
          paginatedListings.length > 0 && (
            <section>

              <div
                className="
                  relative
                  mb-4
                  flex
                  items-end
                  justify-between
                  gap-3
                "
                style={{
                  animation: "fmFadeUp 0.6s ease-out both",
                }}
              >

                <div>

                  <h2
                    className="
                      text-xl
                      font-bold
                      tracking-tight
                      text-gray-900
                      sm:text-2xl
                    "
                  >
                    {cityName} Model Listings
                  </h2>

                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    Latest profiles are shown first.
                  </p>

                </div>

                <div
                  className="
                    shrink-0
                    rounded-full
                    border
                    border-gray-200
                    bg-white
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-gray-500
                    shadow-sm
                  "
                >
                  Page {currentPage} of {totalPages}
                </div>

              </div>

              <div className="space-y-5">

                {paginatedListings.map((listing) => (
                  <CityListingCard
                    key={listing?._id}
                    listing={listing}
                    getImage={getImage}
                  />
                ))}

              </div>

              {/* PAGINATION */}

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  pageNumbers={pageNumbers}
                  changePage={changePage}
                />
              )}

            </section>
          )}

      </main>

    </div>
  );
}


/* ============================================================
   CITY LISTING CARD

   Automatic image slider added only inside image section.
============================================================ */

function CityListingCard({ listing, getImage }) {

  // =========================================================
  // IMAGE SLIDER
  // =========================================================

  const images = useMemo(() => {

    if (
      !Array.isArray(listing?.images) ||
      listing.images.length === 0
    ) {
      return [getImage(listing)];
    }

    return listing.images
      .map((image) => {
        if (typeof image === "string") {
          return image;
        }

        return image?.url || "";
      })
      .filter(Boolean);

  }, [listing, getImage]);

  const [currentImage, setCurrentImage] = useState(0);

  // =========================================================
  // RESET IMAGE WHEN LISTING CHANGES
  // =========================================================

  useEffect(() => {
    setCurrentImage(0);
  }, [listing?._id]);

  // =========================================================
  // AUTOMATIC IMAGE SLIDE
  // =========================================================

  useEffect(() => {

    if (images.length <= 1) {
      return;
    }

    const interval = setInterval(() => {

      setCurrentImage((previousImage) => {

        if (previousImage >= images.length - 1) {
          return 0;
        }

        return previousImage + 1;
      });

    }, 3000);

    return () => {
      clearInterval(interval);
    };

  }, [images.length]);

  // =========================================================
  // IMAGE ERROR FALLBACK
  // =========================================================

  const handleImageError = (event) => {

    event.currentTarget.src =
      "https://via.placeholder.com/600x800?text=ForeverMeet";

  };

  const modelName =
    listing?.name ||
    listing?.modelName ||
    "Professional Model";

  const category =
    listing?.category ||
    "Model";

  const isPremium = Boolean(listing?.isPremium);

  const listingUrl = `/listing/${
    listing?.slug || listing?._id
  }`;

  return (
    <Link
      to={listingUrl}
      className="
        group
        relative
        flex
        min-h-[250px]
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-sm
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-red-200
        hover:shadow-xl
        hover:shadow-red-100/40
      "
      style={{
        animation: "fmCardIn 0.7s ease-out both",
      }}
    >

      {/* Animated top line */}

      <div
        className="
          absolute
          left-0
          right-0
          top-0
          z-30
          h-[2px]
          origin-left
          scale-x-0
          bg-gradient-to-r
          from-red-500
          via-pink-500
          to-purple-500
          transition-transform
          duration-500
          group-hover:scale-x-100
        "
      />

      {/* =====================================================
          IMAGE
      ===================================================== */}

      <div
        className="
          relative
          w-[145px]
          shrink-0
          overflow-hidden
          bg-gray-100
          sm:w-[175px]
          md:w-[200px]
          lg:w-[220px]
        "
      >

        {/* CURRENT SLIDING IMAGE */}

        <img
          key={images[currentImage]}
          src={images[currentImage]}
          alt={
            listing?.name ||
            listing?.title ||
            "ForeverMeet model"
          }
          onError={handleImageError}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-all
            duration-700
            group-hover:scale-[1.06]
          "
        />

        {/* IMAGE OVERLAY */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/55
            via-transparent
            to-black/10
          "
        />

        {/* IMAGE SHINE */}

        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-0
            z-10
            w-1/3
            -translate-x-[150%]
            bg-gradient-to-r
            from-transparent
            via-white/20
            to-transparent
            transition-transform
            duration-700
            group-hover:translate-x-[450%]
          "
        />

        {/* FOREVERMEET WATERMARK */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            flex
            items-center
            justify-center
          "
        >
          <span
            className="
              rotate-[-18deg]
              select-none
              text-xs
              font-bold
              tracking-[0.12em]
              text-white/30
              transition-all
              duration-500
              group-hover:scale-110
              group-hover:text-white/40
              sm:text-sm
            "
          >
            ForeverMeet
          </span>
        </div>

        {/* VIP BADGE */}

        {isPremium && (
          <div
            className="
              absolute
              right-2
              top-2
              rounded-bl-xl
              rounded-tl-xl
              bg-white
              px-2
              py-1
              text-[10px]
              font-black
              italic
              text-red-600
              shadow-md
            "
            style={{
              animation:
                "fmPulseGlow 2s ease-in-out infinite",
            }}
          >
            VIP
          </div>
        )}

        {/* =================================================
            IMAGE DOTS
        ================================================= */}

        {images.length > 1 && (
          <div
            className="
              absolute
              bottom-2
              left-0
              right-0
              z-10
              flex
              items-center
              justify-center
              gap-1
            "
          >
            {images.map((_, index) => (
              <span
                key={index}
                className={`
                  h-1.5
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    currentImage === index
                      ? "w-4 bg-white"
                      : "w-1.5 bg-white/60"
                  }
                `}
              />
            ))}
          </div>
        )}

      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
          px-3
          py-3
          sm:px-4
          sm:py-4
        "
      >

        <h2
          className="
            line-clamp-3
            text-[17px]
            font-bold
            leading-[1.18]
            text-red-600
            transition-colors
            duration-300
            group-hover:text-red-700
            sm:text-lg
            md:text-xl
          "
        >
          {listing?.title ||
            `${listing?.city || "India"} ${category}`}
        </h2>

        <div className="mt-1.5">
          <span className="text-[13px] font-bold text-gray-900 sm:text-sm">
            {modelName}
          </span>
        </div>

        {listing?.isVerified && (
          <span
            className="
              mt-1
              inline-flex
              items-center
              gap-1
              text-[11px]
              font-semibold
              text-green-600
            "
          >
            <span
              className="
                flex
                h-4
                w-4
                items-center
                justify-center
                rounded-full
                bg-green-500
                text-[9px]
                text-white
                shadow-sm
                shadow-green-500/30
              "
            >
              ✓
            </span>

            Verified Profile
          </span>
        )}

        {listing?.description && (
          <p
            className="
              mt-2
              line-clamp-4
              text-[13px]
              font-medium
              leading-[1.4]
              text-gray-800
              sm:text-sm
            "
          >
            {listing.description}
          </p>
        )}

        <div
          className="
            mt-3
            space-y-1
            text-[13px]
            sm:text-sm
          "
        >

          {listing?.age && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">
                {listing.age} Years
              </span>
            </div>
          )}

          {listing?.city && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">
                {listing.city}
                {listing?.state
                  ? ` / ${listing.state}`
                  : ""}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">
              {listing?.nationality ||
                listing?.country ||
                "Indian"}
            </span>
          </div>

        </div>

        <div className="mt-auto pt-3">

          <div className="flex items-end justify-between gap-2">

            {listing?.price !== undefined &&
              listing?.price !== null &&
              listing?.price !== "" && (
                <div>
                  <p className="text-[10px] text-gray-500">
                    Starting from
                  </p>

                  <p className="text-base font-bold text-gray-900 sm:text-lg">
                    ₹
                    {Number(
                      listing.price
                    ).toLocaleString("en-IN")}
                  </p>
                </div>
              )}

            {listing?.category && (
              <span
                className="
                  rounded-full
                  border
                  border-gray-200
                  bg-gray-100
                  px-2.5
                  py-1
                  text-[10px]
                  font-semibold
                  text-gray-700
                  transition-all
                  duration-300
                  group-hover:border-red-200
                  group-hover:bg-red-50
                  group-hover:text-red-600
                "
              >
                {listing.category}
              </span>
            )}

          </div>

        </div>

      </div>

    </Link>
  );
}


/* ============================================================
   PAGINATION
============================================================ */

function Pagination({
  currentPage,
  totalPages,
  pageNumbers,
  changePage,
}) {
  return (
    <div
      className="
        mt-8
        flex
        flex-wrap
        items-center
        justify-center
        gap-1.5
        sm:gap-2
      "
      style={{
        animation: "fmFadeUp 0.7s ease-out both",
      }}
    >

      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() =>
          changePage(currentPage - 1)
        }
        className="
          flex
          h-9
          min-w-9
          items-center
          justify-center
          rounded-lg
          border
          border-gray-200
          bg-white
          px-2
          text-sm
          font-semibold
          text-gray-700
          shadow-sm
          transition-all
          duration-300
          hover:-translate-x-0.5
          hover:border-red-300
          hover:text-red-600
          hover:shadow-md
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        ←
      </button>

      {pageNumbers.map((page, index) => {

        if (page === "...") {
          return (
            <span
              key={`dots-${index}`}
              className="
                flex
                h-9
                min-w-9
                items-center
                justify-center
                text-sm
                font-semibold
                text-gray-400
              "
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            type="button"
            onClick={() => changePage(page)}
            className={`
              flex
              h-9
              min-w-9
              items-center
              justify-center
              rounded-lg
              border
              px-3
              text-sm
              font-semibold
              transition-all
              duration-300
              ${
                currentPage === page
                  ? "border-red-600 bg-red-600 text-white shadow-lg shadow-red-600/20"
                  : "border-gray-200 bg-white text-gray-700 hover:-translate-y-0.5 hover:border-red-300 hover:text-red-600 hover:shadow-md"
              }
            `}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() =>
          changePage(currentPage + 1)
        }
        className="
          flex
          h-9
          min-w-9
          items-center
          justify-center
          rounded-lg
          border
          border-gray-200
          bg-white
          px-2
          text-sm
          font-semibold
          text-gray-700
          shadow-sm
          transition-all
          duration-300
          hover:translate-x-0.5
          hover:border-red-300
          hover:text-red-600
          hover:shadow-md
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        →
      </button>

    </div>
  );
}

export default CityListings;