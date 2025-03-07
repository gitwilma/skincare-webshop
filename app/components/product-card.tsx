import { Product } from "@/data";
import Box from "@mui/material/Box";

interface Props {
  product: Product;
}

export default function ProductCard(props: Props) {
  return (
    <Box data-cy="product">
      <article data-cy="product-id" key={props.product.id}>
        <h3 data-cy="product-title">{props.product.title}</h3>
        <p data-cy="product-price">Pris: {props.product.price} kr</p>
      </article>
    </Box>
  );
}
