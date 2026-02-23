import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  const user = process.env.EMAIL_USERNAME || process.env.GMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD || process.env.GMAIL_PASS;

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    auth: {
      user,
      pass,
    },
  });

  const mailOptions = {
    from: `"Engiknow Support" <${user}>`,
    to: options.to,
    subject: options.subject,
    html: options.text, // we can use html or text depending on what controller passes
  };

  await transporter.sendMail(mailOptions);
};
