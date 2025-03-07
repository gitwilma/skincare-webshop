import { Product } from "@/data";

interface Props {
  product: Product;
}

export default function ProductCard(props: Props) {
  return (
    <article key={props.product.id}>
      <h3>{props.product.title}</h3>
      <p>Pris: {props.product.price} kr</p>
    </article>
  );
}
