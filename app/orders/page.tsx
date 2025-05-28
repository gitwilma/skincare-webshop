'use client';

import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/orders');
        if (!res.ok) throw new Error('Could not fetch orders');
        const data = await res.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <Typography color='error'>{error}</Typography>
      </Box>
    );
  }

  if (!orders.length) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <Typography>No orders found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 6 }}>
      <Typography
        variant='h4'
        fontWeight='bold'
        gutterBottom>
        Mina ordrar
      </Typography>
      <List>
        {orders.map((order) => (
          <Card
            key={order.id}
            sx={{ bgcolor: '#F5E044', mb: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography
                variant='h6'
                color='primary'>
                Ordernummer: {order.orderNumber}
              </Typography>
              <Typography
                variant='body2'
                sx={{ mb: 1 }}>
                Datum: {new Date(order.createdAt).toLocaleString()}
              </Typography>
              <Typography
                variant='body2'
                sx={{ mb: 1 }}>
                Leveransadress: {order.shippingAddress.street},{' '}
                {order.shippingAddress.zipcode} {order.shippingAddress.city}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant='subtitle1'
                fontWeight='bold'>
                Produkter:
              </Typography>
              <List dense>
                {order.orderRows.map((row: any) => (
                  <ListItem
                    key={row.id}
                    sx={{ pl: 0, fontWeight: 'bold' }}>
                    {row.product?.title} ({row.quantity} st) - {row.price} kr/st
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant='body1'
                fontWeight='bold'>
                Totalt: {order.totalPrice} kr
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant='body1'
                fontWeight='bold'>
                Orderstatus: Skickad
              </Typography>
            </CardContent>
          </Card>
        ))}
      </List>
    </Box>
  );
}
