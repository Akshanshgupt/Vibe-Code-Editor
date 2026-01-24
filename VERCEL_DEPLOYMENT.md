# Vercel Deployment Guide

This guide will help you deploy your Vibe Code Editor application to Vercel.

## Prerequisites

- A Vercel account ([sign up here](https://vercel.com/signup))
- Your MongoDB connection string
- GitHub, Google OAuth credentials (if using authentication)

## Deployment Steps

### 1. Connect Your Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your Git repository (GitHub, GitLab, or Bitbucket)
4. Vercel will automatically detect it's a Next.js project

### 2. Configure Environment Variables

In your Vercel project settings, add the following environment variables:

#### Required Environment Variables

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database?appName=Cluster0"

# Authentication
AUTH_SECRET="your-auth-secret-here"
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"

# NextAuth URL (Vercel will auto-set this, but you can override)
NEXTAUTH_URL="https://your-app.vercel.app"
```

#### Generating AUTH_SECRET

You can generate a secure AUTH_SECRET using:

```bash
openssl rand -base64 32
```

Or use an online generator: https://generate-secret.vercel.app/32

### 3. Build Settings

Vercel will automatically detect the build settings from `vercel.json`:

- **Framework Preset**: Next.js
- **Build Command**: `prisma generate && npm run generate-templates && next build`
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install`

**Note**: The build process includes template generation which creates pre-built JSON files for all templates. This is required for Vercel's serverless environment where filesystem access is limited.

### 4. Deploy

1. Click "Deploy" button
2. Vercel will:
   - Install dependencies
   - Run `prisma generate` (via postinstall script)
   - Build your Next.js application
   - Deploy to production

### 5. Post-Deployment

After deployment:

1. **Verify Prisma Client**: Ensure Prisma client is generated correctly
2. **Test Authentication**: Verify OAuth providers are working
3. **Check Database Connection**: Ensure MongoDB connection is working
4. **Update OAuth Redirect URLs**: 
   - GitHub: Add `https://your-app.vercel.app/api/auth/callback/github`
   - Google: Add `https://your-app.vercel.app/api/auth/callback/google`

## Configuration Files

### vercel.json

The `vercel.json` file configures:
- Build command with Prisma generation
- Framework detection
- Region selection (default: `iad1`)

### .vercelignore

Excludes unnecessary files from deployment to reduce build size and time.

## Troubleshooting

### Prisma Client Not Found

If you see "Prisma Client not found" errors:

1. Ensure `postinstall` script runs: `"postinstall": "prisma generate"`
2. Check that `DATABASE_URL` is set correctly
3. Verify Prisma schema is valid

### Build Timeout

If builds timeout:
- Check for large files in repository
- Ensure `.vercelignore` excludes unnecessary files
- Consider using Vercel Pro for longer build times

### Database Connection Issues

- Verify `DATABASE_URL` is correct
- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0` for Vercel)
- Ensure MongoDB cluster is running

### Authentication Issues

- Verify all OAuth credentials are correct
- Check redirect URLs match your Vercel domain
- Ensure `AUTH_SECRET` is set and consistent

## Environment Variables Setup

### Via Vercel Dashboard

1. Go to Project Settings → Environment Variables
2. Add each variable for:
   - **Production**
   - **Preview** (optional, for PR previews)
   - **Development** (optional)

### Via Vercel CLI

```bash
vercel env add DATABASE_URL
vercel env add AUTH_SECRET
# ... add other variables
```

## Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update OAuth redirect URLs to include custom domain

## Monitoring

- **Deployments**: View in Vercel Dashboard
- **Logs**: Check Function Logs in Vercel Dashboard
- **Analytics**: Enable Vercel Analytics in project settings

## Additional Resources

- [Vercel Next.js Documentation](https://vercel.com/docs/frameworks/nextjs)
- [Prisma on Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [NextAuth.js Deployment](https://next-auth.js.org/configuration/options#nextauth_url)

## Support

If you encounter issues:
1. Check Vercel build logs
2. Review function logs for runtime errors
3. Verify all environment variables are set
4. Check Prisma schema and migrations
