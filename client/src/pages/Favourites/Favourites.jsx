import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaTrash,
  FaArrowLeft,
  FaRedo,
} from "react-icons/fa";

import Navbar from "../../components/Navbar/Navbar";
import {
  getMyFavorites,
  removeFavorite,
} from "../../services/favoriteService";

const API_BASE_URL = "http://localhost:5000";

// ============================================================
// IMAGE URL HELPER
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

// ============================================================
// GET LISTING IMAGE
// ============================================================

const getListingImage = (listing) => {
  if (
    !Array.isArray(listing?.images) ||
    listing.images.length === 0
  ) {
    return "";
  }

  return getImageUrl(listing.images[0]);
};

// ============================================================
// FORMAT PRICE
// ============================================================

const formatPrice = (price) => {
  if (
    price === undefined ||
    price === null ||
    price === ""
  ) {
    return null;
  }

  const number = Number(price);

  if (Number.isNaN(number)) {
    return price;
  }

  return new Intl.NumberFormat("en-IN").format(number);
};

// ============================================================
// MAIN COMPONENT
// ============================================================

function Favourites() {
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [removingId, setRemovingId] = useState(null);

  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  // ==========================================================
  // TOAST
  // ==========================================================

  const showToast = (type, message) => {
    setToast({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setToast({
        show: false,
        type: "",
        message: "",
      });
    }, 2500);
  };

  // ==========================================================
  // LOAD FAVOURITES
  // ==========================================================

  const loadFavorites = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyFavorites(1, 50);

      console.log(
        "FAVOURITES API RESPONSE:",
        response,
      );

      setListings(
        Array.isArray(response?.listings)
          ? response.listings
          : [],
      );
    } catch (error) {
      console.error(
        "Unable to load favourites:",
        error,
      );

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to load your favourites.";

      setError(message);

      setListings([]);

      // If token is missing/expired
      if (
        error?.response?.status === 401
      ) {
        showToast(
          "error",
          "Please login to view your favourites.",
        );

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // LOAD ON PAGE OPEN
  // ==========================================================

  useEffect(() => {
    loadFavorites();
  }, []);

  // ==========================================================
  // REMOVE FAVOURITE
  // ==========================================================

  const handleRemoveFavorite = async (
    listingId,
  ) => {
    if (!listingId) return;

    try {
      setRemovingId(listingId);

      const response =
        await removeFavorite(listingId);

      console.log(
        "REMOVE FAVOURITE RESPONSE:",
        response,
      );

      // Remove immediately from UI
      setListings((previous) =>
        previous.filter(
          (listing) =>
            String(
              listing._id,
            ) !== String(listingId),
        ),
      );

      showToast(
        "success",
        "Removed from favourites.",
      );
    } catch (error) {
      console.error(
        "Unable to remove favourite:",
        error,
      );

      showToast(
        "error",
        error?.response?.data?.message ||
          "Unable to remove favourite.",
      );
    } finally {
      setRemovingId(null);
    }
  };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f7f8]">
        <Navbar />

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 w-56 rounded bg-gray-200" />

            <div className="mt-3 h-4 w-80 rounded bg-gray-200" />

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({
                length: 8,
              }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl bg-white"
                >
                  <div className="aspect-[4/5] bg-gray-200" />

                  <div className="space-y-3 p-4">
                    <div className="h-4 rounded bg-gray-200" />

                    <div className="h-3 w-2/3 rounded bg-gray-100" />

                    <div className="h-4 w-1/2 rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ==========================================================
  // ERROR
  // ==========================================================

  if (error) {
    return (
      <div className="min-h-screen bg-[#f7f7f8]">

        <main className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl text-red-600">
              !
            </div>

            <h1 className="mt-5 text-2xl font-black text-gray-950">
              Unable to load favourites
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              {error}
            </p>

            <button
              type="button"
              onClick={loadFavorites}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-black text-white transition hover:bg-red-600"
            >
              <FaRedo />
              Try Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="min-h-screen bg-[#f7f7f8]">

      {/* ======================================================
          TOAST
      ====================================================== */}

      {toast.show && (
        <div className="fixed right-4 top-5 z-[100]">
          <div
            className={`flex min-w-[280px] max-w-sm items-center gap-3 rounded-2xl border px-4 py-3.5 shadow-2xl ${
              toast.type === "success"
                ? "border-green-200 bg-white"
                : "border-red-200 bg-white"
            }`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-black text-white ${
                toast.type === "success"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {toast.type === "success"
                ? "✓"
                : "!"}
            </div>

            <div>
              <p
                className={`text-sm font-black ${
                  toast.type === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {toast.type === "success"
                  ? "Success"
                  : "Error"}
              </p>

              <p className="mt-0.5 text-xs font-semibold text-gray-600">
                {toast.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================
          MAIN
      ====================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-7 pb-16 sm:px-6 lg:px-8">
        {/* HEADER */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <FaHeart />
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
                  Your collection
                </p>

                <h1 className="text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
                  My Favourites
                </h1>
              </div>
            </div>

            <p className="mt-3 text-sm text-gray-500">
              Profiles you have saved for later.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-black text-gray-700 transition hover:border-red-200 hover:text-red-600"
          >
            <FaArrowLeft />
            Browse Profiles
          </Link>
        </div>

        {/* ====================================================
            EMPTY STATE
        ==================================================== */}

        {listings.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-3xl text-red-500">
              <FaHeart />
            </div>

            <h2 className="mt-6 text-2xl font-black text-gray-950">
              No favourites yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              When you find a professional profile
              you like, click the Favourite button
              to save it here.
            </p>

            <Link
              to="/"
              className="mt-7 inline-flex items-center justify-center rounded-xl bg-gray-950 px-6 py-3.5 text-sm font-black text-white transition hover:bg-red-600"
            >
              Browse Profiles
            </Link>
          </div>
        ) : (
          <>
            {/* ==================================================
                COUNT
            ================================================== */}

            <div className="mt-7 flex items-center justify-between border-b border-gray-200 pb-4">
              <p className="text-sm font-bold text-gray-500">
                <span className="font-black text-gray-950">
                  {listings.length}
                </span>{" "}
                saved{" "}
                {listings.length === 1
                  ? "profile"
                  : "profiles"}
              </p>
            </div>

            {/* ==================================================
                LISTING GRID
            ================================================== */}

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {listings.map(
                (listing) => (
                  <FavoriteCard
                    key={listing._id}
                    listing={listing}
                    removingId={
                      removingId
                    }
                    onRemove={
                      handleRemoveFavorite
                    }
                  />
                ),
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

// ============================================================
// FAVOURITE CARD
// ============================================================

function FavoriteCard({
  listing,
  removingId,
  onRemove,
}) {
  const listingId = listing?._id;

  const image =
    getListingImage(listing);

  const title =
    listing?.title ||
    listing?.name ||
    "Professional Profile";

  const location = [
    listing?.city,
    listing?.state,
  ]
    .filter(Boolean)
    .join(", ");

  const price = formatPrice(
    listing?.price,
  );

  const isPremium =
    listing?.isPremium === true ||
    listing?.isPremium === "true";

  const isVerified =
    listing?.isVerified === true ||
    listing?.isVerified === "true";

  const isRemoving =
    String(removingId) ===
    String(listingId);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* ====================================================
          IMAGE
      ==================================================== */}

      <Link
        to={`/listing/${
          listing?.slug || listingId
        }`}
        className="block"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm font-bold text-gray-400">
              No image
            </div>
          )}

          {/* DARK GRADIENT */}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent" />

          {/* PREMIUM */}

          {isPremium && (
            <span className="absolute left-2.5 top-2.5 rounded-full bg-amber-400 px-2.5 py-1 text-[9px] font-black text-gray-950 shadow">
              PREMIUM
            </span>
          )}

          {/* VERIFIED */}

          {isVerified && (
            <span className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-black text-green-600 shadow">
              ✓
            </span>
          )}
        </div>
      </Link>

      {/* ====================================================
          CONTENT
      ==================================================== */}

      <div className="p-3.5">
        <Link
          to={`/listing/${
            listing?.slug || listingId
          }`}
        >
          <h2 className="line-clamp-2 text-sm font-black leading-5 text-gray-950 transition hover:text-red-600">
            {title}
          </h2>
        </Link>

        {listing?.name && (
          <p className="mt-1 truncate text-xs font-semibold text-gray-500">
            {listing.name}
          </p>
        )}

        {location && (
          <p className="mt-2 flex items-center gap-1 truncate text-xs font-semibold text-gray-500">
            <FaMapMarkerAlt className="shrink-0 text-red-500" />

            {location}
          </p>
        )}

        {price && (
          <p className="mt-3 text-sm font-black text-gray-950">
            ₹{price}
          </p>
        )}

        {/* REMOVE BUTTON */}

        <button
          type="button"
          disabled={isRemoving}
          onClick={() =>
            onRemove(listingId)
          }
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-black text-red-600 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FaTrash />

          {isRemoving
            ? "Removing..."
            : "Remove Favourite"}
        </button>
      </div>
    </article>
  );
}

export default Favourites;