import { RemoveCircleOutline } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function DeleteBtn() {
  return(
  <>
    <Button /* DeleteProductButton "use client" --> visa dialog innan borttagning */
      // onClick={handleRemoveBtn(product.id)}
      color="primary"
      sx={{ minWidth: "auto" }}
    >
      <RemoveCircleOutline />
    </Button>
  </>
  )  
}
