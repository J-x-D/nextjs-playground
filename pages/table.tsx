import { gql } from "@apollo/client";
import client from "../graphql/apollo-client";
import { TableType } from "./api/schemas";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useState } from "react";

const header: GridColDef[] = [
  { field: "id", headerName: "ID", width: 400 },
  { field: "firstname", headerName: "First Name", width: 150 },
  { field: "lastname", headerName: "Last Name", width: 150 },
  { field: "age", headerName: "Birthday", width: 100 },
];

export default function Table({ data }: { data: TableType[] }) {
  const { t } = useTranslation(["common", "table"]);
  const [pageSize, setPageSize] = useState(5);
  return (
    <div style={{ height: 470, width: "100%", padding: "3rem" }}>
      <Typography variant="h1">{t("table:title")}</Typography>
      <Typography variant="overline">{t("table:overline")}</Typography>
      <DataGrid
        rows={data}
        columns={header}
        rowsPerPageOptions={[5, 10, 15]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      />
    </div>
  );
}

export async function getServerSideProps({ locale }: { locale: any }) {
  const { data } = await client.query({
    query: gql`
      query Query {
        getTable {
          firstname
          lastname
          age
          id
        }
      }
    `,
  });

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "table"])),
      data: data.getTable,
    },
  };
}
