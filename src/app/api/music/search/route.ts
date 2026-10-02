import { getSession } from "@/services/auth/session.service";
import { spotifyService } from "@/services/spotify/spotify.service";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  
  if (!q) return Response.json({ error: "Query required" }, { status: 400 });

  try {
    const data = await spotifyService.search(session.userId, q);
    return Response.json(data);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
