"use client";

import Grid from "@mui/material/Grid";
import { AccountForm } from "../checkout-alt-form/account-form";
import { CheckoutSummary } from "../checkout-summery";

export default function CheckoutPageView() {
  return (
    <Grid container flexWrap="wrap-reverse" spacing={3}>
      <Grid item lg={8} md={8} xs={12}>
        <AccountForm />
      </Grid>

      <Grid item lg={4} md={4} xs={12}>
        <CheckoutSummary />
      </Grid>
    </Grid>
  );
}
