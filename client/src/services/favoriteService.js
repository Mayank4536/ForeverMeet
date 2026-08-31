import axios from "axios";

const API_URL = "http://localhost:5000/api/favorites";

// ============================================================
// GET MY FAVOURITES
// ============================================================

export const getMyFavorites = async (page = 1, limit = 12) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    params: {
      page,
      limit,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ============================================================
// REMOVE FAVOURITE
// ============================================================

export const removeFavorite = async (listingId) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${API_URL}/${listingId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};