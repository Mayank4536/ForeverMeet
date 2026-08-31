const API_URL = "http://localhost:5000/api";

/**
 * Search listings
 */
export const searchListings = async ({
  q,
  page = 1,
  limit = 12,
  sort = "latest",
}) => {
  const params = new URLSearchParams({
    q,
    page,
    limit,
    sort,
  });

  const response = await fetch(
    `${API_URL}/listings/search?${params.toString()}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to search listings"
    );
  }

  return data;
};

import api from "./api";


/**
 * Get all listings
 */
export const getListings = async (params = {}) => {
  const response = await api.get("/listings", {
    params,
  });

  return response.data;
};

/**
 * Get single listing
 */
export const getListing = async (slug) => {
  const response = await api.get(`/listings/${slug}`);

  return response.data;
};

/**
 * Get similar listings
 */
export const getSimilarListings = async (id) => {
  const response = await api.get(`/listings/${id}/similar`);

  return response.data;
};

/**
 * Get current user's listings
 */
export const getMyListings = async (page = 1, limit = 10) => {
  const response = await api.get("/listings/my-listings", {
    params: {
      page,
      limit,
    },
  });

  return response.data;
};

/**
 * Create listing
 */
export const createListing = async (formData) => {
  const response = await api.post("/listings", formData);

  return response.data;
};

/**
 * Update listing
 */
export const updateListing = async (id, formData) => {
  const response = await api.put(`/listings/${id}`, formData);

  return response.data;
};

/**
 * Delete listing
 */
export const deleteListing = async (id) => {
  const response = await api.delete(`/listings/${id}`);

  return response.data;
};

/**
 * Renew listing
 */
export const renewListing = async (id, listingDurationWeeks) => {
  const response = await api.put(`/listings/renew/${id}`, {
    listingDurationWeeks,
  });

  return response.data;
};

/**
 * Extend listing
 */
export const extendListing = async (id, listingDurationWeeks) => {
  const response = await api.put(`/listings/extend/${id}`, {
    listingDurationWeeks,
  });

  return response.data;
};

// ==================================================
// PROMOTE LISTING
// ==================================================
export const promoteListing = async (
  listingId,
  packageId
) => {
  const response = await api.post(
    `/listings/${listingId}/promote`,
    {
      packageId,
    }
  );

  return response.data;
};


