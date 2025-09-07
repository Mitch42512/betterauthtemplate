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
  const router = useRouter();

  // Check if this is a setup flow (user just registered) or verification flow (user logging in)
  React.useEffect(() => {
    // If user is coming from registration, this is a setup flow
    const isSetupFlow = window.location.search.includes('setup=true');
    setIsSetup(isSetupFlow);
    
    if (isSetupFlow && !codeSent) {
      // Automatically send the 2FA setup code
      sendSetupCode();
    }
  }, []);

  const sendSetupCode = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      // For now, just simulate sending a code
      // In a real implementation, you would need to enable 2FA first
      console.log("🔐 2FA Setup Code: 123456");
      console.log("📧 This would normally be sent via email");
      setCodeSent(true);
    } catch (err) {
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
      } else {
        // Verify code
        if (isSetup) {
          // For setup flow, use hardcoded code for testing
          if (code === "123456") {
            router.push("/dashboard");
          } else {
            setError("Invalid verification code. Use 123456 for testing.");
          }
        } else {
          // For normal 2FA verification, use the real method
          const { data, error } = await authClient.twoFactor.verify({
            code,
          });

          if (error) {
            setError(error.message || "Invalid verification code");
          } else {
            router.push("/dashboard");
          }
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

  return (
    <AuthCardLayout 
      title="Verify your account"
      subtitle="Check your email for a verification code"
      footer={
        <div className="text-center">
          <Link href="/login" className="text-xs text-gray-500 underline cursor-pointer hover:text-gray-700">
            ← Back to Login
          </Link>
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

        <button
          type="submit"
          disabled={isLoading || (codeSent && code.length !== 6)}
          className="w-full h-12 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading 
            ? (isSetup && !codeSent ? "Sending code..." : "Verifying...") 
            : (isSetup && !codeSent ? "Send Code" : "Submit")
          }
        </button>
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
              Development Mode
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                {isSetup 
                  ? "Check your browser console for the 6-digit setup code."
                  : "Check your browser console for the 6-digit verification code."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthCardLayout>
  );
}
