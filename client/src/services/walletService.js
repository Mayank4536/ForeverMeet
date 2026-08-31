import axios from "axios";

const API_URL = "http://localhost:5000/api/wallet";

/*
|--------------------------------------------------------------------------
| Get Wallet
|--------------------------------------------------------------------------
*/

export const getWallet = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Get Transactions
|--------------------------------------------------------------------------
*/

export const getTransactions = async (
  page = 1,
  limit = 10,
  token
) => {
  const response = await axios.get(
    `${API_URL}/transactions`,
    {
      params: {
        page,
        limit,
      },

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Get Single Transaction
|--------------------------------------------------------------------------
*/

export const getTransactionById = async (
  id,
  token
) => {
  const response = await axios.get(
    `${API_URL}/transactions/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Create Razorpay Order
|--------------------------------------------------------------------------
*/

export const createWalletOrder = async (
  credits,
  token
) => {
  const response = await axios.post(
    `${API_URL}/create-order`,
    {
      credits,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Verify Razorpay Payment
|--------------------------------------------------------------------------
*/

export const verifyWalletPayment = async (
  paymentData,
  token
) => {
  const response = await axios.post(
    `${API_URL}/verify-payment`,
    paymentData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};