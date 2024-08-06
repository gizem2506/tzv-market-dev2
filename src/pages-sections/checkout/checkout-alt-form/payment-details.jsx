import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

import Heading from "./heading";
import { useRouter } from "next/navigation";
import { receivePaid } from "../../../services/payment-services";
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
    receivePaid(fakeData)
      .then((x) => {
        console.log(data);
        if (data.payment_url) {
          alert("GİTTİ");
          push(data.payment_url);
        }
      })
      .catch((e) => {
        alert("Hata oldu");
        console.log({e});
      });
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
