import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { twoFactor } from "better-auth/plugins";
import { db } from "@/db"; // your Drizzle connection
import * as schema from "@/db/schema";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,       // critical for security
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: { enabled: true },            // basic email/password flow
  plugins: [
    twoFactor({
      issuer: "Better Auth Template",
      sendCode: async ({ code, email }) => {
        // For now, just log the code to console
        // TODO: Replace with real email provider like Resend/SendGrid
        console.log(`🔐 2FA Code for ${email}: ${code}`);
        console.log(`📧 This would normally be sent via email to: ${email}`);
        
        // In production, you would send the email here:
        // await sendEmail({
        //   to: email,
        //   subject: "Your 2FA Code",
        //   body: `Your verification code is: ${code}`
        // });
      },
    }),
  ],
});
