require("dotenv").config();

const razorpay = require("./config/razorpay");

async function testRazorpay() {
  try {
    console.log("Key ID exists:", Boolean(process.env.RAZORPAY_KEY_ID));
    console.log(
      "Key Secret exists:",
      Boolean(process.env.RAZORPAY_KEY_SECRET),
    );

    const order = await razorpay.orders.create({
      amount: 50000,
      currency: "INR",
      receipt: `test_${Date.now()}`,
    });

    console.log("================================");
    console.log("Razorpay Order Created Successfully");
    console.log("Order ID:", order.id);
    console.log("Amount:", order.amount);
    console.log("Currency:", order.currency);
    console.log("================================");
  } catch (error) {
    console.log("================================");
    console.log("RAZORPAY ERROR");
    console.log("Status:", error.statusCode);
    console.log("Code:", error.error?.code);
    console.log("Description:", error.error?.description);
    console.log("================================");
  }
}

testRazorpay();