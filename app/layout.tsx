import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Poppins } from "next/font/google";
import type { Metadata } from "next/types";
import { PropsWithChildren } from "react";
import Header from "./Components/header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "100",
});

/* Beskriv din hemsida för sökmotorerna */
export const metadata: Metadata = {
  title: "Webbshoppen",
  description: "Dina favoritprodukter online till en bra pris...",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={poppins.className} style={{ margin: 0 }}>
        <AppRouterCacheProvider>
          <Header />
          {children}
          <footer>
            <p>© 2024</p>
          </footer>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
