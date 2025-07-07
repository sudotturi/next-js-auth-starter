# Next.js Starter Kit

A production-ready starter template with Next.js 14, TypeScript, Prisma, PostgreSQL, NextAuth.js, and shadcn/ui.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-4-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38B2AC)

## 🚀 Features

- ⚡ **Next.js 14** with App Router and TypeScript
- 🎨 **shadcn/ui** components with Tailwind CSS
- 🔐 **NextAuth.js** authentication (Email/Password + Google OAuth)
- 🗄️ **PostgreSQL** database with Prisma ORM
- 📱 **Responsive design** with modern UI
- 🔒 **Protected routes** and session management
- 🎯 **Type-safe** development experience
- 📦 **Production-ready** configuration

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui + Radix UI
- **Icons:** Lucide React

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Google OAuth credentials (optional)

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/sudotturi/next-js-auth-starter.git
cd next-js-auth-starter
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Update `.env.local` with your database URL and authentication secrets:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/myapp?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Set up the database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Seed the database
npx prisma db seed
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 📁 Project Structure

```
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Protected dashboard
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── auth/             # Authentication components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility functions
│   ├── auth.ts           # NextAuth configuration
│   └── prisma.ts         # Prisma client
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

## 🔐 Authentication

The starter includes both email/password and Google OAuth authentication:

- **Email/Password:** Users can register and sign in with email
- **Google OAuth:** One-click sign in with Google
- **Protected Routes:** Dashboard requires authentication
- **Session Management:** Secure JWT-based sessions

## 🗄️ Database

### Schema

The database includes:
- **Users:** User accounts with email, password, and profile info
- **Accounts:** OAuth account linking
- **Sessions:** User session management
- **VerificationTokens:** Email verification support

### Commands

```bash
# View database in Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset

# Deploy migrations (production)
npx prisma migrate deploy
```

## 🎨 UI Components

Built with shadcn/ui components:

```bash
# Add new components
npx shadcn-ui@latest add [component-name]

# Available components
npx shadcn-ui@latest add button input label card form badge
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Railway

1. Connect your GitHub repository
2. Add PostgreSQL service
3. Set environment variables
4. Deploy

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-production-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Prisma Documentation](https://www.prisma.io/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) for the amazing framework
- [shadcn](https://twitter.com/shadcn) for the beautiful UI components
- [Vercel](https://vercel.com) for hosting and deployment
- [Prisma](https://prisma.io) for the excellent ORM

## 📧 Support

If you have any questions or need help, please open an issue or reach out on:

- GitHub Issues: [Create an issue](https://github.com/sudotturi/next-js-auth-starter/issues)
- Twitter: [@yourusername](https://twitter.com/yourusername)

---

⭐ If this project helped you, please consider giving it a star on GitHub!