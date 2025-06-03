"use client";
import { useEffect, useState } from "react";
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
  CircularProgress,
  Alert,
} from "@mui/material";

const statusOptions = [
  "PENDING",
  "PROCESSING",
  "COMPLETED",
  "CANCELLED",
  "REFUNDED",
];

export default function AdminOrderPage() {
  await redirectIfNotAdmin();
  
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusUpdating, setStatusUpdating] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/orders?admin=1");
        if (!res.ok) throw new Error("Could not fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  async function handleStatusChange(orderId: string, newStatus: string) {
    setStatusUpdating(orderId);
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed to update status");
        return;
      }
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } finally {
      setStatusUpdating(null);
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Admin Orders
      </Typography>
      <Box>
        {orders.map((order) => (
          <Card key={order.id} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6">
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
              <Typography variant="subtitle1">
                Produkter:
              </Typography>
              <List dense>
                {order.orderRows?.map((row: any) => (
                  <ListItem key={row.id}>
                    {row.product?.title} ({row.quantity} st) - {row.price} kr/st
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 1 }} />
              <Typography>
                Totalt: {order.totalPrice} kr
              </Typography>
              <Box sx={{ mt: 2 }}>
                <FormControl size="small">
                  <Select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    disabled={statusUpdating === order.id}
                  >
                    {statusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
