"use server";

import { auth } from "@/auth";
import { db } from "@/prisma/db";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { headers } from "next/headers";
import { updateOrderStatus } from "./lib/orderStatus";

const statusOptions = [
  "PENDING",
  "PROCESSING",
  "COMPLETED",
  "CANCELLED",
  "REFUNDED",
];


export default async function AdminOrderPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user || !user.isAdmin) {
    return (
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Typography variant="h5" color="error">
          Du har inte behörighet att se denna sida.
        </Typography>
      </Container>
    );
  }

  const orders = await db.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      orderRows: { include: { product: true } },
      shippingAddress: true,
      customer: true,
    },
  });

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Admin Orders
      </Typography>
      <Box>
        {orders.map((order) => (
          <Card key={order.id} sx={{ border: 2, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ overflow: "auto" }}>
                Ordernummer: {order.orderNumber}
              </Typography>
              <Typography variant="body2">
                Datum: {new Date(order.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body2">
                Kund: {order.customer?.name} ({order.customer?.email})
              </Typography>
              <Typography variant="body2">
                Leveransadress: {order.shippingAddress?.street},{" "}
                {order.shippingAddress?.zipcode} {order.shippingAddress?.city}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="h6">Produkter:</Typography>
              <List dense>
                {order.orderRows?.map((row: any) => (
                  <ListItem key={row.id}>
                    {row.product?.title} ({row.quantity} st) - {row.price} kr/st
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 1 }} />
              <Typography variant="h6">
                Totalt: {order.totalPrice} kr
              </Typography>
              <Box sx={{ mt: 2 }}>
                <form action={updateOrderStatus}>
                  <input type="hidden" name="orderId" value={order.id} />
                  <FormControl size="small">
                    <Select
                      name="status"
                      defaultValue={order.status}
                      sx={{ minWidth: 140 }}
                    >
                      {statusOptions.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ p: 1, ml: 2 }}
                  >
                    Spara
                  </Button>
                </form>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
