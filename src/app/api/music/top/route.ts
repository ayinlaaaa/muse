import { getSession } from "@/services/auth/session.service";
import { spotifyService } from "@/services/spotify/spotify.service";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "tracks"; // artists or tracks
  
  try {
    const data = type === "artists" 
      ? await spotifyService.getTopArtists(session.userId)
      : await spotifyService.getTopTracks(session.userId);
    return Response.json(data);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
