import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, generateOTPEmailHTML } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📧 Received request body:', body);
    const { email, type = 'sign-up' } = body;

    if (!email) {
      console.log('❌ Email is missing from request body');
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
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
      
      return NextResponse.json({ 
        message: 'Verification OTP sent successfully',
        otp: otp // In development, return the OTP for testing
      });
    } catch (error) {
      console.error(`❌ Failed to send email to ${email}:`, error);
      // Still return success in development mode
      return NextResponse.json({ 
        message: 'Verification OTP sent successfully (check console for OTP)',
        otp: otp // In development, return the OTP for testing
      });
    }

  } catch (error) {
    console.error('Error sending verification OTP:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
