import { db } from "@/prisma/db";
import { Box, Typography } from "@mui/material";

interface Props {
  params: Promise<{ orderNumber: string }>;
}

export default async function ConfirmationPage(props: Props) {
  const { orderNumber } = await props.params;
  const order = await db.order.findUnique({
    where: { orderNumber },
    include: { customer: true, orderRows: { include: { product: true } } },
  });

  if (!order) {
    return <main>404</main>;
  }

  return (
    <main>
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Typography variant="h4" fontWeight="bold">
          Tack för din order, {order.customer.name}!
        </Typography>
        <Typography variant="body1">
          Ditt ordernummer är: {order.orderNumber}
        </Typography>
      </Box>
    </main>
  );
}
