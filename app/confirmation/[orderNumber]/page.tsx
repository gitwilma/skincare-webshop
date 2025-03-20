import { db } from "@/prisma/db";
import { Box, List, ListItem, Typography } from "@mui/material";

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

  const totalPrice = order.orderRows.reduce(
    (sum, row) => sum + row.price * row.quantity,
    0
  );

  return (
    <main>
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
        marginX={2}
      >
        <Typography variant="h4" fontWeight="bold">
          Tack för din order, {order.customer.name}!
        </Typography>
        <Typography variant="body1">
          Ditt ordernummer är: {order.orderNumber}
        </Typography>
        <Typography variant="body1">Beställda produkter:</Typography>
        <List>
          {order.orderRows.map((row) => (
            <ListItem key={row.id}>
              {row.product.title} - {row.quantity} st - {row.price} kr
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" fontWeight="bold" mt={2}>
          Totalt: {totalPrice.toFixed(2)} kr
        </Typography>
        <Typography variant="body1">
          Dina varor levereras till {order.customer.address},{" "}
          {order.customer.zipcode} {order.customer.city}.
        </Typography>
        <Typography variant="body1">
          Ett bekräftelsemail har skickats till din epost:{" "}
          {order.customer.email}
        </Typography>
        <Typography variant="body1">
          När leveransen är framme kommer vi skicka ett SMS till ditt
          telefonnummer: {order.customer.phone}
        </Typography>
      </Box>
    </main>
  );
}
