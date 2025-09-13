import { z } from 'zod';

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

// Parse and validate environment variables
const parseResult = serverEnvSchema.safeParse(process.env);

if (!parseResult.success) {
  console.error('❌ Server environment validation failed:');
  console.error('');
  
  parseResult.error.issues.forEach((issue) => {
    const path = issue.path.join('.');
    console.error(`  • ${path}: ${issue.message}`);
  });
  
  console.error('');
  console.error('Please check your .env.local file and ensure all required variables are set.');
  console.error('See ENVIRONMENT_SETUP.md for more information.');
  
  process.exit(1);
}

// Export validated environment variables
export const serverEnv = parseResult.data;

// Export the type for use in other files
export type ServerEnv = z.infer<typeof serverEnvSchema>;

// Helper function to check if email service is configured
export const isEmailConfigured = () => {
  return !!(serverEnv.RESEND_API_KEY && serverEnv.RESEND_FROM_EMAIL);
};

// Helper function to get database URL (for drizzle config)
export const getDatabaseUrl = () => {
  return serverEnv.DATABASE_URL;
};
