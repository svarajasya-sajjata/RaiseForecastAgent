# Raise Forecast Agent

Raise Forecast Agent is a web application that predicts the success probability of startup fundraising rounds. It provides a modern, interactive UI for users to input startup details and receive a forecast with detailed metrics and visualizations.

## Features
- **Startup Fundraising Forecast**: Input startup data and get a probability score for fundraising success.
- **Detailed Metrics**: View narrative strength, founder trust, traction score, and more.
- **Animated Results**: Engaging, animated progress bars and cards for each metric.
- **PDF Export & Sharing**: Download results as PDF or share them easily.
- **Modern UI**: Built with Next.js, Tailwind CSS, and Radix UI components for a beautiful, responsive experience.

## Tech Stack
- **Framework**: Next.js (App Router, React Server Components)
- **Styling**: Tailwind CSS, class-variance-authority, tailwind-merge
- **UI Components**: Radix UI, custom components in `/components/ui/`
- **Form Handling**: React Hook Form, Zod validation
- **API**: Custom endpoints in `/app/api/`
- **PDF Generation**: (If implemented) Uses browser APIs or libraries for PDF export

## Project Structure
```
app/
  layout.tsx         # Root layout
  page.jsx           # Landing page
  api/get-forecast/  # API route for forecasts
  forecast/page.jsx  # Forecast results page
components/
  forecast-results.jsx  # Results display component
  theme-provider.tsx    # Theme context
  ui/                   # Radix-based UI components
hooks/                  # Custom React hooks
lib/                    # Utility functions
public/                 # Static assets
styles/                 # Global styles
```

## Getting Started
1. **Install dependencies**
   ```sh
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```
2. **Run the development server**
   ```sh
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```
3. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Scripts
- `dev` – Start the development server
- `build` – Build for production
- `start` – Start the production server
- `lint` – Run ESLint

## Customization
- **UI Components**: Modify or extend components in `components/ui/` for custom UI needs.
- **Forecast Logic**: Update API logic in `app/api/get-forecast/route.js`.
- **Styling**: Edit `tailwind.config.ts` and `globals.css` for theme changes.

## License
This project is for demonstration and hackathon purposes.
