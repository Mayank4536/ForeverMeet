import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  createWalletOrder,
  verifyWalletPayment,
  getWallet,
  getTransactions,
  getTransactionById,
} from "../../services/walletService";

function Wallet() {
  const token = localStorage.getItem("token");

  const [wallet, setWallet] = useState({
    credits: 0,
    totalPurchased: 0,
    totalSpent: 0,
  });

  const [transactions, setTransactions] = useState([]);

  const [loadingWallet, setLoadingWallet] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [buyingCredits, setBuyingCredits] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [totalPages, setTotalPages] = useState(1);
  const [totalTransactions, setTotalTransactions] = useState(0);

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [loadingTransactionDetails, setLoadingTransactionDetails] =
    useState(false);

  /*
  |--------------------------------------------------------------------------
  | Load Razorpay Checkout Script
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (document.getElementById("razorpay-checkout-script")) {
      return;
    }

    const script = document.createElement("script");

    script.id = "razorpay-checkout-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById(
        "razorpay-checkout-script"
      );

      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Load Wallet
  |--------------------------------------------------------------------------
  */

  const loadWallet = async () => {
    try {
      setLoadingWallet(true);

      const response = await getWallet(token);

      if (response.success) {
        setWallet(response.wallet);
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Unable to load wallet."
      );
    } finally {
      setLoadingWallet(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Load Transactions
  |--------------------------------------------------------------------------
  */

  const loadTransactions = async (currentPage = page) => {
    try {
      setLoadingTransactions(true);

      const response = await getTransactions(
        currentPage,
        limit,
        token
      );

      if (response.success) {
        setTransactions(response.transactions || []);

        setTotalPages(response.totalPages || 1);

        setTotalTransactions(response.totalTransactions || 0);
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to load transactions."
      );
    } finally {
      setLoadingTransactions(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Initial Load
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    loadWallet();
  }, []);

  useEffect(() => {
    loadTransactions(page);
  }, [page]);

  /*
  |--------------------------------------------------------------------------
  | Buy Credits
  |--------------------------------------------------------------------------
  */

  const handleBuyCredits = async (credits) => {
    try {
      if (!token) {
        toast.error("Please login first.");
        return;
      }

      if (!window.Razorpay) {
        toast.error(
          "Razorpay is still loading. Please try again."
        );

        return;
      }

      setBuyingCredits(true);

      /*
      |--------------------------------------------------------------------------
      | Create backend order
      |--------------------------------------------------------------------------
      */

      const orderResponse = await createWalletOrder(
        credits,
        token
      );

      if (!orderResponse.success) {
        toast.error(
          orderResponse.message || "Unable to create order."
        );

        return;
      }

      const { order } = orderResponse;

      /*
      |--------------------------------------------------------------------------
      | Razorpay Checkout
      |--------------------------------------------------------------------------
      */

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: "ForeverMeet",

        description: `${credits} Credits`,

        order_id: order.id,

        handler: async function (response) {
          const toastId = toast.loading(
            "Verifying payment..."
          );

          try {
            const verificationResponse =
              await verifyWalletPayment(
                {
                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature,
                },
                token
              );

            if (verificationResponse.success) {
              toast.success(
                `${verificationResponse.creditsAdded} credits added successfully!`,
                {
                  id: toastId,
                }
              );

              await loadWallet();

              setPage(1);

              await loadTransactions(1);
            } else {
              toast.error(
                verificationResponse.message ||
                  "Payment verification failed.",
                {
                  id: toastId,
                }
              );
            }
          } catch (error) {
            console.error(error);

            toast.error(
              error.response?.data?.message ||
                "Payment verification failed.",
              {
                id: toastId,
              }
            );
          }
        },

        prefill: {
          name: "",
          email: "",
          contact: "",
        },

        theme: {
          color: "#2563eb",
        },

        modal: {
          ondismiss: function () {
            toast("Payment cancelled.", {
              icon: "⚠️",
            });
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "Razorpay payment failed:",
            response.error
          );

          toast.error(
            response.error?.description ||
              "Payment failed."
          );
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to start payment."
      );
    } finally {
      setBuyingCredits(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Open Transaction Details
  |--------------------------------------------------------------------------
  */

  const handleTransactionClick = async (transactionId) => {
    try {
      setLoadingTransactionDetails(true);

      const response = await getTransactionById(
        transactionId,
        token
      );

      if (response.success) {
        setSelectedTransaction(response.transaction);
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to load transaction details."
      );
    } finally {
      setLoadingTransactionDetails(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Close Transaction Modal
  |--------------------------------------------------------------------------
  */

  const closeTransactionModal = () => {
    setSelectedTransaction(null);
  };

  /*
  |--------------------------------------------------------------------------
  | Pagination
  |--------------------------------------------------------------------------
  */

  const handlePrevious = () => {
    if (page > 1) {
      setPage((previousPage) => previousPage - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((previousPage) => previousPage + 1);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Transaction Type Label
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | Transaction Color
  |--------------------------------------------------------------------------
  */

  const isCreditTransaction = (type) => {
    return [
      "purchase",
      "admin_credit",
      "refund",
    ].includes(type);
  };

  /*
  |--------------------------------------------------------------------------
  | Format Date
  |--------------------------------------------------------------------------
  */

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Format Money
  |--------------------------------------------------------------------------
  */

  const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* --------------------------------------------------------------
            Header
        -------------------------------------------------------------- */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Wallet
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your ForeverMeet credits and payment history.
          </p>
        </div>

        {/* --------------------------------------------------------------
            Wallet Summary
        -------------------------------------------------------------- */}

        <div className="grid gap-5 md:grid-cols-3">

          {/* Current Balance */}

          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-blue-100">
                  Available Credits
                </p>

                {loadingWallet ? (
                  <div className="mt-3 h-10 w-24 animate-pulse rounded-lg bg-white/20" />
                ) : (
                  <h2 className="mt-2 text-4xl font-bold">
                    {wallet.credits}
                  </h2>
                )}
              </div>

              <div className="rounded-xl bg-white/15 p-3 text-2xl">
                💳
              </div>
            </div>

            <p className="mt-5 text-sm text-blue-100">
              Use credits to create and promote listings.
            </p>
          </div>

          {/* Purchased */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Purchased
            </p>

            <div className="mt-3 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-slate-900">
                {wallet.totalPurchased}
              </h2>

              <div className="rounded-xl bg-emerald-50 px-3 py-2 text-xl">
                +
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-400">
              Credits purchased through payments
            </p>
          </div>

          {/* Spent */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Spent
            </p>

            <div className="mt-3 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-slate-900">
                {wallet.totalSpent}
              </h2>

              <div className="rounded-xl bg-orange-50 px-3 py-2 text-xl">
                −
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-400">
              Credits used for listings and services
            </p>
          </div>
        </div>

        {/* --------------------------------------------------------------
            Buy Credits
        -------------------------------------------------------------- */}

        <div className="mt-8">

          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Buy Credits
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose a credit package and pay securely with Razorpay.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {[
              {
                credits: 100,
                price: 500,
              },
              {
                credits: 250,
                price: 1000,
              },
              {
                credits: 500,
                price: 1800,
              },
              {
                credits: 1000,
                price: 3000,
              },
            ].map((pkg) => (
              <div
                key={pkg.credits}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="rounded-xl bg-blue-50 px-3 py-2 text-sm font-bold text-blue-600">
                    {pkg.credits} Credits
                  </div>

                  {pkg.credits === 500 && (
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                      Popular
                    </span>
                  )}
                </div>

                <div className="mb-5">
                  <p className="text-3xl font-bold text-slate-900">
                    {formatMoney(pkg.price)}
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    One-time payment
                  </p>
                </div>

                <button
                  type="button"
                  disabled={buyingCredits}
                  onClick={() =>
                    handleBuyCredits(pkg.credits)
                  }
                  className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {buyingCredits
                    ? "Processing..."
                    : `Buy ${pkg.credits} Credits`}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* --------------------------------------------------------------
            Transaction History
        -------------------------------------------------------------- */}

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Transaction History
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {totalTransactions} transaction
                  {totalTransactions !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
                Page {page} of {totalPages}
              </div>
            </div>
          </div>

          {/* Desktop Table */}

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Transaction
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Type
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Credits
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Balance
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loadingTransactions ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-sm text-slate-500"
                    >
                      Loading transactions...
                    </td>
                  </tr>
                ) : transactions.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center"
                    >
                      <div className="text-4xl">📄</div>

                      <p className="mt-3 font-semibold text-slate-700">
                        No transactions found
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        Your wallet activity will appear here.
                      </p>
                    </td>
                  </tr>
                ) : (
                  transactions.map((transaction) => {
                    const creditTransaction =
                      isCreditTransaction(transaction.type);

                    return (
                      <tr
                        key={transaction._id}
                        onClick={() =>
                          handleTransactionClick(
                            transaction._id
                          )
                        }
                        className="cursor-pointer transition hover:bg-slate-50"
                      >
                        <td className="px-6 py-5">
                          <p className="font-semibold text-slate-800">
                            {transaction.description}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            ID: {transaction._id}
                          </p>
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-600">
                          {getTransactionType(
                            transaction.type
                          )}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`font-bold ${
                              creditTransaction
                                ? "text-emerald-600"
                                : "text-red-500"
                            }`}
                          >
                            {creditTransaction ? "+" : "-"}
                            {transaction.credits}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-600">
                          {transaction.balanceAfter}
                        </td>

                        <td className="px-6 py-5">
                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold capitalize text-emerald-600">
                            {transaction.status}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-500">
                          {formatDate(
                            transaction.createdAt
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}

          <div className="divide-y divide-slate-100 md:hidden">
            {loadingTransactions ? (
              <div className="px-5 py-12 text-center text-sm text-slate-500">
                Loading transactions...
              </div>
            ) : transactions.length === 0 ? (
              <div className="px-5 py-12 text-center">
                <div className="text-4xl">📄</div>

                <p className="mt-3 font-semibold text-slate-700">
                  No transactions found
                </p>
              </div>
            ) : (
              transactions.map((transaction) => {
                const creditTransaction =
                  isCreditTransaction(transaction.type);

                return (
                  <button
                    key={transaction._id}
                    type="button"
                    onClick={() =>
                      handleTransactionClick(
                        transaction._id
                      )
                    }
                    className="block w-full px-5 py-5 text-left transition hover:bg-slate-50"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-800">
                          {transaction.description}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {getTransactionType(
                            transaction.type
                          )}
                        </p>
                      </div>

                      <span
                        className={`text-lg font-bold ${
                          creditTransaction
                            ? "text-emerald-600"
                            : "text-red-500"
                        }`}
                      >
                        {creditTransaction ? "+" : "-"}
                        {transaction.credits}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                      <span>
                        Balance: {transaction.balanceAfter}
                      </span>

                      <span>
                        {formatDate(
                          transaction.createdAt
                        )}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Pagination */}

          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4 sm:px-6">
              <button
                type="button"
                disabled={page === 1 || loadingTransactions}
                onClick={handlePrevious}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Previous
              </button>

              <span className="text-sm text-slate-500">
                {page} / {totalPages}
              </span>

              <button
                type="button"
                disabled={
                  page === totalPages ||
                  loadingTransactions
                }
                onClick={handleNext}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --------------------------------------------------------------
          Transaction Details Modal
      -------------------------------------------------------------- */}

      {(selectedTransaction ||
        loadingTransactionDetails) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
          onClick={closeTransactionModal}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {loadingTransactionDetails ? (
              <div className="flex min-h-[300px] items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                  <p className="mt-4 text-sm text-slate-500">
                    Loading transaction...
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Modal Header */}

                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5 sm:px-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Transaction Details
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      Complete payment and wallet information
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closeTransactionModal}
                    className="rounded-lg p-2 text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    ×
                  </button>
                </div>

                {/* Modal Content */}

                <div className="space-y-6 p-5 sm:p-6">

                  {/* Status */}

                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Status
                      </p>

                      <p className="mt-1 font-semibold capitalize text-slate-800">
                        {selectedTransaction.status}
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold capitalize text-emerald-600">
                      {selectedTransaction.status}
                    </span>
                  </div>

                  {/* Credits */}

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-slate-200 p-4">
                      <p className="text-xs text-slate-400">
                        Credits
                      </p>

                      <p
                        className={`mt-2 text-2xl font-bold ${
                          isCreditTransaction(
                            selectedTransaction.type
                          )
                            ? "text-emerald-600"
                            : "text-red-500"
                        }`}
                      >
                        {isCreditTransaction(
                          selectedTransaction.type
                        )
                          ? "+"
                          : "-"}
                        {selectedTransaction.credits}
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 p-4">
                      <p className="text-xs text-slate-400">
                        Before Balance
                      </p>

                      <p className="mt-2 text-2xl font-bold text-slate-800">
                        {selectedTransaction.balanceBefore}
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 p-4">
                      <p className="text-xs text-slate-400">
                        After Balance
                      </p>

                      <p className="mt-2 text-2xl font-bold text-blue-600">
                        {selectedTransaction.balanceAfter}
                      </p>
                    </div>
                  </div>

                  {/* Information */}

                  <div>
                    <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
                      Transaction Information
                    </h4>

                    <div className="divide-y divide-slate-100 rounded-xl border border-slate-200">
                      <DetailRow
                        label="Transaction ID"
                        value={
                          selectedTransaction._id
                        }
                      />

                      <DetailRow
                        label="Transaction Type"
                        value={getTransactionType(
                          selectedTransaction.type
                        )}
                      />

                      <DetailRow
                        label="Description"
                        value={
                          selectedTransaction.description ||
                          "—"
                        }
                      />

                      <DetailRow
                        label="Date"
                        value={formatDate(
                          selectedTransaction.createdAt
                        )}
                      />

                      <DetailRow
                        label="Updated"
                        value={formatDate(
                          selectedTransaction.updatedAt
                        )}
                      />

                      <DetailRow
                        label="Razorpay Payment ID"
                        value={
                          selectedTransaction.paymentId ||
                          "Not applicable"
                        }
                      />
                    </div>
                  </div>

                  {/* Listing Information */}

                  {selectedTransaction.listing && (
                    <div>
                      <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
                        Listing Information
                      </h4>

                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="font-bold text-slate-900">
                          {
                            selectedTransaction.listing
                              .title
                          }
                        </p>

                        {selectedTransaction.listing
                          .category && (
                          <p className="mt-1 text-sm text-slate-500">
                            {
                              selectedTransaction.listing
                                .category
                            }
                          </p>
                        )}

                        {selectedTransaction.listing
                          .city && (
                          <p className="mt-1 text-sm text-slate-500">
                            📍{" "}
                            {
                              selectedTransaction.listing
                                .city
                            }
                          </p>
                        )}

                        {selectedTransaction.listing
                          .slug && (
                          <p className="mt-3 break-all text-xs text-slate-400">
                            Slug:{" "}
                            {
                              selectedTransaction.listing
                                .slug
                            }
                          </p>
                        )}

                        {selectedTransaction.listing
                          .expiresAt && (
                          <p className="mt-2 text-xs text-slate-500">
                            Expires:{" "}
                            {formatDate(
                              selectedTransaction.listing
                                .expiresAt
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}

                <div className="border-t border-slate-200 px-5 py-4 text-right sm:px-6">
                  <button
                    type="button"
                    onClick={closeTransactionModal}
                    className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Detail Row Component
|--------------------------------------------------------------------------
*/

function DetailRow({ label, value }) {
  return (
    <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </span>

      <span className="break-all text-right text-sm font-medium text-slate-700">
        {value}
      </span>
    </div>
  );
}

export default Wallet;