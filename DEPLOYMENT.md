# 🚀 LaunchForge Deployment Guide

## Quick Deploy to Vercel

### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/launchforge)

### Option 2: Manual Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "feat: LaunchForge ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables (see below)

3. **Environment Variables**
   
   Add these in Vercel Dashboard → Project → Settings → Environment Variables:

   ```env
   # Required for AI Generation
   OPENROUTER_API_KEY=your_openrouter_api_key
   
   # Supabase (if you have them)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   
   # Site URL (automatically set by Vercel)
   NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
   
   # Optional: Payment processing
   CREEM_API_KEY=your_creem_api_key
   CREEM_WEBHOOK_SECRET=your_webhook_secret
   CREEM_API_URL=https://api.creem.io
   CREEM_SUCCESS_URL=https://your-project.vercel.app/dashboard
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your LaunchForge is live! 🎉

## 🛡️ Deployment Features

### Graceful Fallbacks
- **Demo Mode**: If Supabase isn't configured, dashboard shows demo version
- **Error Handling**: API failures gracefully handled with user-friendly messages
- **Static Generation**: Landing pages are statically generated for fast loading

### Pages That Work Without Full Setup
- ✅ **Homepage** (`/`) - Landing page with features and pricing
- ✅ **Test Page** (`/test-launch`) - AI script generation testing
- ✅ **Dashboard** (`/dashboard`) - Demo mode if no auth
- ✅ **Simple Test** (`/simple-test`) - Basic connectivity test

### Authentication Flow
- With Supabase: Full authentication and user management
- Without Supabase: Demo mode with limited functionality

## 🔧 Post-Deployment Configuration

### 1. Custom Domain (Optional)
- In Vercel Dashboard → Domains
- Add your custom domain
- Update `NEXT_PUBLIC_SITE_URL` environment variable

### 2. Analytics (Optional)
- Vercel Analytics is automatically enabled
- Add Google Analytics if needed

### 3. Monitoring
- Check Vercel Functions tab for API performance
- Monitor OpenRouter API usage

## 🧪 Testing Your Deployment

1. **Homepage Test**
   ```
   Visit: https://your-project.vercel.app
   Expected: LaunchForge landing page loads
   ```

2. **AI Generation Test**
   ```
   Visit: https://your-project.vercel.app/test-launch
   Expected: Project form loads, can generate scripts
   ```

3. **Dashboard Test**
   ```
   Visit: https://your-project.vercel.app/dashboard
   Expected: Demo dashboard or auth redirect
   ```

## 🐛 Troubleshooting

### Build Failures
- Check environment variables are set
- Ensure OpenRouter API key is valid
- Review build logs in Vercel dashboard

### Runtime Errors
- Check Function logs in Vercel
- Verify API endpoints are responding
- Test with demo mode first

### Performance Issues
- Enable Vercel Speed Insights
- Monitor API response times
- Consider edge functions for better performance

## 📊 Current Status

✅ **Ready for Deployment**
- Build process: Successful
- Type checking: Passed
- Environment handling: Graceful fallbacks
- Error boundaries: Implemented
- Static generation: Optimized

## 🚀 Next Steps After Deployment

1. Test all functionality in production
2. Set up Supabase database (if not done)
3. Configure payment processing with Creem.io
4. Add monitoring and analytics
5. Customize branding and content
6. Set up custom domain (optional)

Your LaunchForge is ready to help indie hackers create amazing launch scripts! 🎯