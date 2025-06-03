import { redirectIfNotAdmin } from "@/lib/require-admin";
import AdminForm from "./form";

export default async function AdminNewPage() {
  await redirectIfNotAdmin(); // ✅ Server redirect (giltig användning)

  return <AdminForm />; // Rendera klientformuläret *efter* redirect-check
}
