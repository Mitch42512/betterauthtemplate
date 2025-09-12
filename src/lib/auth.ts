import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP } from "better-auth/plugins";
import { db } from "@/db"; // your Drizzle connection
import * as schema from "@/db/schema";
import { sendEmail, generateOTPEmailHTML } from "@/lib/email";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,       // critical for security
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: { enabled: true },            // basic email/password flow
  plugins: [
    emailOTP({
      disableSignUp: false, // Allow email OTP for both sign-in and sign-up
      async sendVerificationOTP({ email, otp, type }) {
        console.log(`📧 Sending OTP ${otp} to ${email} for ${type}`);
        
        try {
          const emailType = type === 'sign-in' ? 'sign-in' : 'sign-up';
          const subject = type === 'sign-in' ? 'Your Login Verification Code' : 'Your Account Verification Code';
          
          await sendEmail({
            to: email,
            subject,
            html: generateOTPEmailHTML(otp, emailType),
          });
          
          console.log(`✅ Email sent successfully to ${email}`);
        } catch (error) {
          console.error(`❌ Failed to send email to ${email}:`, error);
          // Still log to console as fallback for development
          console.log(`📧 FALLBACK - OTP ${otp} for ${email} (${type})`);
        }
      },
    }),
  ],
});
