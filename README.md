# MUSE

MUSE is an AI music companion built with Next.js. It connects to Spotify and includes a PostgreSQL-backed app shell for sessions, music data, conversations, and playlists.

## Requirements

- Node.js 22 (Node.js 20.9 or later is required by the current Next.js version)
- npm
- A PostgreSQL database
- A Spotify app created in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill in the values. `.env.local` is ignored by Git.

   ```bash
   cp .env.example .env.local
   ```

3. In your Spotify app settings, add this Redirect URI:

   ```text
   http://localhost:3000/api/auth/callback
   ```

   Set `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REDIRECT_URI` in `.env.local`. The redirect URI must exactly match the one registered with Spotify. Generate an encryption key with `openssl rand -hex 32` and set it as `ENCRYPTION_KEY`; keep it stable because changing it makes already-stored Spotify tokens unreadable.

4. Create the database tables from the Drizzle schema:

   ```bash
   npm run db:push
   ```

   This applies the current schema directly. The project does not yet have versioned database migrations, so use this for initial setup and plan a migration workflow before making production schema changes.

5. Start the app:

   ```bash
   npm run dev
   ```

Open <http://localhost:3000>.

Useful checks:

```bash
npm run lint
npm run typecheck
npm test
```

## Deploy to Vercel

The app uses the standard Next.js build, so Vercel should detect the framework automatically; no custom `vercel.json` is needed.

1. Push the repository to GitHub, then in Vercel choose **Add New → Project** and import the repository.
2. Attach a managed PostgreSQL database and add these environment variables in the Vercel project settings:
   - `DATABASE_URL` — the provider's connection string (use its serverless/pooled URL when available).
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `SPOTIFY_REDIRECT_URI` — for example, `https://your-domain.vercel.app/api/auth/callback`.
   - `NEXT_PUBLIC_APP_URL` — the absolute app URL, for example, `https://your-domain.vercel.app` (no trailing slash).
   - `ENCRYPTION_KEY` — generate a secure 64-character hex key with `openssl rand -hex 32`. Store it as a secret and keep it unchanged.
3. Add the exact production callback URL from `SPOTIFY_REDIRECT_URI` to the Spotify app's Redirect URIs. Local and production callbacks are separate entries.
4. Before using the deployed app, initialize the tables against the same hosted database by running `npm run db:push` from a trusted local terminal with that database URL in `.env.local`.
5. Deploy from Vercel. Once Git is connected, pushes to the configured production branch create production deployments; other branches and pull requests can create Preview deployments.

Do not commit `.env.local`, database credentials, Spotify secrets, or the encryption key. For OAuth testing on Preview deployments, configure a stable preview/staging URL and register its callback with Spotify; Spotify redirect URIs must match exactly.
