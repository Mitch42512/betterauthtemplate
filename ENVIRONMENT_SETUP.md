# Environment Setup

## Required Environment Variables

Start by copying the example file and then updating the values in your local copy:

```bash
cp .env.example .env.local
```

```bash
# Database connection string
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/betterauthtemplate

# Better Auth Configuration
BETTER_AUTH_SECRET=your-super-secret-key-here-change-this-in-production
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Email Service Configuration (Resend)
RESEND_API_KEY=re_your_actual_api_key_here
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

## Environment Variables Explained

- **DATABASE_URL**: Your PostgreSQL connection string
- **BETTER_AUTH_SECRET**: A secure random string for JWT signing (generate with `openssl rand -base64 32`)
- **BETTER_AUTH_URL**: The base URL of your application (optional, defaults to localhost:3000)
- **NEXT_PUBLIC_BETTER_AUTH_URL**: Base URL exposed to the client for auth requests
- **RESEND_API_KEY**: Your Resend API key for sending emails (get from resend.com)
- **RESEND_FROM_EMAIL**: Your verified sender email address

## Security Notes

- Never commit `.env.local` to version control
- Use a strong, random secret for `BETTER_AUTH_SECRET` in production
- Update `BETTER_AUTH_URL` to your production domain when deploying
