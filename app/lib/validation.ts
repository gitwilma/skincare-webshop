import { z } from "zod";

export const orderSchema = z.object({
  user: z.object({
    name: z.string().min(1),
    address: z.string().min(1),
    phone: z.string().min(7),
    zipcode: z.string().min(4),
    city: z.string().min(1),
  }),
  items: z.array(
    z.object({
      productId: z.string().min(1),
      quantity: z.number().min(1),
      price: z.number().nonnegative(),
    })
  ),
  totalPrice: z.number().positive(),
});
