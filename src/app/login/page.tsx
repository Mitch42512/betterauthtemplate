"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import AuthCardLayout from "@/components/AuthCardLayout";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        // Check if 2FA is required
        if (error.code === "2FA_REQUIRED") {
          router.push("/login/2fa");
          return;
        }
        setError(error.message || "Login failed");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordlessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (!codeSent) {
        // Send OTP
        const { error } = await authClient.emailOtp.sendVerificationOtp({ 
          email,
          type: "sign-in"
        });
        
        if (error) {
          setError(error.message || "Failed to send code");
        } else {
          setCodeSent(true);
        }
      } else {
        // Verify OTP
        const { error } = await authClient.signIn.emailOtp({ 
          email, 
          otp: code 
        });
        
        if (error) {
          setError(error.message || "Invalid code");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCardLayout 
      title="Welcome Back"
      subtitle="Sign in with your password or 2FA to continue"
      footer={
        <div className="flex justify-between text-xs text-gray-500">
          <Link href="/register" className="underline cursor-pointer hover:text-gray-700">
            New here? Create an account
          </Link>
          <span className="underline cursor-pointer hover:text-gray-700">Terms & Conditions</span>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Email + Password Form */}
        <form className="space-y-6" onSubmit={handlePasswordSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full h-12 rounded-full bg-gray-100 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="w-full h-12 rounded-full bg-gray-100 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Submit"}
          </button>
        </form>

        {/* Or Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gradient-to-b from-yellow-50 to-white text-gray-500">Or</span>
          </div>
        </div>

        {/* Email Code Form */}
        <form className="space-y-6" onSubmit={handlePasswordlessSubmit}>
          <div className="space-y-2">
            <label htmlFor="email-code" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email-code"
              name="email-code"
              type="email"
              autoComplete="email"
              required
              className="w-full h-12 rounded-full bg-gray-100 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          {codeSent && (
            <div className="space-y-2">
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <input
                id="code"
                name="code"
                type="text"
                autoComplete="one-time-code"
                required
                className="w-full h-12 rounded-full bg-gray-100 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder=""
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading 
              ? (codeSent ? "Verifying..." : "Sending code...") 
              : (codeSent ? "Verify code" : "Send code")
            }
          </button>
        </form>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}
      </div>
    </AuthCardLayout>
  );
}
