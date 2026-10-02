import { logout } from "@/services/auth/session.service";

export async function POST() {
  await logout();
  return Response.json({ ok: true });
}
