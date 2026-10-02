import { db } from "@/db";
import { spotifyAccounts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { decrypt, encrypt } from "@/lib/crypto";
import { refreshSpotifyTokens } from "./auth.service";

export class SpotifyService {
  private async getValidAccessToken(userId: string): Promise<string> {
    const [account] = await db
      .select()
      .from(spotifyAccounts)
      .where(eq(spotifyAccounts.userId, userId))
      .limit(1);

    if (!account) {
      throw new Error("Spotify account not found for user");
    }

    const encryptionKey = process.env.ENCRYPTION_KEY;
    if (!encryptionKey) throw new Error("ENCRYPTION_KEY missing");

    // Check if token is expired (or close to expiring - 5 min buffer)
    if (account.expiresAt.getTime() < Date.now() + 5 * 60 * 1000) {
      const refreshToken = decrypt(account.refreshToken, encryptionKey);
      const newTokens = await refreshSpotifyTokens(refreshToken);

      const encryptedAccess = encrypt(newTokens.access_token, encryptionKey);
      const expiresAt = new Date(Date.now() + newTokens.expires_in * 1000);

      // Update in DB
      await db
        .update(spotifyAccounts)
        .set({
          accessToken: encryptedAccess,
          expiresAt,
        })
        .where(eq(spotifyAccounts.userId, userId));

      return newTokens.access_token;
    }

    return decrypt(account.accessToken, encryptionKey);
  }

  private async spotifyFetch(userId: string, endpoint: string, options: RequestInit = {}) {
    const accessToken = await this.getValidAccessToken(userId);
    const url = endpoint.startsWith("http") ? endpoint : `https://api.spotify.com/v1${endpoint}`;
    
    const res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const error = await res.text();
      console.error(`Spotify API error (${res.status}):`, error);
      
      if (res.status === 401) {
        throw new Error("Spotify session expired");
      }
      
      throw new Error(`Spotify API error: ${res.statusText}`);
    }

    if (res.status === 204) return null;
    return res.json();
  }

  async getProfile(userId: string) {
    return this.spotifyFetch(userId, "/me");
  }

  async getRecentlyPlayed(userId: string, limit = 20) {
    return this.spotifyFetch(userId, `/me/player/recently-played?limit=${limit}`);
  }

  async getTopArtists(userId: string, limit = 20, timeRange = "medium_term") {
    return this.spotifyFetch(userId, `/me/top/artists?limit=${limit}&time_range=${timeRange}`);
  }

  async getTopTracks(userId: string, limit = 20, timeRange = "medium_term") {
    return this.spotifyFetch(userId, `/me/top/tracks?limit=${limit}&time_range=${timeRange}`);
  }

  async getSavedTracks(userId: string, limit = 20, offset = 0) {
    return this.spotifyFetch(userId, `/me/tracks?limit=${limit}&offset=${offset}`);
  }

  async getSavedAlbums(userId: string, limit = 20, offset = 0) {
    return this.spotifyFetch(userId, `/me/albums?limit=${limit}&offset=${offset}`);
  }

  async getPlaylists(userId: string, limit = 20, offset = 0) {
    return this.spotifyFetch(userId, `/me/playlists?limit=${limit}&offset=${offset}`);
  }

  async search(userId: string, query: string, types: string[] = ["track", "artist"], limit = 20) {
    const q = encodeURIComponent(query);
    const t = types.join(",");
    return this.spotifyFetch(userId, `/search?q=${q}&type=${t}&limit=${limit}`);
  }
}

export const spotifyService = new SpotifyService();
