import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  try {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

    // 2) Define the email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: options.email,
      subject: options.subject,
      text: options.message,
      attachments: options.attachments,
    };

    // 3) Actually send the email
    let message = await transporter.sendMail(mailOptions);
  } catch (err) {
    throw new AppError(err, 500);
  }
};

module.exports = {
  sendEmail,
};
