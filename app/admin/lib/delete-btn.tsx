"use client";

import { deleteProduct } from "@/app/actions"; // Importera din delete-funktion
import { RemoveCircleOutline } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useState, useTransition } from "react";

export default function DeleteBtn({ productId }: { productId: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // 🔹 Öppna/stäng dialogen
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 🔹 Funktion för att ta bort produkten
  const handleDelete = () => {
    startTransition(async () => {
      await deleteProduct(productId);
      handleClose();
    });
  };

  return (
    <>
      {/* 🔹 Ta bort-knapp */}
      <Button
        onClick={handleOpen}
        color="primary"
        sx={{ minWidth: "auto" }}
        disabled={isPending}
        data-cy="admin-remove-product"
      >
        <RemoveCircleOutline />
      </Button>

      {/* 🔹 Bekräftelsedialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Är du säker på att du vill ta bort produkten?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} disabled={isPending}>
            Avbryt
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            disabled={isPending}
            data-cy="confirm-delete-button"
          >
            Ta bort
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
