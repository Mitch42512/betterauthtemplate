import { z } from 'zod';

// Check if we're running on the client side
const isClient = typeof window !== 'undefined';

// Client-side environment schema (only public variables)
const clientEnvSchema = z.object({
  NEXT_PUBLIC_BETTER_AUTH_URL: z.string().optional().default('http://localhost:3000'),
});

// Server-side environment schema (all variables)
const serverEnvSchema = z.object({
  // Required variables - these must be present
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid PostgreSQL connection URL'),
  BETTER_AUTH_SECRET: z.string().min(32, 'BETTER_AUTH_SECRET must be at least 32 characters for security'),
  NEXT_PUBLIC_BETTER_AUTH_URL: z.string().url('NEXT_PUBLIC_BETTER_AUTH_URL must be a valid URL'),
  
  // Optional variables with sensible defaults
  BETTER_AUTH_URL: z.string().url().optional().default('http://localhost:3000'),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().email().optional(),
});

// Choose the appropriate schema based on environment
const envSchema = isClient ? clientEnvSchema : serverEnvSchema;

// Parse and validate environment variables
const parseResult = envSchema.safeParse(process.env);

if (!parseResult.success) {
  console.error('❌ Environment validation failed:');
  console.error('');
  
  parseResult.error.issues.forEach((issue) => {
    const path = issue.path.join('.');
    console.error(`  • ${path}: ${issue.message}`);
  });
  
  console.error('');
  console.error('Please check your .env.local file and ensure all required variables are set.');
  console.error('See ENVIRONMENT_SETUP.md for more information.');
  
  if (!isClient) {
    process.exit(1);
  } else {
    throw new Error('Environment validation failed on client side');
  }
}

// Export validated environment variables
export const env = parseResult.data;

// Export the type for use in other files
export type Env = z.infer<typeof envSchema>;

// Helper function to check if email service is configured (server-side only)
export const isEmailConfigured = () => {
  if (isClient) {
    throw new Error('isEmailConfigured can only be called on the server side');
  }
  return !!(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL);
};

// Helper function to get database URL (for drizzle config - server-side only)
export const getDatabaseUrl = () => {
  if (isClient) {
    throw new Error('getDatabaseUrl can only be called on the server side');
  }
  return process.env.DATABASE_URL;
};
