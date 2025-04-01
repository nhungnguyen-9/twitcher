# Twitcher

An application for livestreaming written in [Next.js](https://nextjs.org/).

## Getting Started

First, copy `.env.example` > `.env` and fill in value.

```
### FILL IN VALUES

NODE_ENV="development"
DATABASE_URL=DATABASE_URL="postgresql://root:secret@twitcher-db:5432/twitcher?schema=public"

# CLERK
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= 
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
CLERK_WEBHOOKS_SECRET=

# LIVEKIT
LIVEKIT_API_URL=
LIVEKIT_API_KEY=
LIVEKIT_SECRET_KEY=
NEXT_PUBLIC_LIVEKIT_WS_URL=

# UPLOADTHING
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
UPLOADTHING_TOKEN=
```

Then, run the development server on Docker Compose:

```bash
docker compose up -d
docker ps
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
