# Recommendify

A Spotify-powered music recommendation app. Connect your Spotify account to view your top tracks, recently played, and saved songs — then dive into any track to get personalized recommendations based on its audio features.

## Setup

1. **Clone the repo and install dependencies:**
   ```bash
   npm install
   ```

2. **Create a `.env.local` file** at the project root:
   ```bash
   VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id_here
   ```
   Get your client ID from the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard). Set the redirect URI to `http://localhost:5173` for local development.

## Available Scripts

### `npm run dev`
Starts the development server at [http://localhost:5173](http://localhost:5173).

### `npm run build`
Builds the app for production into the `dist/` folder.

### `npm run preview`
Previews the production build locally.

## Stack

- React 17
- Vite
- React Router v6
- Spotify Web API

## Deploying to Vercel

1. Push the repo to GitHub
2. Import the project at [vercel.com](https://vercel.com)
3. Add `VITE_SPOTIFY_CLIENT_ID` as an environment variable in the Vercel dashboard
4. Update the redirect URI in your Spotify app settings to your Vercel deployment URL

Built by [Mieraf M](https://mierafm.github.io/Portfolio)
