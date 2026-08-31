const CreditTransaction = require("../models/CreditTransaction");

/*
|--------------------------------------------------------------------------
| Create Credit Transaction
|--------------------------------------------------------------------------
*/

const createCreditTransaction = async ({
  user,
  listing = null,
  type,
  credits,
  balanceBefore,
  balanceAfter,
  description = "",
  paymentId = "",
  status = "success",
}) => {
  return await CreditTransaction.create({
    user,
    listing,
    type,
    credits,
    balanceBefore,
    balanceAfter,
    description,
    paymentId,
    status,
  });
};

module.exports = createCreditTransaction;