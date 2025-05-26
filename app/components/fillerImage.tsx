"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

type Props = {
  leftSrc: string;
  rightSrc: string;
  altLeft?: string;
  altRight?: string;
};

export default function FillerImage({
  leftSrc,
  rightSrc,
  altLeft = "Left image",
  altRight = "Right image",
}: Props) {
  return (
    <Box
      px={2}
      py={4}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "lg",
          width: "100%",
          display: "flex",
          gap: 5,
          flexWrap: "wrap",
          
        }}
      >
        <Box sx={{ flex: 1}}>
          <Image
            src={leftSrc}
            alt={altLeft}
            width={0}
            height={0}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              boxShadow: "10px 10px #f5e044",

            }}
          />
        </Box>

        <Box sx={{ flex: 1, mt: { xs: 2, md: 6 } }}>
          <Image
            src={rightSrc}
            alt={altRight}
            width={0}
            height={0}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              boxShadow: "10px 10px #f5e044",

            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
