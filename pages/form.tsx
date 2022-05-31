import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { gql } from "apollo-server-micro";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { useForm } from "react-hook-form";
import { alertVar, personVar } from "../graphql/chache";
import { initValidationSchema } from "../utils/validationSchema";

const PUSH_DATA = gql`
  mutation PushTableData($firstname: String, $lastname: String, $age: Int) {
    pushTableData(firstname: $firstname, lastname: $lastname, age: $age)
  }
`;

export default function Form() {
  const { t } = useTranslation("common");
  const validationSchema = initValidationSchema(t);

  const {
    register,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    shouldFocusError: true,
    criteriaMode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const [pushData] = useMutation(PUSH_DATA);

  function submit() {
    const { firstname, lastname, age } = getValues();
    console.log(
      "%cform.tsx line:38 getValues()",
      "color: white; background-color: #007acc;",
      getValues()
    );
    personVar({
      firstname,
      lastname,
      age,
    });
    pushData({
      variables: {
        firstname,
        lastname,
        age: parseInt(age),
      },
    })
      .then(() => {
        alertVar({
          message: "Mutation triggered -> check the logs",
          open: true,
          severity: "success",
        });
      })
      .catch((err) => {
        alertVar({
          message: "Mutation failed -> check the logs",
          open: true,
          severity: "error",
        });
      });
  }

  return (
    <div>
      <form
        style={{
          padding: "3rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: 500,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          {...register("firstname")}
          label={t("common:form.firstname.label")}
          placeholder={t("common:form.firstname.placeholder")}
          error={!!errors.firstname}
          helperText={errors.firstname?.message ?? ""}
        />

        <TextField
          fullWidth
          variant="outlined"
          {...register("lastname")}
          label={t("common:form.lastname.label")}
          placeholder={t("common:form.lastname.placeholder")}
          error={!!errors.lastname}
          helperText={errors.lastname?.message ?? ""}
        />

        <TextField
          type="number"
          fullWidth
          variant="outlined"
          {...register("age")}
          label={t("common:form.age.label")}
          placeholder={t("common:form.age.placeholder")}
          error={!!errors.age}
          helperText={errors.age?.message ?? ""}
        />

        <TextField
          fullWidth
          variant="outlined"
          {...register("city")}
          label={t("common:form.city.label")}
          placeholder={t("common:form.city.placeholder")}
          error={!!errors.city}
          helperText={errors.city?.message ?? ""}
        />
        <Button onClick={() => submit()} variant="outlined">
          Send
        </Button>
      </form>
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
