import { Container, Typography } from "@mui/material";

export default function AdminOrderPage() {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 8,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Admin Order Page
      </Typography>
      <Typography variant="body1" color="text.secondary">
        This page is under construction. Please check back later.
      </Typography>
    </Container>
  );
}
