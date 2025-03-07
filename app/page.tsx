import { products } from "@/data";
import { Box } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          overflow: "hidden",
          "@media (max-width: 1280px)": {
            height: 300,
          },
        }}
      >
        <Image
          src="https://www.pharmaciepolygone.com/media/cache/original/01/ba/4c462d8f8f67d017ccab9e6942e5.jpg"
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
        />
      </Box>
      <h1>Produkter</h1>
      {products.map((product) => (
        <article key={product.id}>
          <h3>{product.title}</h3>
          <p>Artikelnr: {product.articleNumber}</p>
          <p>{product.description}</p>
          <p>Pris: {product.price} kr</p>
        </article>
      ))}
    </main>
  );
}
