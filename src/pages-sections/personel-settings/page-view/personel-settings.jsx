"use client";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as yup from "yup";
import PageWrapper from "../../vendor-dashboard/page-wrapper";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { updateUserById } from "@/src/services/user-services";

const ACCOUNT_SCHEMA = yup.object().shape({
  name: yup.string().required("Adı Soyadı zorunludur"),
  email: yup.string().email("Geçersiz Email").required("Email zorunludur"),
});



export default function PersonelSettingsPageView() {
  const { data: sessionData } = useSession();
  const [initialValues, setInitialValues] = useState({
    email: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (sessionData?.user) {
      setInitialValues({
        name: sessionData.user.name || "",
        email: sessionData.user.email || "",
      });
    }
  }, [sessionData]);

  const handleFormSubmit = async (values) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await updateUserById(sessionData.user.id, values);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box px={4} pt={1}>
      <PageWrapper title="Hesap Ayarları">
        <Card className="p-2">
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={ACCOUNT_SCHEMA}
            enableReinitialize
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      color="info"
                      size="medium"
                      name="name"
                      label="Adı Soyadı"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      color="info"
                      name="email"
                      type="email"
                      label="E-posta Adresi"
                      size="medium"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="info" disabled={loading}>
                      {loading ? <CircularProgress size={24} /> : "Değişiklikleri Kaydet"}
                    </Button>
                  </Grid>
                  {error && (
                    <Grid item xs={12}>
                      <Alert severity="error">{error}</Alert>
                    </Grid>
                  )}
                  {success && (
                    <Grid item xs={12}>
                      <Alert severity="success">Kullanıcı bilgileri başarıyla güncellendi!</Alert>
                    </Grid>
                  )}
                </Grid>
              </form>
            )}
          </Formik>
        </Card>
      </PageWrapper>
    </Box>
  );
}
