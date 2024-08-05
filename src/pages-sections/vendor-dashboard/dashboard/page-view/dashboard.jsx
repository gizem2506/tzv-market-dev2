import Grid from "@mui/material/Grid";
import WelcomeCard from "../welcome-card";
import { useSession } from "next-auth/react";
import { getAllUsers } from "@/src/services/user-services";

export default async function DashboardPageView() {
  const customers = await getAllUsers();
  const customersCount = customers.length;
  return (
    <div className="pt-2 py-2">
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <WelcomeCard customersCount={customersCount} />{" "}
        </Grid>
      </Grid>
    </div>
  );
}
