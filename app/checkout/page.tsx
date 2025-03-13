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
          flexDirection: "column",
          alignItems: "center",
          margin: 4,
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
      <CheckoutForm />
    </main>
  );
}
