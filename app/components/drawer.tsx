"use client";

import { MenuRounded } from "@mui/icons-material";
import { Theme, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import * as React from "react";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const isLargeScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("sm")
  );

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {/* Lägg här andra statiska länkar om du vill, t.ex: */}
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/">
            <ListItemText primary="Hem" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  if (isLargeScreen) {
    // På stora skärmar: visa inget extra i Drawer
    return null;
  }

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuRounded sx={{ fontSize: 40 }} />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
