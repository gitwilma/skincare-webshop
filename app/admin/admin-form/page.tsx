import { Box, Button, TextField } from "@mui/material";

export default function AdminForm() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 400,
          mx: "auto",
        }}
      >
        <TextField label="Title" />
        <TextField label="Description" />
        <TextField label="Price" />
        <TextField label="Image" />
        <Button type="submit" variant="contained" color="primary">
          Add Product
        </Button>
      </Box>
    </>
  );
}
