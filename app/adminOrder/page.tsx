import { db } from "@/prisma/db";
import { auth } from "@/auth";
import { headers } from "next/headers";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  MenuItem,
  Select,
  FormControl,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const statusOptions = [
  "PENDING",
  "PROCESSING",
  "COMPLETED",
  "CANCELLED",
  "REFUNDED",
];

// Server action for updating order status
async function updateOrderStatus(formData: FormData) {
  "use server";
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user || !user.isAdmin) return;

  const orderId = formData.get("orderId") as string;
  const status = formData.get("status") as string;
  if (!orderId || !status) return;

  await db.order.update({
    where: { id: orderId },
    data: { status },
  });

  revalidatePath("/adminOrder");
  redirect("/adminOrder");
}

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
                  <button
                    type="submit"
                    style={{
                      marginLeft: 8,
                      padding: "4px 12px",
                      borderRadius: 4,
                      border: "1px solid #ccc",
                      background: "#f5f5f5",
                      cursor: "pointer",
                    }}
                  >
                    Spara
                  </button>
                </form>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
