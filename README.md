# QA Power Suite

A comprehensive web application for QA engineers featuring Test Case Generation and Bug Ticket Formatting capabilities.

## Features

- **Test Case Generator**: Generate 8-10 comprehensive test cases per feature with multiple categories
- **Bug Ticket Formatter**: Create professional bug reports from issue descriptions
- **History Tracking**: Save and manage recent test cases and bug tickets
- **Modern UI**: Clean, responsive design with gradient backgrounds
- **Copy to Clipboard**: Easy sharing of generated content

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd qa-power-suite
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Copy environment variables:
```bash
cp env.example .env.local
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Automatic Updates**:
   - Every push to your main branch will automatically deploy
   - Preview deployments available for pull requests

### Alternative Deployment Options

**Netlify**:
```bash
npm run build
# Deploy the .next folder to Netlify
```

**Railway**:
```bash
# Connect your GitHub repository to Railway
# Automatic deployment on push
```

**Docker**:
```bash
docker build -t qa-power-suite .
docker run -p 3000:3000 qa-power-suite
```

## Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_APP_NAME=QA Power Suite
NEXT_PUBLIC_APP_VERSION=1.0.0

# Optional: For AI integration
# OPENAI_API_KEY=your_openai_api_key_here
# ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

## Project Structure

```
qa-power-suite/
src/
  app/
    api/                 # API routes
      generate-testcase/
      generate-bugticket/
    page.tsx            # Main page
  components/
    TestCaseGenerator.tsx
    BugTicketFormatter.tsx
    History.tsx
    layout/
      Sidebar.tsx
```

## Technologies Used

- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **LocalStorage** for history persistence

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Push to your fork
6. Create a Pull Request

## License

This project is licensed under the MIT License.
