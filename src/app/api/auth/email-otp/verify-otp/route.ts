import { NextRequest, NextResponse } from 'next/server';

// In a real application, you would store OTPs in a database with expiration
// For now, we'll use a simple in-memory store for development
const otpStore = new Map<string, { otp: string; expires: number; type: string }>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp, type = 'sign-up' } = body;

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    // For development, we'll accept any 6-digit OTP
    // In production, you would verify against the stored OTP
    if (otp.length === 6 && /^\d+$/.test(otp)) {
      console.log(`✅ OTP verified for ${email} (${type})`);
      
      return NextResponse.json({ 
        success: true,
        message: 'OTP verified successfully'
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid OTP format' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
