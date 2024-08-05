"use client";

import Grid from "@mui/material/Grid";
import appIcons from "../../../icons";
import { ServiceCard } from "./styles";
import { H4 } from "../../../components/Typography";

export default function Section2({ services = [] }) {
  return (
    <div className="mb-3">
      <Grid container spacing={3}>
        {services.map(({ icon, id, title }) => {
          const Icon = appIcons[icon];
          return (
            <Grid item lg={4} sm={6} xs={12} key={id}>
              <ServiceCard>
                <Icon
                  sx={{
                    fontSize: 50,
                    color: "grey.600",
                  }}
                />

                <div>
                  <H4 color="grey.900" fontSize={20} fontWeight={700}>
                    {title}
                  </H4>
                </div>
              </ServiceCard>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
