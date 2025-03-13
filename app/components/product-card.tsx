import { Product } from "@/data";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
import BuyButton from "../Client Components/buy-button";

interface Props {
  product: Product;
  hideBuyButton?: boolean;
  children?: React.ReactNode;
}

export default function ProductCard({ product }: Props) {
  
  return (
    <Card data-cy="product" sx={{ maxWidth: 345, marginTop: 4 }}>
      <Link href={"/products/" + product.slug}>
        <CardMedia
          sx={{ height: 300 }}
          image={product.image}
          data-cy="product-id"
          key={product.id}
        ></CardMedia>
      </Link>
      <Typography
        variant="h6"
        data-cy="product-title"
        sx={{ boxSizing: "border-box", paddingLeft: 0.5 }}
      >
        {product.title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body1"
          data-cy="product-price"
          sx={{ boxSizing: "border-box", paddingLeft: 0.5 }}
        >
          Pris: {product.price} kr
        </Typography>
        <BuyButton product={product} />
      </Box>
    </Card>
  );
}
