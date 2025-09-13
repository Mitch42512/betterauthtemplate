import { Resend } from 'resend';
import { serverEnv, isEmailConfigured } from '@/lib/env-server';

const resend = new Resend(serverEnv.RESEND_API_KEY);

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  // If email service is not configured, log to console for development
  if (!isEmailConfigured()) {
    console.log('📧 Email service not configured. Logging email instead:');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`HTML: ${html.substring(0, 200)}...`);
    console.log('⚠️  Please set up RESEND_API_KEY and RESEND_FROM_EMAIL in your .env.local file');
    return { id: 'dev-mode', to, subject };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: serverEnv.RESEND_FROM_EMAIL!,
      to,
      subject,
      html,
    });

    if (error) {
      console.error('Failed to send email:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log('Email sent successfully:', data);
    return data;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}

export function generateOTPEmailHTML(otp: string, type: 'sign-in' | 'sign-up' | '2fa') {
  const actionText = type === 'sign-in' ? 'sign in' : type === 'sign-up' ? 'verify your account' : 'complete two-factor authentication';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verification Code</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .container {
          background: #ffffff;
          border-radius: 8px;
          padding: 40px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #2563eb;
          margin-bottom: 10px;
        }
        .code {
          background: #f8fafc;
          border: 2px dashed #e2e8f0;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          margin: 30px 0;
        }
        .code-number {
          font-size: 32px;
          font-weight: bold;
          color: #1e40af;
          letter-spacing: 4px;
          font-family: 'Courier New', monospace;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          font-size: 14px;
          color: #64748b;
          text-align: center;
        }
        .warning {
          background: #fef3c7;
          border: 1px solid #f59e0b;
          border-radius: 6px;
          padding: 15px;
          margin: 20px 0;
          color: #92400e;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Better Auth Template</div>
          <h1>Verification Code</h1>
        </div>
        
        <p>Hello!</p>
        <p>Use the verification code below to ${actionText}:</p>
        
        <div class="code">
          <div class="code-number">${otp}</div>
        </div>
        
        <p>This code will expire in 10 minutes for security reasons.</p>
        
        <div class="warning">
          <strong>Security Notice:</strong> Never share this code with anyone. Our team will never ask for your verification code.
        </div>
        
        <p>If you didn't request this code, please ignore this email.</p>
        
        <div class="footer">
          <p>This is an automated message. Please do not reply to this email.</p>
          <p>&copy; 2024 Better Auth Template. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateOTPEmailText(otp: string, type: 'sign-in' | 'sign-up' | '2fa') {
  const actionText = type === 'sign-in' ? 'sign in' : type === 'sign-up' ? 'verify your account' : 'complete two-factor authentication';
  
  return `
Better Auth Template - Verification Code

Hello!

Use the verification code below to ${actionText}:

${otp}

This code will expire in 10 minutes for security reasons.

Security Notice: Never share this code with anyone. Our team will never ask for your verification code.

If you didn't request this code, please ignore this email.

This is an automated message. Please do not reply to this email.

© 2024 Better Auth Template. All rights reserved.
  `.trim();
}
