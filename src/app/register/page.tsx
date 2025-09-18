"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import AuthCardLayout from "@/components/AuthCardLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Client-side password validation
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      // Use BetterAuth's built-in sign-up with email verification
      const { data: signUpData, error: signUpError } = await authClient.signUp.email({
        email,
        password,
        name: name || "",
      });

      if (signUpError) {
        setError(signUpError.message || "Failed to create account. Please try again.");
        return;
      }

      // If sign-up successful, redirect to email verification page
      router.push(`/login/2fa?verify=true&email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
        <AuthCardLayout
          title="Create an account"
          subtitle="Sign up and get 7 days free"
          additionalText="no subscriptions, no bullshit"
      footer={
        <div className="flex justify-between text-xs text-gray-500">
          <Link href="/login" className="underline cursor-pointer hover:text-gray-700">
            Already have an account? Sign in
          </Link>
          <span className="underline cursor-pointer hover:text-gray-700">Terms & Conditions</span>
        </div>
      }
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          id="name"
          name="name"
          type="text"
          label="Full name"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
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
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showPasswordToggle
          onTogglePassword={() => setShowPassword(!showPassword)}
          showPassword={showPassword}
        />
        
        {error && (
          <Alert type="error">
            {error}
          </Alert>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          isLoading={isLoading}
          className="w-full"
        >
          {isLoading ? "Creating account..." : "Submit"}
        </Button>
      </form>
    </AuthCardLayout>
  );
}
