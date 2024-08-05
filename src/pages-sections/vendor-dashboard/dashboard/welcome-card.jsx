"use client";

import Image from "next/image";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { H3, H5, Paragraph } from "../../../components/Typography";

export default function WelcomeCard({ customersCount }) {
  return (
    <Card
      sx={{
        p: 3,
        height: "100%",
        display: "flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <H5 color="info.main" mb={0.5}>
        TOPLAM KULLANICI SAYISI
      </H5>
      <Paragraph color="grey.600">
       Markete toplam kayıt olmuş kullanıcı sayısı.
      </Paragraph>

      <H3 mt={3}>{customersCount}</H3>

      <Box
        sx={{
          right: 24,
          bottom: 0,
          position: "absolute",
          display: {
            xs: "none",
            sm: "block",
          },
        }}
      >
        <Image
          width={195}
          height={171}
          alt="Welcome"
          src="/assets/images/illustrations/dashboard/welcome.svg"
        />
      </Box>
    </Card>
  );
}
