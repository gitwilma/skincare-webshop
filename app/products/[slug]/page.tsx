import { products } from "@/data";
import { Box, CardMedia, Typography } from "@mui/material";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage(props: Props) {
  const { slug } = await props.params;
  const item = products.find((i) => i.slug === slug);

  if (!item) return <h2>404</h2>;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row", md: "row" },
          height: "100vh",
          width: "100%",
        }}
      >
        <CardMedia
          sx={{
            height: "100%",
            width: { xs: "100%", sm: "50%", md: "50%" },
            objectFit: "cover",
          }}
          image={item.image}
          key={item.id}
        />
        <Box sx={{ display: "flex", flexDirection: "column", width: { xs: "100%", sm: "50%", md: "50%" } }}>
          <h2>{item.title}</h2>
          <Typography>{item.description}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
