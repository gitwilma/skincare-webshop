import { signIn } from "@/auth-client";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Button } from "@mui/material";

export default function GitHubAuthButton({
  mode,
}: {
  mode: "login" | "register";
}) {
  return (
    <Button
      variant="outlined"
      startIcon={<GitHubIcon />}
      onClick={() => {
        console.log(`Trying GitHub ${mode}...`);
        signIn.social({ provider: "github" /* callbackURL: "/admin" */ });
      }}
    >
      {mode === "login" ? "Logga in med GitHub" : "Registrera dig med GitHub"}
    </Button>
  );
}
