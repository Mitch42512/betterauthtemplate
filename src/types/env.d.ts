declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      BETTER_AUTH_SECRET: string;
      BETTER_AUTH_URL?: string;
      NEXT_PUBLIC_BETTER_AUTH_URL: string;
      RESEND_API_KEY?: string;
      RESEND_FROM_EMAIL?: string;
    }
  }
}

export {};
