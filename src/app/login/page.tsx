"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import AuthCardLayout from "@/components/AuthCardLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

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
          router.push(`/login/2fa?email=${encodeURIComponent(email)}`);
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
        // First check if user exists before sending OTP
        const userCheckResponse = await fetch("/api/check-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const userCheckData = await userCheckResponse.json();

        if (!userCheckData.exists) {
          setError("User not identified. Please create an account first.");
          setIsLoading(false);
          return;
        }

        // Send OTP using BetterAuth's built-in system
        const { data: otpData, error: otpError } = await authClient.emailOtp.sendVerificationOtp({
          email,
          type: "sign-in"
        });

        if (otpError) {
          setError(otpError.message || "Failed to send code");
        } else {
          setCodeSent(true);
        }
      } else {
        // Verify OTP using BetterAuth's built-in system
        const { data: signInData, error: signInError } = await authClient.signIn.emailOtp({
          email,
          otp: code,
        });

        if (signInError) {
          setError(signInError.message || "Invalid code");
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
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPasswordToggle
            onTogglePassword={() => setShowPassword(!showPassword)}
            showPassword={showPassword}
          />

          <Button
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
            className="w-full"
          >
            {isLoading ? "Signing in..." : "Submit"}
          </Button>
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
          <Input
            id="email-code"
            name="email-code"
            type="email"
            label="Email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          {codeSent && (
            <Input
              id="code"
              name="code"
              type="text"
              label="Verification Code"
              autoComplete="one-time-code"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
            />
          )}

          <Button
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
            className="w-full"
          >
            {isLoading 
              ? (codeSent ? "Verifying..." : "Sending code...") 
              : (codeSent ? "Verify code" : "Send code")
            }
          </Button>
        </form>

        {error && (
          <Alert type="error">
            {error}
          </Alert>
        )}
      </div>
    </AuthCardLayout>
  );
}
