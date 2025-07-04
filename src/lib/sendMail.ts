import nodemailer from 'nodemailer';

interface EmailData {
  name: string;
  email: string;
  message: string;
  to: string;
  subject: string;
}

export async function sendMail({ name, email, message, to, subject }: EmailData) {
  const transporter = nodemailer.createTransporter({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const htmlContent = `
    <h2>${subject}</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `;

  const textContent = `
${subject}

Name: ${name}
Email: ${email}
Message: ${message}
  `;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    text: textContent,
    html: htmlContent,
  });
}