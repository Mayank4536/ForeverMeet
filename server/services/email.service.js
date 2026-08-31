const nodemailer = require("nodemailer");

/*
  Gmail SMTP transporter.
*/
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/*
  Verify SMTP connection when the server starts.
*/
transporter.verify((error) => {
  if (error) {
    console.error("❌ Email Configuration Error:", error.message);
  } else {
    console.log("✅ Gmail SMTP Connected");
  }
});

/*
  Send OTP email.
*/
const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: `"ForeverMeet" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "ForeverMeet - Email Verification OTP",
    html: `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
        <h2>Welcome to ForeverMeet</h2>

        <p>Thank you for registering.</p>

        <p>Your verification code is:</p>

        <h1 style="letter-spacing:8px;color:#2563eb;">
          ${otp}
        </h1>

        <p>This OTP is valid for 10 minutes.</p>

        <hr>

        <small>
          If you didn't create this account, you can safely ignore this email.
        </small>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

/*
|--------------------------------------------------------------------------
| Send Password Reset OTP
|--------------------------------------------------------------------------
*/
const sendResetPasswordOTP = async (email, otp) => {
  const mailOptions = {
    from: `"ForeverMeet" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "ForeverMeet - Password Reset OTP",

    html: `
      <div style="font-family:Arial;padding:20px">

        <h2>Password Reset</h2>

        <p>You requested to reset your password.</p>

        <h1 style="letter-spacing:6px;color:#2563eb">
          ${otp}
        </h1>

        <p>This OTP expires in <b>10 minutes</b>.</p>

        <p>If you didn't request this, ignore this email.</p>

      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendOTPEmail,
  sendResetPasswordOTP,
};