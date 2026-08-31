import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  getListing,
  getSimilarListings,
} from "../../services/listingService";

const API_BASE_URL = "http://localhost:5000";

// ============================================================
// HELPERS
// ============================================================

const getImageUrl = (image) => {
  if (!image) return "";

  if (typeof image === "string") {
    if (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("blob:") ||
      image.startsWith("data:")
    ) {
      return image;
    }

    return `${API_BASE_URL}/${image.replace(/^\/+/, "")}`;
  }

  if (typeof image === "object") {
    const imageUrl =
      image.url ||
      image.secure_url ||
      image.path ||
      image.location;

    if (!imageUrl) return "";

    if (
      imageUrl.startsWith("http://") ||
      imageUrl.startsWith("https://")
    ) {
      return imageUrl;
    }

    return `${API_BASE_URL}/${imageUrl.replace(/^\/+/, "")}`;
  }

  return "";
};

const getListingId = (listing) => {
  return listing?._id || listing?.id;
};

const getListingImages = (listing) => {
  if (!Array.isArray(listing?.images)) {
    return [];
  }

  return listing.images
    .map((image) => getImageUrl(image))
    .filter(Boolean);
};

const getBoolean = (value) => {
  return value === true || value === "true";
};

const formatPrice = (price) => {
  if (price === undefined || price === null || price === "") {
    return null;
  }

  const number = Number(price);

  if (Number.isNaN(number)) {
    return price;
  }

  return new Intl.NumberFormat("en-IN").format(number);
};

const normalizeList = (value) => {
  if (Array.isArray(value)) {
    return value
      .flatMap((item) => normalizeList(item))
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();

    if (!trimmed) {
      return [];
    }

    try {
      const parsed = JSON.parse(trimmed);

      if (Array.isArray(parsed)) {
        return parsed
          .flatMap((item) => normalizeList(item))
          .map((item) => String(item).trim())
          .filter(Boolean);
      }
    } catch {
      // Not JSON
    }

    return trimmed
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

// ============================================================
// MAIN COMPONENT
// ============================================================

function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ==========================================================
  // STATE
  // ==========================================================

  const [listing, setListing] = useState(null);
  const [similarListings, setSimilarListings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [similarLoading, setSimilarLoading] = useState(true);

  const [error, setError] = useState("");

  const [currentImage, setCurrentImage] = useState(0);

  // ==========================================================
  // SIMILAR PROFILES SLIDER STATE
  // ==========================================================

  const [similarSlide, setSimilarSlide] = useState(0);
  const [similarVisibleCards, setSimilarVisibleCards] = useState(2);

  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const [shareMessage, setShareMessage] = useState("");

  const [search, setSearch] = useState("");

  // ==========================================================
  // TOAST
  // ==========================================================

  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setToast({
        show: false,
        type: "success",
        message: "",
      });
    }, 3000);
  };

  // ==========================================================
  // SCROLL TO TOP
  // ==========================================================

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [id]);

  // ==========================================================
  // LOAD LISTING
  // ==========================================================

  useEffect(() => {
    let mounted = true;

    const loadListing = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getListing(id);

        if (!mounted) {
          return;
        }

        console.log("LISTING API RESPONSE:", response);

        const listingData = response?.listing;

        const similarData =
          response?.similarListings || [];

        setListing(listingData);

        setSimilarListings(
          Array.isArray(similarData)
            ? similarData
            : [],
        );
      } catch (error) {
        console.error(
          "Unable to load listing:",
          error,
        );

        if (mounted) {
          setError(
            error?.response?.data?.message ||
              error?.message ||
              "Unable to load this listing.",
          );

          setSimilarListings([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
          setSimilarLoading(false);
        }
      }
    };

    if (id) {
      loadListing();
    }

    return () => {
      mounted = false;
    };
  }, [id]);

  // ==========================================================
  // LOAD SIMILAR LISTINGS
  // ==========================================================

  useEffect(() => {
    let mounted = true;

    const loadSimilarListings = async () => {
      try {
        setSimilarLoading(true);

        const response =
          await getSimilarListings(id);

        if (!mounted) return;

        const listings =
          response?.listings ||
          response?.data ||
          [];

        setSimilarListings(
          Array.isArray(listings)
            ? listings
            : [],
        );
      } catch (error) {
        console.error(
          "Unable to load similar listings:",
          error,
        );

        if (mounted) {
          setSimilarListings([]);
        }
      } finally {
        if (mounted) {
          setSimilarLoading(false);
        }
      }
    };

    if (id) {
      loadSimilarListings();
    }

    return () => {
      mounted = false;
    };
  }, [id]);

  // ==========================================================
  // SIMILAR PROFILES RESPONSIVE CARD COUNT
  // ==========================================================

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1024) {
        setSimilarVisibleCards(4);
      } else if (window.innerWidth >= 640) {
        setSimilarVisibleCards(3);
      } else {
        setSimilarVisibleCards(2);
      }
    };

    updateVisibleCards();

    window.addEventListener(
      "resize",
      updateVisibleCards,
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateVisibleCards,
      );
    };
  }, []);

  // ==========================================================
  // RESET SIMILAR SLIDER
  // ==========================================================

  useEffect(() => {
    setSimilarSlide(0);
  }, [id]);

  // ==========================================================
  // AUTO SLIDE SIMILAR PROFILES
  // ==========================================================

  useEffect(() => {
    if (
      similarListings.length <=
      similarVisibleCards
    ) {
      return undefined;
    }

    const maxSlide = Math.max(
      0,
      similarListings.length -
        similarVisibleCards,
    );

    const interval = setInterval(() => {
      setSimilarSlide((previous) => {
        if (previous >= maxSlide) {
          return 0;
        }

        return previous + 1;
      });
    }, 3500);

    return () => {
      clearInterval(interval);
    };
  }, [
    similarListings.length,
    similarVisibleCards,
  ]);

  // ==========================================================
  // IMAGES
  // ==========================================================

  const images = useMemo(
    () => getListingImages(listing),
    [listing],
  );

  // ==========================================================
  // LANGUAGES
  // ==========================================================

  const languages = useMemo(() => {
    return normalizeList(listing?.languages);
  }, [listing]);

  // ==========================================================
  // SERVICES
  // ==========================================================

  const services = useMemo(() => {
    return normalizeList(listing?.services);
  }, [listing]);

  // ==========================================================
  // LOAD FAVOURITE STATUS
  // ==========================================================

  useEffect(() => {
    let mounted = true;

    const loadFavoriteStatus = async () => {
      const token = localStorage.getItem("token");

      if (!token || !listing?._id) {
        if (mounted) {
          setIsFavorite(false);
        }

        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/favorites`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Unable to load favourites.",
          );
        }

        const favoriteListings =
          Array.isArray(data?.listings)
            ? data.listings
            : [];

        const currentListingId =
          String(listing._id);

        const found = favoriteListings.some(
          (favoriteListing) =>
            String(
              getListingId(favoriteListing),
            ) === currentListingId,
        );

        if (mounted) {
          setIsFavorite(found);
        }
      } catch (error) {
        console.error(
          "Unable to load favourite status:",
          error,
        );

        if (mounted) {
          setIsFavorite(false);
        }
      }
    };

    loadFavoriteStatus();

    return () => {
      mounted = false;
    };
  }, [listing?._id]);

  // ==========================================================
  // AUTO IMAGE SLIDER
  // ==========================================================

  useEffect(() => {
    if (images.length <= 1) {
      return undefined;
    }

    const interval = setInterval(() => {
      setCurrentImage((previous) => {
        return (
          (previous + 1) %
          images.length
        );
      });
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [images.length, id]);

  // ==========================================================
  // RESET IMAGE
  // ==========================================================

  useEffect(() => {
    setCurrentImage(0);
  }, [id]);

  // ==========================================================
  // FAVOURITE
  // ==========================================================

  const toggleFavorite = async () => {
    if (!listing?._id) {
      showToast(
        "Listing ID is missing.",
        "error",
      );

      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      showToast(
        "Please login to add favourites.",
        "error",
      );

      setTimeout(() => {
        navigate("/login");
      }, 800);

      return;
    }

    if (favoriteLoading) {
      return;
    }

    setFavoriteLoading(true);

    const listingId = String(listing._id);

    try {
      // REMOVE FAVORITE
      if (isFavorite) {
        const response = await fetch(
          `${API_BASE_URL}/api/favorites/${listingId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Unable to remove favourite.",
          );
        }

        setIsFavorite(false);

        setListing((previous) => {
          if (!previous) return previous;

          return {
            ...previous,
            favorites:
              data?.favorites ??
              Math.max(
                0,
                Number(previous.favorites || 0) - 1,
              ),
          };
        });

        showToast(
          "Removed from favourites.",
          "success",
        );

        return;
      }

      // ADD FAVORITE
      const response = await fetch(
        `${API_BASE_URL}/api/favorites/${listingId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Unable to add favourite.",
        );
      }

      setIsFavorite(true);

      setListing((previous) => {
        if (!previous) return previous;

        return {
          ...previous,
          favorites:
            data?.favorites ??
            Number(previous.favorites || 0) + 1,
        };
      });

      showToast(
        "Added to favourites.",
        "success",
      );
    } catch (error) {
      console.error(
        "Favourite error:",
        error,
      );

      showToast(
        error?.message ||
          "Something went wrong while updating favourites.",
        "error",
      );
    } finally {
      setFavoriteLoading(false);
    }
  };

  // ==========================================================
  // SHARE
  // ==========================================================

  const handleShare = async () => {
    if (!listing) return;

    const shareUrl = window.location.href;

    const shareData = {
      title:
        listing.title ||
        "ForeverMeet Professional Profile",

      text:
        listing.description ||
        "View this professional profile on ForeverMeet.",

      url: shareUrl,
    };

    try {
      if (
        navigator.share &&
        typeof navigator.share === "function"
      ) {
        await navigator.share(shareData);

        setShareMessage(
          "Shared successfully",
        );
      } else {
        await navigator.clipboard.writeText(
          shareUrl,
        );

        setShareMessage(
          "Listing link copied",
        );
      }
    } catch (error) {
      if (error?.name === "AbortError") {
        return;
      }

      try {
        await navigator.clipboard.writeText(
          shareUrl,
        );

        setShareMessage(
          "Listing link copied",
        );
      } catch (clipboardError) {
        console.error(
          "Unable to share:",
          clipboardError,
        );
      }
    }

    setTimeout(() => {
      setShareMessage("");
    }, 2500);
  };

  // ==========================================================
  // SEARCH
  // ==========================================================

  const handleSearch = (event) => {
    event.preventDefault();

    const value = search.trim();

    if (!value) return;

    navigate(
      `/search?q=${encodeURIComponent(value)}`,
    );
  };

  // ==========================================================
  // IMAGE NAVIGATION
  // ==========================================================

  const showPreviousImage = () => {
    setCurrentImage((previous) => {
      if (images.length === 0) {
        return 0;
      }

      return (
        (previous - 1 + images.length) %
        images.length
      );
    });
  };

  const showNextImage = () => {
    setCurrentImage((previous) => {
      if (images.length === 0) {
        return 0;
      }

      return (
        (previous + 1) % images.length
      );
    });
  };

  // ==========================================================
  // SIMILAR PROFILE NAVIGATION
  // ==========================================================

  const maxSimilarSlide = Math.max(
    0,
    similarListings.length -
      similarVisibleCards,
  );

  const showPreviousSimilar = () => {
    setSimilarSlide((previous) => {
      if (previous <= 0) {
        return maxSimilarSlide;
      }

      return previous - 1;
    });
  };

  const showNextSimilar = () => {
    setSimilarSlide((previous) => {
      if (previous >= maxSimilarSlide) {
        return 0;
      }

      return previous + 1;
    });
  };

  // ==========================================================
  // CONTACT
  // ==========================================================

  const phoneNumber = listing?.phone
    ? String(listing.phone).replace(
        /\D/g,
        "",
      )
    : "";

  const whatsappNumber = listing?.whatsapp
    ? String(listing.whatsapp).replace(
        /\D/g,
        "",
      )
    : "";

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f7f8]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <ListingSkeleton />
        </div>
      </main>
    );
  }

  // ==========================================================
  // ERROR
  // ==========================================================

  if (error || !listing) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f7f7f8] px-4">
        <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl font-black text-red-600">
            !
          </div>

          <h1 className="mt-5 text-2xl font-black text-gray-950">
            Listing not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            {error ||
              "This listing may have been removed or is no longer available."}
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-6 cursor-pointer rounded-xl bg-gray-950 px-6 py-3 text-sm font-black text-white transition hover:bg-red-600"
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  // ==========================================================
  // BASIC DATA
  // ==========================================================

  const title =
    listing.title ||
    "Professional Profile";

  const category =
    listing.category ||
    "Professional Model";

  const city = listing.city || "";

  const state = listing.state || "";

  const location =
    city && state
      ? `${city}, ${state}`
      : city ||
        state ||
        "India";

  const price = formatPrice(
    listing.price,
  );

  const isPremium = getBoolean(
    listing.isPremium,
  );

  const isFeatured = getBoolean(
    listing.isFeatured,
  );

  const isTrending = getBoolean(
    listing.isTrending,
  );

  const isVerified = getBoolean(
    listing.isVerified,
  );

  const mainImage =
    images[currentImage] ||
    images[0] ||
    "";

  return (
    <div className="min-h-screen bg-[#f7f7f8]">

      {/* ====================================================
          TOAST NOTIFICATION
      ==================================================== */}

      {toast.show && (
        <div className="fixed right-4 top-20 z-[9999] w-[calc(100%-2rem)] max-w-sm sm:right-6 sm:top-24">
          <div
            className={`flex items-start gap-3 rounded-2xl border p-4 shadow-2xl backdrop-blur ${
              toast.type === "success"
                ? "border-green-200 bg-white"
                : "border-red-200 bg-white"
            }`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-black ${
                toast.type === "success"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {toast.type === "success"
                ? "✓"
                : "!"}
            </div>

            <div className="min-w-0 flex-1">
              <p
                className={`text-sm font-black ${
                  toast.type === "success"
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                {toast.type === "success"
                  ? "Success"
                  : "Error"}
              </p>

              <p className="mt-0.5 text-sm font-semibold leading-5 text-gray-600">
                {toast.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setToast({
                  show: false,
                  type: "success",
                  message: "",
                })
              }
              className="cursor-pointer text-lg font-bold text-gray-400 transition hover:text-gray-900"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* ==================================================
          SEARCH
      ================================================== */}

      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSearch}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔎
              </span>

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value,
                  )
                }
                placeholder="Search models, services or cities..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer rounded-xl bg-gray-950 px-5 py-3 text-sm font-black text-white transition hover:bg-red-600"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* ==================================================
          MAIN
      ================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-5 pb-28 sm:px-6 sm:py-8 lg:px-8">

        {/* BREADCRUMB */}

        <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-gray-500">
          <Link
            to="/"
            className="transition hover:text-red-600"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            to={`/search?q=${encodeURIComponent(
              city,
            )}`}
            className="transition hover:text-red-600"
          >
            {city || "Listings"}
          </Link>

          <span>/</span>

          <span className="max-w-[260px] truncate text-gray-900">
            {title}
          </span>
        </div>

        {/* ==================================================
            HERO PROFILE
        ================================================== */}

        <section className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">

            {/* IMAGE */}

            <div className="bg-gray-950">
              <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/10] lg:aspect-[4/4.2]">

                {mainImage ? (
                  <img
                    key={mainImage}
                    src={mainImage}
                    alt={title}
                    className="image-fade-in h-full w-full object-cover transition duration-700"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gray-900">
                    <div className="text-center text-gray-400">
                      <div className="text-5xl">
                        ◇
                      </div>

                      <p className="mt-2 text-sm">
                        No image available
                      </p>
                    </div>
                  </div>
                )}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/70 to-transparent" />

                {/* BADGES */}

                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  {isPremium && (
                    <span className="rounded-full bg-amber-400 px-3 py-1.5 text-[10px] font-black text-gray-950 shadow-lg">
                      PREMIUM
                    </span>
                  )}

                  {isFeatured && (
                    <span className="rounded-full bg-red-600 px-3 py-1.5 text-[10px] font-black text-white shadow-lg">
                      FEATURED
                    </span>
                  )}

                  {isTrending && (
                    <span className="rounded-full bg-gray-950/90 px-3 py-1.5 text-[10px] font-black text-white backdrop-blur">
                      TRENDING
                    </span>
                  )}
                </div>

                {/* IMAGE COUNTER */}

                {images.length > 0 && (
                  <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                    {currentImage + 1} /{" "}
                    {images.length}
                  </div>
                )}

                {/* PREVIOUS */}

                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={
                      showPreviousImage
                    }
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-2xl font-bold text-gray-950 shadow-lg transition hover:scale-105 hover:bg-white"
                  >
                    ‹
                  </button>
                )}

                {/* NEXT */}

                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={
                      showNextImage
                    }
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-2xl font-bold text-gray-950 shadow-lg transition hover:scale-105 hover:bg-white"
                  >
                    ›
                  </button>
                )}
              </div>

              {/* THUMBNAILS */}

              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto bg-gray-950 p-3">
                  {images.map(
                    (
                      image,
                      index,
                    ) => (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() =>
                          setCurrentImage(
                            index,
                          )
                        }
                        className={`h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 transition sm:h-20 sm:w-20 ${
                          index ===
                          currentImage
                            ? "border-white"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${title} ${
                            index + 1
                          }`}
                          className="image-fade-in h-full w-full object-cover"
                        />
                      </button>
                    ),
                  )}
                </div>
              )}
            </div>

            {/* PROFILE SUMMARY */}

            <div className="flex flex-col p-5 sm:p-7 lg:p-9">
              <div className="flex-1">

                {/* CATEGORY */}

                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-red-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-red-600">
                    {category}
                  </span>

                  {isVerified && (
                    <span className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1.5 text-[10px] font-black text-green-700">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-[9px] text-white">
                        ✓
                      </span>

                      Verified
                    </span>
                  )}
                </div>

                {/* TITLE */}

                <h1 className="mt-4 text-2xl font-black leading-tight tracking-tight text-gray-950 sm:text-3xl">
                  {title}
                </h1>

                {/* NAME */}

                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-lg font-black text-gray-700">
                    {(
                      listing.name ||
                      "P"
                    )[0].toUpperCase()}
                  </div>

                  <div>
                    <p className="text-sm font-black text-gray-950">
                      {listing.name ||
                        "Professional Profile"}
                    </p>

                    <p className="mt-0.5 text-xs font-medium text-gray-500">
                      Professional profile
                    </p>
                  </div>
                </div>

                {/* LOCATION */}

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-gray-600">
                  <span className="text-red-500">
                    📍
                  </span>

                  {location}
                </div>

                {/* PRICE */}

                {price && (
                  <div className="mt-6 rounded-2xl bg-gray-50 p-5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Starting price
                    </p>

                    <p className="mt-1 text-3xl font-black text-gray-950">
                      ₹{price}
                    </p>
                  </div>
                )}

                {/* QUICK DETAILS */}

                <div className="mt-6 grid grid-cols-3 gap-2">
                  <InfoBox
                    label="Age"
                    value={
                      listing.age || "—"
                    }
                  />

                  <InfoBox
                    label="Height"
                    value={
                      listing.height ||
                      "—"
                    }
                  />

                  <InfoBox
                    label="Weight"
                    value={
                      listing.weight ||
                      "—"
                    }
                  />
                </div>

                {/* CONTACT */}

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {whatsappNumber && (
                    <a
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3.5 text-sm font-black text-white transition hover:bg-[#20bd5a]"
                    >
                      <span className="text-lg">
                        ◉
                      </span>

                      WhatsApp
                    </a>
                  )}

                  {phoneNumber && (
                    <a
                      href={`tel:${phoneNumber}`}
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-3.5 text-sm font-black text-white transition hover:bg-red-600"
                    >
                      <span className="text-lg">
                        ☎
                      </span>

                      Call
                    </a>
                  )}
                </div>

                {/* FAVOURITE + SHARE */}

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={
                      toggleFavorite
                    }
                    disabled={
                      favoriteLoading
                    }
                    className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-black transition ${
                      favoriteLoading
                        ? "cursor-wait opacity-60"
                        : "cursor-pointer"
                    } ${
                      isFavorite
                        ? "border-red-200 bg-red-50 text-red-600"
                        : "border-gray-200 bg-white text-gray-700 hover:border-red-200 hover:text-red-600"
                    }`}
                  >
                    <span className="text-xl">
                      {favoriteLoading
                        ? "..."
                        : isFavorite
                          ? "♥"
                          : "♡"}
                    </span>

                    {favoriteLoading
                      ? "Saving..."
                      : isFavorite
                        ? "Saved"
                        : "Favourite"}
                  </button>

                  <button
                    type="button"
                    onClick={
                      handleShare
                    }
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-black text-gray-700 transition hover:border-gray-400 hover:text-gray-950"
                  >
                    <span className="text-lg">
                      ↗
                    </span>

                    Share
                  </button>
                </div>

                {shareMessage && (
                  <p className="mt-3 text-center text-xs font-bold text-green-600">
                    {shareMessage}
                  </p>
                )}

                {/* VIEWS */}

                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5 text-xs font-semibold text-gray-500">
                  <span>
                    👁{" "}
                    {Number(
                      listing.views ||
                        0,
                    ).toLocaleString(
                      "en-IN",
                    )}{" "}
                    views
                  </span>

                  <span>
                    {listing.createdAt
                      ? formatDate(
                          listing.createdAt,
                        )
                      : "Recently listed"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            CONTENT
        ================================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_350px]">

          <div className="space-y-6">

            {/* ABOUT */}

            <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
              <SectionTitle>
                About this profile
              </SectionTitle>

              <div className="mt-5 whitespace-pre-line text-sm leading-7 text-gray-600">
                {listing.description ||
                  listing.bio ||
                  "No description has been added yet."}
              </div>
            </section>

            {/* PROFILE DETAILS */}

            <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
              <SectionTitle>
                Profile details
              </SectionTitle>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <DetailRow
                  label="Name"
                  value={
                    listing.name ||
                    "Not specified"
                  }
                />

                <DetailRow
                  label="Age"
                  value={
                    listing.age ||
                    "Not specified"
                  }
                />

                <DetailRow
                  label="Height"
                  value={
                    listing.height ||
                    "Not specified"
                  }
                />

                <DetailRow
                  label="Weight"
                  value={
                    listing.weight ||
                    "Not specified"
                  }
                />

                <DetailRow
                  label="Category"
                  value={
                    listing.category ||
                    "Not specified"
                  }
                />

                <DetailRow
                  label="Location"
                  value={location}
                />
              </div>
            </section>

            {/* LANGUAGES */}

            {languages.length > 0 && (
              <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
                <SectionTitle>
                  Languages
                </SectionTitle>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  {languages.map(
                    (
                      language,
                      index,
                    ) => (
                      <span
                        key={`${language}-${index}`}
                        className="cursor-default rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        {language}
                      </span>
                    ),
                  )}
                </div>
              </section>
            )}

            {/* SERVICES */}

            {services.length > 0 && (
              <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
                <SectionTitle>
                  Professional services
                </SectionTitle>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {services.map(
                    (
                      service,
                      index,
                    ) => (
                      <div
                        key={`${service}-${index}`}
                        className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50/30"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-sm font-black text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                          ✓
                        </span>

                        <span className="text-sm font-bold text-gray-800">
                          {service}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </section>
            )}

            {/* BIO */}

            {listing.bio &&
              listing.bio !==
                listing.description && (
                <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
                  <SectionTitle>
                    Professional bio
                  </SectionTitle>

                  <p className="mt-5 whitespace-pre-line text-sm leading-7 text-gray-600">
                    {listing.bio}
                  </p>
                </section>
              )}
          </div>

          {/* DESKTOP CONTACT */}

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">

              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                Contact profile
              </p>

              <h2 className="mt-2 text-xl font-black text-gray-950">
                Interested in this profile?
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Contact directly using the available contact options.
              </p>

              <div className="mt-5 space-y-3">

                {whatsappNumber && (
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-[#25D366] px-4 py-3.5 text-sm font-black text-white transition hover:bg-[#20bd5a]"
                  >
                    WhatsApp
                  </a>
                )}

                {phoneNumber && (
                  <a
                    href={`tel:${phoneNumber}`}
                    className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-gray-950 px-4 py-3.5 text-sm font-black text-white transition hover:bg-red-600"
                  >
                    Call Now
                  </a>
                )}

                {/* DESKTOP FAVOURITE */}

                <button
                  type="button"
                  onClick={
                    toggleFavorite
                  }
                  disabled={
                    favoriteLoading
                  }
                  className={`w-full rounded-xl border px-4 py-3.5 text-sm font-black transition ${
                    favoriteLoading
                      ? "cursor-wait opacity-60"
                      : "cursor-pointer"
                  } ${
                    isFavorite
                      ? "border-red-200 bg-red-50 text-red-600"
                      : "border-gray-200 bg-white text-gray-700 hover:border-red-300"
                  }`}
                >
                  {favoriteLoading
                    ? "Saving..."
                    : isFavorite
                      ? "♥ Saved to Favourites"
                      : "♡ Add to Favourites"}
                </button>
              </div>

              <div className="mt-6 rounded-2xl bg-gray-50 p-4">
                <p className="text-xs font-bold text-gray-500">
                  Location
                </p>

                <p className="mt-1 text-sm font-black text-gray-900">
                  📍 {location}
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* ==================================================
            SIMILAR PROFILES
        ================================================== */}

        <section className="mt-10">

          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
                You may also like
              </p>

              <h2 className="mt-1 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
                Similar Profiles
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                More professional profiles from similar categories and locations.
              </p>
            </div>

            {city && (
              <Link
                to={`/search?q=${encodeURIComponent(
                  city,
                )}`}
                className="hidden text-sm font-black text-gray-900 transition hover:text-red-600 sm:block"
              >
                View all →
              </Link>
            )}
          </div>

          {similarLoading ? (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({
                length: 4,
              }).map((_, index) => (
                <SimilarSkeleton
                  key={index}
                />
              ))}
            </div>
          ) : similarListings.length > 0 ? (

            <div className="relative mt-6">

              {/* SLIDER VIEWPORT */}

              <div className="overflow-hidden">

                {/* SLIDER TRACK */}

                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${
                      similarSlide *
                      (100 /
                        similarVisibleCards)
                    }%)`,
                  }}
                >
                  {similarListings.map(
                    (
                      similarListing,
                    ) => (
                      <div
                        key={getListingId(
                          similarListing,
                        )}
                        className="w-1/2 shrink-0 px-1.5 sm:w-1/3 sm:px-2.5 lg:w-1/4"
                      >
                        <SimilarListingCard
                          listing={
                            similarListing
                          }
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* PREVIOUS BUTTON */}

              {similarListings.length >
                similarVisibleCards && (
                <button
                  type="button"
                  onClick={
                    showPreviousSimilar
                  }
                  aria-label="Previous similar profiles"
                  className="absolute left-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-xl font-black text-gray-950 shadow-xl ring-1 ring-gray-200 transition hover:scale-105 hover:bg-gray-950 hover:text-white sm:left-2"
                >
                  ‹
                </button>
              )}

              {/* NEXT BUTTON */}

              {similarListings.length >
                similarVisibleCards && (
                <button
                  type="button"
                  onClick={
                    showNextSimilar
                  }
                  aria-label="Next similar profiles"
                  className="absolute right-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-xl font-black text-gray-950 shadow-xl ring-1 ring-gray-200 transition hover:scale-105 hover:bg-gray-950 hover:text-white sm:right-2"
                >
                  ›
                </button>
              )}

              {/* SLIDER DOTS */}

              {similarListings.length >
                similarVisibleCards && (
                <div className="mt-5 flex items-center justify-center gap-1.5">
                  {Array.from({
                    length:
                      maxSimilarSlide + 1,
                  }).map(
                    (_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() =>
                          setSimilarSlide(
                            index,
                          )
                        }
                        aria-label={`Go to similar profiles slide ${
                          index + 1
                        }`}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index ===
                          similarSlide
                            ? "w-6 bg-red-600"
                            : "w-2 bg-gray-300 hover:bg-gray-400"
                        }`}
                      />
                    ),
                  )}
                </div>
              )}
            </div>

          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
              <p className="text-sm font-semibold text-gray-500">
                No similar profiles available yet.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* ==================================================
          MOBILE CONTACT BAR
      ================================================== */}

      {(phoneNumber ||
        whatsappNumber) && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 p-3 shadow-2xl backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-7xl gap-2">

            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 cursor-pointer items-center justify-center rounded-xl bg-[#25D366] px-3 py-3 text-sm font-black text-white"
              >
                WhatsApp
              </a>
            )}

            {phoneNumber && (
              <a
                href={`tel:${phoneNumber}`}
                className="flex flex-1 cursor-pointer items-center justify-center rounded-xl bg-gray-950 px-3 py-3 text-sm font-black text-white"
              >
                Call
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// SECTION TITLE
// ============================================================

function SectionTitle({ children }) {
  return (
    <div>
      <h2 className="text-xl font-black text-gray-950 sm:text-2xl">
        {children}
      </h2>

      <div className="mt-3 h-1 w-10 rounded-full bg-red-600" />
    </div>
  );
}

// ============================================================
// INFO BOX
// ============================================================

function InfoBox({ label, value }) {
  return (
    <div className="rounded-2xl bg-gray-50 p-4">
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-black text-gray-900">
        {value}
      </p>
    </div>
  );
}

// ============================================================
// DETAIL ROW
// ============================================================

function DetailRow({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
      <p className="text-xs font-bold text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-black text-gray-900">
        {value}
      </p>
    </div>
  );
}

// ============================================================
// SIMILAR LISTING CARD
// ============================================================

function SimilarListingCard({ listing }) {
  const listingId =
    getListingId(listing);

  const images =
    getListingImages(listing);

  const image = images[0] || "";

  const title =
    listing.title ||
    listing.name ||
    "Professional Profile";

  const price = formatPrice(
    listing.price,
  );

  const location = [
    listing.city,
    listing.state,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Link
      to={`/listing/${
        listing.slug || listingId
      }`}
      className="group block cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* IMAGE */}

      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        {image ? (
          <img
            key={image}
            src={image}
            alt={title}
            className="image-fade-in h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-semibold text-gray-400">
            No image
          </div>
        )}

        {getBoolean(
          listing.isPremium,
        ) && (
          <span className="absolute left-2 top-2 rounded-full bg-amber-400 px-2.5 py-1 text-[9px] font-black text-gray-950">
            PREMIUM
          </span>
        )}

        {getBoolean(
          listing.isVerified,
        ) && (
          <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-black text-green-600 shadow">
            ✓
          </span>
        )}
      </div>

      {/* CONTENT */}

      <div className="p-3.5">
        <h3 className="line-clamp-2 text-sm font-black leading-5 text-gray-900">
          {title}
        </h3>

        {listing.name && (
          <p className="mt-1 text-xs font-semibold text-gray-500">
            {listing.name}
          </p>
        )}

        {location && (
          <p className="mt-2 truncate text-xs font-semibold text-gray-500">
            📍 {location}
          </p>
        )}

        {price && (
          <p className="mt-3 text-sm font-black text-gray-950">
            ₹{price}
          </p>
        )}
      </div>
    </Link>
  );
}

// ============================================================
// LISTING SKELETON
// ============================================================

function ListingSkeleton() {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="space-y-5">

        <div className="h-10 w-4/5 animate-pulse rounded bg-gray-200" />

        <div className="h-12 w-1/2 animate-pulse rounded bg-gray-200" />

        <div className="h-24 animate-pulse rounded-2xl bg-gray-100" />

        <div className="grid grid-cols-3 gap-3">
          <div className="h-16 animate-pulse rounded-xl bg-gray-100" />

          <div className="h-16 animate-pulse rounded-xl bg-gray-100" />

          <div className="h-16 animate-pulse rounded-xl bg-gray-100" />
        </div>

        <div className="h-12 animate-pulse rounded-xl bg-gray-200" />
      </div>
    </div>
  );
}

// ============================================================
// SIMILAR SKELETON
// ============================================================

function SimilarSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="aspect-[4/5] animate-pulse bg-gray-200" />

      <div className="space-y-3 p-3.5">
        <div className="h-4 animate-pulse rounded bg-gray-200" />

        <div className="h-3 w-2/3 animate-pulse rounded bg-gray-100" />

        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}

// ============================================================
// DATE FORMAT
// ============================================================

function formatDate(date) {
  try {
    return new Intl.DateTimeFormat(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      },
    ).format(new Date(date));
  } catch {
    return "Recently listed";
  }
}

export default ListingDetails;