import Link from "next/link";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import useCart from "hooks/useCart";
import { Span } from "components/Typography";
import { FlexBetween } from "components/flex-box";
import { currency } from "lib";
export default function CheckoutForm() {
  const { state } = useCart();

  const getTotalPrice = () =>
    state.cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <Card
      sx={{
        padding: 3,
      }}
    >
      <FlexBetween mb={2}>
        <Span color="grey.600">Total:</Span>

        <Span fontSize={18} fontWeight={600} lineHeight="1">
          {currency(getTotalPrice())}
        </Span>
      </FlexBetween>

      <Divider
        sx={{
          mb: 2,
        }}
      />

      <TextField
        fullWidth
        size="small"
        label="Kupon"
        variant="outlined"
        placeholder="Voucher"
      />

      <Button
        variant="outlined"
        color="primary"
        fullWidth
        sx={{
          mt: 2,
          mb: 4,
        }}
      >
        Kupon Uygula
      </Button>

      <Button
        fullWidth
        color="primary"
        href="/checkout"
        variant="contained"
        LinkComponent={Link}
      >
        Şimdi Ödeme Yapın
      </Button>
    </Card>
  );
}
