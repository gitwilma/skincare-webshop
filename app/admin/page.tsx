import { Button } from "@mui/material";
import Link from "next/link";
import AdminCard from "./lib/admin-card";

export default function AdminPage() {
  return (
    <main>
      <Link href="/admin/product/new/">
        <Button
          data-cy="admin-add-product"
          type="submit"
          variant="contained"
          color="primary"
        >
          Add a product
        </Button>
      </Link>
      <AdminCard />
    </main>
  );
}
