# Quick Deployment Guide for QA Power Suite

## Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click "New repository" (green button)
3. Repository name: `qa-power-suite`
4. Description: `A comprehensive QA tool for test case generation and bug ticket formatting`
5. Make it **Public** (required for free Vercel deployment)
6. **DO NOT** initialize with README (we already have one)
7. Click "Create repository"

## Step 2: Push to GitHub

Run these commands in your terminal:

```bash
git remote add origin https://github.com/YOUR_USERNAME/qa-power-suite.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with your GitHub account
3. Click "New Project"
4. Import your `qa-power-suite` repository
5. Click "Deploy"

## Step 4: Get Your Live URL

After deployment completes (usually 1-2 minutes), you'll get:
- **Live URL**: `https://qa-power-suite.vercel.app`
- **Custom domain**: Can add later if needed

## Automatic Updates

- Every push to your main branch will auto-deploy
- Preview deployments for pull requests
- Zero downtime updates

## Need Help?

If you need assistance with any step, let me know and I can help you through it!
