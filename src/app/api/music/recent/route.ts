import { getSession } from "@/services/auth/session.service";
import { spotifyService } from "@/services/spotify/spotify.service";

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await spotifyService.getRecentlyPlayed(session.userId);
    return Response.json(data);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
