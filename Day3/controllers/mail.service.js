import nodemailer from 'nodemailer';

export default async function sendAppMail(email, subject, message) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: message,
  };

  const mailResponse = await transporter.sendMail(mailOptions);
  console.log(mailResponse.envelope);
}
