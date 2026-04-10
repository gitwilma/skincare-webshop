import { signIn } from "@/auth-client";
import GoogleIcon from "@mui/icons-material/Google";
import { Button } from "@mui/material";

export default function GoogleAuthButton({
  mode,
}: {
  mode: "login" | "register";
}) {
  return (
    <Button
      variant="outlined"
      startIcon={<GoogleIcon />}
      onClick={() => {
        console.log(`Trying Google ${mode}...`);
        signIn.social({ provider: "google" });
      }}
    >
      {mode === "login" ? "Logga in med Google" : "Registrera dig med Google"}
    </Button>
  );
}
