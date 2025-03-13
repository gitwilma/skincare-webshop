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
        width: { xs: "100%", sm: "90%", md: "80%" },
        margin: "0 auto",
        mb: 6,
        mt: 6,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          height: "auto",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: "100%", sm: "50%" },
            height: "auto",
            objectFit: "contain",
          }}
          image={item.image}
          key={item.id}
        />
        <Box
          sx={{
            gap: 4,
            display: "flex",
            flexDirection: "column",
            width: { xs: "100%", sm: "50%" },
          }}
        >
          <Typography variant="h3">{item.title}</Typography>
          <Typography>{item.description}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
