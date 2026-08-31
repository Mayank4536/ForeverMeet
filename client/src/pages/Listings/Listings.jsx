import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getListings } from "../../services/listingService";

const ITEMS_PER_PAGE = 10;

const FALLBACK_IMAGE =
  "https://via.placeholder.com/600x800?text=ForeverMeet";

function Listings() {
  // =========================================================
  // SCROLL TO TOP
  // =========================================================

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  // =========================================================
  // FETCH LISTINGS
  // =========================================================

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getListings({
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
        console.error("Listings error:", err);

        setError(
          err?.message ||
            "Unable to load model listings."
        );

        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // =========================================================
  // SORT
  // Premium first + newest first
  // =========================================================

  const sortedListings = useMemo(() => {
    return [...listings].sort((a, b) => {
      const premiumA = Boolean(a?.isPremium);
      const premiumB = Boolean(b?.isPremium);

      // Premium listings first
      if (premiumA !== premiumB) {
        return premiumB - premiumA;
      }

      const dateA = new Date(
        a?.createdAt ||
          a?.updatedAt ||
          0
      ).getTime();

      const dateB = new Date(
        b?.createdAt ||
          b?.updatedAt ||
          0
      ).getTime();

      return dateB - dateA;
    });
  }, [listings]);

  // =========================================================
  // PAGINATION
  // =========================================================

  const totalPages = Math.ceil(
    sortedListings.length /
      ITEMS_PER_PAGE
  );

  const paginatedListings = useMemo(() => {
    const startIndex =
      (currentPage - 1) *
      ITEMS_PER_PAGE;

    const endIndex =
      startIndex + ITEMS_PER_PAGE;

    return sortedListings.slice(
      startIndex,
      endIndex
    );
  }, [
    sortedListings,
    currentPage,
  ]);

  // =========================================================
  // RESET PAGE
  // =========================================================

  useEffect(() => {
    if (
      totalPages > 0 &&
      currentPage > totalPages
    ) {
      setCurrentPage(totalPages);
    }
  }, [
    totalPages,
    currentPage,
  ]);

  // =========================================================
  // GET IMAGE
  // =========================================================

  const getImage = (listing) => {
    if (
      Array.isArray(listing?.images) &&
      listing.images.length > 0
    ) {
      const firstImage =
        listing.images[0];

      if (
        typeof firstImage === "string"
      ) {
        return firstImage;
      }

      if (firstImage?.url) {
        return firstImage.url;
      }
    }

    return FALLBACK_IMAGE;
  };

  // =========================================================
  // CHANGE PAGE
  // =========================================================

  const changePage = (page) => {
    if (
      page < 1 ||
      page > totalPages
    ) {
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
      for (
        let i = 1;
        i <= totalPages;
        i++
      ) {
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

    for (
      let i = start;
      i <= end;
      i++
    ) {
      pages.push(i);
    }

    if (
      currentPage <
      totalPages - 2
    ) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  }, [
    currentPage,
    totalPages,
  ]);

  return (
    <>
      {/* =====================================================
          PREMIUM STYLES
      ===================================================== */}

      <style>{`

        /* =====================================================
           ANIMATIONS
        ===================================================== */

        @keyframes forevermeetFadeUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes forevermeetGlow {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(1);
          }

          50% {
            opacity: 0.7;
            transform: scale(1.08);
          }
        }

        @keyframes forevermeetShimmer {
          0% {
            transform: translateX(-140%);
          }

          100% {
            transform: translateX(160%);
          }
        }

        @keyframes forevermeetFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-3px);
          }
        }

        @keyframes forevermeetStarPulse {
          0%,
          100% {
            transform: scale(1)
              rotate(0deg);
            filter:
              drop-shadow(
                0 0 0
                rgba(255,255,255,0)
              );
          }

          50% {
            transform: scale(1.18)
              rotate(8deg);
            filter:
              drop-shadow(
                0 0 7px
                rgba(255,255,255,0.75)
              );
          }
        }

        @keyframes forevermeetPremiumGlow {
          0%,
          100% {
            box-shadow:
              0 18px 50px
              rgba(127, 29, 29, 0.10),
              0 0 0 1px
              rgba(255,255,255,0.8)
              inset;
          }

          50% {
            box-shadow:
              0 22px 65px
              rgba(127, 29, 29, 0.15),
              0 0 24px
              rgba(220, 38, 38, 0.07),
              0 0 0 1px
              rgba(255,255,255,0.8)
              inset;
          }
        }

        @keyframes forevermeetTitleGradient {
          0% {
            background-position: 0% center;
          }

          100% {
            background-position: 250% center;
          }
        }

        @keyframes forevermeetPremiumBadge {
          0%,
          100% {
            transform:
              translateY(0);
          }

          50% {
            transform:
              translateY(-2px);
          }
        }

        /* =====================================================
           PAGE
        ===================================================== */

        .forevermeet-page {
          position: relative;
          overflow: hidden;

          background:
            radial-gradient(
              circle at 10% 5%,
              rgba(239, 68, 68, 0.10),
              transparent 28%
            ),
            radial-gradient(
              circle at 90% 15%,
              rgba(244, 63, 94, 0.09),
              transparent 25%
            ),
            radial-gradient(
              circle at 50% 80%,
              rgba(251, 113, 133, 0.06),
              transparent 30%
            ),
            linear-gradient(
              135deg,
              #ffffff,
              #fff7f8 45%,
              #ffffff
            );
        }

        .forevermeet-page::before {
          content: "";

          position: absolute;

          width: 420px;
          height: 420px;

          top: 80px;
          left: -180px;

          border-radius: 9999px;

          background:
            rgba(239, 68, 68, 0.08);

          filter: blur(80px);

          pointer-events: none;

          animation:
            forevermeetGlow
            8s
            ease-in-out
            infinite;
        }

        .forevermeet-page::after {
          content: "";

          position: absolute;

          width: 420px;
          height: 420px;

          right: -180px;
          top: 450px;

          border-radius: 9999px;

          background:
            rgba(244, 63, 94, 0.08);

          filter: blur(80px);

          pointer-events: none;

          animation:
            forevermeetGlow
            10s
            ease-in-out
            infinite
            reverse;
        }

        .forevermeet-content {
          position: relative;
          z-index: 2;
        }

        /* =====================================================
           HEADER
        ===================================================== */

        .forevermeet-header {
          position: relative;
          overflow: hidden;

          background:
            radial-gradient(
              circle at 85% 20%,
              rgba(220, 38, 38, 0.12),
              transparent 25%
            ),
            linear-gradient(
              135deg,
              #ffffff,
              #fff7f8
            );
        }

        .forevermeet-header::after {
          content: "";

          position: absolute;

          width: 260px;
          height: 260px;

          right: -100px;
          top: -130px;

          border-radius: 9999px;

          background:
            rgba(220, 38, 38, 0.08);

          filter: blur(50px);

          animation:
            forevermeetGlow
            7s
            ease-in-out
            infinite;
        }

        /* =====================================================
           CARD ENTRANCE
        ===================================================== */

        .forevermeet-card {
          animation:
            forevermeetFadeUp
            0.65s
            ease
            both;
        }

        .forevermeet-card:nth-child(2) {
          animation-delay: 0.06s;
        }

        .forevermeet-card:nth-child(3) {
          animation-delay: 0.12s;
        }

        .forevermeet-card:nth-child(4) {
          animation-delay: 0.18s;
        }

        .forevermeet-card:nth-child(5) {
          animation-delay: 0.24s;
        }

        .forevermeet-card:nth-child(6) {
          animation-delay: 0.30s;
        }

        .forevermeet-card:nth-child(7) {
          animation-delay: 0.36s;
        }

        .forevermeet-card:nth-child(8) {
          animation-delay: 0.42s;
        }

        .forevermeet-card:nth-child(9) {
          animation-delay: 0.48s;
        }

        .forevermeet-card:nth-child(10) {
          animation-delay: 0.54s;
        }

        /* =====================================================
           PREMIUM CARD
        ===================================================== */

        .forevermeet-premium {
          position: relative;

          border:
            1px solid
            rgba(220, 38, 38, 0.24);

          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,0.99),
              rgba(255,248,249,0.99)
            );

          animation:
            forevermeetFadeUp
            0.65s
            ease
            both,

            forevermeetPremiumGlow
            5s
            ease-in-out
            infinite;
        }

        .forevermeet-premium::before {
          content: "";

          position: absolute;

          inset: 0;

          border-radius: inherit;

          pointer-events: none;

          background:
            linear-gradient(
              120deg,
              transparent 20%,
              rgba(255,255,255,0.72) 50%,
              transparent 80%
            );

          transform:
            translateX(-140%);

          opacity: 0;

          z-index: 50;
        }

        .forevermeet-premium:hover::before {
          opacity: 1;

          animation:
            forevermeetShimmer
            1.25s
            ease;
        }

        .forevermeet-premium:hover {
          transform:
            translateY(-6px);

          border-color:
            rgba(220, 38, 38, 0.42);

          box-shadow:
            0 28px 75px
            rgba(127, 29, 29, 0.17),
            0 0 28px
            rgba(220, 38, 38, 0.08);
        }

        /* =====================================================
           PREMIUM IMAGE
        ===================================================== */

        .forevermeet-premium-image img {
          transition:
            transform 0.8s
            cubic-bezier(
              0.2,
              0.8,
              0.2,
              1
            ),
            filter 0.5s ease;
        }

        .forevermeet-premium:hover
        .forevermeet-premium-image img {
          transform:
            scale(1.065);

          filter:
            saturate(1.06)
            contrast(1.02);
        }

        /* =====================================================
           PREMIUM BADGE
        ===================================================== */

        .forevermeet-premium-badge {
          position: relative;

          display: inline-flex;

          align-items: center;

          gap: 5px;

          overflow: hidden;

          background:
            linear-gradient(
              135deg,
              #7f1d1d 0%,
              #991b1b 25%,
              #dc2626 55%,
              #ef4444 75%,
              #991b1b 100%
            );

          color: #ffffff;

          border:
            1px solid
            rgba(255,255,255,0.35);

          box-shadow:
            0 8px 25px
            rgba(153, 27, 27, 0.32);

          animation:
            forevermeetPremiumBadge
            3s
            ease-in-out
            infinite;
        }

        .forevermeet-premium-badge::before {
          content: "";

          position: absolute;

          inset: 0;

          background:
            linear-gradient(
              110deg,
              transparent 25%,
              rgba(255,255,255,0.40) 50%,
              transparent 75%
            );

          transform:
            translateX(-140%)
            skewX(-20deg);

          animation:
            forevermeetShimmer
            3.8s
            ease-in-out
            infinite;
        }

        .forevermeet-premium-star {
          position: relative;

          z-index: 2;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          color: #fff7b2;

          font-size: 15px;

          animation:
            forevermeetStarPulse
            2s
            ease-in-out
            infinite;
        }

        .forevermeet-premium-text {
          position: relative;

          z-index: 2;

          font-size: 10px;

          font-weight: 900;

          letter-spacing:
            0.14em;

          text-shadow:
            0 1px 2px
            rgba(0,0,0,0.25);
        }

        /* =====================================================
           PREMIUM TITLE
        ===================================================== */

        .forevermeet-premium-title {
          background:
            linear-gradient(
              90deg,
              #7f1d1d,
              #991b1b,
              #dc2626,
              #ef4444,
              #991b1b,
              #7f1d1d
            );

          background-size:
            250% auto;

          -webkit-background-clip:
            text;

          background-clip:
            text;

          color:
            transparent;

          animation:
            forevermeetTitleGradient
            5s
            linear
            infinite;
        }

        /* =====================================================
           VERIFIED
        ===================================================== */

        .forevermeet-verified-icon {
          animation:
            forevermeetFloat
            2.5s
            ease-in-out
            infinite;
        }

        /* =====================================================
           BUTTONS
        ===================================================== */

        .forevermeet-premium-button {
          transition:
            transform 0.2s ease,
            box-shadow 0.25s ease,
            filter 0.25s ease;
        }

        .forevermeet-premium-button:hover {
          transform:
            translateY(-2px);

          filter:
            brightness(1.05);
        }

        .forevermeet-premium-button:active {
          transform:
            scale(0.97);
        }

        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 640px) {

          .forevermeet-premium {
            box-shadow:
              0 12px 32px
              rgba(127, 29, 29, 0.10);
          }

          .forevermeet-premium:hover {
            transform:
              translateY(-2px);
          }

          .forevermeet-premium-badge {
            gap: 3px;
          }

          .forevermeet-premium-star {
            font-size: 13px;
          }

          .forevermeet-premium-text {
            font-size: 8px;
            letter-spacing:
              0.10em;
          }
        }

        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {

          .forevermeet-page *,
          .forevermeet-page::before,
          .forevermeet-page::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* =====================================================
          PAGE
      ===================================================== */}

      <div className="forevermeet-page min-h-screen">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <section
          className="
            forevermeet-header
            border-b
            border-gray-200
          "
        >
          <div
            className="
              forevermeet-content
              mx-auto
              max-w-6xl
              px-3
              py-6
              sm:px-4
              sm:py-8
            "
          >
            <p
              className="
                text-xs
                font-semibold
                text-red-600
                sm:text-sm
              "
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
            >
              Browse Model Profiles
            </h1>

            <p
              className="
                mt-1.5
                max-w-2xl
                text-sm
                leading-6
                text-gray-500
              "
            >
              Discover professional model profiles
              from different cities across India.
            </p>

            {!loading &&
              !error && (
                <div className="mt-3">
                  <span
                    className="
                      inline-flex
                      items-center
                      rounded-full
                      border
                      border-red-100
                      bg-white/80
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-gray-700
                      shadow-sm
                      backdrop-blur-sm
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
            forevermeet-content
            mx-auto
            max-w-6xl
            px-2.5
            py-5
            sm:px-4
            sm:py-7
          "
        >

          {/* ===================================================
              LOADING
          =================================================== */}

          {loading && (
            <div className="space-y-5">

              {[1, 2, 3, 4].map(
                (item) => (
                  <div
                    key={item}
                    className="
                      flex
                      min-h-[255px]
                      overflow-hidden
                      rounded-2xl
                      border
                      border-gray-200
                      bg-white/80
                      shadow-sm
                      backdrop-blur-sm
                    "
                  >
                    <div
                      className="
                        w-[145px]
                        shrink-0
                        animate-pulse
                        bg-gradient-to-br
                        from-gray-200
                        via-gray-100
                        to-gray-200
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
                      <div
                        className="
                          h-5
                          w-4/5
                          animate-pulse
                          rounded
                          bg-gray-200
                        "
                      />

                      <div
                        className="
                          h-4
                          w-full
                          animate-pulse
                          rounded
                          bg-gray-200
                        "
                      />

                      <div
                        className="
                          h-4
                          w-11/12
                          animate-pulse
                          rounded
                          bg-gray-200
                        "
                      />

                      <div
                        className="
                          h-4
                          w-3/4
                          animate-pulse
                          rounded
                          bg-gray-200
                        "
                      />

                      <div
                        className="
                          mt-8
                          h-4
                          w-32
                          animate-pulse
                          rounded
                          bg-gray-200
                        "
                      />

                      <div
                        className="
                          h-4
                          w-40
                          animate-pulse
                          rounded
                          bg-gray-200
                        "
                      />
                    </div>
                  </div>
                )
              )}

            </div>
          )}

          {/* ===================================================
              ERROR
          =================================================== */}

          {!loading && error && (
            <div
              className="
                rounded-2xl
                border
                border-red-200
                bg-red-50
                px-5
                py-12
                text-center
                shadow-sm
              "
            >
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

              <h2
                className="
                  mt-4
                  text-lg
                  font-semibold
                  text-red-700
                "
              >
                Something went wrong
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  text-red-600
                "
              >
                {error}
              </p>
            </div>
          )}

          {/* ===================================================
              NO LISTINGS
          =================================================== */}

          {!loading &&
            !error &&
            listings.length === 0 && (
              <div
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white/90
                  px-5
                  py-16
                  text-center
                  shadow-sm
                  backdrop-blur-sm
                "
              >
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
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="
                      h-7
                      w-7
                      text-gray-400
                    "
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

                <h2
                  className="
                    mt-4
                    text-xl
                    font-semibold
                    text-gray-900
                  "
                >
                  No model listings found
                </h2>

                <p
                  className="
                    mt-2
                    text-sm
                    text-gray-500
                  "
                >
                  There are currently no public
                  model profiles available.
                </p>
              </div>
            )}

          {/* ===================================================
              LISTINGS
          =================================================== */}

          {!loading &&
            !error &&
            paginatedListings.length > 0 && (
              <section>

                <div
                  className="
                    mb-4
                    flex
                    items-end
                    justify-between
                    gap-3
                  "
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
                      Model Listings
                    </h2>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-gray-500
                        sm:text-sm
                      "
                    >
                      Premium profiles are shown first.
                    </p>
                  </div>

                  <div
                    className="
                      shrink-0
                      rounded-full
                      border
                      border-gray-200
                      bg-white/80
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-gray-500
                      shadow-sm
                      backdrop-blur-sm
                    "
                  >
                    Page {currentPage} of{" "}
                    {totalPages}
                  </div>
                </div>

                {/* CARDS */}

                <div className="space-y-5">

                  {paginatedListings.map(
                    (listing) => (
                      <ListingCard
                        key={listing?._id}
                        listing={listing}
                        getImage={getImage}
                      />
                    )
                  )}

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
    </>
  );
}

/* ============================================================
   LISTING CARD
============================================================ */

function ListingCard({
  listing,
  getImage,
}) {
  const images =
    Array.isArray(listing?.images) &&
    listing.images.length > 0
      ? listing.images
      : [
          {
            url: getImage(listing),
          },
        ];

  const [currentImage, setCurrentImage] =
    useState(0);

  // =========================================================
  // AUTO SLIDESHOW
  // =========================================================

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentImage(
        (previous) =>
          previous >=
          images.length - 1
            ? 0
            : previous + 1
      );
    }, 3500);

    return () =>
      clearInterval(interval);
  }, [images.length]);

  // =========================================================
  // IMAGE CONTROLS
  // =========================================================

  const nextImage = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setCurrentImage(
      (previous) =>
        previous >=
        images.length - 1
          ? 0
          : previous + 1
    );
  };

  const previousImage = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setCurrentImage(
      (previous) =>
        previous <= 0
          ? images.length - 1
          : previous - 1
    );
  };

  const selectImage = (
    event,
    index
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setCurrentImage(index);
  };

  // =========================================================
  // CURRENT IMAGE
  // =========================================================

  const currentImageData =
    images[currentImage];

  const imageUrl =
    typeof currentImageData === "string"
      ? currentImageData
      : currentImageData?.url ||
        getImage(listing);

  // =========================================================
  // STATUS
  // =========================================================

  const isPremium = Boolean(
    listing?.isPremium
  );

  const isFeatured = Boolean(
    listing?.isFeatured
  );

  const isTrending = Boolean(
    listing?.isTrending
  );

  const isVerified = Boolean(
    listing?.isVerified
  );

  // =========================================================
  // MODEL
  // =========================================================

  const modelName =
    listing?.name ||
    listing?.modelName ||
    "Professional Model";

  // =========================================================
  // CONTACT
  // =========================================================

  const phoneNumber =
    listing?.phone ||
    listing?.contactNumber ||
    "";

  const whatsappNumber =
    listing?.whatsapp ||
    listing?.whatsappNumber ||
    phoneNumber ||
    "";

  // =========================================================
  // WHATSAPP
  // =========================================================

  const cleanWhatsappNumber =
    String(whatsappNumber).replace(
      /\D/g,
      ""
    );

  const whatsappUrl =
    cleanWhatsappNumber
      ? `https://wa.me/${cleanWhatsappNumber}`
      : "";

  // =========================================================
  // CALL
  // =========================================================

  const cleanPhoneNumber =
    String(phoneNumber).replace(
      /[^\d+]/g,
      ""
    );

  const callUrl =
    cleanPhoneNumber
      ? `tel:${cleanPhoneNumber}`
      : "";

  // =========================================================
  // URL
  // =========================================================

  const listingUrl = `/listing/${
    listing?.slug ||
    listing?._id
  }`;

  // =========================================================
  // NATIONALITY
  // =========================================================

  const nationality =
    listing?.nationality ||
    listing?.country ||
    "Indian";

  // =========================================================
  // CATEGORY
  // =========================================================

  const category =
    listing?.category ||
    "Model";

  return (
    <Link
      to={listingUrl}
      className={`
        forevermeet-card
        group
        relative
        flex
        min-h-[250px]
        w-full
        overflow-hidden
        rounded-2xl
        border
        bg-white
        shadow-sm
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-xl

        ${
          isPremium
            ? "forevermeet-premium border-red-200"
            : "border-gray-200"
        }
      `}
    >

      {/* =====================================================
          IMAGE
      ===================================================== */}

      <div
        className={`
          relative
          w-[145px]
          shrink-0
          overflow-hidden
          bg-gray-100
          sm:w-[175px]
          md:w-[200px]
          lg:w-[220px]

          ${
            isPremium
              ? "forevermeet-premium-image"
              : ""
          }
        `}
      >

        <img
          key={imageUrl}
          src={imageUrl}
          alt={
            listing?.name ||
            listing?.title ||
            "ForeverMeet model"
          }
          onError={(event) => {
            event.currentTarget.src =
              FALLBACK_IMAGE;
          }}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
            transition-transform
            duration-500
            group-hover:scale-[1.03]
          "
        />

        {/* IMAGE GRADIENT */}

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

        {/* PREMIUM IMAGE EFFECT */}

        {isPremium && (
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-br
              from-red-500/10
              via-transparent
              to-black/20
            "
          />
        )}

        {/* WATERMARK */}

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
              sm:text-sm
            "
          >
            ForeverMeet
          </span>
        </div>

        {/* =================================================
            ⭐ PREMIUM BADGE
        ================================================= */}

        {isPremium && (
          <div
            className="
              forevermeet-premium-badge
              absolute
              right-2
              top-2
              z-20
              rounded-bl-xl
              rounded-tl-xl
              px-3
              py-1.5
              sm:right-0
              sm:px-4
              sm:py-2
            "
          >
            <span
              className="
                forevermeet-premium-star
              "
            >
              ★
            </span>

            <span
              className="
                forevermeet-premium-text
              "
            >
              PREMIUM
            </span>
          </div>
        )}

        {/* FEATURED */}

        {isFeatured && (
          <div
            className="
              absolute
              left-2
              top-2
              z-20
              rounded-md
              bg-yellow-400
              px-2
              py-1
              text-[9px]
              font-bold
              text-gray-900
              shadow
            "
          >
            FEATURED
          </div>
        )}

        {/* TRENDING */}

        {!isFeatured &&
          isTrending && (
            <div
              className="
                absolute
                left-2
                top-2
                z-20
                rounded-md
                bg-orange-500
                px-2
                py-1
                text-[9px]
                font-bold
                text-white
                shadow
              "
            >
              TRENDING
            </div>
          )}

        {/* IMAGE COUNT */}

        {images.length > 1 && (
          <div
            className="
              absolute
              bottom-2
              left-2
              z-20
              flex
              items-center
              gap-1
              rounded-md
              bg-black/60
              px-2
              py-1
              text-[10px]
              font-bold
              text-white
              backdrop-blur-sm
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
              />

              <circle
                cx="8.5"
                cy="10"
                r="1.5"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 15-4.5-4.5L7 20"
              />
            </svg>

            {images.length}
          </div>
        )}

        {/* PREVIOUS */}

        {images.length > 1 && (
          <button
            type="button"
            aria-label="Previous image"
            onClick={previousImage}
            className="
              absolute
              left-1.5
              top-1/2
              z-30
              flex
              h-7
              w-7
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-black/45
              text-white
              opacity-0
              transition
              group-hover:opacity-100
              hover:bg-black/70
              sm:h-8
              sm:w-8
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
          </button>
        )}

        {/* NEXT */}

        {images.length > 1 && (
          <button
            type="button"
            aria-label="Next image"
            onClick={nextImage}
            className="
              absolute
              right-1.5
              top-1/2
              z-30
              flex
              h-7
              w-7
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-black/45
              text-white
              opacity-0
              transition
              group-hover:opacity-100
              hover:bg-black/70
              sm:h-8
              sm:w-8
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
                d="m9 5 7 7-7 7"
              />
            </svg>
          </button>
        )}

        {/* DOTS */}

        {images.length > 1 && (
          <div
            className="
              absolute
              bottom-2
              left-1/2
              z-30
              flex
              -translate-x-1/2
              items-center
              gap-1
              rounded-full
              bg-black/35
              px-1.5
              py-1
            "
          >
            {images
              .slice(0, 5)
              .map(
                (_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={(event) =>
                      selectImage(
                        event,
                        index
                      )
                    }
                    className={`
                      h-1.5
                      rounded-full
                      transition-all

                      ${
                        currentImage ===
                        index
                          ? "w-4 bg-white"
                          : "w-1.5 bg-white/60"
                      }
                    `}
                  />
                )
              )}
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

        {/* TITLE */}

        <div className="pr-2">

          <h2
            className={`
              line-clamp-3
              text-[17px]
              font-bold
              leading-[1.18]
              transition-colors
              group-hover:text-red-700
              sm:text-lg
              md:text-xl

              ${
                isPremium
                  ? "forevermeet-premium-title"
                  : "text-red-600"
              }
            `}
          >
            {listing?.title ||
              `${
                listing?.city ||
                "India"
              } ${category}`}
          </h2>

          {/* MODEL NAME */}

          <div
            className="
              mt-1.5
              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                text-[13px]
                font-bold
                text-gray-900
                sm:text-sm
              "
            >
              {modelName}
            </span>

            {/* PREMIUM STAR NEXT TO NAME */}

            {isPremium && (
              <span
                title="Premium Profile"
                className="
                  inline-flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-red-50
                  text-[11px]
                  text-red-600
                  shadow-sm
                "
              >
                ★
              </span>
            )}
          </div>

          {/* VERIFIED */}

          {isVerified && (
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
                  forevermeet-verified-icon
                  flex
                  h-4
                  w-4
                  items-center
                  justify-center
                  rounded-full
                  bg-green-500
                  text-[9px]
                  font-bold
                  text-white
                  shadow-sm
                "
              >
                ✓
              </span>

              Verified Profile
            </span>
          )}

        </div>

        {/* DESCRIPTION */}

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

        {/* DETAILS */}

        <div
          className="
            mt-3
            space-y-1
            text-[13px]
            sm:text-sm
          "
        >

          {/* AGE */}

          {listing?.age && (
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="
                  h-4
                  w-4
                  shrink-0
                  text-gray-700
                "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle
                  cx="12"
                  cy="8"
                  r="3"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 20a7 7 0 0 1 14 0"
                />
              </svg>

              <span
                className="
                  font-semibold
                  text-gray-900
                "
              >
                {listing.age} Years
              </span>
            </div>
          )}

          {/* LOCATION */}

          {listing?.city && (
            <div
              className="
                flex
                items-start
                gap-2
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="
                  mt-0.5
                  h-4
                  w-4
                  shrink-0
                  text-gray-700
                "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12z"
                />

                <circle
                  cx="12"
                  cy="9"
                  r="2.2"
                />
              </svg>

              <span>
                <strong>
                  {listing.city}
                </strong>

                {listing?.state && (
                  <span className="text-gray-700">
                    {" "}
                    /{" "}
                    {listing.state}
                  </span>
                )}
              </span>
            </div>
          )}

          {/* NATIONALITY */}

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                flex
                h-4
                w-4
                shrink-0
                items-center
                justify-center
                text-[9px]
                font-black
                text-gray-800
              "
            >
              IN
            </span>

            <span
              className="
                font-semibold
                text-gray-900
              "
            >
              {nationality}
            </span>
          </div>

        </div>

        {/* BOTTOM */}

        <div
          className="
            mt-auto
            pt-3
          "
        >

          <div
            className="
              flex
              flex-wrap
              items-end
              justify-between
              gap-2
            "
          >

            {/* PRICE */}

            {listing?.price !==
              undefined &&
              listing?.price !==
                null &&
              listing?.price !==
                "" && (
                <div>
                  <p
                    className="
                      text-[10px]
                      text-gray-500
                    "
                  >
                    Starting from
                  </p>

                  <p
                    className={`
                      text-base
                      font-bold
                      sm:text-lg

                      ${
                        isPremium
                          ? "text-red-600"
                          : "text-gray-900"
                      }
                    `}
                  >
                    ₹
                    {Number(
                      listing.price
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>
              )}

            {/* CATEGORY */}

            {listing?.category && (
              <span
                className={`
                  rounded-full
                  px-2.5
                  py-1
                  text-[10px]
                  font-semibold

                  ${
                    isPremium
                      ? "border border-red-100 bg-red-50 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }
                `}
              >
                {listing.category}
              </span>
            )}

          </div>

          {/* PREMIUM CONTACT BUTTONS */}

          {isPremium &&
            (whatsappUrl ||
              callUrl) && (
              <div
                className="
                  mt-2.5
                  flex
                  gap-2
                "
              >

                {/* WHATSAPP */}

                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();

                      window.open(
                        whatsappUrl,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                    className="
                      forevermeet-premium-button
                      flex
                      min-h-9
                      flex-1
                      items-center
                      justify-center
                      gap-1.5
                      rounded-lg
                      bg-green-600
                      px-2.5
                      py-2
                      text-[11px]
                      font-bold
                      text-white
                      shadow-md
                      sm:text-xs
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.52 3.48A11.82 11.82 0 0012.05 0C5.52 0 .2 5.31.2 11.84c0 2.09.55 4.13 1.59 5.93L.11 24l6.37-1.67a11.8 11.8 0 005.57 1.42h.01c6.52 0 11.83-5.31 11.83-11.84 0-3.16-1.23-6.13-3.37-8.43zM12.06 21.75h-.01a9.83 9.83 0 01-5.01-1.37l-.36-.21-3.78.99 1.01-3.68-.23-.38a9.82 9.82 0 01-1.51-5.26c0-5.44 4.43-9.86 9.88-9.86 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 012.89 7c0 5.44-4.43 9.87-9.87 9.87zm5.41-7.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.89-.79-1.5-1.77-1.68-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.71.63.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
                    </svg>

                    WhatsApp
                  </a>
                )}

                {/* CALL */}

                {callUrl && (
                  <a
                    href={callUrl}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                    className="
                      forevermeet-premium-button
                      flex
                      min-h-9
                      flex-1
                      items-center
                      justify-center
                      gap-1.5
                      rounded-lg
                      bg-red-600
                      px-2.5
                      py-2
                      text-[11px]
                      font-bold
                      text-white
                      shadow-md
                      sm:text-xs
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
                        d="M3 5.5A2.5 2.5 0 015.5 3h2A1.5 1.5 0 019 4.2l1.2 3.6a1.5 1.5 0 01-.4 1.55l-1.3 1.3a13.1 13.1 0 005.05 5.05l1.3-1.3a1.5 1.5 0 011.55-.4l3.6 1.2a1.5 1.5 0 011.2 1.5v2A2.5 2.5 0 0119.5 21C10.39 21 3 13.61 3 4.5v1z"
                      />
                    </svg>

                    Call
                  </a>
                )}

              </div>
            )}

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
    >

      {/* PREVIOUS */}

      <button
        type="button"
        disabled={
          currentPage === 1
        }
        onClick={() =>
          changePage(
            currentPage - 1
          )
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
          transition
          hover:border-red-300
          hover:text-red-600
          hover:shadow-sm
          disabled:cursor-not-allowed
          disabled:opacity-40
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
      </button>

      {/* PAGE NUMBERS */}

      {pageNumbers.map(
        (page, index) => {
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
              onClick={() =>
                changePage(page)
              }
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
                transition

                ${
                  currentPage === page
                    ? "border-red-600 bg-red-600 text-white shadow-md"
                    : "border-gray-200 bg-white text-gray-700 hover:border-red-300 hover:text-red-600 hover:shadow-sm"
                }
              `}
            >
              {page}
            </button>
          );
        }
      )}

      {/* NEXT */}

      <button
        type="button"
        disabled={
          currentPage ===
          totalPages
        }
        onClick={() =>
          changePage(
            currentPage + 1
          )
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
          transition
          hover:border-red-300
          hover:text-red-600
          hover:shadow-sm
          disabled:cursor-not-allowed
          disabled:opacity-40
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
            d="m9 5 7 7-7 7"
          />
        </svg>
      </button>

    </div>
  );
}

export default Listings;