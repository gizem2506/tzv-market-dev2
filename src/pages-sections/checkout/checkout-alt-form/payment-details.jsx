"use client";

import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Heading from "./heading";
import { useRouter } from "next/navigation";
import axios from "axios";

const PaymentDetails = () => {
  const { push } = useRouter();

  const odemeYap = async () => {
    const fakeData = {
      user_id: "6244",
      user_name: "Gizem Altay",
      order_id: "9999",
      product_name: "1722513502",
      price: 100,
      email: "gzm@test.com",
    };

    try {
      const res = await axios.post('/api/receivePaid', fakeData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      const { payment_url } = res.data;
      if (payment_url) {
        alert("GİTTİ");
        push(payment_url);
      }
    } catch (err) {
      alert("Hata oldu");
      console.log({ err });
    }
  };

  return (
    <Card
      sx={{
        p: 3,
        mb: 3,
      }}
    >
      <Heading number={3} title="Ödeme Detayları" />

      <Button
        fullWidth
        type="submit"
        color="primary"
        variant="contained"
        onClick={odemeYap}
      >
        Ödeme Sayfasına Gittt
      </Button>
    </Card>
  );
};

export default PaymentDetails;
