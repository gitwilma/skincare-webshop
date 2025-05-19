"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, Container, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import HeroText from "./hero-text";
import ProductCard from "./product-card";
import BuyButton from "./buy-button";
import CategoryList from "./categoriesList";


export default function HomeContent({ products }: { products: any[] }) {
  const [queryClient] = useState(() => new QueryClient());

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: "test@example.com",
          password: "test123",
        }),
      });
      

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      console.log("Login success:", data);
    } catch (error) {
      console.error("Login error:", error);
    }
    
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    console.log("Logged out");
    
  };

  const handleCheckMe = async () => {
    const res = await fetch("/api/auth/me", { method: "GET", credentials: "include" });
    const data = await res.json();
    console.log("Auth check:", data);
  };

  const handleRegister = async () => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "test@example.com",
          password: "test123",
        }),
      });
  
      if (!res.ok) throw new Error("Registration failed");
  
      const data = await res.json();
      console.log("Registration success:", data);
    } catch (err) {
      console.error("Registration error:", err);
    }
  };
  
  

  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 400, lg: 300 },
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
        <CategoryList/>

        <HeroText />

        {/* Login button */}
        <Box sx={{ textAlign: "center", my: 2 }}>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Test Login
          </Button>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Test Logout
          </Button>
          <Button variant="contained" color="primary" onClick={handleCheckMe}>
Who am I?
          </Button>
          <button onClick={handleRegister}>Register User</button>

        </Box>

        <Container>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid size={{ xs: 6, md: 4 }} key={product.id}>
                <ProductCard product={product}>
                  <BuyButton product={product} />
                </ProductCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </QueryClientProvider>
  );
}
