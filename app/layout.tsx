import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next/types";
import { PropsWithChildren } from "react";
import Footer from "./components/layout/footer";
import Header from "./components/layout/header";
import { CartProvider } from "./providers/cart-provider";
import theme from "./theme/theme";



export const metadata: Metadata = {
  title: "FermentedDreams",
  description:
    "Kombucha är en fermenterad dryck gjord på te, socker och en symbios av bakterier och jäst.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body style={{ margin: 0, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <CartProvider>
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
