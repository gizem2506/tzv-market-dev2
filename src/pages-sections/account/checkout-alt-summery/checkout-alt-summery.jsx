"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Paragraph } from "../../../components/Typography";
import useCart from "../../../hooks/useCart";
import CartItem from "./cart-item";
import ListItem from "../list-item";
export default function CheckoutAltSummary() {
  const { state } = useCart();
  return (
    <div>
      <Paragraph color="secondary.900" fontWeight={700} mb={2}>
        Siparişiniz
      </Paragraph>

      {state.cart.map(({ product_name, quantity, price, id }) => (
        <CartItem name={product_name} price={price} qty={quantity} key={id} />
      ))}

      <Box component={Divider} borderColor="grey.300" my={3} />

      <ListItem title="Ara Toplam" value={2610} />
      <ListItem title="Kargo" />
      <ListItem title="KDV" value={40} />
      <ListItem title="İndirim" mb={3} />

      <Box component={Divider} borderColor="grey.300" mb={1} />

      <ListItem title="Toplam" value={2650} color="inherit" />
    </div>
  );
}
