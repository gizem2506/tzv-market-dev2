"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Paragraph } from "../../../components/Typography";
import useCart from "../../../hooks/useCart";
import CartItem from "./cart-item";
import ListItem from "../list-item";
import { currency } from "@/src/lib";

export default function CheckoutAltSummary() {
  const { state } = useCart();
  console.log("state",state)
  const cartList = state.cart; 

  const getTotalPrice = () => {
    return cartList.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };
  return (
    <div>
      <Paragraph color="secondary.900" fontWeight={700} mb={2}>
        Siparişiniz
      </Paragraph>

      {state.cart.map(({ product_name, quantity, price, id }) => (
        <CartItem name={product_name} price={price} qty={quantity} key={id} />
      ))}

      <Box component={Divider} borderColor="grey.300" my={3} />

      <ListItem title="Ara Toplam" value={currency(getTotalPrice())} />
      {/* <ListItem title="Kargo" /> */}
      <ListItem title="KDV"  />
      {/* <ListItem title="İndirim" mb={3} /> */}

      <Box component={Divider} borderColor="grey.300" mb={1} />

      <ListItem title="Toplam" value={currency(getTotalPrice())} color="inherit" />
    </div>
  );
}
