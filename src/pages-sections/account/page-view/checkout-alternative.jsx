"use client" 
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { AccountForm } from "../checkout-alt-form";
export default function AccountPageView() {
  return (
    <Container
      sx={{
        my: "1.5rem",
      }}
    >
      <Grid container spacing={3}>
        <Grid item lg={12} md={8} xs={12}>
          <AccountForm />
        </Grid>
      </Grid>
    </Container>
  );
}
