import nodemailer from 'nodemailer';
import { env } from '../config/env';
import { logger } from '../config/logger';

const transporter = nodemailer.createTransport({
  host: env.email.host,
  port: env.email.port,
  secure: env.email.port === 465,
  auth: {
    user: env.email.user,
    pass: env.email.pass,
  },
});

export async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  try {
    await transporter.sendMail({
      from: env.email.user,
      to,
      subject,
      html,
    });
    logger.info(`Email sent to ${to}`);
  } catch (error) {
    logger.error('Email send error:', error);
    throw new Error('Failed to send email');
  }
}

export function getVerificationEmailTemplate(name: string, token: string): string {
  const url = `${env.frontendUrl}/verify-email?token=${token}`;
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; direction: rtl;">
      <h2 style="color: #1a56db;">راشا عدالت</h2>
      <p>سلام ${name}،</p>
      <p>برای تایید ایمیل خود روی لینک زیر کلیک کنید:</p>
      <a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: #1a56db; color: white; text-decoration: none; border-radius: 5px;">تایید ایمیل</a>
      <p style="margin-top: 20px; color: #666;">این لینک به مدت ۲۴ ساعت معتبر است.</p>
    </div>
  `;
}

export function getResetPasswordEmailTemplate(name: string, token: string): string {
  const url = `${env.frontendUrl}/reset-password?token=${token}`;
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; direction: rtl;">
      <h2 style="color: #1a56db;">راشا عدالت</h2>
      <p>سلام ${name}،</p>
      <p>برای بازیابی رمز عبور روی لینک زیر کلیک کنید:</p>
      <a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: #1a56db; color: white; text-decoration: none; border-radius: 5px;">بازیابی رمز عبور</a>
      <p style="margin-top: 20px; color: #666;">این لینک به مدت ۱ ساعت معتبر است.</p>
    </div>
  `;
}