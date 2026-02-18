# 🎓 KlassFin - Next.js Education Loan Platform

India's #1 Education Loan Marketplace built with Next.js 14, Framer Motion, and Tailwind CSS.

## 🚀 Tech Stack

| Tool | Purpose |
|------|---------|
| **Next.js 14** | App Router, SSR/SSG |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling with custom config |
| **Framer Motion** | All animations |
| **Lucide React** | Beautiful icons |
| **Claude AI (Anthropic)** | AI Chatbot |

## 🎨 Design System

- **Colors:** Sky Blue `#38BDF8` + Light Purple `#A78BFA`
- **Display Font:** Syne (headings)
- **Body Font:** DM Sans (body text)
- **Mono Font:** JetBrains Mono (labels, code)
- **Theme:** Dark glassmorphism

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles + animations
│   ├── about/page.tsx              # About page
│   ├── ai-chatbot/page.tsx         # AI Assistant (Claude-powered)
│   ├── contact/page.tsx            # Contact form
│   ├── loan-calculator/page.tsx    # EMI Calculator
│   ├── college-list/page.tsx       # Countries & colleges
│   ├── privacy-policy/page.tsx     # Privacy Policy
│   └── terms-and-conditions/page.tsx  # Terms & Conditions
├── components/
│   ├── Navbar.tsx                  # Animated navbar + dropdown
│   ├── Footer.tsx                  # Full footer
│   ├── ui/
│   │   └── CustomCursor.tsx        # Custom cursor effect
│   └── sections/
│       ├── HeroSection.tsx         # Canvas particles hero
│       ├── WhyKlassFin.tsx         # Feature cards
│       ├── HowItWorks.tsx          # 3-step process
│       ├── LoanOfferings.tsx       # Loan products
│       ├── PartnersSection.tsx     # Marquee partners
│       ├── TestimonialsSection.tsx # Auto-sliding testimonials
│       └── CTASection.tsx          # Call-to-action
```

## ⚡ Features

### 🏠 Homepage
- Canvas particle animation with connecting lines
- Animated stats counter
- Scroll-triggered section animations
- Auto-sliding testimonials carousel
- Dual-row marquee partner logos

### 🤖 AI Chatbot
- Powered by **Claude Sonnet** via Anthropic API
- Knows all about KlassFin's loan products
- Quick question shortcuts
- Copy message functionality
- Typing indicator animation

### 🧮 Loan Calculator
- Real-time EMI calculation
- Interactive range sliders
- Visual breakdown chart
- Tax benefit info (Section 80E)

### 🌍 College List
- 15+ countries with details
- Expandable country cards
- Search & filter
- Loan amounts per country

### 📞 Contact Page
- Multi-field form with validation
- Success animation
- WhatsApp integration
- Response timeline info

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
cd klassfin
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for Production

```bash
npm run build
npm start
```

## 🔑 AI Chatbot Note

The AI Chatbot at `/ai-chatbot` uses the Anthropic API. In production:
- The API call in `src/app/ai-chatbot/page.tsx` needs a backend route
- Create `src/app/api/chat/route.ts` with your `ANTHROPIC_API_KEY`
- Set `ANTHROPIC_API_KEY` in your `.env.local`

### Example API Route:

```typescript
// src/app/api/chat/route.ts
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: Request) {
  const { messages } = await req.json();
  const response = await client.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 1000,
    system: "You are KlassFin's education loan expert...",
    messages,
  });
  return Response.json({ content: response.content[0].text });
}
```

## 🌐 Deployment

### Vercel (Recommended)

```bash
npx vercel
```

### Environment Variables

```env
ANTHROPIC_API_KEY=your_api_key_here
NEXT_PUBLIC_SITE_URL=https://klassfin.com
```

## 📱 Pages Summary

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Full homepage |
| About | `/about` | Company story, values, timeline |
| AI Assistant | `/ai-chatbot` | Claude-powered loan advisor |
| Contact | `/contact` | Lead capture form |
| Loan Calculator | `/loan-calculator` | EMI calculator |
| College List | `/college-list` | 15+ country guide |
| Privacy Policy | `/privacy-policy` | Legal page |
| Terms | `/terms-and-conditions` | Legal page |

---

Built with ❤️ for KlassFin | Making study abroad dreams possible
