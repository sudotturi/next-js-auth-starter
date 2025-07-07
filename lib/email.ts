import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`;
  
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Verify your email address',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h2 style="color: #333;">Verify your email address</h2>
        <p>Thank you for registering! Please click the button below to verify your email address:</p>
        <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          Verify Email
        </a>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
        <p style="color: #e74c3c; font-weight: bold;">⚠️ This link will expire in 24 hours for security reasons.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">If you didn't create an account, please ignore this email.</p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
  
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Reset your password',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h2 style="color: #333;">Reset your password</h2>
        <p>You requested to reset your password. Click the button below to create a new password:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #dc3545; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          Reset Password
        </a>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${resetUrl}</p>
        <p style="color: #e74c3c; font-weight: bold;">⚠️ This link will expire in 1 hour for security reasons.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">If you didn't request this password reset, please ignore this email. Your password will remain unchanged.</p>
      </div>
    `,
  });
}

// Optional: Function to clean up expired tokens (can be run as a cron job)
export async function cleanupExpiredTokens() {
  const { prisma } = await import('@/lib/prisma');
  
  try {
    const deletedTokens = await prisma.verificationToken.deleteMany({
      where: {
        expires: {
          lt: new Date()
        }
      }
    });
    
    console.log(`Cleaned up ${deletedTokens.count} expired tokens`);
    return deletedTokens.count;
  } catch (error) {
    console.error('Error cleaning up expired tokens:', error);
    throw error;
  }
}