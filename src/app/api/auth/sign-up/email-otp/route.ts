import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    // For now, we'll just validate the OTP format (6 digits)
    // In a real implementation, you'd store and validate the OTP from the database
    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        { error: 'Invalid OTP format. Please enter a 6-digit code.' },
        { status: 400 }
      );
    }

    console.log(`✅ OTP verification successful for ${email}: ${otp}`);

    return NextResponse.json({ 
      message: 'Email verified successfully',
      email,
      verified: true
    });

  } catch (error) {
    console.error('Error verifying email OTP:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
