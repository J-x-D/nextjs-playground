import React, { ReactNode } from "react";
import CustomAppBar from "./CustomAppBar/CustomAppBar";
import Footer from "./Footer/Footer";
import Snackbar from "./Snackbar/Snackbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div style={{ width: "100vw" }}>
      <CustomAppBar />
      <main style={{ display: "grid", placeItems: "center" }}>{children}</main>
      <Snackbar />
      <Footer />
    </div>
  );
}
