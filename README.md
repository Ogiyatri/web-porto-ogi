# ogiyatri.dev — Personal Portfolio

Personal portfolio website built with Next.js 14, Framer Motion, and Supabase.

## Tech Stack

- **Framework** — Next.js 14 (App Router)
- **Styling** — Tailwind CSS + shadcn/ui
- **Animations** — Framer Motion + React Three Fiber
- **i18n** — next-intl (EN / ID)
- **Theme** — next-themes (dark / light)
- **Backend** — Supabase (contact form storage)
- **Email** — Resend
- **Deployment** — Vercel

## Getting Started

### Prerequisites

- Node.js 20+
- Yarn

### Local development

```bash
# 1. Clone the repo
git clone <repo-url>
cd Web-Porto

# 2. Copy env file and fill in values
cp .env.example .env.local

# 3. Install dependencies
yarn install

# 4. Start dev server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase publishable (anon) key |
| `RESEND_API_KEY` | Resend API key for email delivery |
| `CONTACT_EMAIL` | Email address to receive contact form messages |

### Supabase table

Run this in your Supabase SQL editor:

```sql
create table contact_messages (
  id bigserial primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz default now() not null
);
```

## Docker

Files are in `build/docker/`.

```bash
# Copy and fill env
cp build/docker/.env.example build/docker/.env

# Production build
docker compose -f build/docker/docker-compose.yml --env-file build/docker/.env up --build

# Development with hot reload
docker compose -f build/docker/docker-compose.yml --env-file build/docker/.env --profile dev up web-dev
```

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Locale-based routing (en, id)
│   └── api/contact/       # Contact form API route
├── components/
│   ├── common/            # Navbar, Footer, Marquee
│   ├── sections/          # Hero, About, Skills, Experience, Projects, Contact
│   └── ui/                # Button, Badge (shadcn)
├── data/                  # projects.ts, skills.ts
├── i18n/                  # next-intl routing + request config
└── lib/                   # supabase.ts, utils.ts
messages/
├── en.json
└── id.json
build/
└── docker/
    ├── Dockerfile
    ├── docker-compose.yml
    └── .env.example
```

## Adding project screenshots

Drop images into `public/images/projects/` with these exact filenames:

```
api-management.png
sentiment-analysis.png
smart-booking.png
satria-muda.png
sipd.png
```

## License

MIT
