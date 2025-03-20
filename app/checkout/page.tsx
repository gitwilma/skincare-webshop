import { Box, Typography } from "@mui/material";
import IncreaseDecreaseBtn from "../components/increase-decrease-btn";
import CheckoutForm from "./lib/checkout-form";
import OrderSummary from "./lib/order-summary";

export default function CheckoutPage() {
  return (
    <main>
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        margin: 4,
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "primary.main",
            marginBottom: 3,
          }}
        >
          Order summary
        </Typography>
        <OrderSummary />
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
        }}
      >
        <CheckoutForm />
      </Box>
    </Box>
  </main>

  );
}
