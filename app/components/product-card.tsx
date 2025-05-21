import { Box, Card, CardActionArea, CardMedia, Typography } from "@mui/material";
import Link from "next/link";

interface Props {
  product: {
    id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    quantity: number;
    articleNumber: string;
  };
  children?: React.ReactNode;
}

export default function ProductCard({ product, children }: Props) {
  return (
    <Card
  sx={{
    height: 500,
    display: "flex",
    flexDirection: "column",
    mt: 4,
    border: "2px solid black",
    borderRadius: 0,
    boxShadow: "none",
    backgroundColor: "#fff",
    "&:hover": {
      transform: "scale(1.02)",
      transition: "transform 0.2s",
    },
  }}
>
  <Link
    href={`/product/${product.articleNumber}/${encodeURIComponent(product.title)}`}
    passHref
    style={{ textDecoration: "none", color: "inherit" }}
  >
    <CardActionArea sx={{ color: "inherit", textDecoration: "none" }}>
      <CardMedia
        component="img"
        image={product.image}
        alt={product.title}
        sx={{
          height: 300,
          width: "100%",
          objectFit: "contain",
          padding: 2,
          borderBottom: "2px solid black",
        }}
      />

      <Box
        sx={{
          height: 150,
          p: 1,
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: "monospace",
            fontWeight: 700,
            textTransform: "uppercase",
            mb: 1,
          }}
        >
          {product.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: "monospace",
            mb: 1,
            height: "40px", 
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.description}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontFamily: "monospace" }}
        >
          {product.quantity} kvar
        </Typography>
      </Box>
    </CardActionArea>
  </Link>

  <Box
    sx={{
      height: 50,
      px: 1,
      pb: 1,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: "2px solid black",
    }}
  >
    <Typography
      variant="body1"
      sx={{ fontFamily: "monospace", fontWeight: "bold" }}
    >
      Pris: {product.price} kr
    </Typography>
    {children}
  </Box>
</Card>
  );
}
