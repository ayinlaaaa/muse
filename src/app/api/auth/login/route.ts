import { cookies } from "next/headers";
import { generateCodeVerifier, generateCodeChallenge, generateState } from "@/services/spotify/auth.service";

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return Response.json({ error: "Spotify configuration missing" }, { status: 500 });
  }

  const verifier = generateCodeVerifier();
  const challenge = generateCodeChallenge(verifier);
  const state = generateState();

  const cookieStore = await cookies();
  cookieStore.set("spotify_auth_verifier", verifier, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10, // 10 minutes
    path: "/"
  });
  cookieStore.set("spotify_auth_state", state, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10,
    path: "/"
  });

  const scope = [
    "user-read-private",
    "user-read-email",
    "user-top-read",
    "user-read-recently-played",
    "playlist-modify-public",
    "playlist-modify-private",
    "user-library-read",
    "user-library-modify",
    "streaming",
    "user-read-playback-state",
    "user-modify-playback-state"
  ].join(" ");

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope,
    redirect_uri: redirectUri,
    state,
    code_challenge_method: "S256",
    code_challenge: challenge,
  });

  return Response.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
}
