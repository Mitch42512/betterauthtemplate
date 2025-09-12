"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import AuthCardLayout from "@/components/AuthCardLayout";

export default function TwoFactorPage() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [isSetup, setIsSetup] = useState(false);
  const [email, setEmail] = useState("");
  const [userExists, setUserExists] = useState(false);
  const router = useRouter();

  // Check if this is a verification flow (user just registered) or sign-in flow (user logging in)
  React.useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Get email from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    console.log('🔍 URL params:', window.location.search);
    console.log('🔍 Email param:', emailParam);
    if (emailParam) {
      setEmail(emailParam);
      console.log('📧 Email set to:', emailParam);
    }

    // If user is coming from registration, this is a verification flow
    const isVerifyFlow = window.location.search.includes('verify=true');
    setIsSetup(isVerifyFlow);
    
    if (isVerifyFlow) {
      // User was just created, now we need to verify their email
      console.log('📧 User created, now verifying email');
    } else if (emailParam && !isVerifyFlow) {
      // For login flow, check if user exists before proceeding
      checkUserExists(emailParam);
    }
  }, []);

  // Separate useEffect to send setup code when email is available
  React.useEffect(() => {
    console.log('🔍 2FA useEffect - isSetup:', isSetup, 'email:', email, 'codeSent:', codeSent);
    if (isSetup && email && !codeSent) {
      console.log('📧 Sending setup code for email:', email);
      sendSetupCode();
    }
  }, [isSetup, email, codeSent]);

  const checkUserExists = async (userEmail: string) => {
    try {
      const response = await fetch("/api/check-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await response.json();

      if (!data.exists) {
        setError("User not identified. Please create an account first.");
        setUserExists(false);
      } else {
        setUserExists(true);
      }
    } catch (err) {
      setError("An unexpected error occurred while verifying user");
    }
  };
  
  const sendSetupCode = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      // Use BetterAuth's built-in email OTP system for email verification
      console.log(`📧 Sending email verification OTP request for ${email}`);
      const { data: otpData, error: otpError } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "email-verification"
      });

      console.log(`📧 Send OTP response:`, otpData);
      
      if (otpError) {
        setError(otpError.message || "Failed to send verification code");
        return;
      }

      setCodeSent(true);
    } catch (err) {
      console.error("Error sending email verification code:", err);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const sendSignInCode = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      // Use BetterAuth's built-in email OTP system for sign-in
      console.log(`📧 Sending sign-in OTP request for ${email}`);
      const { data: otpData, error: otpError } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in"
      });

      console.log(`📧 Send OTP response:`, otpData);
      
      if (otpError) {
        setError(otpError.message || "Failed to send verification code");
        return;
      }

      setCodeSent(true);
    } catch (err) {
      console.error("Error sending sign-in code:", err);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isSetup && !codeSent) {
        // Send setup code
        await sendSetupCode();
      } else if (!isSetup && !codeSent) {
        // Send sign-in code
        await sendSignInCode();
      } else {
        // Verify code
        if (isSetup) {
          // For verification flow, verify email OTP using BetterAuth's email verification
          console.log(`🔍 Verifying email OTP: ${code}`);
          
          // Use BetterAuth's email verification endpoint
          const { data: verifyData, error: verifyError } = await authClient.emailOtp.verifyEmail({
            email,
            otp: code,
          });

          console.log(`🔍 Verification response:`, verifyData);
          
          if (verifyError) {
            console.log(`❌ Verification failed:`, verifyError);
            setError(verifyError.message || "Invalid verification code");
            return;
          }

          console.log(`✅ Email verification successful:`, verifyData);
          
          // Redirect to dashboard after successful verification
          router.push("/dashboard");
        } else {
          // For normal 2FA verification, check if user exists first
          if (!userExists) {
            setError("User not identified. Please create an account first.");
            setIsLoading(false);
            return;
          }

          // Use BetterAuth's built-in OTP-based sign-in
          console.log(`🔍 Signing in with OTP for ${email}: ${code}`);
          const { data: signInData, error: signInError } = await authClient.signIn.emailOtp({
            email,
            otp: code,
          });

          console.log(`🔍 Sign-in response:`, signInData);
          
          if (signInError) {
            console.log(`❌ Sign-in failed: ${signInError.message}`);
            setError(signInError.message || "Invalid verification code");
            return;
          }

          console.log(`✅ Sign-in successful:`, signInData);
          // Redirect to dashboard on successful verification
          router.push("/dashboard");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    if (value.length <= 6) {
      setCode(value);
    }
  };

  const handleCancel = () => {
    // Clear pending user data and redirect back to registration
    sessionStorage.removeItem('pendingUserData');
    router.push('/register');
  };

  return (
    <AuthCardLayout 
      title="Verify your account"
      subtitle="Check your email for a verification code"
      footer={
        <div className="text-center">
          {isSetup ? (
            <Link href="/register" className="text-xs text-gray-500 underline cursor-pointer hover:text-gray-700">
              ← Back to Registration
            </Link>
          ) : (
            <Link href="/login" className="text-xs text-gray-500 underline cursor-pointer hover:text-gray-700">
              ← Back to Login
            </Link>
          )}
        </div>
      }
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">
            Verification Code
          </label>
          <input
            id="code"
            name="code"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            required
            className="w-full h-12 rounded-full bg-gray-100 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-center text-2xl font-mono tracking-widest"
            placeholder=""
            value={code}
            onChange={handleCodeChange}
          />
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        <div className="space-y-3">
          <button
            type="submit"
            disabled={isLoading || (codeSent && code.length !== 6) || (!isSetup && !userExists)}
            className="w-full h-12 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading 
              ? (isSetup && !codeSent ? "Sending code..." : "Verifying...") 
              : (isSetup && !codeSent ? "Send Code" : "Submit")
            }
          </button>
          
          {isSetup && (
            <button
              type="button"
              onClick={handleCancel}
              className="w-full h-12 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Cancel Registration
            </button>
          )}
        </div>
      </form>

      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-blue-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Email Verification
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                {isSetup 
                  ? "Check your email for the 6-digit verification code. Also check the console for debugging info."
                  : "Check your email for the 6-digit verification code. Also check the console for debugging info."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthCardLayout>
  );
}
