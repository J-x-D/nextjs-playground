import { Button, ButtonGroup } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function LanguageToggle() {
  const router = useRouter();
  const { route,  } = router;
  return (
    <ButtonGroup
      variant="contained"
      disableElevation
      color="secondary"
      aria-label="outlined primary button group"
      sx={{ mx: "2rem" }}
    >
      <Link passHref href={route} locale="de">
        <Button>DE</Button>
      </Link>
      <Link passHref href={route} locale="en">
        <Button>EN</Button>
      </Link>
    </ButtonGroup>
  );
}
