const API_URL = "http://localhost:5000/api";

/*
|--------------------------------------------------------------------------
| Get authentication token
|--------------------------------------------------------------------------
*/
const getToken = () => {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken")
  );
};

/*
|--------------------------------------------------------------------------
| Common request helper
|--------------------------------------------------------------------------
*/
const adminRequest = async (
  endpoint,
  options = {}
) => {
  const token = getToken();

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,

      headers: {
        "Content-Type": "application/json",

        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),

        ...(options.headers || {}),
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong"
    );
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/
export const getAdminDashboard = async () => {
  return adminRequest("/admin/dashboard");
};

/*
|--------------------------------------------------------------------------
| Users
|--------------------------------------------------------------------------
*/
export const getAdminUsers = async () => {
  return adminRequest("/admin/users");
};

export const blockUser = async (userId) => {
  return adminRequest(
    `/admin/users/${userId}/block`,
    {
      method: "PUT",
    }
  );
};

export const unblockUser = async (userId) => {
  return adminRequest(
    `/admin/users/${userId}/unblock`,
    {
      method: "PUT",
    }
  );
};

export const addUserCredits = async (
  userId,
  credits
) => {
  return adminRequest(
    `/admin/users/${userId}/credits`,
    {
      method: "PUT",

      body: JSON.stringify({
        credits: Number(credits),
      }),
    }
  );
};

/*
|--------------------------------------------------------------------------
| Listings
|--------------------------------------------------------------------------
*/
export const getAdminListings = async () => {
  return adminRequest("/admin/listings");
};

export const approveListing = async (
  listingId
) => {
  return adminRequest(
    `/admin/listings/${listingId}/approve`,
    {
      method: "PUT",
    }
  );
};

export const rejectListing = async (
  listingId
) => {
  return adminRequest(
    `/admin/listings/${listingId}/reject`,
    {
      method: "PUT",
    }
  );
};

export const toggleListingPremium = async (
  listingId
) => {
  return adminRequest(
    `/admin/listings/${listingId}/premium`,
    {
      method: "PUT",
    }
  );
};

export const toggleListingFeatured = async (
  listingId
) => {
  return adminRequest(
    `/admin/listings/${listingId}/featured`,
    {
      method: "PUT",
    }
  );
};

export const toggleListingTrending = async (
  listingId
) => {
  return adminRequest(
    `/admin/listings/${listingId}/trending`,
    {
      method: "PUT",
    }
  );
};

export const toggleListingVerification =
  async (listingId) => {
    return adminRequest(
      `/admin/listings/${listingId}/verify`,
      {
        method: "PUT",
      }
    );
  };