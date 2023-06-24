const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // Create a transporter for sending emails
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // SMTP host for Gmail
    port: 587, // SMTP port for Gmail
    secure: false, // Set secure to false since we're using TLS
    requireTLS: true, // Require TLS for secure connection
    auth: {
      user: "akku29168@gmail.com", // Your Gmail email address
      pass: "eoxyqjdlvlbctdwd", // Your Gmail password or app-specific password
    },
  });

  // Set the email options
  const mailOptions = {
    from: "akku29168@gmail.com", // Sender's email address
    to: options.email, // Recipient's email address
    subject: options.subject, // Email subject
    text: options.message, // Plain text version of the email
    html: options.html, // HTML version of the email
  };

  // Send the email using the transporter and options
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
