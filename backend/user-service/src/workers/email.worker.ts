import { Worker } from 'bullmq';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const emailWorker = new Worker('email', async job => {
  const { to, resetToken } = job.data;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER, // Email bạn dùng để gửi
      pass: process.env.MAIL_PASS  // App password nếu là Gmail
    },
  });

  const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject: 'Yêu cầu đặt lại mật khẩu',
    html: `
      <h3>Yêu cầu đặt lại mật khẩu</h3>
      <p>Nhấn vào link dưới đây để đặt lại mật khẩu:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>
    `,
  });

  console.log(`📧 Email sent to ${to}`);
}, {
  connection: {
    host: '127.0.0.1',
    port: 6379,
    maxRetriesPerRequest: null // Quan trọng nếu dùng BullMQ
  }
});

emailWorker.on('failed', (job, err) => {
  console.error(`❌ Email job failed for ${job?.id}:`, err);
});
