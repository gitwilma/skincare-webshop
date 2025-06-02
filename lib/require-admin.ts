import { auth } from "@/auth";
import { headers } from "next/headers";

export async function requireAdmin() {
  const session = await auth.api.getSession({ headers: headers() });
  const user = session?.user;

  if (!user) {
    throw new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  if (!user.isAdmin) {
    throw new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
  }

  return user;
}
