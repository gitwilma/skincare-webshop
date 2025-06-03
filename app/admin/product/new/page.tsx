
import { redirectIfNotAdmin } from "@/lib/require-admin";


export default async function AdminNewPage() {
  await redirectIfNotAdmin(); // ✅ Server redirect (giltig användning)

  return <AdminForm />; // Rendera klientformuläret *efter* redirect-check
}