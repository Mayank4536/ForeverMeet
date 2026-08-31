import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getTransactionById } from "../../services/walletService";

function TransactionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTransaction();
  }, [id]);

  const fetchTransaction = async () => {
    try {
      setLoading(true);

      const response = await getTransactionById(
        id,
        token
      );

      if (response.success) {
        setTransaction(response.transaction);
      } else {
        toast.error(
          response.message || "Transaction not found."
        );
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to load transaction."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getTransactionType = (type) => {
    const types = {
      purchase: "Credit Purchase",
      listing_create: "Listing Created",
      listing_renew: "Listing Renewed",
      listing_extend: "Listing Extended",
      admin_credit: "Admin Credit",
      admin_debit: "Admin Debit",
      refund: "Refund",
    };

    return types[type] || type;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">
          Loading transaction...
        </p>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            Transaction not found.
          </p>

          <button
            onClick={() => navigate("/wallet")}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg"
          >
            Back to Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Transaction Details
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Complete transaction information
            </p>
          </div>

          <button
            onClick={() => navigate("/wallet")}
            className="px-4 py-2 border border-gray-300 bg-white rounded-lg hover:bg-gray-50"
          >
            ← Back
          </button>
        </div>

        {/* Transaction Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

          {/* Status Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Transaction Type
                </p>

                <h2 className="text-lg font-semibold text-gray-900 mt-1">
                  {getTransactionType(
                    transaction.type
                  )}
                </h2>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  transaction.status === "success"
                    ? "bg-green-100 text-green-700"
                    : transaction.status === "failed"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {transaction.status}
              </span>

            </div>
          </div>

          {/* Credits */}
          <div className="p-6 border-b border-gray-200">
            <p className="text-sm text-gray-500">
              Credits
            </p>

            <p className="text-3xl font-bold text-blue-600 mt-1">
              {transaction.credits}
            </p>
          </div>

          {/* Balance */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">
              Balance Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">
                  Balance Before
                </p>

                <p className="text-xl font-semibold mt-1">
                  {transaction.balanceBefore}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">
                  Balance After
                </p>

                <p className="text-xl font-semibold mt-1">
                  {transaction.balanceAfter}
                </p>
              </div>

            </div>
          </div>

          {/* Transaction Information */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">
              Transaction Information
            </h3>

            <div className="space-y-4">

              <div>
                <p className="text-sm text-gray-500">
                  Transaction ID
                </p>

                <p className="text-sm font-mono break-all mt-1">
                  {transaction._id}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Description
                </p>

                <p className="text-sm text-gray-900 mt-1">
                  {transaction.description ||
                    "No description"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Date
                </p>

                <p className="text-sm text-gray-900 mt-1">
                  {formatDate(transaction.createdAt)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Razorpay Payment ID
                </p>

                <p className="text-sm font-mono break-all mt-1">
                  {transaction.paymentId || "N/A"}
                </p>
              </div>

            </div>
          </div>

          {/* Listing Information */}
          {transaction.listing && (
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Listing Information
              </h3>

              <div className="space-y-4">

                <div>
                  <p className="text-sm text-gray-500">
                    Listing Title
                  </p>

                  <p className="text-sm font-medium mt-1">
                    {transaction.listing.title}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Category
                  </p>

                  <p className="text-sm mt-1">
                    {transaction.listing.category ||
                      "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    City
                  </p>

                  <p className="text-sm mt-1">
                    {transaction.listing.city ||
                      "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Listing ID
                  </p>

                  <p className="text-sm font-mono break-all mt-1">
                    {transaction.listing._id}
                  </p>
                </div>

                {transaction.listing.expiresAt && (
                  <div>
                    <p className="text-sm text-gray-500">
                      Listing Expiry
                    </p>

                    <p className="text-sm mt-1">
                      {formatDate(
                        transaction.listing.expiresAt
                      )}
                    </p>
                  </div>
                )}

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default TransactionDetails;