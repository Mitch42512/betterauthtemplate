# Better Auth Template

A production-ready authentication template built with Next.js, Better Auth, Drizzle ORM, and PostgreSQL. Features complete email/password authentication with two-factor authentication (2FA) support.

## 🚀 Features

- **Complete Authentication System**: Email/password login and registration
- **Two-Factor Authentication**: Email-based 2FA with 6-digit codes
- **Protected Routes**: Session-based route protection
- **Database Integration**: Drizzle ORM with PostgreSQL
- **TypeScript**: Full type safety throughout
- **Beautiful UI**: Tailwind CSS styling
- **Production Ready**: Environment variable configuration

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: Better Auth
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm, yarn, pnpm, or bun

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd betterauthtemplate
   npm install
   ```

2. **Set up environment variables:**
   Copy the example file and update the values:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and replace the placeholder values for variables like
   `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`,
   `NEXT_PUBLIC_BETTER_AUTH_URL`, `RESEND_API_KEY`, and `RESEND_FROM_EMAIL`.

3. **Set up the database:**
   ```bash
   # Create your PostgreSQL database
   createdb betterauthtemplate
   
   # Push the schema to create tables
   npm run db:push
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Testing Two-Factor Authentication

1. **Register a new account:**
   - Go to `/register`
   - Fill in your details and create an account

2. **Log in with 2FA:**
   - Go to `/login`
   - Enter your email and password
   - You'll be redirected to `/login/2fa`

3. **Get your verification code:**
   - Check your browser console (F12 → Console tab)
   - Look for the 6-digit code that was logged

4. **Complete authentication:**
   - Enter the 6-digit code on the 2FA page
   - You'll be redirected to the protected dashboard

## 📁 Project Structure

```
src/
├── app/
│   ├── api/auth/[...all]/     # Auth API routes
│   ├── login/                 # Login pages
│   │   └── 2fa/              # 2FA verification
│   ├── register/              # Registration page
│   ├── dashboard/             # Protected dashboard
│   └── page.tsx              # Home page
├── lib/
│   ├── auth.ts               # Better Auth configuration
│   └── auth-client.ts        # Auth client utilities
├── db/
│   ├── index.ts              # Database connection
│   ├── schema.ts             # Database schema
│   └── utils.ts              # Database utilities
└── types/
    └── env.d.ts              # Environment variable types
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio

## 🔧 Configuration

### Email Provider Setup

Currently, 2FA codes are logged to the console for development. To use a real email provider:

1. **Install your preferred email service** (e.g., Resend, SendGrid)
2. **Update `src/lib/auth.ts`:**
   ```typescript
   sendCode: async ({ code, email }) => {
     await sendEmail({
       to: email,
       subject: "Your 2FA Code",
       body: `Your verification code is: ${code}`
     });
   }
   ```

### Database Management

- **View your data**: `npm run db:studio`
- **Reset database**: Drop and recreate your PostgreSQL database, then run `npm run db:push`

## 🚀 Deployment

This template is ready for deployment on platforms like Vercel, Railway, or any Node.js hosting service. Make sure to:

1. Set up a PostgreSQL database
2. Configure environment variables
3. Update `BETTER_AUTH_URL` to your production domain
4. Set up a real email provider for 2FA codes

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Better Auth Documentation](https://www.better-auth.com)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
