import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import logger from '../utils/logger.js';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export const sendContactNotification = async (contactData) => {
  const mailOptions = {
    from: env.EMAIL_FROM,
    to: env.EMAIL_FROM, // Send to admin
    subject: `New Contact Request: ${contactData.subject}`,
    html: `
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${contactData.name}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      <p><strong>Phone:</strong> ${contactData.phone || 'N/A'}</p>
      <p><strong>Subject:</strong> ${contactData.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${contactData.message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    logger.error(`Error sending notification email: ${error.message}`);
  }
};

export const sendContactConfirmation = async (email, name) => {
  const mailOptions = {
    from: env.EMAIL_FROM,
    to: email,
    subject: 'Thank you for contacting ForAllAxis',
    html: `
      <h2>Hello ${name},</h2>
      <p>Thank you for reaching out to ForAllAxis. We have received your message and our team will get back to you shortly.</p>
      <br />
      <p>Best regards,</p>
      <p><strong>ForAllAxis Team</strong></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    logger.error(`Error sending confirmation email: ${error.message}`);
  }
};
