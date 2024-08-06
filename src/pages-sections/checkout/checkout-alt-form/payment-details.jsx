"use client" //tüm sıkıntı burada
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

import Heading from "./heading";
import { useRouter } from "next/navigation";
import { receivePaid } from "../../../services/payment-services";
import axios from "axios";

const paymentURL = "https://halici-payment.herokuapp.com/";
const paymentToken = "UztwkXN-5AoChSe4AO9YPQ";
const paymentSuccessUrl = "https://tzv-market-dev2.vercel.app/payments/success" ;
const paymentErrorUrl = "https://tzv-market-dev2.vercel.app/payments/error"

const PaymentDetails = () => {
  const { push } = useRouter();

  const odemeYap = () => {
    const fakeData = {
      user_id: "6244",
      user_name: "Gizem Altay",
      order_id: "9999",
      product_name: "1722513502",
      price: 100,
      email: "gzm@test.com",
    };

    axios.post(
      `${paymentURL}payments/checkout`,
      {
        ...fakeData,
        success_callback: paymentSuccessUrl,
        error_callback: paymentErrorUrl,
        token: paymentToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(res=> console.log(res)).catch(err => console.log(err));
    /* receivePaid(fakeData)
      .then((x) => {
        console.log(x);
        if (data.payment_url) {
          alert("GİTTİ");
          push(data.payment_url);
        }
      })
      .catch((e) => {
        alert("Hata oldu");
        console.log({ e });
      }); */
    return <>TEST</>;
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
