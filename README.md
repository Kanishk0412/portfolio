# Kanishk Tyagi — Portfolio

Personal portfolio website for Kanishk Tyagi — Full Stack Developer, Tech Speaker, and Community Builder. Built with Next.js 16, React 19, and Tailwind CSS v4.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Hero, stats, featured projects, recent events, CTA |
| `/projects` | Full project grid with tech tags and links |
| `/events` | Filterable list of talks, hackathons, and mentoring |
| `/about` | Bio, experience timeline, education, tech stack |
| `/contact` | Contact form (Supabase-ready) + social links |

## Tech Stack

- **Framework** — [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- **Language** — TypeScript
- **Styling** — [Tailwind CSS v4](https://tailwindcss.com)
- **Animations** — [Framer Motion](https://www.framer.com/motion/)
- **Icons** — [Lucide React](https://lucide.dev) + [React Icons](https://react-icons.github.io/react-icons/)
- **Backend (planned)** — [Supabase](https://supabase.com) for contact form submissions
- **Font** — Inter (via `next/font/google`)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/Kanishk0412/portfolio.git
cd portfolio
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (Navbar + Footer)
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles + Tailwind theme tokens
│   ├── icon.svg            # KT favicon
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── events/page.tsx
│   └── projects/page.tsx
├── components/
│   ├── Navbar.tsx          # Responsive navbar with scroll effect
│   ├── Footer.tsx
│   ├── ProfileImage.tsx    # Client component for avatar with fallback
│   ├── ProjectCard.tsx     # Animated project card
│   ├── EventCard.tsx       # Event/talk card with role badges
│   ├── Stats.tsx           # Animated impact stats grid
│   └── SectionHeading.tsx  # Animated section title
└── lib/
    └── utils.ts            # cn() helper (clsx + tailwind-merge)
```

## Customization

- **Profile photo** — add your photo as `public/profile.jpg`. The site falls back to a generated avatar if the file is missing.
- **Projects & Events** — edit the data arrays directly in `src/app/projects/page.tsx` and `src/app/events/page.tsx`.
- **Theme colors** — update CSS variables in `src/app/globals.css` (`--brand-primary`, `--brand-secondary`, etc.).
- **Contact form** — uncomment the Supabase lines in `src/app/contact/page.tsx` and add your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`.

## Deployment

The easiest way to deploy is [Vercel](https://vercel.com):

1. Push this repo to GitHub
2. Import it on [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — click **Deploy**

## License

MIT
