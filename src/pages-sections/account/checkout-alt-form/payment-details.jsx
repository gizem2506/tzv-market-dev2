import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Heading from "./heading";

const PaymentDetails = () => {
  return (
    <Card
      sx={{
        p: 3,
        mb: 3,
      }}
    >
      <Heading number={2} title="Ödeme Detayları" />
      <Button fullWidth type="submit" color="primary" variant="contained">
        Ödeme Sayfasına Git
      </Button>
    </Card>
  );
};

export default PaymentDetails;
