import { useEffect, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaHeart,
  FaCalendarAlt,
  FaRedo,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaStar,
  FaExclamationTriangle,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaCoins,
  FaWallet,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import {
  getMyListings,
  deleteListing,
  renewListing,
  extendListing,
} from "../../services/listingService";

import "./MyListings.css";

function MyListings() {
  const navigate = useNavigate();

  // ==================================================
  // LISTINGS
  // ==================================================

  const [listings, setListings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ==================================================
  // PAGINATION
  // ==================================================

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [totalListings, setTotalListings] = useState(0);

  // ==================================================
  // ACTION LOADING
  // ==================================================

  const [actionLoading, setActionLoading] = useState("");

  // ==================================================
  // TOAST
  // ==================================================

  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  // ==================================================
  // DURATION MODAL
  // ==================================================

  const [durationModal, setDurationModal] = useState({
    show: false,
    type: "",
    listingId: null,
    title: "",
  });

  const [selectedDuration, setSelectedDuration] = useState(1);

  // ==================================================
  // DELETE MODAL
  // ==================================================

  const [deleteModal, setDeleteModal] = useState({
    show: false,
    listingId: null,
    title: "",
  });

  // ==================================================
  // IMAGE SLIDER
  // ==================================================

  const [currentImageIndexes, setCurrentImageIndexes] =
    useState({});

  // ==================================================
  // LOAD LISTINGS
  // ==================================================

  const loadListings = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyListings();

      setListings(data.listings || []);

      setTotalListings(data.totalListings || 0);

      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("My Listings Error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load your listings."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadListings();
  }, [page]);

  // ==================================================
  // AUTO IMAGE SLIDER
  // ==================================================

  useEffect(() => {
    if (!listings.length) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentImageIndexes((previousIndexes) => {
        const nextIndexes = {
          ...previousIndexes,
        };

        listings.forEach((listing) => {
          const imageCount = listing.images?.length || 0;

          if (imageCount > 1) {
            const currentIndex =
              previousIndexes[listing._id] || 0;

            nextIndexes[listing._id] =
              (currentIndex + 1) % imageCount;
          }
        });

        return nextIndexes;
      });
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [listings]);

  // ==================================================
  // TOAST
  // ==================================================

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
    }, 5000);
  };

  const closeToast = () => {
    setToast({
      show: false,
      type: "",
      message: "",
    });
  };

  // ==================================================
  // DELETE MODAL
  // ==================================================

  const openDeleteModal = (listing) => {
    setDeleteModal({
      show: true,
      listingId: listing._id,
      title: listing.title,
    });
  };

  const closeDeleteModal = () => {
    if (actionLoading) {
      return;
    }

    setDeleteModal({
      show: false,
      listingId: null,
      title: "",
    });
  };

  // ==================================================
  // DELETE LISTING
  // ==================================================

  const handleDelete = async () => {
    const id = deleteModal.listingId;

    if (!id) {
      return;
    }

    try {
      setActionLoading(`delete-${id}`);

      const data = await deleteListing(id);

      closeDeleteModal();

      showToast(
        "success",
        data.message ||
          "Listing deleted successfully."
      );

      await loadListings();
    } catch (err) {
      console.error("Delete Listing Error:", err);

      closeDeleteModal();

      showToast(
        "error",
        err.response?.data?.message ||
          err.message ||
          "Failed to delete listing."
      );
    } finally {
      setActionLoading("");
    }
  };

  // ==================================================
  // DURATION MODAL
  // ==================================================

  const openDurationModal = (listing, type) => {
    setSelectedDuration(1);

    setDurationModal({
      show: true,
      type,
      listingId: listing._id,
      title: listing.title,
    });
  };

  // ==================================================
  // CLOSE DURATION MODAL
  // ==================================================

  const closeDurationModal = () => {
    if (actionLoading) {
      return;
    }

    setDurationModal({
      show: false,
      type: "",
      listingId: null,
      title: "",
    });

    setSelectedDuration(1);
  };

  // ==================================================
  // GET CREDIT INFORMATION
  //
  // Supports multiple backend response formats.
  // ==================================================

  const getCreditInformation = (data) => {
    const creditsDeducted =
      data?.creditsDeducted ??
      data?.creditDeducted ??
      data?.creditsUsed ??
      data?.creditUsed ??
      data?.deductedCredits ??
      data?.data?.creditsDeducted ??
      data?.data?.creditDeducted ??
      data?.data?.creditsUsed ??
      data?.data?.deductedCredits ??
      null;

    const remainingCredits =
      data?.remainingCredits ??
      data?.creditsRemaining ??
      data?.wallet?.credits ??
      data?.data?.remainingCredits ??
      data?.data?.creditsRemaining ??
      data?.data?.wallet?.credits ??
      null;

    return {
      creditsDeducted,
      remainingCredits,
    };
  };

  // ==================================================
  // RENEW / EXTEND
  // ==================================================

  const handleDurationSubmit = async () => {
    const { listingId, type } = durationModal;

    if (!listingId) {
      return;
    }

    const weeks = Number(selectedDuration);

    if (![1, 2, 4, 8].includes(weeks)) {
      showToast(
        "error",
        "Please select 1, 2, 4 or 8 weeks."
      );

      return;
    }

    try {
      setActionLoading(`${type}-${listingId}`);

      let data;

      // ==================================================
      // RENEW EXPIRED LISTING
      // ==================================================

      if (type === "renew") {
        data = await renewListing(
          listingId,
          weeks
        );
      }

      // ==================================================
      // EXTEND ACTIVE LISTING
      // ==================================================

      else {
        data = await extendListing(
          listingId,
          weeks
        );
      }

      // ==================================================
      // CREDIT INFORMATION
      // ==================================================

      const {
        creditsDeducted,
        remainingCredits,
      } = getCreditInformation(data);

      // ==================================================
      // IMPORTANT:
      // Update listing immediately in frontend.
      //
      // The backend should ALSO set:
      //
      // listing.status = "approved"
      //
      // after successful renew/extend.
      // ==================================================

      setListings((previousListings) =>
        previousListings.map((listing) => {
          if (listing._id !== listingId) {
            return listing;
          }

          return {
            ...listing,

            // Expired listing becomes approved
            status: "approved",

            // Use returned listing data when available
            ...(data?.listing || {}),
            ...(data?.data?.listing || {}),
          };
        })
      );

      // ==================================================
      // CLOSE MODAL
      // ==================================================

      closeDurationModal();

      // ==================================================
      // SUCCESS MESSAGE
      // ==================================================

      let successMessage =
        data?.message ||
        `${
          type === "renew"
            ? "Listing renewed"
            : "Listing extended"
        } successfully.`;

      // ==================================================
      // CREDIT DEDUCTION MESSAGE
      // ==================================================

      if (
        creditsDeducted !== null &&
        creditsDeducted !== undefined
      ) {
        successMessage += ` ${creditsDeducted} ${
          Number(creditsDeducted) === 1
            ? "credit"
            : "credits"
        } deducted.`;
      }

      if (
        remainingCredits !== null &&
        remainingCredits !== undefined
      ) {
        successMessage += ` Remaining credits: ${remainingCredits}.`;
      }

      // ==================================================
      // 2 WEEK SPECIAL MESSAGE
      // ==================================================

      if (weeks === 2) {
        if (
          creditsDeducted !== null &&
          creditsDeducted !== undefined
        ) {
          successMessage += ` Your listing is active for another 2 weeks.`;
        } else {
          successMessage +=
            " Your listing has been extended for 2 weeks.";
        }
      }

      showToast(
        "success",
        successMessage
      );

      // ==================================================
      // REFRESH FROM BACKEND
      //
      // This makes sure the UI matches MongoDB.
      // ==================================================

      await loadListings();
    } catch (err) {
      console.error(
        `${
          type === "renew"
            ? "Renew"
            : "Extend"
        } Listing Error:`,
        err
      );

      showToast(
        "error",
        err.response?.data?.message ||
          err.message ||
          `Failed to ${
            type === "renew"
              ? "renew"
              : "extend"
          } listing.`
      );
    } finally {
      setActionLoading("");
    }
  };

  // ==================================================
  // PREVIOUS IMAGE
  // ==================================================

  const handlePreviousImage = (listing) => {
    const images = listing.images || [];

    if (images.length <= 1) {
      return;
    }

    setCurrentImageIndexes((previousIndexes) => {
      const currentIndex =
        previousIndexes[listing._id] || 0;

      const previousIndex =
        currentIndex === 0
          ? images.length - 1
          : currentIndex - 1;

      return {
        ...previousIndexes,
        [listing._id]: previousIndex,
      };
    });
  };

  // ==================================================
  // NEXT IMAGE
  // ==================================================

  const handleNextImage = (listing) => {
    const images = listing.images || [];

    if (images.length <= 1) {
      return;
    }

    setCurrentImageIndexes((previousIndexes) => {
      const currentIndex =
        previousIndexes[listing._id] || 0;

      const nextIndex =
        (currentIndex + 1) % images.length;

      return {
        ...previousIndexes,
        [listing._id]: nextIndex,
      };
    });
  };

  // ==================================================
  // IMAGE DOT
  // ==================================================

  const handleImageDotClick = (
    listingId,
    index
  ) => {
    setCurrentImageIndexes(
      (previousIndexes) => ({
        ...previousIndexes,
        [listingId]: index,
      })
    );
  };

  // ==================================================
  // FORMAT DATE
  // ==================================================

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ==================================================
  // CHECK EXPIRED
  // ==================================================

  const isExpired = (expiresAt) => {
    if (!expiresAt) {
      return false;
    }

    return new Date(expiresAt) <= new Date();
  };

  // ==================================================
  // STATUS BADGE
  // ==================================================

  const getStatusBadge = (listing) => {
    /*
      Important:
      If backend has changed the status to approved,
      show Approved even when expiresAt was previously
      expired.

      We check status first.
    */

    if (listing.status === "approved") {
      return (
        <span className="status-badge approved">
          <FaCheckCircle />
          Approved
        </span>
      );
    }

    if (isExpired(listing.expiresAt)) {
      return (
        <span className="status-badge expired">
          <FaTimesCircle />
          Expired
        </span>
      );
    }

    if (listing.status === "pending") {
      return (
        <span className="status-badge pending">
          <FaHourglassHalf />
          Pending
        </span>
      );
    }

    if (listing.status === "rejected") {
      return (
        <span className="status-badge rejected">
          <FaTimesCircle />
          Rejected
        </span>
      );
    }

    return (
      <span className="status-badge">
        {listing.status}
      </span>
    );
  };

  // ==================================================
  // VIEW LISTING
  // ==================================================

  const handleView = (listing) => {
    navigate(`/listing/${listing.slug}`);
  };

  // ==================================================
  // CREATE LISTING
  // ==================================================

  const handleCreateListing = () => {
    navigate("/create-listing");
  };

  // ==================================================
  // RENDER
  // ==================================================

  return (
    <>
      {/* ==================================================
          TOAST
      ================================================== */}

      {toast.show && (
        <div
          className={`my-listings-toast ${
            toast.type === "success"
              ? "toast-success"
              : "toast-error"
          }`}
        >
          <div className="toast-icon">
            {toast.type === "success" ? (
              <FaCheckCircle />
            ) : (
              <FaTimesCircle />
            )}
          </div>

          <div className="toast-content">
            <strong>
              {toast.type === "success"
                ? "Success"
                : "Error"}
            </strong>

            <span>{toast.message}</span>
          </div>

          <button
            className="toast-close"
            onClick={closeToast}
          >
            <FaTimes />
          </button>
        </div>
      )}

      {/* ==================================================
          DURATION MODAL
      ================================================== */}

      {durationModal.show && (
        <div
          className="custom-modal-overlay"
          onClick={closeDurationModal}
        >
          <div
            className="custom-modal duration-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* Modal Header */}

            <div className="modal-header">
              <div className="modal-header-icon">
                {durationModal.type ===
                "renew" ? (
                  <FaRedo />
                ) : (
                  <FaClock />
                )}
              </div>

              <button
                className="modal-close"
                onClick={closeDurationModal}
                disabled={Boolean(
                  actionLoading
                )}
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}

            <div className="modal-body">
              <h2>
                {durationModal.type ===
                "renew"
                  ? "Renew Listing"
                  : "Extend Listing"}
              </h2>

              <p className="modal-description">
                {durationModal.type ===
                "renew"
                  ? "Your listing has expired. Select how long you want to renew it."
                  : "Select how long you want to extend your current listing."}
              </p>

              <div className="modal-listing-name">
                {durationModal.title}
              </div>

              <p className="duration-label">
                Select duration
              </p>

              {/* Duration Options */}

              <div className="duration-options">
                {[1, 2, 4, 8].map(
                  (weeks) => (
                    <button
                      key={weeks}
                      type="button"
                      className={`duration-option ${
                        selectedDuration ===
                        weeks
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedDuration(
                          weeks
                        )
                      }
                    >
                      <strong>
                        {weeks}
                      </strong>

                      <span>
                        {weeks === 1
                          ? "Week"
                          : "Weeks"}
                      </span>
                    </button>
                  )
                )}
              </div>

              {/* Selected Duration */}

              <div className="duration-info">
                <FaClock />

                <span>
                  Selected duration:{" "}
                  <strong>
                    {selectedDuration}{" "}
                    {selectedDuration === 1
                      ? "week"
                      : "weeks"}
                  </strong>
                </span>
              </div>

              {/* Credit Notice */}

              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  padding: "12px 14px",
                  borderRadius: "12px",
                  background:
                    "rgba(255, 247, 237, 0.9)",
                  border:
                    "1px solid rgba(245, 158, 11, 0.25)",
                }}
              >
                <FaCoins
                  style={{
                    marginTop: "2px",
                    color: "#d97706",
                    flexShrink: 0,
                  }}
                />

                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#92400e",
                    }}
                  >
                    Credits will be used
                  </div>

                  <div
                    style={{
                      marginTop: "3px",
                      fontSize: "11px",
                      lineHeight: 1.5,
                      color: "#a16207",
                    }}
                  >
                    The required credits for{" "}
                    {selectedDuration}{" "}
                    {selectedDuration === 1
                      ? "week"
                      : "weeks"}{" "}
                    will be deducted from
                    your wallet after
                    successful renewal.
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}

            <div className="modal-footer">
              <button
                type="button"
                className="modal-cancel-btn"
                onClick={closeDurationModal}
                disabled={Boolean(
                  actionLoading
                )}
              >
                Cancel
              </button>

              <button
                type="button"
                className="modal-confirm-btn"
                onClick={
                  handleDurationSubmit
                }
                disabled={Boolean(
                  actionLoading
                )}
              >
                {actionLoading ===
                `${durationModal.type}-${durationModal.listingId}` ? (
                  <>
                    <span className="button-spinner"></span>

                    {durationModal.type ===
                    "renew"
                      ? "Renewing..."
                      : "Extending..."}
                  </>
                ) : (
                  <>
                    {durationModal.type ===
                    "renew" ? (
                      <FaRedo />
                    ) : (
                      <FaClock />
                    )}

                    {durationModal.type ===
                    "renew"
                      ? "Renew Listing"
                      : "Extend Listing"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          DELETE MODAL
      ================================================== */}

      {deleteModal.show && (
        <div
          className="custom-modal-overlay"
          onClick={closeDeleteModal}
        >
          <div
            className="custom-modal delete-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="delete-modal-icon">
              <FaExclamationTriangle />
            </div>

            <button
              className="modal-close delete-close"
              onClick={closeDeleteModal}
              disabled={Boolean(
                actionLoading
              )}
            >
              <FaTimes />
            </button>

            <div className="modal-body delete-modal-body">
              <h2>Delete Listing?</h2>

              <p>
                Are you sure you want to
                permanently delete this
                listing?
              </p>

              <div className="delete-listing-name">
                {deleteModal.title}
              </div>

              <p className="delete-warning">
                This action cannot be
                undone.
              </p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="modal-cancel-btn"
                onClick={closeDeleteModal}
                disabled={Boolean(
                  actionLoading
                )}
              >
                Cancel
              </button>

              <button
                type="button"
                className="modal-delete-btn"
                onClick={handleDelete}
                disabled={Boolean(
                  actionLoading
                )}
              >
                {actionLoading ===
                `delete-${deleteModal.listingId}` ? (
                  <>
                    <span className="button-spinner"></span>

                    Deleting...
                  </>
                ) : (
                  <>
                    <FaTrash />
                    Delete Listing
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          MAIN PAGE
      ================================================== */}

      <main className="my-listings-page">
        <div className="my-listings-container">
          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="my-listings-header">
            <div>
              <h1>My Listings</h1>

              <p>
                Manage all your profiles and
                listings from one place.
              </p>
            </div>

            <button
              className="create-listing-btn"
              onClick={
                handleCreateListing
              }
            >
              <FaPlus />
              Post New Profile
            </button>
          </div>

          {/* ==================================================
              SUMMARY
          ================================================== */}

          {!loading && !error && (
            <div className="my-listings-summary">
              {/* Total */}

              <div className="summary-card">
                <div className="summary-icon">
                  <FaStar />
                </div>

                <div>
                  <span>
                    Total Listings
                  </span>

                  <strong>
                    {totalListings}
                  </strong>
                </div>
              </div>

              {/* Approved */}

              <div className="summary-card">
                <div className="summary-icon">
                  <FaCheckCircle />
                </div>

                <div>
                  <span>Approved</span>

                  <strong>
                    {
                      listings.filter(
                        (item) =>
                          item.status ===
                            "approved" &&
                          !isExpired(
                            item.expiresAt
                          )
                      ).length
                    }
                  </strong>
                </div>
              </div>

              {/* Expired */}

              <div className="summary-card">
                <div className="summary-icon">
                  <FaClock />
                </div>

                <div>
                  <span>Expired</span>

                  <strong>
                    {
                      listings.filter(
                        (item) =>
                          isExpired(
                            item.expiresAt
                          )
                      ).length
                    }
                  </strong>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================
              LOADING
          ================================================== */}

          {loading && (
            <div className="my-listings-loading">
              <div className="spinner"></div>

              <p>
                Loading your listings...
              </p>
            </div>
          )}

          {/* ==================================================
              ERROR
          ================================================== */}

          {!loading && error && (
            <div className="my-listings-error">
              <FaTimesCircle />

              <h3>
                Unable to load listings
              </h3>

              <p>{error}</p>

              <button
                onClick={loadListings}
              >
                Try Again
              </button>
            </div>
          )}

          {/* ==================================================
              EMPTY
          ================================================== */}

          {!loading &&
            !error &&
            listings.length === 0 && (
              <div className="my-listings-empty">
                <div className="empty-icon">
                  <FaStar />
                </div>

                <h2>
                  No Listings Yet
                </h2>

                <p>
                  You haven't created any
                  profiles yet. Create your
                  first listing to get
                  started.
                </p>

                <button
                  onClick={
                    handleCreateListing
                  }
                  className="create-listing-btn"
                >
                  <FaPlus />
                  Create Your First Profile
                </button>
              </div>
            )}

          {/* ==================================================
              LISTINGS
          ================================================== */}

          {!loading &&
            !error &&
            listings.length > 0 && (
              <div className="my-listings-grid">
                {listings.map(
                  (listing) => {
                    const images =
                      listing.images || [];

                    const currentIndex =
                      currentImageIndexes[
                        listing._id
                      ] || 0;

                    const currentImage =
                      images[currentIndex]
                        ?.url ||
                      "/placeholder.jpg";

                    return (
                      <article
                        className="my-listing-card"
                        key={
                          listing._id
                        }
                      >
                        {/* ==================================================
                            IMAGE SLIDER
                        ================================================== */}

                        <div className="my-listing-image-wrapper">
                          <img
                            key={
                              currentImage
                            }
                            src={
                              currentImage
                            }
                            alt={
                              listing.title ||
                              "Listing image"
                            }
                            className="my-listing-image slider-image"
                          />

                          <div className="image-overlay"></div>

                          {/* Status */}

                          <div className="listing-status">
                            {getStatusBadge(
                              listing
                            )}
                          </div>

                          {/* Premium */}

                          {listing.isPremium && (
                            <div className="premium-badge">
                              <FaStar />
                              Premium
                            </div>
                          )}

                          {/* Previous */}

                          {images.length >
                            1 && (
                            <button
                              type="button"
                              className="image-slider-arrow image-slider-prev"
                              onClick={() =>
                                handlePreviousImage(
                                  listing
                                )
                              }
                              aria-label="Previous image"
                            >
                              <FaChevronLeft />
                            </button>
                          )}

                          {/* Next */}

                          {images.length >
                            1 && (
                            <button
                              type="button"
                              className="image-slider-arrow image-slider-next"
                              onClick={() =>
                                handleNextImage(
                                  listing
                                )
                              }
                              aria-label="Next image"
                            >
                              <FaChevronRight />
                            </button>
                          )}

                          {/* Counter */}

                          {images.length >
                            1 && (
                            <div className="image-counter">
                              {currentIndex +
                                1}
                              /
                              {
                                images.length
                              }
                            </div>
                          )}

                          {/* Dots */}

                          {images.length >
                            1 && (
                            <div className="image-slider-dots">
                              {images.map(
                                (
                                  image,
                                  index
                                ) => (
                                  <button
                                    key={
                                      image.publicId ||
                                      image.url ||
                                      index
                                    }
                                    type="button"
                                    className={`image-slider-dot ${
                                      currentIndex ===
                                      index
                                        ? "active"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      handleImageDotClick(
                                        listing._id,
                                        index
                                      )
                                    }
                                    aria-label={`Show image ${
                                      index +
                                      1
                                    }`}
                                  />
                                )
                              )}
                            </div>
                          )}
                        </div>

                        {/* ==================================================
                            CONTENT
                        ================================================== */}

                        <div className="my-listing-content">
                          {/* Title */}

                          <h2>
                            {
                              listing.title
                            }
                          </h2>

                          {/* Location */}

                          <p className="listing-location">
                            {
                              listing.city
                            }
                            ,{" "}
                            {
                              listing.state
                            }
                          </p>

                          {/* Price */}

                          <p className="listing-price">
                            ₹
                            {Number(
                              listing.price ||
                                0
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </p>

                          {/* Stats */}

                          <div className="listing-stats">
                            <div>
                              <FaEye />

                              <span>
                                {
                                  listing.views ||
                                  0
                                }
                              </span>
                            </div>

                            <div>
                              <FaHeart />

                              <span>
                                {
                                  listing.favorites ||
                                  0
                                }
                              </span>
                            </div>

                            <div>
                              <FaCalendarAlt />

                              <span>
                                {formatDate(
                                  listing.expiresAt
                                )}
                              </span>
                            </div>
                          </div>

                          {/* Features */}

                          <div className="listing-features">
                            {listing.isFeatured && (
                              <span>
                                Featured
                              </span>
                            )}

                            {listing.isTrending && (
                              <span>
                                Trending
                              </span>
                            )}

                            {listing.isVerified && (
                              <span>
                                Verified
                              </span>
                            )}

                            {listing.isHomepageHighlight && (
                              <span>
                                Homepage
                              </span>
                            )}

                            {listing.isUrgent && (
                              <span>
                                Urgent
                              </span>
                            )}

                            {listing.isTopCity && (
                              <span>
                                Top City
                              </span>
                            )}
                          </div>

                          {/* Expiry */}

                          <div className="listing-expiry">
                            <FaClock />

                            {isExpired(
                              listing.expiresAt
                            ) ? (
                              <span className="expired-text">
                                This listing
                                has
                                expired.
                              </span>
                            ) : (
                              <span>
                                Expires on{" "}
                                <strong>
                                  {formatDate(
                                    listing.expiresAt
                                  )}
                                </strong>
                              </span>
                            )}
                          </div>

                          {/* ==================================================
                              ACTIONS
                          ================================================== */}

                          <div className="listing-actions">
                            {/* View */}

                            <button
                              className="view-btn"
                              onClick={() =>
                                handleView(
                                  listing
                                )
                              }
                            >
                              <FaEye />
                              View
                            </button>

                            {/* Edit */}

                            <button
                              className="edit-btn"
                              onClick={() =>
                                navigate(
                                  `/edit-listing/${listing._id}`
                                )
                              }
                            >
                              <FaEdit />
                              Edit
                            </button>

                            {/* Renew / Extend */}

                            {isExpired(
                              listing.expiresAt
                            ) ? (
                              <button
                                className="renew-btn"
                                disabled={
                                  actionLoading ===
                                  `renew-${listing._id}`
                                }
                                onClick={() =>
                                  openDurationModal(
                                    listing,
                                    "renew"
                                  )
                                }
                              >
                                <FaRedo />
                                Renew
                              </button>
                            ) : (
                              <button
                                className="extend-btn"
                                disabled={
                                  actionLoading ===
                                  `extend-${listing._id}`
                                }
                                onClick={() =>
                                  openDurationModal(
                                    listing,
                                    "extend"
                                  )
                                }
                              >
                                <FaClock />
                                Extend
                              </button>
                            )}

                            {/* Delete */}

                            <button
                              className="delete-btn"
                              disabled={
                                actionLoading ===
                                `delete-${listing._id}`
                              }
                              onClick={() =>
                                openDeleteModal(
                                  listing
                                )
                              }
                            >
                              <FaTrash />
                              Delete
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  }
                )}
              </div>
            )}

          {/* ==================================================
              PAGINATION
          ================================================== */}

          {!loading &&
            !error &&
            totalPages > 1 && (
              <div className="my-listings-pagination">
                <button
                  disabled={page === 1}
                  onClick={() =>
                    setPage(
                      (current) =>
                        Math.max(
                          current - 1,
                          1
                        )
                    )
                  }
                >
                  Previous
                </button>

                <span>
                  Page {page} of{" "}
                  {totalPages}
                </span>

                <button
                  disabled={
                    page === totalPages
                  }
                  onClick={() =>
                    setPage(
                      (current) =>
                        Math.min(
                          current + 1,
                          totalPages
                        )
                    )
                  }
                >
                  Next
                </button>
              </div>
            )}
        </div>
      </main>
    </>
  );
}

export default MyListings;