import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";

import SearchBar from "../../components/SearchBar/searchBar";
import { searchListings } from "../../services/listingService";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchQuery = searchParams.get("q") || "";

  // =========================================================
  // STATE
  // =========================================================

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalListings, setTotalListings] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [cityMenuOpen, setCityMenuOpen] = useState(false);

  const cityMenuRef = useRef(null);

  // =========================================================
  // AVAILABLE CITIES
  // =========================================================

  const cities = [
    "Mumbai",
    "Delhi",
    "Hyderabad",
    "Pune",
    "Bangalore",
    "Ranchi",
    "Kolkata",
    "Bhopal",
    "Surat",
  ];

  // =========================================================
  // FETCH SEARCH RESULTS
  // =========================================================

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        setListings([]);
        setTotalListings(0);
        setTotalPages(0);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await searchListings({
          q: searchQuery,
          page,
          limit: 12,
        });

        setListings(data.listings || []);
        setTotalListings(data.totalListings || 0);
        setTotalPages(data.totalPages || 0);
      } catch (err) {
        console.error("Search error:", err);

        setError(err.message || "Unable to load search results.");

        setListings([]);
        setTotalListings(0);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery, page]);

  // =========================================================
  // RESET PAGE WHEN SEARCH CHANGES
  // =========================================================

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  // =========================================================
  // CLOSE CITY MENU WHEN CLICKING OUTSIDE
  // =========================================================

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        cityMenuRef.current &&
        !cityMenuRef.current.contains(event.target)
      ) {
        setCityMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // =========================================================
  // GET IMAGE
  // =========================================================

  const getImage = (listing) => {
    if (
      listing?.images &&
      listing.images.length > 0 &&
      listing.images[0]
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
  // CURRENT CITY
  // =========================================================

  const city =
    listings.length > 0 && listings[0]?.city
      ? listings[0].city
      : searchQuery;

  const state =
    listings.length > 0 && listings[0]?.state
      ? listings[0].state
      : "";

  // =========================================================
  // CHANGE CITY
  // =========================================================

  const handleCityChange = (selectedCity) => {
    setCityMenuOpen(false);
    setPage(1);

    navigate(`/search?q=${encodeURIComponent(selectedCity)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* =====================================================
          SEARCH BAR
      ===================================================== */}

      <section className="border-b border-gray-200 bg-white px-3 py-4 sm:px-5">
        <div className="mx-auto max-w-6xl">
          <SearchBar />
        </div>
      </section>

      {/* =====================================================
          CITY DROPDOWN
      ===================================================== */}

      <div className="border-b border-gray-200 bg-white">
        <div
          ref={cityMenuRef}
          className="relative mx-auto max-w-6xl"
        >
          {/* CURRENT CITY BUTTON */}

          <button
            type="button"
            onClick={() =>
              setCityMenuOpen((previous) => !previous)
            }
            className="
              flex
              w-full
              cursor-pointer
              items-center
              justify-between
              px-4
              py-5
              text-left
              transition
              hover:bg-gray-50
              sm:px-5
            "
          >
            <div className="flex min-w-0 items-center gap-3">
              {/* LOCATION ICON */}

              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-red-50
                  text-red-600
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21s7-4.35 7-10a7 7 0 10-14 0c0 5.65 7 10 7 10z"
                  />

                  <circle cx="12" cy="11" r="2.5" />
                </svg>
              </div>

              {/* CITY NAME */}

              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-500">
                  Browse by city
                </p>

                <p className="truncate text-base font-semibold text-gray-900 sm:text-lg">
                  {city
                    ? `${city} Model Listings`
                    : "Model Listings"}
                </p>
              </div>
            </div>

            {/* ARROW */}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`
                h-5
                w-5
                shrink-0
                text-red-600
                transition-transform
                duration-200
                ${cityMenuOpen ? "rotate-180" : ""}
              `}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m6 9 6 6 6-6"
              />
            </svg>
          </button>

          {/* =================================================
              CITY DROPDOWN MENU
          ================================================= */}

          {cityMenuOpen && (
            <div
              className="
                absolute
                left-0
                right-0
                top-full
                z-50
                overflow-hidden
                rounded-b-2xl
                border
                border-gray-200
                bg-white
                shadow-xl
              "
            >
              {/* HEADER */}

              <div className="border-b border-gray-200 bg-gray-50 px-5 py-4">
                <p className="text-sm font-semibold text-gray-900">
                  Select a city
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Browse model listings by location
                </p>
              </div>

              {/* CITY LIST */}

              <div className="grid grid-cols-1 sm:grid-cols-2">
                {cities.map((cityName) => {
                  const isActive =
                    cityName.toLowerCase() ===
                    String(city).toLowerCase();

                  return (
                    <button
                      key={cityName}
                      type="button"
                      onClick={() =>
                        handleCityChange(cityName)
                      }
                      className={`
                        flex
                        cursor-pointer
                        items-center
                        justify-between
                        border-b
                        border-gray-100
                        px-5
                        py-4
                        text-left
                        transition
                        hover:bg-red-50
                        ${
                          isActive
                            ? "bg-red-50 text-red-600"
                            : "text-gray-800"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            ${
                              isActive
                                ? "bg-red-600 text-white"
                                : "bg-gray-100 text-gray-500"
                            }
                          `}
                        >
                          📍
                        </span>

                        <span className="font-semibold">
                          {cityName} Model Listings
                        </span>
                      </div>

                      {isActive && (
                        <span className="text-xs font-semibold">
                          CURRENT
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          PAGE HEADING
      ===================================================== */}

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <h1
            className="
              text-xl
              font-semibold
              leading-tight
              tracking-tight
              text-gray-900
              sm:text-3xl
              md:text-4xl
            "
          >
            {city ? `${city} Model Listings` : "Model Listings"}

            {state ? ` (${state})` : ""}
          </h1>

          {!loading && searchQuery && (
            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Search results for{" "}
              <span className="font-semibold text-red-600">
                "{searchQuery}"
              </span>
            </p>
          )}
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="mx-auto max-w-6xl px-3 py-5 sm:px-4 sm:py-6">
        {/* ===================================================
            LOADING
        =================================================== */}

        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  shadow-sm
                "
              >
                <div className="flex min-h-[280px]">
                  <div
                    className="
                      w-[145px]
                      shrink-0
                      animate-pulse
                      bg-gray-200
                      sm:w-[190px]
                      md:w-[220px]
                    "
                  />

                  <div className="flex-1 space-y-4 p-4 sm:p-5">
                    <div className="h-6 w-5/6 animate-pulse rounded bg-gray-200" />

                    <div className="h-4 w-full animate-pulse rounded bg-gray-200" />

                    <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />

                    <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />

                    <div className="mt-8 flex gap-2">
                      <div className="h-10 flex-1 animate-pulse rounded-xl bg-gray-200" />

                      <div className="h-10 flex-1 animate-pulse rounded-xl bg-gray-200" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
              p-8
              text-center
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

        {/* ===================================================
            RESULTS
        =================================================== */}

        {!loading && !error && listings.length > 0 && (
          <>
            {/* RESULT COUNT */}

            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {totalListings}
                </span>{" "}
                listings
              </p>
            </div>

            {/* LISTING CARDS */}

            <div className="space-y-4">
              {listings.map((listing) => (
                <ListingSearchCard
                  key={listing._id}
                  listing={listing}
                  getImage={getImage}
                />
              ))}
            </div>

            {/* =================================================
                PAGINATION
            ================================================= */}

            {totalPages > 1 && (
              <div
                className="
                  mt-10
                  flex
                  flex-wrap
                  items-center
                  justify-center
                  gap-3
                "
              >
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() =>
                    setPage((previous) => previous - 1)
                  }
                  className="
                    cursor-pointer
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-gray-700
                    shadow-sm
                    transition
                    hover:bg-gray-50
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  ← Previous
                </button>

                <span
                  className="
                    rounded-xl
                    bg-gray-900
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  {page} / {totalPages}
                </span>

                <button
                  type="button"
                  disabled={page === totalPages}
                  onClick={() =>
                    setPage((previous) => previous + 1)
                  }
                  className="
                    cursor-pointer
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-gray-700
                    shadow-sm
                    transition
                    hover:bg-gray-50
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}

        {/* ===================================================
            NO RESULTS
        =================================================== */}

        {!loading && !error && listings.length === 0 && (
          <div
            className="
              rounded-2xl
              border
              border-gray-200
              bg-white
              px-6
              py-16
              text-center
              shadow-sm
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
                className="h-7 w-7 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="11" cy="11" r="7" />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m20 20-3.5-3.5"
                />
              </svg>
            </div>

            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              No listings found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              Try searching another city, model name, or keyword.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {cities.slice(0, 5).map((cityName) => (
                <button
                  key={cityName}
                  type="button"
                  onClick={() =>
                    handleCityChange(cityName)
                  }
                  className="
                    cursor-pointer
                    rounded-full
                    border
                    border-gray-200
                    bg-gray-50
                    px-4
                    py-2
                    text-xs
                    font-semibold
                    text-gray-700
                    transition
                    hover:border-red-200
                    hover:bg-red-50
                    hover:text-red-600
                  "
                >
                  {cityName}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* ============================================================
   LISTING SEARCH CARD
============================================================ */

function ListingSearchCard({ listing, getImage }) {
  // =========================================================
  // GET ALL IMAGES
  // =========================================================

  const images =
    listing?.images?.length > 0
      ? listing.images
      : [{ url: getImage(listing) }];

  const [currentImage, setCurrentImage] = useState(0);

  // =========================================================
  // AUTOMATIC IMAGE SLIDESHOW
  // =========================================================

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentImage((previous) =>
        previous === images.length - 1
          ? 0
          : previous + 1
      );
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  // =========================================================
  // NEXT IMAGE
  // =========================================================

  const nextImage = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setCurrentImage((previous) =>
      previous === images.length - 1
        ? 0
        : previous + 1
    );
  };

  // =========================================================
  // PREVIOUS IMAGE
  // =========================================================

  const previousImage = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setCurrentImage((previous) =>
      previous === 0
        ? images.length - 1
        : previous - 1
    );
  };

  // =========================================================
  // SELECT IMAGE
  // =========================================================

  const selectImage = (event, index) => {
    event.preventDefault();
    event.stopPropagation();

    setCurrentImage(index);
  };

  // =========================================================
  // CURRENT IMAGE
  // =========================================================

  const currentImageData = images[currentImage];

  const imageUrl =
    typeof currentImageData === "string"
      ? currentImageData
      : currentImageData?.url || getImage(listing);

  // =========================================================
  // PREMIUM STATUS
  // =========================================================

  const isPremium = Boolean(listing?.isPremium);

  // =========================================================
  // MODEL NAME
  // =========================================================

  const modelName =
    listing?.name ||
    listing?.modelName ||
    "Model";

  // =========================================================
  // CONTACT NUMBERS
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
  // WHATSAPP URL
  // =========================================================

  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${String(whatsappNumber).replace(/\D/g, "")}`
    : "";

  // =========================================================
  // CALL URL
  // =========================================================

  const callUrl = phoneNumber
    ? `tel:${String(phoneNumber).replace(/[^\d+]/g, "")}`
    : "";

  // =========================================================
  // LISTING URL
  // =========================================================

  const listingUrl = `/listing/${
    listing?.slug || listing?._id
  }`;

  return (
    <Link
      to={listingUrl}
      className="
        group
        flex
        min-h-[285px]
        w-full
        cursor-pointer
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-lg
      "
    >
      {/* =====================================================
          IMAGE SECTION
      ===================================================== */}

      <div
        className="
          relative
          w-[145px]
          shrink-0
          overflow-hidden
          bg-gray-100
          sm:w-[190px]
          md:w-[220px]
          lg:w-[245px]
        "
      >
        {/* MAIN IMAGE */}

        <img
          key={imageUrl}
          src={imageUrl}
          alt={
            listing.name ||
            listing.title ||
            "ForeverMeet model listing"
          }
          onError={(event) => {
            event.currentTarget.src =
              "https://via.placeholder.com/600x800?text=ForeverMeet";
          }}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
            transition-transform
            duration-700
            ease-in-out
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
              select-none
              rotate-[-18deg]
              text-sm
              font-semibold
              tracking-[0.18em]
              text-white/35
              drop-shadow-lg
              sm:text-base
              md:text-lg
            "
          >
            ForeverMeet
          </span>
        </div>

        {/* PREMIUM BADGE */}

        {isPremium && (
          <div
            className="
              absolute
              right-2
              top-2
              z-10
              flex
              items-center
              gap-1.5
              rounded-full
              border
              border-white/20
              bg-gradient-to-r
              from-red-600
              to-red-500
              px-2.5
              py-1
              text-[9px]
              font-bold
              tracking-wide
              text-white
              shadow-lg
              sm:right-3
              sm:top-3
              sm:px-3
              sm:py-1.5
              sm:text-[10px]
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2l2.7 6.1 6.6.6-5 4.4 1.5 6.5L12 16.2 6.2 19.6 7.7 13l-5-4.4 6.6-.6L12 2z" />
            </svg>

            PREMIUM
          </div>
        )}

        {/* FEATURED BADGE */}

        {listing.isFeatured && (
          <div
            className="
              absolute
              left-2
              top-2
              z-10
              rounded-full
              bg-yellow-400
              px-2.5
              py-1
              text-[9px]
              font-semibold
              tracking-wide
              text-gray-900
              shadow-lg
              sm:left-3
              sm:top-3
              sm:px-3
              sm:py-1.5
              sm:text-[10px]
            "
          >
            FEATURED
          </div>
        )}

        {/* IMAGE COUNTER */}

        {images.length > 1 && (
          <div
            className="
              absolute
              bottom-3
              left-3
              z-10
              rounded-full
              bg-black/70
              px-2.5
              py-1
              text-[10px]
              font-semibold
              text-white
              backdrop-blur-md
              sm:px-3
              sm:py-1.5
              sm:text-xs
            "
          >
            📷 {currentImage + 1} / {images.length}
          </div>
        )}

        {/* PREVIOUS IMAGE */}

        {images.length > 1 && (
          <button
            type="button"
            aria-label="Previous image"
            onClick={previousImage}
            className="
              absolute
              left-2
              top-1/2
              z-20
              flex
              h-8
              w-8
              -translate-y-1/2
              cursor-pointer
              items-center
              justify-center
              rounded-full
              bg-black/50
              text-white
              opacity-0
              shadow-lg
              backdrop-blur-sm
              transition-all
              duration-200
              hover:bg-black/75
              group-hover:opacity-100
              sm:left-3
              sm:h-9
              sm:w-9
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* NEXT IMAGE */}

        {images.length > 1 && (
          <button
            type="button"
            aria-label="Next image"
            onClick={nextImage}
            className="
              absolute
              right-2
              top-1/2
              z-20
              flex
              h-8
              w-8
              -translate-y-1/2
              cursor-pointer
              items-center
              justify-center
              rounded-full
              bg-black/50
              text-white
              opacity-0
              shadow-lg
              backdrop-blur-sm
              transition-all
              duration-200
              hover:bg-black/75
              group-hover:opacity-100
              sm:right-3
              sm:h-9
              sm:w-9
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        {/* IMAGE DOTS */}

        {images.length > 1 && (
          <div
            className="
              absolute
              bottom-3
              left-1/2
              z-20
              flex
              -translate-x-1/2
              items-center
              gap-1
              rounded-full
              bg-black/40
              px-2
              py-1.5
              backdrop-blur-sm
            "
          >
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Show image ${index + 1}`}
                onClick={(event) =>
                  selectImage(event, index)
                }
                className={`
                  h-1.5
                  cursor-pointer
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    currentImage === index
                      ? "w-5 bg-white"
                      : "w-1.5 bg-white/60 hover:bg-white"
                  }
                `}
              />
            ))}
          </div>
        )}
      </div>

      {/* =====================================================
          CONTENT SECTION
      ===================================================== */}

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
          p-3
          sm:p-4
          md:p-5
        "
      >
        {/* MODEL NAME */}

        {modelName && (
          <div className="mb-1">
            <p className="text-xs font-medium text-gray-500">
              Model
            </p>

            <h2
              className="
                line-clamp-1
                cursor-pointer
                text-lg
                font-bold
                leading-tight
                text-gray-900
                transition-colors
                duration-200
                group-hover:text-red-600
                sm:text-xl
                md:text-2xl
              "
            >
              {modelName}
            </h2>
          </div>
        )}

        {/* TITLE */}

        <h3
          className="
            line-clamp-3
            cursor-pointer
            text-[16px]
            font-semibold
            leading-[1.15]
            text-red-600
            transition-colors
            duration-200
            group-hover:text-red-700
            sm:text-lg
            md:text-xl
          "
        >
          {listing.title ||
            "Professional Model Listing"}
        </h3>

        {/* DESCRIPTION */}

        {listing.description && (
          <p
            className="
              mt-2
              line-clamp-4
              cursor-pointer
              text-[13px]
              font-medium
              leading-5
              text-gray-700
              sm:text-sm
              sm:leading-5
              md:text-base
            "
          >
            {listing.description}
          </p>
        )}

        {/* DETAILS */}

        <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-2.5">
          {/* AGE */}

          {listing.age && (
            <div
              className="
                flex
                items-center
                gap-2
                text-xs
                text-gray-800
                sm:text-sm
              "
            >
              <span
                className="
                  flex
                  h-6
                  w-6
                  shrink-0
                  items-center
                  justify-center
                  rounded-md
                  bg-gray-100
                  text-[11px]
                  sm:h-7
                  sm:w-7
                  sm:text-xs
                "
              >
                👤
              </span>

              <span className="font-semibold">
                {listing.age} Years
              </span>
            </div>
          )}

          {/* LOCATION */}

          {listing.city && (
            <div
              className="
                flex
                items-start
                gap-2
                text-xs
                text-gray-800
                sm:text-sm
              "
            >
              <span
                className="
                  flex
                  h-6
                  w-6
                  shrink-0
                  items-center
                  justify-center
                  rounded-md
                  bg-gray-100
                  text-[11px]
                  sm:h-7
                  sm:w-7
                  sm:text-xs
                "
              >
                📍
              </span>

              <span>
                <span className="font-semibold">
                  {listing.city}
                </span>

                {listing.state && (
                  <span className="text-gray-600">
                    {" "}
                    / {listing.state}
                  </span>
                )}
              </span>
            </div>
          )}
        </div>

        {/* =====================================================
            BOTTOM SECTION
        ===================================================== */}

        <div className="mt-auto pt-4">
          {/* PRICE */}

          {listing.price !== undefined &&
            listing.price !== null && (
              <div>
                <span className="text-[10px] font-medium text-gray-500 sm:text-xs">
                  Starting from
                </span>

                <div
                  className="
                    text-lg
                    font-semibold
                    tracking-tight
                    text-gray-900
                    sm:text-xl
                    md:text-2xl
                  "
                >
                  ₹
                  {Number(listing.price).toLocaleString(
                    "en-IN"
                  )}
                </div>
              </div>
            )}

          {/* =================================================
              PREMIUM CONTACT BUTTONS
          ================================================= */}

          {isPremium && (
            <div
              className="
                mt-4
                grid
                grid-cols-2
                gap-2
                sm:gap-3
              "
            >
              {/* WHATSAPP BUTTON */}

              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Contact ${modelName} on WhatsApp`}
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
                    group/whatsapp
                    relative
                    flex
                    min-h-[48px]
                    cursor-pointer
                    items-center
                    justify-center
                    gap-2
                    overflow-hidden
                    rounded-xl
                    border
                    border-green-600
                    bg-green-600
                    px-3
                    py-2.5
                    text-xs
                    font-bold
                    text-white
                    shadow-md
                    shadow-green-600/20
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-green-700
                    hover:shadow-lg
                    hover:shadow-green-600/25
                    active:translate-y-0
                    sm:text-sm
                  "
                >
                  <span
                    className="
                      absolute
                      inset-0
                      -translate-x-full
                      bg-white/10
                      transition-transform
                      duration-500
                      group-hover/whatsapp:translate-x-full
                    "
                  />

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="
                      relative
                      h-5
                      w-5
                      shrink-0
                      sm:h-[21px]
                      sm:w-[21px]
                    "
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.52 3.48A11.82 11.82 0 0012.05 0C5.52 0 .2 5.31.2 11.84c0 2.09.55 4.13 1.59 5.93L.11 24l6.37-1.67a11.8 11.8 0 005.57 1.42h.01c6.52 0 11.83-5.31 11.83-11.84 0-3.16-1.23-6.13-3.37-8.43zM12.06 21.75h-.01a9.83 9.83 0 01-5.01-1.37l-.36-.21-3.78.99 1.01-3.68-.23-.38a9.82 9.82 0 01-1.51-5.26c0-5.44 4.43-9.86 9.88-9.86 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 012.89 7c0 5.44-4.43 9.87-9.87 9.87zm5.41-7.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.89-.79-1.5-1.77-1.68-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.71.63.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
                  </svg>

                  <span className="relative">
                    WhatsApp
                  </span>
                </a>
              )}

              {/* CALL BUTTON */}

              {callUrl && (
                <a
                  href={callUrl}
                  aria-label={`Call ${modelName}`}
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  className="
                    group/call
                    relative
                    flex
                    min-h-[48px]
                    cursor-pointer
                    items-center
                    justify-center
                    gap-2
                    overflow-hidden
                    rounded-xl
                    border
                    border-gray-900
                    bg-gray-900
                    px-3
                    py-2.5
                    text-xs
                    font-bold
                    text-white
                    shadow-md
                    shadow-gray-900/20
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-black
                    hover:shadow-lg
                    hover:shadow-gray-900/25
                    active:translate-y-0
                    sm:text-sm
                  "
                >
                  <span
                    className="
                      absolute
                      inset-0
                      -translate-x-full
                      bg-white/10
                      transition-transform
                      duration-500
                      group-hover/call:translate-x-full
                    "
                  />

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="
                      relative
                      h-5
                      w-5
                      shrink-0
                      sm:h-[21px]
                      sm:w-[21px]
                    "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.9"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5.5A2.5 2.5 0 015.5 3h2A1.5 1.5 0 019 4.2l1.2 3.6a1.5 1.5 0 01-.4 1.55l-1.3 1.3a13.1 13.1 0 005.05 5.05l1.3-1.3a1.5 1.5 0 011.55-.4l3.6 1.2a1.5 1.5 0 011.2 1.5v2A2.5 2.5 0 0119.5 21C10.39 21 3 13.61 3 4.5v1z"
                    />
                  </svg>

                  <span className="relative">
                    Call Now
                  </span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default SearchResults;
