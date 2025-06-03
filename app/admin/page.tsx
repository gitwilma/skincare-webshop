import { auth } from "@/auth";
import { Box, Button, Typography } from "@mui/material";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import AdminCard from "./lib/admin-card";

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  redirect("/");
  // await redirectToLoginIfNotLoggedIn({ isAdmin: true });

  return (
    <main>
      <Typography
        variant="h4"
        sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}
      >
        Hantera produkter
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 3,
        }}
      >
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
      </Box>
      <AdminCard />
    </main>
  );
}
