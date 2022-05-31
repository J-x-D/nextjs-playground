import { Container, Typography } from "@mui/material";
import React from "react";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <div className={styles.root}>
      <Typography>Made with ❤️ from JD</Typography>
    </div>
  );
}
