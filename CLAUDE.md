# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Install dependencies
npm i
```

## Architecture Overview

This is LaunchForge, an AI-powered launch script generator for indie hackers, built with Next.js and TypeScript. The application uses:

- **Next.js 14+ with App Router** - Server and client components with route protection
- **Supabase** - Authentication, database with PostgreSQL and Row Level Security (RLS)
- **Creem.io** - Payment processing for subscriptions and one-time purchases
- **Tailwind CSS + shadcn/ui** - UI components with dark/light mode support

## Database Schema

The application uses three main tables in Supabase:

1. **customers** - Links Supabase users to Creem customers, tracks credits
2. **subscriptions** - Manages subscription states and billing periods
3. **credits_history** - Tracks credit transactions and usage

All tables use RLS policies for security. The service role can manage all data, while users can only access their own records.

## Key Integration Points

### Authentication Flow
- Middleware (`middleware.ts`) handles session management across all routes
- Route protection through `utils/supabase/middleware.ts`
- Auth pages in `app/(auth-pages)/` directory

### Payment Processing
- Webhook handler at `app/api/webhooks/creem/route.ts` processes payment events
- Customer portal at `app/api/creem/customer-portal/route.ts`
- Subscription tiers defined in `config/subscriptions.ts`
- Credit packages also defined in `config/subscriptions.ts`

### Database Operations
- Server-side client: `utils/supabase/server.ts`
- Service role client: `utils/supabase/service-role.ts`
- Subscription utilities: `utils/supabase/subscriptions.ts`

## Environment Variables Required

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Creem.io Configuration
CREEM_API_KEY=your_creem_api_key
CREEM_WEBHOOK_SECRET=your_webhook_secret
CREEM_API_URL=https://test-api.creem.io/v1  # or https://api.creem.io for production

# Site Configuration
NEXT_PUBLIC_SITE_URL=your_site_url
CREEM_SUCCESS_URL=your_site_url/dashboard
```

## Component Structure

- `components/ui/` - shadcn/ui base components
- `components/home/` - Landing page sections (hero, features, pricing, etc.)
- `components/dashboard/` - Dashboard-specific components
- `hooks/` - Custom React hooks for user, subscription, and toast management
- `types/` - TypeScript type definitions for Creem API and subscriptions

## Development Notes

- Use the existing Supabase client functions rather than creating new ones
- Credit operations should be tracked in the credits_history table
- All payment-related operations should use the service role client
- Webhook signature verification is required for Creem.io webhooks
- The subscription system supports both recurring subscriptions and one-time credit purchases