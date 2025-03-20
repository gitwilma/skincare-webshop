import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import AdminCard from "./lib/admin-card";

export default function AdminPage() {
  return (
    <main>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
          marginRight: 4,
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
        <Typography variant="h4" sx={{display: "flex", justifyContent: "center"}}>Manage products</Typography>
      <AdminCard />
    </main>
  );
}
