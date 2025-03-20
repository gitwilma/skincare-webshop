import { db } from "@/prisma/db";
import { Box, Typography } from "@mui/material";

export default async function ConfirmationPage() {
  const order = await db.order.findUnique({
    where: { orderNumber: "" },
    include: { customer: true, orderRows: true },
  });

  return (
    <main>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Typography variant="h4" fontWeight="bold">
          Tack för din order!
        </Typography>
      </Box>
    </main>
  );
}
