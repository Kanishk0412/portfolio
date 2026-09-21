# Portfolio — Kanishk Tyagi

My personal site. Developer, tech speaker, community builder — mostly the place I point people to when they ask "where can I see your stuff?".

Live at **[kanishk.dev](#)** (replace with your actual domain).

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- Framer Motion for the animations on cards / headings
- A server-side contact API backed by Supabase
- Inter (next/font/google)

## Running it locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

The contact form posts to a same-origin server route, which validates and rate-limits requests before writing to Supabase. Without env vars the site still loads and the API returns a safe `503` response. Copy `.env.local.example` to `.env.local` and fill in:

```
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
```

These variables are server-only and must never use the `NEXT_PUBLIC_` prefix. You'll need a `contacts` table with `name`, `email`, and `message` text columns. Enable RLS and do not grant the `anon` role direct access to this table; the server route uses the service-role credential after it has validated the request.

The route includes a best-effort per-instance limit of five accepted attempts per IP every ten minutes. On a serverless deployment, also configure a platform or distributed rate-limit rule for `POST /api/contact` because separate instances do not share memory.

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
    api/contact/route.ts  server-only validation, rate limiting, and Supabase write
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
    utils.ts            cn() helper
```

## Editing content

- **Photo** — drop a square-ish image in `public/profile.jpg`. There's a ui-avatars fallback so it won't break if it's missing.
- **Projects** — `PROJECTS` array in `src/app/projects/page.tsx`.
- **Events** — `ALL_EVENTS` array in `src/app/events/page.tsx`. Each event can have an `instagramUrl` and it'll render the embed.
- **Stats** — `src/components/Stats.tsx`. Numbers are hardcoded — update them when they're stale.
- **Colors** — CSS variables at the top of `globals.css` (`--brand-primary`, `--brand-secondary`, `--card-bg`, etc.). The site is dark-only by design.

## Deploy

Vercel — push to GitHub, import on vercel.com, add the two server-only Supabase env vars under project settings, and deploy.

Before promoting to production:

- Confirm anonymous Supabase access to `contacts` is denied.
- Add a platform/distributed rate-limit rule for `POST /api/contact`.
- Run `npm audit`, `npm run lint`, and `npm run build`.
- Submit one real contact message in the deployment and confirm it reaches the table.

## License

MIT.
