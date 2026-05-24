# Portfolio — Kanishk Tyagi

My personal site. Developer, tech speaker, community builder — mostly the place I point people to when they ask "where can I see your stuff?".

Live at **[kanishk.dev](#)** (replace with your actual domain).

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- Framer Motion for the animations on cards / headings
- Supabase for the contact form
- Inter (next/font/google)

## Running it locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

The contact form is wired to Supabase. Without env vars it still loads — the form just throws when you submit. To make it actually work, copy `.env.local.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

You'll need a `contacts` table with `name`, `email`, `message` columns (text).

## Where things live

```
src/
  app/
    layout.tsx          root layout — Navbar + Footer wrap everything
    page.tsx            home
    about/page.tsx
    events/page.tsx     filterable list of talks, hackathons, mentoring
    projects/page.tsx
    contact/page.tsx
    globals.css         CSS vars for theme colors live here
  components/
    Navbar.tsx          sticky, fades a backdrop in on scroll
    Footer.tsx
    ProfileImage.tsx    handles fallback to ui-avatars if /profile.jpg is missing
    ProjectCard.tsx
    EventCard.tsx       supports Instagram embed + role badges
    Stats.tsx
    SectionHeading.tsx
  lib/
    supabase.ts         lazy client — only constructs when env vars exist
    utils.ts            cn() helper
```

## Editing content

- **Photo** — drop a square-ish image in `public/profile.jpg`. There's a ui-avatars fallback so it won't break if it's missing.
- **Projects** — `PROJECTS` array in `src/app/projects/page.tsx`.
- **Events** — `ALL_EVENTS` array in `src/app/events/page.tsx`. Each event can have an `instagramUrl` and it'll render the embed.
- **Stats** — `src/components/Stats.tsx`. Numbers are hardcoded — update them when they're stale.
- **Colors** — CSS variables at the top of `globals.css` (`--brand-primary`, `--brand-secondary`, `--card-bg`, etc.). The site is dark-only by design.

## Deploy

Vercel — push to GitHub, import on vercel.com, add the two Supabase env vars under project settings, deploy.

The Supabase client is lazy on purpose (see `src/lib/supabase.ts`) so the build doesn't crash on preview deploys that haven't got the env vars set.

## License

MIT.
