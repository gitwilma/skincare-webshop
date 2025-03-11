import { Product } from "@/data";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import BuyButton from "../Client Components/buy-button";

interface Props {
  product: Product;
}

export default function ProductCard(props: Props) {
  return (
    <Card data-cy="product" sx={{ maxWidth: 345, marginTop: 4 }}>
      <CardMedia
        sx={{ height: 300 }}
        image={props.product.image}
        data-cy="product-id"
        key={props.product.id}
      ></CardMedia>
      <Typography
        variant="h6"
        data-cy="product-title"
        sx={{ boxSizing: "border-box", paddingLeft: 0.5 }}
      >
        {props.product.title}
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
          Pris: {props.product.price} kr
        </Typography>
        <BuyButton />
      </Box>
    </Card>
  );
}
