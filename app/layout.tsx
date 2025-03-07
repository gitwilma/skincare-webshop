import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Inter } from "next/font/google";
import type { Metadata } from "next/types";
import { PropsWithChildren } from "react";
import Header from "./Components/header";

const inter = Inter({ subsets: ["latin"] });

/* Beskriv din hemsida för sökmotorerna */
export const metadata: Metadata = {
  title: "Webbshoppen",
  description: "Dina favoritprodukter online till en bra pris...",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          {/* <header>
          <Link href="/">
            <h1>NextJS webbshop</h1>
          </Link>
        </header> */}
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
