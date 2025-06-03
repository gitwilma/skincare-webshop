import { Box, CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Poppins } from "next/font/google";
import type { Metadata } from "next/types";
import { PropsWithChildren } from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import { CartProvider } from "./providers/cart-provider";
import theme from "./theme/theme";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "100",
});

export const metadata: Metadata = {
  title: "FermentedDreams",
  description:
    "Kombucha är en fermenterad dryck gjord på te, socker och en symbios av bakterier och jäst.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={poppins.className}
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <CartProvider>
              <Box
                sx={{
                  bgcolor: "background.default",
                }}
              />
              <Header />
              <main style={{ flex: 1 }}>{children}</main>
              <Footer />
            </CartProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
