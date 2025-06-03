import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user) {
    throw new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  if (!user.isAdmin) {
    throw new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
  }

  return user;
}

export async function redirectIfNotAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user.isAdmin) {
    redirect("/?login=true");
  }
}
