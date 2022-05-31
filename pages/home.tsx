import { useReactiveVar } from "@apollo/client";
import { Typography } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { personVar } from "../graphql/chache";
import { TableType } from "./api/schemas";

function Home({
  firstPerson,
  revalidatedAt,
}: {
  firstPerson: TableType;
  revalidatedAt: Date;
}) {
  const ts = new Date(revalidatedAt).toLocaleTimeString();

  const person = useReactiveVar(personVar);

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        width: "100vw",
      }}
    >
      <Typography variant="h1">Welcome!</Typography>
      <Typography variant="subtitle1">
        This is a basic demo to showcase Next.js
      </Typography>
      <Typography variant="overline">
        {`${person.firstname} ${person.lastname} is ${person.age} years old`}
      </Typography>
      <div
        style={{
          position: "relative",
          width: "30rem",
          height: "30rem",
        }}
      >
        <Image
          src="/home.png"
          alt="cool image"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <Typography variant="h3">First stored person {ts}</Typography>
      {firstPerson?.firstname && (
        <Typography variant="subtitle1">{`${firstPerson.firstname} ${
          firstPerson.lastname
        } is ${firstPerson.age} years old and is also a ${
          firstPerson.isFake === false ? "real" : "fake"
        }`}</Typography>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const prisma = new PrismaClient();

  const firstPerson =
    (
      await prisma.person.findMany({
        take: 1,
        where: {
          age: { lt: 10 },
        },
      })
    )[0] ?? {};

  const revalidatedAt = Date.now();

  return {
    // will be passed to the page component as props
    props: {
      firstPerson,
      revalidatedAt,
    },
    revalidate: 10, //in seconds
  };
}
export default Home;
