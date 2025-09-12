// Database-based OTP store for email verification
// Uses PostgreSQL with Drizzle ORM for production-ready OTP storage

import { db } from '@/db';
import { otp } from '@/db/schema';
import { eq, and, lt } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export interface OTPData {
  id: string;
  email: string;
  code: string;
  type: string;
  expiresAt: Date;
  used: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Debug function to log store contents
export async function debugStore() {
  try {
    const otps = await db.select().from(otp).where(eq(otp.used, false));
    console.log('🔍 OTP Store Contents:');
    console.log('Store size:', otps.length);
    for (const data of otps) {
      console.log(`  ${data.email}: ${data.code} (${data.type}) - expires: ${data.expiresAt.toISOString()}`);
    }
  } catch (error) {
    console.error('Error debugging OTP store:', error);
  }
}

// Helper function to clean up expired OTPs
export async function cleanupExpiredOTPs() {
  try {
    const now = new Date();
    const result = await db.delete(otp).where(lt(otp.expiresAt, now));
    console.log(`🧹 Cleaned up ${result.rowCount || 0} expired OTPs`);
  } catch (error) {
    console.error('Error cleaning up expired OTPs:', error);
  }
}

// Helper function to store OTP
export async function storeOTP(email: string, code: string, type: string, expirationMinutes: number = 10) {
  try {
    // First, clean up any existing OTPs for this email and type
    await db.delete(otp).where(and(eq(otp.email, email), eq(otp.type, type)));
    
    // Create new OTP
    const expiresAt = new Date(Date.now() + expirationMinutes * 60 * 1000);
    const otpData = {
      id: nanoid(),
      email,
      code,
      type,
      expiresAt,
      used: false,
    };
    
    await db.insert(otp).values(otpData);
    console.log(`💾 Stored OTP ${code} for ${email} (${type}) - expires at ${expiresAt.toISOString()}`);
    await debugStore(); // Debug: show store contents after storing
  } catch (error) {
    console.error('Error storing OTP:', error);
    throw error;
  }
}

// Helper function to verify OTP
export async function verifyOTP(email: string, providedOTP: string, type: string): Promise<{ success: boolean; error?: string }> {
  try {
    console.log(`🔍 Verifying OTP for ${email} (${type}): ${providedOTP}`);
    await debugStore(); // Debug: show store contents before verification
    
    // Find the OTP
    const otpData = await db
      .select()
      .from(otp)
      .where(and(
        eq(otp.email, email),
        eq(otp.type, type),
        eq(otp.used, false)
      ))
      .limit(1);
    
    if (otpData.length === 0) {
      console.log(`❌ No OTP found for ${email}`);
      return { success: false, error: 'No verification code found for this email. Please request a new code.' };
    }
    
    const storedData = otpData[0];
    
    // Check if OTP has expired
    if (new Date() > storedData.expiresAt) {
      console.log(`❌ OTP expired for ${email} (expired at ${storedData.expiresAt.toISOString()})`);
      // Clean up expired OTP
      await db.delete(otp).where(eq(otp.id, storedData.id));
      return { success: false, error: 'Verification code has expired. Please request a new code.' };
    }

    // Check if the OTP matches
    if (storedData.code !== providedOTP) {
      console.log(`❌ OTP mismatch for ${email}: expected ${storedData.code}, got ${providedOTP}`);
      return { success: false, error: 'Invalid verification code.' };
    }

    // OTP is valid - mark as used to prevent reuse
    await db.update(otp).set({ used: true, updatedAt: new Date() }).where(eq(otp.id, storedData.id));
    console.log(`✅ OTP verified successfully for ${email} (${type})`);
    
    return { success: true };
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return { success: false, error: 'Internal server error during verification.' };
  }
}
