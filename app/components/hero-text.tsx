import { Box, Typography } from "@mui/material";

export default function HeroText() {
  return (
    <Box
      sx={{
        width: "80%",
        maxWidth: 800,
        margin: "0 auto",
        my: 2,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: 40, md: 60 },
        }}
        variant="h2"
        gutterBottom
      >
        Fermented Dreams
      </Typography>
      <Typography variant="body1">
        Upptäck vår ekologiska kombucha – en fermenterad tedryck bryggd med
        naturliga ingredienser och levande bakteriekultur (SCOBY). Den är ett
        smakrikt och hälsosammare alternativ till läsk, med mindre socker och
        utan konstgjorda tillsatser. Vår kombucha tillverkas i liten skala för
        att bevara kvalitet och hantverk. Genom den naturliga fermenteringen får
        drycken sin friska syrlighet, lätt sötma och naturliga kolsyra.
        Probiotiska egenskaper gör den dessutom snäll mot magen. Vi vill
        inspirera fler att upptäcka den fermenterade dryckens rika kultur – och
        njuta längs vägen.
      </Typography>
    </Box>
  );
}
