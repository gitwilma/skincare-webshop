import { signIn } from "@/auth-client";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Button } from "@mui/material";

export default function GitHubSignInButton() {
  return (
    <Button
      variant="outlined"
      startIcon={<GitHubIcon />}
      onClick={() => {
        console.log("Trying GitHub login...");
        signIn.social({ provider: "github" });
      }}
    >
      Logga in med GitHub
    </Button>
  );
}
