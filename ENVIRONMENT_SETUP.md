# Environment Setup

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Database connection string
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/betterauthtemplate

# Better Auth Configuration
BETTER_AUTH_SECRET=your-super-secret-key-here-change-this-in-production
BETTER_AUTH_URL=http://localhost:3000
```

## Environment Variables Explained

- **DATABASE_URL**: Your PostgreSQL connection string
- **BETTER_AUTH_SECRET**: A secure random string for JWT signing (generate with `openssl rand -base64 32`)
- **BETTER_AUTH_URL**: The base URL of your application (optional, defaults to localhost:3000)

## Security Notes

- Never commit `.env.local` to version control
- Use a strong, random secret for `BETTER_AUTH_SECRET` in production
- Update `BETTER_AUTH_URL` to your production domain when deploying
