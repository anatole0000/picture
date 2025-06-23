// utils/mail.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS, // App Password từ Gmail
  },
});

export async function sendResetEmail(to: string, token: string) {
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"Quiz App" <${process.env.MAIL_USER}>`,
    to,
    subject: 'Đặt lại mật khẩu',
    html: `
      <h3>Yêu cầu đặt lại mật khẩu</h3>
      <p>Nhấn vào link dưới đây để đặt lại mật khẩu:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>
    `,
  });
}
