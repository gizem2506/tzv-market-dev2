"use client";

import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { FlexRowCenter } from "../components/flex-box";
import { H1 } from "../components/Typography";
export default function Error({ error, reset }) {
  return (
    <FlexRowCenter height="100vh">
      <Card
        sx={{
          p: 4,
          textAlign: "center",
        }}
      >
        <H1 mb={2}>Bir şeyler ters gitti!</H1>

        <Button color="error" variant="contained" onClick={() => reset()}>
          Tekrar deneyin
        </Button>
      </Card>
    </FlexRowCenter>
  );
}
