# LaunchForge - AI Launch Script Factory

Generate professional launch scripts for Product Hunt, Reddit, Hacker News, and X. Perfect for indie hackers and creators who want to nail their product launches.

## 🚀 Overview

LaunchForge is an AI-powered platform that generates comprehensive launch scripts and marketing copy for indie hackers and creators. Built with Next.js, Supabase, and Creem.io, it helps you create professional launch content in minutes, not hours.

## 🌟 Key Features

- 🤖 **AI-Powered Script Generation**
  - Professional launch scripts in seconds
  - Platform-specific content optimization
  - Multiple writing style options
  - Battle-tested templates

- 🚀 **Multi-Platform Support**
  - Product Hunt launch scripts
  - Reddit community posts
  - Hacker News submissions
  - X (Twitter) content packs
  - Discord networking scripts

- 📄 **Easy Export Options**
  - Markdown files for editing
  - PDF reports for sharing
  - Notion template exports
  - Copy-paste ready content

- 💼 **Built for Indie Hackers**
  - Quick project setup
  - Professional results
  - No marketing experience needed
  - One-time purchase model

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- OpenRouter API account (for AI generation)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/launchforge.git
   cd launchforge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update your `.env.local`:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # Payment Processing (Creem.io)
   CREEM_API_KEY=your_creem_api_key
   CREEM_WEBHOOK_SECRET=your_webhook_secret
   CREEM_API_URL=https://test-api.creem.io/v1

   # Site Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   CREEM_SUCCESS_URL=http://localhost:3000/dashboard
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Visit http://localhost:3000**

## 💡 How It Works

1. **Input Project Details** - Describe your product, features, and target audience
2. **Select Platforms** - Choose which platforms you want to launch on
3. **AI Generation** - Our AI creates professional scripts for each platform
4. **Export & Launch** - Download in multiple formats and start your launch

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase
- **AI**: OpenRouter API (GPT-4)
- **Payments**: Creem.io
- **Database**: PostgreSQL (Supabase)
- **Deployment**: Vercel

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── (auth-pages)/      # Authentication pages
│   ├── dashboard/         # Main dashboard
│   ├── api/              # API routes
│   └── layout.tsx        # Root layout
├── components/            # React components
│   ├── ui/              # Base UI components
│   ├── dashboard/       # Dashboard components
│   └── home/           # Landing page components
├── hooks/                # Custom React hooks
├── types/               # TypeScript definitions
├── utils/              # Utility functions
└── config/            # Configuration files
```

## 🚀 Deploy

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/launchforge)

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📞 Support

- 📧 Email: support@launchforge.app
- 💬 Discord: [Join our community](https://discord.gg/launchforge)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/launchforge/issues)
