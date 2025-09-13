# Environment Setup

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Database connection string
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/betterauthtemplate

# Better Auth Configuration
BETTER_AUTH_SECRET=your-super-secret-key-here-change-this-in-production-must-be-at-least-32-chars
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Email Service Configuration (Resend) - Optional
RESEND_API_KEY=re_your_actual_api_key_here
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

## Environment Variables Explained

- **DATABASE_URL**: Your PostgreSQL connection string (required)
- **BETTER_AUTH_SECRET**: A secure random string for JWT signing, must be at least 32 characters (required)
- **BETTER_AUTH_URL**: The base URL of your application (optional, defaults to localhost:3000)
- **NEXT_PUBLIC_BETTER_AUTH_URL**: Base URL exposed to the client for auth requests (required)
- **RESEND_API_KEY**: Your Resend API key for sending emails (optional)
- **RESEND_FROM_EMAIL**: Your verified sender email address (optional)

## Environment Validation

This template includes automatic environment variable validation using Zod. The application will:

- ✅ Validate all required variables are present at startup
- ✅ Check that URLs are properly formatted
- ✅ Ensure secrets meet security requirements (minimum length)
- ✅ Provide clear error messages if validation fails
- ✅ Fail fast with helpful debugging information

If you see validation errors, check that all required variables are set in your `.env.local` file.

## Security Notes

- Never commit `.env.local` to version control
- Use a strong, random secret for `BETTER_AUTH_SECRET` in production (at least 32 characters)
- Update `BETTER_AUTH_URL` to your production domain when deploying
- Email service is optional - the app will log emails to console if not configured
