import { Button } from "@mui/material";
import Link from "next/link";
import AdminCard from "./lib/admin-card";

export default function AdminPage() {
  return (
    <>
      <Link href="/admin/admin-form">
        <Button type="submit" variant="contained" color="primary">
          Add Products. gå till admin-formuläret
        </Button>
      </Link>
      <AdminCard />
    </>
  );
}
