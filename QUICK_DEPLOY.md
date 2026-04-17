# Quick Deploy QA Power Suite - Live URL Instructions

## Step 1: Create GitHub Repository (2 minutes)

1. Go to **https://github.com**
2. Click **"+"** (top right) -> **"New repository"**
3. Repository name: `qa-power-suite`
4. Description: `A comprehensive QA tool for test case generation and bug ticket formatting`
5. Select **Public** (required for free Vercel)
6. **DO NOT** check any boxes (README, .gitignore, etc.)
7. Click **"Create repository"**

## Step 2: Push Your Code (1 minute)

Copy these commands and run them in your terminal:

```bash
git remote add origin https://github.com/YOUR_USERNAME/qa-power-suite.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel (2 minutes)

1. Go to **https://vercel.com**
2. Click **"Sign Up"** (or login)
3. Choose **"Continue with GitHub"**
4. Click **"New Project"**
5. Select your `qa-power-suite` repository
6. Click **"Deploy"**

## Step 4: Get Your Live URL! 

Your app will be live at:
**https://qa-power-suite.vercel.app**

## Automatic Updates

- Every time you push to GitHub, it auto-deploys
- No downtime during updates
- Preview deployments for testing

## Need Help?

If you get stuck at any step, let me know and I'll help you through it!
