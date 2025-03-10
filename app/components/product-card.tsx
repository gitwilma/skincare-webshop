import { Product, products } from "@/data";
import { Card, CardMedia, Typography } from "@mui/material";
import Link from "next/link";

interface Props {
  product: Product;
}

export default function ProductCard(props: Props) {
  return (
    <Card data-cy="product" sx={{ maxWidth: 345 }}>
    <Link href={"/products/" + props.product.slug}>
      <CardMedia
        sx={{ height: 300 }}
        image={props.product.image}
        data-cy="product-id"
        key={props.product.id}
      ></CardMedia>
      </Link>
      <Typography
        variant="h6"
        data-cy="product-title"
        sx={{ boxSizing: "border-box", paddingLeft: 0.5 }}
      >
        {props.product.title}
      </Typography>
      <Typography
        variant="body1"
        data-cy="product-price"
        sx={{ boxSizing: "border-box", paddingLeft: 0.5 }}
      >
        Pris: {props.product.price} kr
      </Typography>
    </Card>
  );
}
