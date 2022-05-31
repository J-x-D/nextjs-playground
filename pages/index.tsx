import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Layout from "../src/Layout";
import { getSession } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <Container style={{ width: "100vw", padding: 0, margin: 0 }}>
      <Typography>Hello BDA</Typography>
    </Container>
  );
};

export default Home;

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
