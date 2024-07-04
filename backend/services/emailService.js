const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "salahadem817",
    pass: "ojty mlga zysm ndtc",
  },
});

const sendStatusChangeEmail = async (workerEmail, status) => {
  const mailOptions = {
    from: "salahadem817@gmail.com",
    to: "adem.hameed.123@gmail.com",
    subject: "Status Change Notification",
    text: `Hello,\n\nYour status has been updated to: ${
      status ? "Active" : "Inactive"
    }.\n\nBest regards,\nYour Company`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendStatusChangeEmail };
