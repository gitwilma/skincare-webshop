import { Box, Typography } from "@mui/material";
import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./order-summary";

export default function CheckoutPage() {
  return (
    <div>
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
    </div>
  );
}
