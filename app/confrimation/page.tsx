import { Box, Typography } from "@mui/material";

export default function ConfirmationPage() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Typography variant="h4" fontWeight="bold">
        Tack för din order!
      </Typography>
    </Box>
  );
}
