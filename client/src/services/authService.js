import API from "./api";

export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

export const verifyOTP = async (data) => {
  const response = await API.post("/auth/verify-otp", data);
  return response.data;
};

export const resendOTP = async (data) => {
  const response = await API.post("/auth/resend-otp", data);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);
  return response.data;
};

export const forgotPassword = async (data) => {
  const response = await API.post("/auth/forgot-password", data);
  return response.data;
};

export const verifyResetOTP = async (data) => {
  const response = await API.post("/auth/verify-reset-otp", data);
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await API.post("/auth/reset-password", data);
  return response.data;
};

export const changePassword = async (data) => {
  const response = await API.post("/auth/change-password", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const getProfile = async () => {
  const response = await API.get("/auth/profile");
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await API.put("/auth/profile", data);
  return response.data;
};

export const logoutUser = async () => {
  const response = await API.post(
    "/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );

  return response.data;
};

export const deleteAccount = async (password) => {
  const response = await API.delete("/auth/delete-account", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: {
      password,
    },
  });

  return response.data;
};
