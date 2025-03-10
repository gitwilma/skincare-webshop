import { products } from "@/data";
import { Box, CardMedia } from "@mui/material";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage(props: Props) {
  const { slug } = await props.params;
  const item = products.find((i) => i.slug === slug);

  if (!item) return <h2>404</h2>;

  return (
    <Box>
      <h2>{item.title}</h2>;
      <CardMedia
        sx={{ height: 300 }}
        image={item.image}
        data-cy="product-id"
        key={item.id}
      ></CardMedia>
    </Box>
  );
}
