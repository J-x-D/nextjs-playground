import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button, Typography } from "@mui/material";

export default function Login() {
  const { data: session } = useSession();
  if (session) {
    return (
      <Button
        disableElevation
        color="secondary"
        variant="contained"
        onClick={() => signOut()}
      >
        Sign Out
      </Button>
    );
  }
  return (
    <>
      <Button
        disableElevation
        color="secondary"
        variant="contained"
        onClick={() => signIn()}
      >
        Sign in
      </Button>
    </>
  );
}
