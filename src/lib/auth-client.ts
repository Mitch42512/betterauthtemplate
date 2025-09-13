// src/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";
import { env } from "@/lib/env";

export const authClient = createAuthClient({
  baseURL: `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/auth`,
  plugins: [emailOTPClient()],
});
