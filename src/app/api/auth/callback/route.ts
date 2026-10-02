import { cookies } from "next/headers";
import { exchangeCodeForTokens } from "@/services/spotify/auth.service";
import { db } from "@/db";
import { users, spotifyAccounts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createSession } from "@/services/auth/session.service";
import { encrypt } from "@/lib/crypto";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const cookieStore = await cookies();
  const savedState = cookieStore.get("spotify_auth_state")?.value;
  const verifier = cookieStore.get("spotify_auth_verifier")?.value;

  if (error) {
    return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL || ''}/?error=spotify_denied`);
  }

  if (!code || !state || state !== savedState || !verifier) {
    return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL || ''}/?error=invalid_auth`);
  }

  try {
    const tokens = await exchangeCodeForTokens(code, verifier);

    // Get Spotify Profile
    const profileRes = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    
    if (!profileRes.ok) {
      throw new Error("Failed to fetch Spotify profile");
    }

    const spotifyUser = await profileRes.json();

    // Create or update user
    let [user] = await db.select().from(users).where(eq(users.spotifyId, spotifyUser.id)).limit(1);

    if (!user) {
      [user] = await db.insert(users).values({
        spotifyId: spotifyUser.id,
        displayName: spotifyUser.display_name || "Spotify User",
        email: spotifyUser.email,
        avatarUrl: spotifyUser.images?.[0]?.url || null,
      }).returning();
    } else {
      await db.update(users).set({
        displayName: spotifyUser.display_name || "Spotify User",
        email: spotifyUser.email,
        avatarUrl: spotifyUser.images?.[0]?.url || null,
        updatedAt: new Date(),
      }).where(eq(users.id, user.id));
    }

    // Encrypt tokens
    const encryptionKey = process.env.ENCRYPTION_KEY;
    if (!encryptionKey) throw new Error("ENCRYPTION_KEY missing");

    const encryptedAccessToken = encrypt(tokens.access_token, encryptionKey);
    const encryptedRefreshToken = encrypt(tokens.refresh_token, encryptionKey);
    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000);

    // Store tokens
    await db.insert(spotifyAccounts).values({
      userId: user.id,
      accessToken: encryptedAccessToken,
      refreshToken: encryptedRefreshToken,
      expiresAt,
      scope: tokens.scope,
    }).onConflictDoUpdate({
      target: spotifyAccounts.userId,
      set: {
        accessToken: encryptedAccessToken,
        refreshToken: encryptedRefreshToken,
        expiresAt,
        scope: tokens.scope,
      }
    });

    // Create session
    await createSession(user.id);

    // Cleanup auth cookies
    cookieStore.delete("spotify_auth_state");
    cookieStore.delete("spotify_auth_verifier");

    return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL || ''}/chat`);
  } catch (err) {
    console.error("Auth callback error:", err);
    return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL || ''}/?error=auth_failed`);
  }
}
